/**
 * ============================================================================
 *  CQC MANUAL - SpaceFast
 *  Integração manual Google Sheets -> Meta Conversions API (CAPI)
 * ----------------------------------------------------------------------------
 *  Eventos positivos: QualifiedLead, Lead, Purchase
 *  Eventos negativos: ColdLead (frio), NoResponse (nao_responde)
 *  Dados de identificação: telefone + estado (st) + fbc/fbp quando disponíveis
 * ============================================================================
 */

/* ===========================================================================
 *  CONSTANTES EDITÁVEIS
 * ======================================================================== */

var SHEET_LEADS     = 'Leads';
var SHEET_CONFIG    = 'Config';
var SHEET_LOG       = 'Log Envios Meta';
var SHEET_HISTORY   = 'Histórico';
var SHEET_TRACKING  = 'Rastreios Site';

var DEFAULT_COUNTRY_CODE = '55';
var DEFAULT_CURRENCY = 'BRL';
var ACTION_SOURCE = 'other';

var STATUS_EVENT_MAP = {
  'quente':            'QualifiedLead',
  'orcamento_enviado': 'Lead',
  'fechado':           'Purchase',
  'frio':              'ColdLead',
  'nao_responde':      'NoResponse'
};

// Colunas da aba "Rastreios Site" — nessa ordem
var RASTREIOS_HEADERS = [
  'Código Rastreio', 'Data', 'fbclid', 'fbc', 'fbp',
  'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Content', 'UTM Term', 'UTM ID',
  'Ad ID', 'Adset ID', 'Placement', 'Page URL', 'User Agent'
];

// Mapa de DDD -> sigla de estado (lowercase, sem acento)
var DDD_ESTADO_MAP = {
  '11':'sp','12':'sp','13':'sp','14':'sp','15':'sp','16':'sp','17':'sp','18':'sp','19':'sp',
  '21':'rj','22':'rj','24':'rj',
  '27':'es','28':'es',
  '31':'mg','32':'mg','33':'mg','34':'mg','35':'mg','37':'mg','38':'mg',
  '41':'pr','42':'pr','43':'pr','44':'pr','45':'pr','46':'pr',
  '47':'sc','48':'sc','49':'sc',
  '51':'rs','53':'rs','54':'rs','55':'rs',
  '61':'df',
  '62':'go','64':'go',
  '63':'to',
  '65':'mt','66':'mt',
  '67':'ms',
  '68':'ac',
  '69':'ro',
  '71':'ba','73':'ba','74':'ba','75':'ba','77':'ba',
  '79':'se',
  '81':'pe','87':'pe',
  '82':'al',
  '83':'pb',
  '84':'rn',
  '85':'ce','88':'ce',
  '86':'pi','89':'pi',
  '91':'pa','93':'pa','94':'pa',
  '92':'am','97':'am',
  '95':'rr',
  '96':'ap',
  '98':'ma','99':'ma'
};

/* ===========================================================================
 *  MENU / onOpen
 * ======================================================================== */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('CQC Manual')
    .addItem('Enviar eventos pendentes', 'enviarEventosPendentes')
    .addSeparator()
    .addItem('Arquivar mês atual', 'archiveCurrentMonth')
    .addItem('Configurar planilha (setup)', 'setupSheet')
    .addToUi();
}

/* ===========================================================================
 *  SETUP
 * ======================================================================== */

