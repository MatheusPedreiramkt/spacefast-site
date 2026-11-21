// Fonte única das perguntas frequentes desta página: usada pelo accordion
// visível (LandingPagesPage.tsx) e pelo JSON-LD FAQPage (page.tsx).

export const FAQ_ITEMS = [
  {
    question: "O que é uma landing page?",
    answer:
      "É uma página criada para uma ação específica, como solicitar orçamento, preencher um formulário, chamar no WhatsApp ou comprar. Ela reduz distrações e organiza a mensagem para conversão.",
  },
  {
    question: "Qual a diferença entre landing page e site?",
    answer:
      "O site apresenta a empresa de forma ampla, com várias páginas e caminhos. A landing page é focada em uma oferta, campanha ou objetivo específico.",
  },
  {
    question: "Posso usar a landing page no Google Ads?",
    answer:
      "Sim. A landing page pode ser estruturada para receber campanhas de Google Ads, mantendo coerência entre busca, anúncio, oferta e conversão.",
  },
  {
    question: "A landing page funciona no celular?",
    answer:
      "Sim. A experiência mobile é parte central do projeto, porque grande parte dos cliques de campanhas vem do celular.",
  },
  {
    question: "É possível integrar com WhatsApp?",
    answer:
      "Sim. Podemos incluir botões, chamadas e mensagens direcionadas para WhatsApp conforme a estratégia da página.",
  },
  {
    question: "Vocês configuram o rastreamento das conversões?",
    answer:
      "Quando fizer parte do escopo, podem ser configurados GTM, GA4, Meta Pixel e eventos importantes, como cliques no WhatsApp e ações em formulários.",
  },
] as const
