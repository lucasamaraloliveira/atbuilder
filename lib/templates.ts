import { Template } from './types';

export const templates: Template[] = [
  {
    id: 'blank',
    name: 'Em Branco',
    description: 'Comece do zero e construa seu site bloco por bloco.',
    image: 'https://picsum.photos/seed/blank/600/400?blur=2',
    blocks: [
      {
        id: 'header-1',
        type: 'header',
        content: {
          logoText: 'MeuSite',
          logoImage: '',
          links: ['Início', 'Sobre', 'Contato'],
          mobileMenuBreakpoint: 'md',
        },
      },
    ],
  },
  {
    id: 'saas',
    name: 'SaaS Startup',
    description: 'Modelo moderno e focado em conversão para produtos digitais.',
    image: 'https://picsum.photos/seed/saas/600/400',
    blocks: [
      {
        id: 'header-1',
        type: 'header',
        content: {
          logoText: 'SaaSify',
          logoImage: '',
          links: ['Recursos', 'Preços', 'Blog', 'Entrar'],
          mobileMenuBreakpoint: 'md',
        },
      },
      {
        id: 'hero-1',
        type: 'hero',
        content: {
          title: 'Construa o futuro do seu negócio hoje',
          subtitle: 'Nossa plataforma oferece tudo que você precisa para escalar suas vendas e gerenciar clientes com facilidade.',
          buttonText: 'Começar Gratuitamente',
          buttonColor: '#009BDB',
          buttonTextColor: '#ffffff',
          backgroundImage: 'https://picsum.photos/seed/saashero/1920/1080',
        },
      },
      {
        id: 'features-1',
        type: 'features',
        content: {
          title: 'Tudo que você precisa em um só lugar',
          items: [
            { title: 'Rápido', description: 'Performance otimizada para a melhor experiência.', image: '' },
            { title: 'Seguro', description: 'Seus dados protegidos com criptografia de ponta.', image: '' },
            { title: 'Escalável', description: 'Cresce junto com o seu negócio sem gargalos.', image: '' },
          ],
        },
      },
      {
        id: 'pricing-1',
        type: 'pricing',
        content: {
          title: 'Planos Simples e Transparentes',
          plans: [
            { name: 'Starter', price: 'R$ 49/mês', features: ['Até 5 usuários', 'Suporte por email', '10GB de armazenamento'], buttonText: 'Assinar Starter', buttonColor: '#009BDB' },
            { name: 'Pro', price: 'R$ 149/mês', features: ['Usuários ilimitados', 'Suporte 24/7', 'Armazenamento ilimitado', 'API de acesso'], buttonText: 'Assinar Pro', buttonColor: '#111827' },
          ],
        },
      },
      {
        id: 'cta-1',
        type: 'cta',
        content: {
          title: 'Pronto para transformar sua empresa?',
          subtitle: 'Junte-se a milhares de empresas que já usam nossa solução.',
          buttonText: 'Criar Conta Agora',
          buttonColor: '#ffffff',
          buttonTextColor: '#009BDB',
          backgroundColor: '#009BDB',
          backgroundImage: '',
        },
      },
      {
        id: 'footer-1',
        type: 'footer',
        content: {
          text: '© 2026 SaaSify. Todos os direitos reservados.',
          backgroundColor: '#111827',
          textColor: '#9ca3af',
        },
      },
    ],
  },
  {
    id: 'portfolio',
    name: 'Portfólio Criativo',
    description: 'Destaque seu trabalho com um design minimalista e elegante.',
    image: 'https://picsum.photos/seed/portfolio/600/400',
    blocks: [
      {
        id: 'header-1',
        type: 'header',
        content: {
          logoText: 'João Silva',
          logoImage: '',
          links: ['Projetos', 'Sobre mim', 'Contato'],
          mobileMenuBreakpoint: 'md',
        },
      },
      {
        id: 'hero-1',
        type: 'hero',
        content: {
          title: 'Olá, sou um Designer Digital',
          subtitle: 'Crio experiências digitais memoráveis e interfaces intuitivas para marcas inovadoras.',
          buttonText: 'Ver meus projetos',
          buttonColor: '#111827',
          buttonTextColor: '#ffffff',
          backgroundImage: '',
        },
      },
      {
        id: 'gallery-1',
        type: 'gallery',
        content: {
          title: 'Trabalhos Recentes',
          images: [
            'https://picsum.photos/seed/port1/600/600',
            'https://picsum.photos/seed/port2/600/600',
            'https://picsum.photos/seed/port3/600/600',
            'https://picsum.photos/seed/port4/600/600',
          ],
        },
      },
      {
        id: 'text-1',
        type: 'text',
        content: {
          title: 'Sobre mim',
          text: 'Com mais de 5 anos de experiência, tenho ajudado empresas a transformar ideias complexas em produtos simples e bonitos. Acredito que o bom design é invisível e focado no usuário.',
          image: 'https://picsum.photos/seed/profile/600/600',
          imagePosition: 'right',
        },
      },
      {
        id: 'footer-1',
        type: 'footer',
        content: {
          text: '© 2026 João Silva. Feito com Next.js.',
          backgroundColor: '#f9fafb',
          textColor: '#6b7280',
        },
      },
    ],
  },
  {
    id: 'agency',
    name: 'Agência Digital',
    description: 'Um modelo completo para agências de marketing e desenvolvimento.',
    image: 'https://picsum.photos/seed/agency/600/400',
    blocks: [
      {
        id: 'header-1',
        type: 'header',
        content: {
          logoText: 'AgênciaX',
          logoImage: '',
          links: ['Serviços', 'Cases', 'Equipe', 'Contato'],
          mobileMenuBreakpoint: 'md',
        },
      },
      {
        id: 'hero-1',
        type: 'hero',
        content: {
          title: 'Impulsionamos o seu crescimento digital',
          subtitle: 'Estratégias de marketing e tecnologia focadas em resultados reais para o seu negócio.',
          buttonText: 'Fale com um especialista',
          buttonColor: '#ef4444',
          buttonTextColor: '#ffffff',
          backgroundImage: 'https://picsum.photos/seed/agencyhero/1920/1080',
        },
      },
      {
        id: 'features-1',
        type: 'features',
        content: {
          title: 'Nossos Serviços',
          items: [
            { title: 'Marketing Digital', description: 'Campanhas focadas em conversão e ROI.', image: '' },
            { title: 'Desenvolvimento Web', description: 'Sites rápidos, seguros e escaláveis.', image: '' },
            { title: 'Design UI/UX', description: 'Interfaces intuitivas e atraentes.', image: '' },
          ],
        },
      },
      {
        id: 'testimonials-1',
        type: 'testimonials',
        content: {
          title: 'O que nossos clientes dizem',
          items: [
            { quote: 'A AgênciaX transformou nossa presença online. Nossas vendas dobraram em 6 meses.', author: 'Carlos Mendes', role: 'Diretor Comercial', avatar: 'https://picsum.photos/seed/avatar3/100/100' },
            { quote: 'Equipe extremamente profissional e entregas sempre no prazo.', author: 'Ana Costa', role: 'CEO, TechStart', avatar: 'https://picsum.photos/seed/avatar4/100/100' },
          ],
        },
      },
      {
        id: 'faq-1',
        type: 'faq',
        content: {
          title: 'Dúvidas Frequentes',
          questions: [
            { question: 'Como funciona o processo de criação?', answer: 'Iniciamos com um briefing detalhado, seguido de planejamento, execução e aprovação em cada etapa.' },
            { question: 'Vocês atendem empresas de qual tamanho?', answer: 'Atendemos desde startups até grandes corporações, adaptando nossas soluções para cada realidade.' },
          ],
        },
      },
      {
        id: 'cta-1',
        type: 'cta',
        content: {
          title: 'Vamos iniciar um projeto juntos?',
          subtitle: 'Nossa equipe está pronta para entender seus desafios e propor as melhores soluções.',
          buttonText: 'Solicitar Orçamento',
          buttonColor: '#ffffff',
          buttonTextColor: '#ef4444',
          backgroundColor: '#ef4444',
          backgroundImage: '',
        },
      },
      {
        id: 'footer-1',
        type: 'footer',
        content: {
          text: '© 2026 AgênciaX. Transformando ideias em resultados.',
          backgroundColor: '#111827',
          textColor: '#9ca3af',
        },
      },
    ],
  }
];