function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var leads = ss.getSheetByName(SHEET_LEADS) || ss.insertSheet(SHEET_LEADS);
  var leadsHeaders = [
    'Data', 'Nome', 'Telefone', 'Mensagem inicial', 'Campanha', 'Conjunto',
    'Anúncio', 'Origem', 'Status', 'Valor', 'Observação', 'Estado',
    'Evento Meta', 'Enviado Meta?', 'Data envio', 'Resposta Meta', 'Código Rastreio'
  ];
  writeHeader_(leads, leadsHeaders);

  var config = ss.getSheetByName(SHEET_CONFIG) || ss.insertSheet(SHEET_CONFIG);
  if (config.getLastRow() === 0) {
    var configRows = [
      ['Chave', 'Valor'],
      ['META_PIXEL_ID', ''],
      ['META_ACCESS_TOKEN', ''],
      ['TEST_EVENT_CODE', ''],
      ['API_VERSION', 'v25.0'],
      ['DEFAULT_COUNTRY_CODE', '55'],
      ['CQC_TRACKING_SECRET', ''],
      ['STATUS_VALIDOS', 'novo | quente | orcamento_enviado | fechado | frio | nao_responde']
    ];
    config.getRange(1, 1, configRows.length, 2).setValues(configRows);
    config.getRange(1, 1, 1, 2).setFontWeight('bold');
    config.setColumnWidth(1, 220);
    config.setColumnWidth(2, 380);
    config.setFrozenRows(1);
  }

  var log = ss.getSheetByName(SHEET_LOG) || ss.insertSheet(SHEET_LOG);
  var logHeaders = [
    'Data/Hora', 'Linha', 'Nome', 'Telefone (norm.)', 'Evento',
    'Event ID', 'HTTP', 'Sucesso?', 'Resposta / Erro'
  ];
  writeHeader_(log, logHeaders);

  // Migrações idempotentes: cria a aba "Rastreios Site", garante a coluna
  // "Código Rastreio" em Leads e a chave CQC_TRACKING_SECRET em Config —
  // seguro rodar em planilhas já existentes, não sobrescreve nada preenchido.
  ensureSchemaMigrations_();

  SpreadsheetApp.getUi().alert(
    'Setup concluído!\n\n' +
    'Coluna "Estado": preencha com a sigla do estado em minúsculas (sp, rj, mg, pr...).\n' +
    'Se deixar em branco, o script tenta deduzir pelo DDD do telefone.\n\n' +
    'Coluna "Código Rastreio": preenchida automaticamente quando o lead vem do\n' +
    'site (via botão de WhatsApp). Usada para casar fbc/fbp/UTMs no envio à Meta.\n\n' +
    'Aba "Rastreios Site": recebe os dados de clique enviados pelo site.\n\n' +
    'Config → CQC_TRACKING_SECRET: preencha com o mesmo valor da variável de\n' +
    'ambiente CQC_TRACKING_SECRET configurada no Next.js.\n\n' +
    'Status válidos:\n' +
    '  novo              → não envia\n' +
    '  quente            → QualifiedLead\n' +
    '  orcamento_enviado → Lead\n' +
    '  fechado           → Purchase\n' +
    '  frio              → ColdLead\n' +
    '  nao_responde      → NoResponse'
  );
}

function writeHeader_(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
}

/* ===========================================================================
 *  ARQUIVAMENTO MENSAL
 * ======================================================================== */

function archiveCurrentMonth() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();

  var leads = ss.getSheetByName(SHEET_LEADS);
  if (!leads) { ui.alert('Aba "Leads" não encontrada. Rode o Setup primeiro.'); return; }

  var lastCol = leads.getLastColumn();
  if (lastCol === 0) { ui.alert('A aba "Leads" não tem cabeçalho.'); return; }
  var leadsHeaders = leads.getRange(1, 1, 1, lastCol).getValues()[0];

  var numRows = leads.getLastRow() - 1;
  if (numRows < 1) { ui.alert('Não há leads para arquivar.'); return; }

  var competencia = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM');

  var resp = ui.alert(
    'Arquivar mês atual',
    'Serão movidos ' + numRows + ' lead(s) para a aba "Histórico" com a ' +
    'competência ' + competencia + '.\n\n' +
    'A aba "Leads" ficará vazia (apenas o cabeçalho).\n' +
    'As abas Config e Log Envios Meta NÃO são alteradas.\n\n' +
    'Deseja continuar?',
    ui.ButtonSet.YES_NO
  );
  if (resp !== ui.Button.YES) { ui.alert('Operação cancelada. Nada foi alterado.'); return; }

  var history = ss.getSheetByName(SHEET_HISTORY);
  var historyHeaders = ['Competência'].concat(leadsHeaders);
  if (!history) { history = ss.insertSheet(SHEET_HISTORY); }
  if (history.getLastRow() === 0) {
    history.getRange(1, 1, 1, historyHeaders.length).setValues([historyHeaders]);
    history.getRange(1, 1, 1, historyHeaders.length).setFontWeight('bold');
    history.setFrozenRows(1);
  }

  var dados = leads.getRange(2, 1, numRows, lastCol).getValues();
  var paraHistorico = dados.map(function(linha) {
    return [competencia].concat(linha);
  });

  var startRow = history.getLastRow() + 1;
  history.getRange(startRow, 1, paraHistorico.length, historyHeaders.length)
         .setValues(paraHistorico);

  leads.deleteRows(2, numRows);

  ui.alert(
    'Arquivamento concluído!\n\n' +
    numRows + ' lead(s) movido(s) para "Histórico" com competência ' + competencia + '.\n' +
    'A aba "Leads" agora está vazia (somente o cabeçalho).'
  );
}

