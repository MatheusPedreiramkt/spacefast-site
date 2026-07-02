import {
  Globe,
  Rocket,
  BarChart2,
  Megaphone,
  Wrench,
  Package,
  AlertTriangle,
  TrendingDown,
  Share2,
  ShieldOff,
  Zap,
  Target,
  MessageCircle,
  Search,
  Headphones,
  Layout,
  HeartHandshake,
  MonitorSmartphone,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface ServiceItem {
  icon: LucideIcon
  title: string
  description: string
  color: string
}

export interface PortfolioProject {
  name: string
  description: string
  category: string
  tags: string[]
  gradient: string
  accentColor: string
  image: string  // caminho relativo em /public — ex: "/projects/nm-corretora.webp"
  url: string    // ⚠️ Substitua pela URL real de cada projeto
}

export interface Plan {
  name: string
  subtitle: string
  benefit: string
  features: string[]
  highlighted: boolean
  badge?: string
}

export interface Testimonial {
  name: string
  role: string
  company: string
  text: string
  initials: string
  color: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface ProblemItem {
  icon: LucideIcon
  title: string
  description: string
}

export interface SolutionItem {
  icon: LucideIcon
  title: string
  description: string
}

export interface WhyItem {
  icon: LucideIcon
  title: string
  description: string
}

// ─── Serviços ────────────────────────────────────────────────────────────────

export const services: ServiceItem[] = [
  {
    icon: Globe,
    title: "Sites Institucionais",
    description:
      "Sites profissionais que transmitem credibilidade e convertem visitantes em clientes.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    description:
      "Páginas de alta conversão para campanhas, lançamentos e captação de leads.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: BarChart2,
    title: "Google Ads",
    description:
      "Campanhas de pesquisa e display para aparecer na frente de quem está procurando.",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: Megaphone,
    title: "Facebook & Instagram Ads",
    description:
      "Anúncios segmentados para alcançar o público certo e gerar resultados reais.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Wrench,
    title: "Manutenção e Suporte",
    description:
      "Seu site sempre atualizado, seguro e funcionando com suporte dedicado.",
    color: "from-cyan-500 to-teal-500",
  },
  {
    icon: Package,
    title: "Pacote Mensal de Marketing",
    description:
      "Site + domínio + hospedagem + anúncios + suporte em um único plano mensal.",
    color: "from-emerald-500 to-green-500",
  },
]

// ─── Problemas ───────────────────────────────────────────────────────────────

export const problems: ProblemItem[] = [
  {
    icon: ShieldOff,
    title: "Primeira impressão é online — e dura segundos",
    description:
      "Em menos de 7 segundos o visitante decide se confia ou não. Site amador ou desatualizado transmite descuido — e o cliente vai embora em silêncio.",
  },
  {
    icon: TrendingDown,
    title: "Invisível no Google significa zero clientes novos",
    description:
      "Quem não aparece nas buscas simplesmente não existe para grande parte do mercado. E quem aparece primeiro leva a maior fatia dos contatos.",
  },
  {
    icon: Share2,
    title: "Instagram não é substituto de site próprio",
    description:
      "Redes sociais complementam, mas não garantem. Alcance orgânico cai, algoritmos mudam — sem site você depende de plataformas que não controla.",
  },
  {
    icon: AlertTriangle,
    title: "Visitante sem jornada definida não vira cliente",
    description:
      "Site bonito sem estratégia de conversão é só custo. Sem CTA claro e fluxo de contato bem estruturado, o visitante sai sem agir.",
  },
]

// ─── Soluções ────────────────────────────────────────────────────────────────

export const solutions: SolutionItem[] = [
  {
    icon: Layout,
    title: "Seu cliente confia antes de falar com você",
    description:
      "Um visual profissional cria credibilidade imediata — fazendo seu negócio parecer referência no segmento, não mais um entre tantos.",
  },
  {
    icon: Zap,
    title: "Nenhum cliente perdido por lentidão",
    description:
      "Site rápido mantém o visitante na página e melhora seu posicionamento no Google — mais visibilidade e mais contatos chegando.",
  },
  {
    icon: MessageCircle,
    title: "Mais conversas, mais oportunidades de venda",
    description:
      "CTAs e botão de WhatsApp posicionados para transformar cada visita em uma conversa comercial — do interesse ao contato.",
  },
  {
    icon: Search,
    title: "Encontrado por quem já quer contratar",
    description:
      "Estrutura pensada para o Google ranquear seu site — aparecendo na hora certa para quem está ativamente buscando o que você oferece.",
  },
  {
    icon: Target,
    title: "Cada visita com mais chance de virar contato",
    description:
      "Jornada de navegação desenhada para guiar o visitante até o contato — sem distrações, com o próximo passo sempre claro.",
  },
  {
    icon: Headphones,
    title: "Você foca no negócio, nós cuidamos do site",
    description:
      "Suporte direto após a entrega — ajustes, atualizações e dúvidas resolvidas sem burocracia para você não perder tempo com tecnologia.",
  },
]

// ─── Portfólio ───────────────────────────────────────────────────────────────

export const portfolioProjects: PortfolioProject[] = [
  {
    name: "NM Corretora",
    description:
      "Site institucional para corretora de planos de saúde e odontológicos com foco em geração de contatos.",
    category: "Site Institucional",
    tags: ["Responsivo", "SEO Otimizado", "WhatsApp", "Foco em Conversão"],
    gradient: "from-blue-600 to-cyan-500",
    accentColor: "blue",
    image: "/projects/nm-corretora.webp",
    url: "https://www.nmseguros.com.br",
  },
  {
    name: "Green Irrigation",
    description:
      "Site moderno para empresa de irrigação, transmitindo autoridade e gerando orçamentos.",
    category: "Site Institucional",
    tags: ["Responsivo", "Google Ads", "WhatsApp", "Design Premium"],
    gradient: "from-emerald-600 to-teal-500",
    accentColor: "emerald",
    image: "/projects/green-irrigation.webp",
    url: "https://www.greenirrigation.com.br",
  },
  {
    name: "Clínica Dr. Toufik Rahd",
    description:
      "Site institucional para clínica especializada em tratamento de dependência química.",
    category: "Site Institucional",
    tags: ["Responsivo", "SEO Otimizado", "WhatsApp", "Credibilidade"],
    gradient: "from-purple-600 to-violet-500",
    accentColor: "purple",
    image: "/projects/toufik-rahd.webp",
    url: "https://www.clinicadrtoufikrahd.com.br",
  },
  {
    name: "Bahia Guincho",
    description:
      "Site local otimizado para atendimento rápido via WhatsApp e SEO regional.",
    category: "Landing Page",
    tags: ["Mobile-first", "WhatsApp", "SEO Local", "Conversão"],
    gradient: "from-orange-600 to-amber-500",
    accentColor: "orange",
    image: "/projects/bahia-guincho.webp",
    url: "https://www.bahiaguincho.com",
  },
  {
    name: "Helite Estofados",
    description:
      "Site catálogo para fábrica de estofados sob medida, com visual premium e foco em orçamentos.",
    category: "Site Catálogo",
    tags: ["Responsivo", "Design Premium", "WhatsApp", "Catálogo de Produtos"],
    gradient: "from-amber-500 to-yellow-600",
    accentColor: "amber",
    image: "/projects/helite-estofados.jpg",
    url: "https://www.heliteestofados.com.br",
  },
  {
    name: "Triplice Supply",
    description:
      "Site institucional para empresa de suprimentos industriais e offshore, com foco em geração de cotações.",
    category: "Site Institucional",
    tags: ["Responsivo", "Design Corporativo", "WhatsApp", "Geração de Cotações"],
    gradient: "from-sky-600 to-blue-500",
    accentColor: "sky",
    image: "/projects/Triplice-supply.webp",
    url: "https://www.tripliceoffshore.com",
  },
  {
    name: "Tropical Letreiro",
    description:
      "Site catálogo para gráfica de comunicação visual, com loja de produtos personalizados e orçamento via WhatsApp.",
    category: "Site Catálogo",
    tags: ["Responsivo", "Catálogo de Produtos", "WhatsApp", "Design Vibrante"],
    gradient: "from-pink-600 to-fuchsia-500",
    accentColor: "pink",
    image: "/projects/tropical-letreiro.webp",
    url: "https://www.tropicalletreiro.com",
  },
]

// ─── Planos avulsos ───────────────────────────────────────────────────────────

export const plans: Plan[] = [
  {
    name: "Essencial",
    subtitle: "Para empresas que precisam criar uma presença digital profissional rapidamente.",
    benefit: "Entre na internet com profissionalismo",
    features: [
      "Site one page completo",
      "Design responsivo e moderno",
      "WhatsApp integrado",
      "Entrega rápida (7 dias)",
      "Formulário de contato",
      "Otimização básica de velocidade",
    ],
    highlighted: false,
  },
  {
    name: "Profissional",
    subtitle: "Para empresas que desejam gerar mais contatos e fortalecer sua presença online.",
    benefit: "Gere mais contatos e oportunidades",
    features: [
      "Site com várias seções/páginas",
      "SEO básico configurado",
      "Google Analytics integrado",
      "Botões de conversão estratégicos",
      "Blog ou seção de notícias",
      "Design premium e exclusivo",
      "Suporte pós-entrega",
    ],
    highlighted: true,
    badge: "Mais escolhido",
  },
  {
    name: "Premium",
    subtitle: "Para empresas que querem transformar o site em uma ferramenta de aquisição de clientes.",
    benefit: "Transforme seu site em uma ferramenta de vendas",
    features: [
      "Site completo e personalizado",
      "Blog + páginas extras",
      "Integrações avançadas",
      "Estratégia de conversão",
      "SEO técnico otimizado",
      "Suporte avançado prioritário",
      "Relatório de performance",
    ],
    highlighted: false,
  },
]

// ─── Pacote mensal ────────────────────────────────────────────────────────────

export const monthlyPlanFeatures = [
  "Site profissional completo",
  "Domínio + Hospedagem inclusos",
  "E-mail profissional",
  "Criativos para anúncios mensais",
  "Configuração de campanhas",
  "Google Ads gerenciado",
  "Facebook e Instagram Ads",
  "Suporte direto via WhatsApp",
  "Relatório mensal simples",
  "Atualizações no site",
]

// ─── Processo ─────────────────────────────────────────────────────────────────

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Conversa inicial",
    description:
      "Entendemos seu negócio, seus objetivos e o que você precisa para crescer na internet.",
  },
  {
    number: "02",
    title: "Planejamento",
    description:
      "Definimos a estrutura, as seções e a estratégia do site com foco em conversão.",
  },
  {
    number: "03",
    title: "Criação do design",
    description:
      "Desenvolvemos o layout visual, escolhemos cores e tipografia alinhados à sua marca.",
  },
  {
    number: "04",
    title: "Desenvolvimento",
    description:
      "Codificamos o site com tecnologia moderna, rápido e responsivo em todos os dispositivos.",
  },
  {
    number: "05",
    title: "Ajustes finais",
    description:
      "Revisamos juntos, fazemos os ajustes necessários e garantimos que tudo está perfeito.",
  },
  {
    number: "06",
    title: "Publicação",
    description:
      "Colocamos o site no ar com domínio, hospedagem e tudo configurado para funcionar.",
  },
]

