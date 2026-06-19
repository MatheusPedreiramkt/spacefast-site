// ─── Central configuration for the course landing page ───────────────────────
// Edit these values in one place; they propagate to every section.

export const CHECKOUT_URL =
  'https://pay.hotmart.com/O106296515J?sck=HOTMART_PRODUCT_PAGE&off=ei0k3xie&hotfeature=32&_gl=1*u6prr2*_gcl_aw*R0NMLjE3ODA2ODc0ODYuQ2owS0NRanc1NG5SQmhEQ0FSSXNBTWNZX1NBVTNwaF9tR0xPeXNLbzNSY01sLUxVUFFrOVBRdVlCUW9Sa2FTX1ZsVnAxeTB0NW85MHloZ2FBaWlORUFMd193Y0I.*_gcl_au*MTcyODgzNjAxNC4xNzgwNjg3NDc5*FPAU*MTcyODgzNjAxNC4xNzgwNjg3NDc5*_ga*MTM2MDc5NTc3NS4xNzgwNjg3NDc5*_ga_GQH2V1F11Q*czE3ODE4ODkxMDckbzkkZzEkdDE3ODE4ODkxNTMkajE0JGwxJGgxMzIwNzkxNDMw&bid=1781889168070'

export const COURSE_PRICE = 'R$ 97,00'

export const GUARANTEE_DAYS = 7

export const COURSE_NAME = 'Google Maps + WhatsApp: Sistema de Captação de Clientes'

export const INSTRUCTOR = {
  name: 'Matheus Pedreira',
  bio: 'Sou desenvolvedor web e trabalho com criação de sites, sistemas, marketing digital e soluções de automação. Desenvolvi esse processo para organizar minha própria prospecção e transformei tudo em um treinamento prático para que outras pessoas também possam instalar e utilizar o sistema.',
  instagram: '@matheus.websites',
  instagramUrl: 'https://instagram.com/matheus.websites',
  site: 'spacefast.com.br',
  siteUrl: 'https://spacefast.com.br',
  brand: 'SpaceFast Digital',
  photoPath: '/images/course/instructor.jpg',
}

export const MODULES = [
  {
    number: 1,
    title: 'Introdução e visão geral',
    description: 'Entenda o que é o sistema, para que serve e como ele se integra ao seu processo de prospecção.',
  },
  {
    number: 2,
    title: 'Configuração do Google Cloud',
    description: 'Crie sua conta no Google Cloud, configure o projeto e prepare o ambiente para uso da API.',
  },
  {
    number: 3,
    title: 'Criação do captador de empresas',
    description: 'Configure a Places API, gere a chave de acesso e monte o script de captura de dados.',
  },
  {
    number: 4,
    title: 'Organização dos leads',
    description: 'Conecte o captador ao Google Sheets e organize automaticamente nome, telefone, endereço e avaliação.',
  },
  {
    number: 5,
    title: 'Instalação do sistema de WhatsApp',
    description: 'Instale o Node.js e configure o ambiente do sistema de envio de mensagens.',
  },
  {
    number: 6,
    title: 'Conexão e primeiro envio',
    description: 'Conecte o WhatsApp ao sistema, faça a leitura da planilha e realize o primeiro envio.',
  },
  {
    number: 7,
    title: 'Arquivos automáticos',
    description: 'Configure os arquivos de controle que atualizam o status de cada contato após o envio.',
  },
  {
    number: 8,
    title: 'Personalização das mensagens',
    description: 'Edite os modelos de mensagem, insira variáveis dinâmicas e adapte o conteúdo ao seu negócio.',
  },
  {
    number: 9,
    title: 'Instalação no Windows e no Mac',
    description: 'Passo a passo para configurar o sistema em ambos os sistemas operacionais.',
  },
  {
    number: 10,
    title: 'Estratégias para encontrar clientes',
    description: 'Aprenda como escolher segmentos, regiões e abordagens que aumentam a taxa de resposta.',
  },
]

export const FAQ_ITEMS = [
  {
    question: 'Preciso saber programar?',
    answer:
      'Não. As aulas mostram cada etapa da instalação e configuração passo a passo. Você seguirá as instruções sem precisar escrever código do zero.',
  },
  {
    question: 'Funciona no Windows?',
    answer:
      'Sim. Existe um módulo dedicado com o passo a passo completo de instalação no Windows.',
  },
  {
    question: 'Funciona no Mac?',
    answer:
      'Sim. Existe um módulo dedicado com o passo a passo completo de instalação no Mac.',
  },
  {
    question: 'Preciso pagar o Google Cloud?',
    answer:
      'O Google Cloud oferece créditos gratuitos para novos projetos. O treinamento orienta sobre como configurar o projeto dentro do plano gratuito para pesquisas em volume moderado.',
  },
  {
    question: 'Preciso deixar o computador ligado?',
    answer:
      'O sistema roda localmente no computador. Para os envios automáticos acontecerem, o computador precisa estar ligado e com o script em execução.',
  },
  {
    question: 'Posso alterar o intervalo entre as mensagens?',
    answer:
      'Sim. O curso ensina como configurar o limite de mensagens por sessão e o intervalo entre cada envio.',
  },
  {
    question: 'Posso trocar o número conectado?',
    answer:
      'Sim. O curso mostra como desconectar o número atual e conectar um número diferente sempre que precisar.',
  },
  {
    question: 'O sistema garante vendas?',
    answer:
      'O sistema organiza e automatiza a prospecção. Os resultados dependem do segmento escolhido, da mensagem enviada e do acompanhamento que você faz dos contatos.',
  },
  {
    question: 'Como funciona o suporte?',
    answer:
      'O suporte é prestado diretamente pelo produtor e cobre dúvidas sobre instalação e configuração do sistema conforme ensinado no curso.',
  },
  {
    question: 'Recebo os códigos e arquivos?',
    answer:
      'Sim. Você recebe o código completo do captador, o código do sistema de WhatsApp, as planilhas prontas, os arquivos para Windows e Mac, o manual de instalação e os modelos de mensagem.',
  },
]

export const LEARNING_ITEMS = [
  'Configuração do Google Cloud',
  'Ativação da Places API',
  'Criação da chave de API',
  'Captura de empresas no Google Maps',
  'Organização dos leads em planilha',
  'Instalação no Windows',
  'Instalação no Mac',
  'Configuração do Node.js',
  'Conexão com o WhatsApp',
  'Personalização das mensagens',
  'Configuração de limite e intervalo',
  'Troca do número conectado',
]

export const MATERIALS = [
  { label: 'Código completo do captador', icon: 'code' },
  { label: 'Código completo do sistema WhatsApp', icon: 'code' },
  { label: 'Planilhas prontas para uso', icon: 'sheet' },
  { label: 'Arquivos para Windows', icon: 'windows' },
  { label: 'Arquivos para Mac', icon: 'apple' },
  { label: 'Manual completo de instalação', icon: 'book' },
  { label: 'Modelos de mensagens', icon: 'message' },
  { label: 'Suporte ao aluno', icon: 'support' },
]

export const AUDIENCE = [
  'Vende sites e landing pages',
  'Trabalha com tráfego pago',
  'Presta serviços de marketing',
  'Atua como social media',
  'É freelancer',
  'Deseja prospectar empresas locais',
  'Quer instalar o sistema para outras empresas',
]