/* ===========================================================================
 *  RASTREIOS SITE (CQC) — webhook do site + lookup fbc/fbp/UTMs
 * ----------------------------------------------------------------------------
 *  O site (Next.js) captura fbclid/UTMs/_fbp/_fbc no clique do botão de
 *  WhatsApp, gera um código "SF-XXXXX" e envia para cá via uma API route
 *  interna (que injeta o secret — o front-end nunca vê o secret nem o
 *  token da Meta). Aqui validamos o secret e guardamos os dados na aba
 *  "Rastreios Site" para casar com o "Código Rastreio" do lead depois.
 * ======================================================================== */

function doPost(e) {
  try {
    ensureSchemaMigrations_();

    var body;
    try {
      body = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return jsonResponse_({ ok: false, error: 'payload inválido' });
    }

    var cfg = readConfig_();
    var expectedSecret = cfg['CQC_TRACKING_SECRET'];
    if (!expectedSecret || body.secret !== expectedSecret) {
      return jsonResponse_({ ok: false, error: 'unauthorized' });
    }

    var code = safeStr_(body.code);
    if (!code) {
      return jsonResponse_({ ok: false, error: 'code obrigatório' });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_TRACKING);
    if (!trackingCodeExists_(sheet, code)) {
      appendTrackingRow_(sheet, body);
    }

    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Cria a aba "Rastreios Site" com cabeçalho, se ainda não existir. */
function ensureRastreiosSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_TRACKING);
  if (!sheet) { sheet = ss.insertSheet(SHEET_TRACKING); }
  writeHeader_(sheet, RASTREIOS_HEADERS);
  return sheet;
}

/** Adiciona a coluna "Código Rastreio" em Leads, se ainda não existir. */
function ensureCodigoRastreioColumn_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var leads = ss.getSheetByName(SHEET_LEADS);
  if (!leads) { return; }
  var lastCol = leads.getLastColumn();
  if (lastCol === 0) { return; }
  var headers = leads.getRange(1, 1, 1, lastCol).getValues()[0];
  var exists = headers.some(function(h) { return String(h).trim() === 'Código Rastreio'; });
  if (!exists) {
    leads.getRange(1, lastCol + 1).setValue('Código Rastreio').setFontWeight('bold');
  }
}

/** Adiciona a chave dada em Config com valor padrão, se ainda não existir. */
function ensureConfigKey_(key, defaultValue) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_CONFIG);
  if (!sheet) { return; }
  var lastRow = sheet.getLastRow();
  var values = lastRow > 0 ? sheet.getRange(1, 1, lastRow, 1).getValues() : [];
  for (var i = 0; i < values.length; i++) {
    if (String(values[i][0]).trim() === key) { return; }
  }
  sheet.appendRow([key, defaultValue]);
}

/** Roda todas as migrações idempotentes do CQC (seguro chamar sempre). */
function ensureSchemaMigrations_() {
  ensureConfigKey_('CQC_TRACKING_SECRET', '');
  ensureCodigoRastreioColumn_();
  ensureRastreiosSheet_();
}

/** Verifica se o código de rastreio já foi salvo (evita duplicar linha). */
function trackingCodeExists_(sheet, code) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) { return false; }
  var codes = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (var i = 0; i < codes.length; i++) {
    if (String(codes[i][0]).trim() === code) { return true; }
  }
  return false;
}