// ─── Depoimentos ─────────────────────────────────────────────────────────────
// ⚠️ Substitua pelos depoimentos reais dos seus clientes

export const testimonials: Testimonial[] = [
  {
    name: "Carlos Mendes",
    role: "Proprietário",
    company: "NM Corretora",
    text: "O site ficou muito mais profissional e facilitou o contato dos clientes pelo WhatsApp. Em menos de um mês já percebi aumento nas mensagens.",
    initials: "CM",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Ana Paula",
    role: "Gerente Comercial",
    company: "Green Irrigation",
    text: "A apresentação da empresa mudou completamente depois do novo site. Clientes passaram a nos ver com outros olhos e a credibilidade aumentou muito.",
    initials: "AP",
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "Dr. Toufik Rahd",
    role: "Diretor",
    company: "Clínica Dr. Toufik Rahd",
    text: "O processo foi rápido, organizado e com ótimo suporte. Entregaram exatamente o que precisávamos para transmitir confiança aos nossos pacientes.",
    initials: "TR",
    color: "from-purple-500 to-violet-500",
  },
  {
    name: "Roberto Bahia",
    role: "Proprietário",
    company: "Bahia Guincho",
    text: "Antes as pessoas me encontravam só no Instagram. Agora com o site apareço no Google e recebo chamados pelo WhatsApp direto. Valeu muito o investimento.",
    initials: "RB",
    color: "from-orange-500 to-amber-500",
  },
]

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export const faqItems: FAQItem[] = [
  {
    question: "Quanto tempo leva para criar um site?",
    answer:
      "Depende do projeto. Sites one page ficam prontos em 5 a 7 dias. Sites com várias páginas levam de 10 a 20 dias. Landing pages entregamos em até 5 dias. Tudo combinado na conversa inicial.",
  },
  {
    question: "O site funciona no celular?",
    answer:
      "Sim! Todos os sites que criamos são 100% responsivos e testados em smartphones, tablets e desktops. Hoje mais de 70% dos acessos vêm do celular, então isso é prioridade.",
  },
  {
    question: "Vocês integram com WhatsApp?",
    answer:
      "Sim, sempre. Integramos um botão flutuante de WhatsApp em todos os nossos projetos, além de CTAs estratégicos ao longo do site para maximizar as conversões.",
  },
  {
    question: "Vocês fazem domínio e hospedagem?",
    answer:
      "Sim! Cuidamos do domínio, da hospedagem e da configuração de e-mail profissional. No plano mensal isso já está incluído. Para projetos avulsos, podemos incluir ou orientar você.",
  },
  {
    question: "Também fazem anúncios pagos?",
    answer:
      "Sim! Trabalhamos com Google Ads, Facebook Ads e Instagram Ads. Criamos as campanhas, definimos a segmentação, acompanhamos os resultados e otimizamos para gerar mais retorno.",
  },
  {
    question: "Posso pagar mensalmente?",
    answer:
      "Sim! Temos o pacote mensal completo de marketing por R$897/mês que inclui site, domínio, hospedagem, anúncios, suporte e relatórios. É a melhor opção para quem quer resultado contínuo.",
  },
]

// ─── Por que escolher a SpaceFast ────────────────────────────────────────────

export const whyItems: WhyItem[] = [
  {
    icon: Headphones,
    title: "Atendimento direto",
    description: "Você fala diretamente com quem cria o seu site, sem intermediários.",
  },
  {
    icon: MonitorSmartphone,
    title: "Design moderno",
    description: "Sites com visual atual que transmite profissionalismo e credibilidade.",
  },
  {
    icon: Target,
    title: "Foco em conversão",
    description: "Cada detalhe pensado para transformar visitantes em clientes.",
  },
  {
    icon: Zap,
    title: "Sites ultrarrápidos",
    description: "Performance otimizada para melhor experiência e ranqueamento no Google.",
  },
  {
    icon: BarChart2,
    title: "Estratégia de marketing",
    description: "Não é só site — é presença digital completa com resultado.",
  },
  {
    icon: HeartHandshake,
    title: "Suporte após entrega",
    description: "Continuamos do seu lado mesmo depois do site publicado.",
  },
]