function appendTrackingRow_(sheet, body) {
  sheet.appendRow([
    safeStr_(body.code),
    new Date(),
    safeStr_(body.fbclid),
    safeStr_(body.fbc),
    safeStr_(body.fbp),
    safeStr_(body.utm_source),
    safeStr_(body.utm_medium),
    safeStr_(body.utm_campaign),
    safeStr_(body.utm_content),
    safeStr_(body.utm_term),
    safeStr_(body.utm_id),
    safeStr_(body.ad_id),
    safeStr_(body.adset_id),
    safeStr_(body.placement),
    safeStr_(body.page_url),
    safeStr_(body.user_agent)
  ]);
}

/**
 * Lê a aba "Rastreios Site" inteira e monta um mapa código -> dados, para
 * lookup O(1) por lead durante o envio em lote (evita reler a aba a cada
 * linha da planilha de Leads).
 */
function buildTrackingMap_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_TRACKING);
  var map = {};
  if (!sheet) { return map; }
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) { return map; }
  var lastCol = sheet.getLastColumn();
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var col = buildColumnMap_(headers);
  var data = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

  for (var i = 0; i < data.length; i++) {
    var code = safeStr_(data[i][col['Código Rastreio']]);
    if (!code) { continue; }
    map[code] = {
      fbclid:       safeStr_(data[i][col['fbclid']]),
      fbc:          safeStr_(data[i][col['fbc']]),
      fbp:          safeStr_(data[i][col['fbp']]),
      utm_source:   safeStr_(data[i][col['UTM Source']]),
      utm_medium:   safeStr_(data[i][col['UTM Medium']]),
      utm_campaign: safeStr_(data[i][col['UTM Campaign']]),
      utm_content:  safeStr_(data[i][col['UTM Content']]),
      utm_term:     safeStr_(data[i][col['UTM Term']]),
      utm_id:       safeStr_(data[i][col['UTM ID']]),
      ad_id:        safeStr_(data[i][col['Ad ID']]),
      adset_id:     safeStr_(data[i][col['Adset ID']]),
      placement:    safeStr_(data[i][col['Placement']]),
      page_url:     safeStr_(data[i][col['Page URL']]),
      user_agent:   safeStr_(data[i][col['User Agent']])
    };
  }
  return map;
}

/* ===========================================================================
 *  HELPER - evento negativo
 * ======================================================================== */

function isNegativeEvent_(eventName) {
  return eventName === 'ColdLead' || eventName === 'NoResponse';
}

/* ===========================================================================
 *  HELPER - deduz estado pelo DDD
 * ======================================================================== */

/**
 * Tenta extrair o DDD dos primeiros dígitos do telefone normalizado
 * e retorna a sigla do estado em lowercase.
 * phoneNorm já está no formato "5511999999999".
 * Remove o código do país (55) e pega os 2 primeiros dígitos restantes.
 */
function getEstadoFromPhone_(phoneNorm) {
  if (!phoneNorm || phoneNorm.length < 4) { return ''; }
  var semPais = phoneNorm;
  if (semPais.indexOf('55') === 0) {
    semPais = semPais.substring(2);
  }
  var ddd = semPais.substring(0, 2);
  return DDD_ESTADO_MAP[ddd] || '';
}

/* ===========================================================================
 *  FUNÇÃO PRINCIPAL
 * ======================================================================== */

function enviarEventosPendentes() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();

  ensureSchemaMigrations_();

  var cfg = readConfig_();
  var pixelId   = cfg['META_PIXEL_ID'];
  var token     = cfg['META_ACCESS_TOKEN'];
  var testCode  = cfg['TEST_EVENT_CODE'];
  var apiVer    = cfg['API_VERSION'] || 'v25.0';
  var countryCd = cfg['DEFAULT_COUNTRY_CODE'] || DEFAULT_COUNTRY_CODE;

  if (!pixelId || !token) {
    ui.alert('Configuração incompleta.\n\nPreencha META_PIXEL_ID e META_ACCESS_TOKEN na aba "Config".');
    return;
  }

  var leads = ss.getSheetByName(SHEET_LEADS);
  if (!leads) { ui.alert('Aba "Leads" não encontrada. Rode o Setup primeiro.'); return; }

  var data = leads.getDataRange().getValues();
  if (data.length < 2) { ui.alert('Nenhum lead na planilha.'); return; }

  var col = buildColumnMap_(data[0]);
  var required = ['Telefone', 'Status', 'Enviado Meta?', 'Data envio', 'Resposta Meta', 'Evento Meta'];
  for (var r = 0; r < required.length; r++) {
    if (col[required[r]] === undefined) {
      ui.alert('Coluna obrigatória ausente: "' + required[r] + '". Rode o Setup.');
      return;
    }
  }

  var trackingMap = buildTrackingMap_();

  var enviados = 0, erros = 0, ignorados = 0;

  for (var i = 1; i < data.length; i++) {
    var rowNum = i + 1;
    var row = data[i];

    var statusRaw = row[col['Status']];
    var statusKey = normalizeStatus_(statusRaw);
    var eventName = STATUS_EVENT_MAP[statusKey];

    var enviadoFlag = String(row[col['Enviado Meta?']] || '').trim().toLowerCase();
    var phoneRaw    = row[col['Telefone']];

    if (!eventName)                                  { ignorados++; continue; }
    if (enviadoFlag === 'sim')                       { ignorados++; continue; }
    if (!phoneRaw || String(phoneRaw).trim() === '') { ignorados++; continue; }

    var phoneNorm = normalizePhone_(phoneRaw, countryCd);
    if (!phoneNorm) { ignorados++; continue; }
    var phoneHash = sha256Hex_(phoneNorm);

    // Estado: prioriza coluna "Estado", fallback pro DDD do telefone
    var estadoRaw = col['Estado'] !== undefined
      ? String(row[col['Estado']] || '').trim().toLowerCase()
      : '';
    if (!estadoRaw) {
      estadoRaw = getEstadoFromPhone_(phoneNorm);
    }
    var estadoHash = estadoRaw ? sha256Hex_(estadoRaw) : null;

    // Código de rastreio (fbc/fbp/UTMs do clique no site), se o lead veio de lá
    var codigoRastreio = col['Código Rastreio'] !== undefined
      ? safeStr_(row[col['Código Rastreio']])
      : '';
    var tracking = codigoRastreio ? trackingMap[codigoRastreio] : null;

    var eventTime = Math.floor(Date.now() / 1000);
    var eventId   = 'CQC-' + rowNum + '-' + Date.now();

    var customData = {
      lead_status:   statusKey,
      campaign_name: safeStr_(row[col['Campanha']]),
      adset_name:    safeStr_(row[col['Conjunto']]),
      ad_name:       safeStr_(row[col['Anúncio']])
    };

    if (!isNegativeEvent_(eventName)) {
      var value = parseValue_(row[col['Valor']]);
      if (value !== null && value > 0) {
        customData.value    = value;
        customData.currency = DEFAULT_CURRENCY;
      } else if (eventName === 'Purchase') {
        customData.value    = 0;
        customData.currency = DEFAULT_CURRENCY;
      }
    }

    // Monta user_data com telefone + estado (quando disponível)
    var userData = {
      ph: [phoneHash]
    };
    if (estadoHash) {
      userData.st = [estadoHash];
    }

    // fbc/fbp NÃO são hasheados (Meta exige em texto puro) — só entram
    // quando o lead tem um Código Rastreio casado com um clique do site.
    var fbcUsed = false;
    var fbpUsed = false;
    if (tracking) {
      if (tracking.fbc) { userData.fbc = tracking.fbc; fbcUsed = true; }
      if (tracking.fbp) { userData.fbp = tracking.fbp; fbpUsed = true; }
      if (tracking.user_agent) { userData.client_user_agent = tracking.user_agent; }

      if (tracking.utm_source)   { customData.utm_source = tracking.utm_source; }
      if (tracking.utm_medium)   { customData.utm_medium = tracking.utm_medium; }
      if (tracking.utm_campaign) { customData.utm_campaign = tracking.utm_campaign; }
      if (tracking.utm_content)  { customData.utm_content = tracking.utm_content; }
      if (tracking.utm_term)     { customData.utm_term = tracking.utm_term; }
      if (tracking.utm_id)       { customData.utm_id = tracking.utm_id; }
      if (tracking.ad_id)        { customData.ad_id = tracking.ad_id; }
      if (tracking.adset_id)     { customData.adset_id = tracking.adset_id; }
      if (tracking.placement)    { customData.placement = tracking.placement; }
    }

    var eventObj = {
      event_name:    eventName,
      event_time:    eventTime,
      action_source: ACTION_SOURCE,
      event_id:      eventId,
      user_data:     userData,
      custom_data:   customData
    };
    if (tracking && tracking.page_url) {
      eventObj.event_source_url = tracking.page_url;
    }

    var payload = {
      data: [eventObj],
      access_token: token
    };
    if (testCode) { payload.test_event_code = testCode; }

    var result = sendToMeta_(apiVer, pixelId, payload);
    var agora = new Date();
    var resumo = buildRespostaMeta_(result, {
      testCode:     testCode,
      actionSource: ACTION_SOURCE,
      eventName:    eventName,
      phoneNorm:    phoneNorm,
      phoneHash:    phoneHash,
      estado:       estadoRaw,
      trackingCode: codigoRastreio,
      fbcUsed:      fbcUsed,
      fbpUsed:      fbpUsed
    });

    if (result.ok) {
      leads.getRange(rowNum, col['Evento Meta'] + 1).setValue(eventName);
      leads.getRange(rowNum, col['Enviado Meta?'] + 1).setValue('sim');
      leads.getRange(rowNum, col['Data envio'] + 1).setValue(agora);
      leads.getRange(rowNum, col['Resposta Meta'] + 1).setValue(resumo);
      logEnvio_(rowNum, safeStr_(row[col['Nome']]), phoneNorm, eventName, eventId, result.code, true, resumo);
      enviados++;
    } else {
      leads.getRange(rowNum, col['Evento Meta'] + 1).setValue(eventName);
      leads.getRange(rowNum, col['Resposta Meta'] + 1).setValue(resumo);
      logEnvio_(rowNum, safeStr_(row[col['Nome']]), phoneNorm, eventName, eventId, result.code, false, resumo);
      erros++;
    }
  }

  ui.alert(
    'Processamento concluído.\n\n' +
    'Enviados com sucesso: ' + enviados + '\n' +
    'Erros: ' + erros + '\n' +
    'Ignorados: ' + ignorados
  );
}

/* ===========================================================================
 *  ENVIO HTTP
 * ======================================================================== */

function sendToMeta_(apiVersion, idPixelOuDataset, payload) {
  var url = 'https://graph.facebook.com/' + apiVersion + '/' + idPixelOuDataset + '/events';
  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  try {
    var resp = UrlFetchApp.fetch(url, options);
    var code = resp.getResponseCode();
    var body = resp.getContentText();
    var json = null;
    try { json = JSON.parse(body); } catch (e) {}
    var ok = (code === 200) && (!json || !json.error);
    return { ok: ok, code: code, body: body, json: json, error: (json && json.error) || null };
  } catch (err) {
    return { ok: false, code: 0, body: String(err), json: null, error: { message: String(err) } };
  }
}

function buildRespostaMeta_(result, ctx) {
  ctx = ctx || {};
  var parts = [];
  if (result.ok) {
    var recebidos = (result.json && result.json.events_received != null)
      ? result.json.events_received : '?';
    parts.push('HTTP ' + result.code);
    parts.push('events_received: ' + recebidos);
  } else {
    var msg = (result.error && result.error.message) ? result.error.message : 'erro desconhecido';
    var sub = (result.error && result.error.error_subcode) ? ' (subcode ' + result.error.error_subcode + ')' : '';
    parts.push('HTTP ' + result.code);
    parts.push('ERRO: ' + msg + sub);
  }
  parts.push('event_name: ' + (ctx.eventName || '-'));
  parts.push('action_source: ' + (ctx.actionSource || '-'));
  parts.push('código rastreio: ' + (ctx.trackingCode ? ctx.trackingCode : '(nenhum)'));
  parts.push('fbc usado: ' + (ctx.fbcUsed ? 'sim' : 'não'));
  parts.push('fbp usado: ' + (ctx.fbpUsed ? 'sim' : 'não'));
  parts.push('test_event_code: ' + (ctx.testCode ? ctx.testCode : '(não usado)'));
  parts.push('tel: ' + (ctx.phoneNorm || '-'));
  if (ctx.estado) { parts.push('estado: ' + ctx.estado); }
  if (ctx.phoneHash) { parts.push('hash: ' + ctx.phoneHash.substring(0, 12) + '…'); }
  var trace = (result.json && result.json.fbtrace_id) ||
              (result.error && result.error.fbtrace_id) || null;
  if (trace) { parts.push('fbtrace_id: ' + trace); }
  return parts.join(' | ');
}

/* ===========================================================================
 *  LOG
 * ======================================================================== */

function logEnvio_(linha, nome, telefone, evento, eventId, httpCode, sucesso, resposta) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var log = ss.getSheetByName(SHEET_LOG);
  if (!log) { log = ss.insertSheet(SHEET_LOG); }
  log.appendRow([
    new Date(), linha, nome, telefone, evento, eventId,
    httpCode, (sucesso ? 'SIM' : 'NÃO'), resposta
  ]);
}

/* ===========================================================================
 *  HELPERS
 * ======================================================================== */

function readConfig_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_CONFIG);
  var cfg = {};
  if (!sheet) { return cfg; }
  var values = sheet.getDataRange().getValues();
  for (var i = 0; i < values.length; i++) {
    var key = String(values[i][0] || '').trim();
    if (!key || key.toLowerCase() === 'chave') { continue; }
    var val = values[i][1];
    cfg[key] = (val === null || val === undefined) ? '' : String(val).trim();
  }
  return cfg;
}

function buildColumnMap_(headerRow) {
  var map = {};
  for (var c = 0; c < headerRow.length; c++) {
    var name = String(headerRow[c] || '').trim();
    if (name) { map[name] = c; }
  }
  return map;
}

function normalizeStatus_(value) {
  if (value === null || value === undefined) { return ''; }
  var s = String(value).trim().toLowerCase();
  return stripAccents_(s);
}

function stripAccents_(s) {
  return s
    .replace(/[áàâãä]/g, 'a').replace(/[éèêë]/g, 'e').replace(/[íìîï]/g, 'i')
    .replace(/[óòôõö]/g, 'o').replace(/[úùûü]/g, 'u').replace(/[ç]/g, 'c');
}

function normalizePhone_(raw, countryCode) {
  if (raw === null || raw === undefined) { return ''; }
  var digits = String(raw).replace(/\D/g, '');
  if (!digits) { return ''; }
  var cc = String(countryCode || DEFAULT_COUNTRY_CODE);
  if (digits.indexOf(cc) !== 0) {
    if (digits.length === 10 || digits.length === 11) {
      digits = cc + digits;
    }
  }
  return digits;
}

function sha256Hex_(input) {
  var bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256, input, Utilities.Charset.UTF_8
  );
  var hex = '';
  for (var i = 0; i < bytes.length; i++) {
    var b = bytes[i];
    if (b < 0) { b += 256; }
    var h = b.toString(16);
    if (h.length === 1) { h = '0' + h; }
    hex += h;
  }
  return hex;
}

function parseValue_(v) {
  if (v === null || v === undefined || v === '') { return null; }
  if (typeof v === 'number') { return v; }
  var s = String(v).trim().replace(/[^\d,.-]/g, '');
  if (!s) { return null; }
  if (s.indexOf(',') > -1) {
    s = s.replace(/\./g, '').replace(',', '.');
  }
  var n = parseFloat(s);
  return isNaN(n) ? null : n;
}

function safeStr_(v) {
  return (v === null || v === undefined) ? '' : String(v).trim();
}
