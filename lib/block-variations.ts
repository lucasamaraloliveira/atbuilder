import { BlockType } from './types';

export interface BlockVariation {
    id: string;
    name: string;
    description: string;
    content: any;
}

export const blockVariations: Record<BlockType, BlockVariation[]> = {
    header: [
        {
            id: 'header-corporate',
            name: 'Corporativo Padrão',
            description: 'Logo à esquerda, menu à direita, visual limpo profissional.',
            content: {
                variant: 'corporate',
                logoText: 'ALRION TECH',
                links: ['Serviços', 'Sobre', 'Preços', 'Contato'],
                linkTargets: {},
                isSticky: true,
                fontFamily: 'font-sans',
            }
        },
        {
            id: 'header-glass',
            name: 'Moderno Floating Glass',
            description: 'Efeito de vidro flutuante com bordas arredondadas e desfoque.',
            content: {
                variant: 'glass',
                logoText: 'Alrion.',
                links: ['Home', 'Portfolio', 'Contato'],
                isFloating: true,
                isSticky: true,
                showDarkModeToggle: true,
                fontFamily: 'font-tech',
            }
        },
        {
            id: 'header-centered',
            name: 'Minimalista Centralizado',
            description: 'Logo centralizado sobre o menu, foco total na marca.',
            content: {
                variant: 'centered',
                logoText: 'A.',
                links: ['Design', 'Tecnologia', 'Blog'],
                fontFamily: 'font-serif',
                isSticky: false,
            }
        },
        {
            id: 'header-dark-premium',
            name: 'Premium Dark Minimal',
            description: 'Fundo escuro profundo com logos em contraste.',
            content: {
                variant: 'dark',
                logoText: 'BLACK AI',
                links: ['Docs', 'Pricing', 'Login'],
                backgroundColor: '#030712',
                textColor: '#ffffff',
                isSticky: true,
                fontFamily: 'font-mono',
                mobileMenuVariant: 'side-slide'
            }
        },
        {
            id: 'header-tech-v2',
            name: 'High-Tech Center',
            description: 'Menu centralizado com indicadores de status neon.',
            content: {
                variant: 'centered',
                logoText: 'NODE_SYS',
                links: ['Terminal', 'Network', 'Auth'],
                fontFamily: 'font-tech',
                isSticky: true,
                mobileMenuVariant: 'full-overlay'
            }
        }
    ],
    hero: [
        {
            id: 'hero-impact-dark',
            name: 'Hero Impacto Dark',
            description: 'Tipografia gigante, fundo escuro e centralizado para máximo impacto.',
            content: {
                variant: 'impact',
                title: 'CONSTRUA O FUTURO',
                subtitle: 'A plataforma de design que escala com sua ambição.',
                buttonText: 'Começar Agora',
                buttonColor: '#3b82f6',
                fontFamily: 'font-impact',
                backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000',
            }
        },
        {
            id: 'hero-split-modern',
            name: 'Layout Dividido Contemporâneo',
            description: 'Texto à esquerda e imagem à direita com fundo suave.',
            content: {
                variant: 'split',
                title: 'Design que converte',
                subtitle: 'Não apenas bonito, mas inteligente. Focado em resultados e experiência do usuário.',
                buttonText: 'Ver Projetos',
                buttonColor: '#10b981',
                showSecondaryButton: true,
                secondaryButtonText: 'Agendar Demo',
                fontFamily: 'font-sans',
                backgroundImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
            }
        },
        {
            id: 'hero-elegant-minimal',
            name: 'Minimalismo Elegante (Serif)',
            description: 'Foco total na tipografia com fontes serifadas e respiro visual.',
            content: {
                variant: 'elegant',
                title: 'A Arte da Simplicidade',
                subtitle: 'Criando experiências digitais atemporais para marcas que valorizam o detalhe.',
                buttonText: 'Conheça o Manifesto',
                buttonColor: '#111827',
                buttonTextColor: '#ffffff',
                fontFamily: 'font-serif',
                backgroundColor: '#ffffff',
            }
        },
        {
            id: 'hero-tech-mono',
            name: 'Futurista / High-Tech',
            description: 'Fontes monoespaçadas e visual de dashboard moderno.',
            content: {
                variant: 'tech',
                title: 'SYSTEM_LOAD: COMPLETED',
                subtitle: 'Automação industrial e inteligência artificial aplicadas ao seu workflow.',
                buttonText: 'DEPLOY NOW',
                buttonColor: '#06b6d4',
                fontFamily: 'font-tech',
                backgroundImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000',
            }
        }
        ,
        {
            id: 'hero-gradient-center',
            name: 'Vibrante Gradient Center',
            description: 'Fundo com degradê animado e conteúdo centralizado para lançamentos.',
            content: {
                variant: 'impact',
                title: 'A Nova Era Digital',
                subtitle: 'Sua presença online nunca foi tão poderosa e elegante.',
                buttonText: 'Explorar Agora',
                buttonColor: '#8b5cf6',
                fontFamily: 'font-impact',
                backgroundColor: '#000000',
            }
        },
        {
            id: 'hero-minimalist-white',
            name: 'Editorial Branco Minimalista',
            description: 'Muito respiro, tons de cinza e tipografia refinada.',
            content: {
                variant: 'elegant',
                title: 'Simples por Design',
                subtitle: 'Focamos no essencial para que sua mensagem brilhe com clareza.',
                buttonText: 'Saiba Mais',
                buttonColor: '#1f2937',
                fontFamily: 'font-serif',
                backgroundColor: '#f8fafc',
            }
        }
    ],
    features: [
        {
            id: 'features-grid-cards',
            name: 'Cards com Sombra (Padrão)',
            description: '3 colunas de cards brancos com ícones e sombras suaves.',
            content: {
                variant: 'grid',
                title: 'Nossos Serviços',
                fontFamily: 'font-sans',
                items: [
                    { title: 'Desenvolvimento', description: 'Websites e apps de alta performance.', image: 'https://cdn-icons-png.flaticon.com/512/1162/1162947.png' },
                    { title: 'Design UX/UI', description: 'Interfaces intuitivas e modernas.', image: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png' },
                    { title: 'Cloud', description: 'Infraestrutura escalável e segura.', image: 'https://cdn-icons-png.flaticon.com/512/1162/1162948.png' },
                ]
            }
        },
        {
            id: 'features-dark-tech',
            name: 'Tech Dark Grid',
            description: 'Grade escura com ícones neon e fontes monoespaçadas.',
            content: {
                variant: 'dark',
                title: 'ST_FEATURES.LOG',
                fontFamily: 'font-tech',
                items: [
                    { title: 'AI_INTEL', description: 'Neural networks analysis.', image: '' },
                    { title: 'CRYPTO_SEC', description: 'End-to-end encryption.', image: '' },
                    { title: 'FAST_DATA', description: 'Real-time processing.', image: '' },
                ]
            }
        },
        {
            id: 'features-minimal-elegant',
            name: 'Mínimo e Elegante (Serif)',
            description: 'Apenas texto e linhas finas para um visual sofisticado.',
            content: {
                variant: 'minimal',
                title: 'Princípios Éticos',
                fontFamily: 'font-serif',
                items: [
                    { title: 'Transparência', description: 'Processos claros e abertos.', image: '' },
                    { title: 'Qualidade', description: 'Foco na excelência técnica.', image: '' },
                    { title: 'Compromisso', description: 'Prazos e metas cumpridos.', image: '' },
                ]
            }
        },
        {
            id: 'features-horizontal-bold',
            name: 'Lista de Destaques (Bold)',
            description: 'Itens horizontais com tipografia pesada e ícones laterais.',
            content: {
                variant: 'horizontal',
                title: 'Por que escolher a Alrion?',
                fontFamily: 'font-impact',
                items: [
                    { title: 'Velocidade Suprema', description: 'Seu site carrega em milissegundos.', image: '' },
                    { title: 'SEO Nativo', description: 'No topo do Google desde o dia 1.', image: '' },
                ]
            }
        },
        {
            id: 'features-neo-glow',
            name: 'Cards Neo-Glow Dark',
            description: 'Cards escuros com bordas que brilham ao passar o mouse.',
            content: {
                variant: 'dark',
                title: 'Tecnologia de Ponta',
                fontFamily: 'font-tech',
                items: [
                    { title: 'Alta Performance', description: 'Otimizado para velocidade máxima.', image: '' },
                    { title: 'Segurança Total', description: 'Proteção de dados em nível bancário.', image: '' },
                    { title: 'API Robusta', description: 'Integração fácil com qualquer sistema.', image: '' },
                ]
            }
        }
    ],
    text: [
        {
            id: 'text-modern-split',
            name: 'Split Moderno (Imagem Esq.)',
            description: 'Texto e imagem divididos equilibradamente, visual clean.',
            content: {
                variant: 'split',
                title: 'Nossa Missão',
                text: 'Transformar ideias em produtos digitais de impacto global através de design consciente e tecnologia de ponta.',
                image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
                imagePosition: 'left',
                fontFamily: 'font-sans',
            }
        },
        {
            id: 'text-elegant-serif',
            name: 'Editorial Elegante (Serif)',
            description: 'Tipografia serifada e layout centralizado para leitura agradável.',
            content: {
                variant: 'elegant',
                title: 'A busca pela perfeição',
                text: 'Em cada pixel, uma história. Em cada linha de código, um compromisso com a excelência e a simplicidade que define nosso trabalho.',
                fontFamily: 'font-serif',
            }
        },
        {
            id: 'text-tech-code',
            name: 'Technical / Documentation',
            description: 'Fontes monoespaçadas e visual técnico para documentação.',
            content: {
                variant: 'tech',
                title: 'API_INFRASTRUCTURE',
                text: 'Cloud-native architecture with microservices orchestration for high availability.',
                fontFamily: 'font-mono',
            }
        }
    ],
    cta: [
        {
            id: 'cta-impact-blue',
            name: 'Borda Azul Arredondada',
            description: 'Fundo vibrante com botões de alto contraste.',
            content: {
                variant: 'impact',
                title: 'Pronto para começar?',
                subtitle: 'Crie sua conta gratuita em segundos.',
                buttonText: 'Cadastrar Agora',
                buttonColor: '#ffffff',
                buttonTextColor: '#3b82f6',
                backgroundColor: '#3b82f6',
                fontFamily: 'font-impact',
            }
        },
        {
            id: 'cta-glass-modern',
            name: 'CTA Glass Floating',
            description: 'Efeito de vidro sobre imagem de fundo.',
            content: {
                variant: 'glass',
                title: 'Junte-se à Comunidade',
                subtitle: 'Mais de 10.000 designers já estão usando o Alrion.',
                buttonText: 'Entrar no Discord',
                buttonColor: '#5865F2',
                fontFamily: 'font-tech',
                backgroundImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000',
            }
        },
        {
            id: 'cta-split-image',
            name: 'CTA Imagem Dividida',
            description: 'Texto de um lado e uma imagem marcante do outro.',
            content: {
                variant: 'impact',
                title: 'Alcance novos patamares',
                subtitle: 'Ferramentas profissionais para equipes ambiciosas.',
                buttonText: 'Começar Grátis',
                buttonColor: '#111827',
                backgroundImage: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=1200',
                fontFamily: 'font-sans',
            }
        }
    ],
    footer: [
        {
            id: 'footer-minimal-clean',
            name: 'Rodapé Minimal Clean',
            description: 'Simples, direto e elegante.',
            content: {
                variant: 'minimal',
                text: '© 2026 Alrion Tech. Made with love.',
                backgroundColor: '#ffffff',
                textColor: '#64748b',
                fontFamily: 'font-sans',
            }
        },
        {
            id: 'footer-dark-centered',
            name: 'Dark Centered Footer',
            description: 'Fundo escuro com logo centralizada.',
            content: {
                variant: 'centered',
                text: 'The future of web building is here.',
                backgroundColor: '#030712',
                textColor: '#94a3b8',
                fontFamily: 'font-tech',
            }
        },
        {
            id: 'footer-mega-columns',
            name: 'Rodapé Mega Colunas',
            description: 'Layout completo com múltiplas colunas de links e informações.',
            content: {
                variant: 'mega',
                text: '© 2026 Alrion. Todos os direitos reservados. Localizado no centro tecnológico global.',
                backgroundColor: '#f8fafc',
                textColor: '#1e293b',
                fontFamily: 'font-sans',
            }
        }
    ],
    gallery: [
        {
            id: 'gal-showcase',
            name: 'Showcase de Portfólio',
            description: 'Grade de imagens com hover effects modernos.',
            content: {
                variant: 'showcase',
                title: 'Obras Recentes',
                fontFamily: 'font-impact',
                images: Array(6).fill(0).map((_, i) => `https://picsum.photos/seed/show${i}/800/600`),
                clickableImages: true,
                modalType: 'fullscreen'
            }
        },
        {
            id: 'gal-masonry-dark',
            name: 'Masonry Neon Dark',
            description: 'Layout irregular com bordas vibrantes e fundo escuro.',
            content: {
                variant: 'masonry-dark',
                title: 'GALLERY_VAULT',
                fontFamily: 'font-tech',
                backgroundColor: '#030712',
                images: Array(8).fill(0).map((_, i) => `https://picsum.photos/seed/neo${i}/800/1000`),
                clickableImages: true,
                modalType: 'split',
                modalTitle: 'PROJETO_SCAN',
                modalText: 'Análise detalhada da captura visual integrada ao sistema.'
            }
        },
        {
            id: 'gal-minimal-editorial',
            name: 'Editorial Minimalista',
            description: 'Espaçamento generoso e tipografia elegante.',
            content: {
                variant: 'minimal-editorial',
                title: 'Curadoria Visual',
                fontFamily: 'font-serif',
                images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/edit${i}/1200/800`),
                clickableImages: true,
                modalType: 'fullscreen'
            }
        },
        {
            id: 'gal-split-featured',
            name: 'Destaque Dividido',
            description: 'Uma imagem grande em destaque e outras menores.',
            content: {
                variant: 'split-featured',
                title: 'Destaques do Mês',
                fontFamily: 'font-sans',
                images: Array(5).fill(0).map((_, i) => `https://picsum.photos/seed/split${i}/1000/1000`),
                clickableImages: true,
                modalType: 'split'
            }
        }
    ],
    testimonials: [
        {
            id: 'test-cards-grid',
            name: 'Cards com Avatar',
            description: 'Grade de depoimentos com foto do autor.',
            content: {
                variant: 'grid',
                title: 'O que dizem',
                fontFamily: 'font-sans',
                items: [
                    { quote: 'Incrivelmente fácil de usar!', author: 'Ana Clara', role: 'Designer', avatar: 'https://i.pravatar.cc/150?u=ana' },
                    { quote: 'Mudou nosso workflow.', author: 'Bruno Lima', role: 'Dev', avatar: 'https://i.pravatar.cc/150?u=bruno' },
                ]
            }
        },
        {
            id: 'test-single-impact',
            name: 'Depoimento de Impacto',
            description: 'Uma única frase gigante centralizada para depoimentos marcantes.',
            content: {
                variant: 'minimal',
                title: 'O que dizem os líderes',
                fontFamily: 'font-serif',
                items: [
                    { quote: 'O Alrion mudou completamente a forma como entregamos projetos de design para nossos clientes internacionais.', author: 'Marco Aurélio', role: 'CEO, DesignCo', avatar: 'https://i.pravatar.cc/150?u=marco' }
                ]
            }
        },
        {
            id: 'test-tech-rows',
            name: 'Tech Feed List',
            description: 'Lista vertical de feedbacks com visual de log.',
            content: {
                variant: 'dark',
                title: 'USER_FEEDBACK.LOG',
                fontFamily: 'font-tech',
                items: [
                    { quote: 'SYSTEM_STABILITY: 100% | UI_UX: EXCELLENT', author: 'Root_User', role: 'Admin', avatar: '' },
                    { quote: 'DEPLOY_TIME reduced by 70%. Best tool ever.', author: 'Dev_Master', role: 'DevOps', avatar: '' },
                ]
            }
        }
    ],
    pricing: [
        {
            id: 'pricing-modern-saas',
            name: 'SaaS Moderno (3 Planos)',
            description: 'Visual moderno com destaque para o plano mais popular.',
            content: {
                variant: 'saas',
                title: 'Planos Flexíveis',
                fontFamily: 'font-tech',
                plans: [
                    { name: 'Starter', price: 'Free', features: ['1 Site', 'Community Support'], buttonText: 'Get Started', buttonColor: '#f3f4f6' },
                    { name: 'Professional', price: '$19/mo', features: ['10 Sites', 'Priority Support', 'Custom Domains'], buttonText: 'Fly Pro', buttonColor: '#3b82f6', highlighted: true },
                    { name: 'Enterprise', price: 'Custom', features: ['Unlimited Sites', 'Dedicated Manager', 'API Access'], buttonText: 'Contact Sales', buttonColor: '#111827' },
                ]
            }
        },
        {
            id: 'pricing-clean-compare',
            name: 'Tabela de Comparação Clean',
            description: 'Foco na diferenciação de recursos entre os planos.',
            content: {
                variant: 'minimal',
                title: 'Escolha seu Plano',
                fontFamily: 'font-sans',
                plans: [
                    { name: 'Essencial', price: 'R$ 49/mês', features: ['Básico', 'Suporte E-mail'], buttonText: 'Selecionar', buttonColor: '#ffffff' },
                    { name: 'Business', price: 'R$ 99/mês', features: ['Tudo do Básico', 'Dashboard', 'Support 24h'], buttonText: 'Selecionar', buttonColor: '#3b82f6', highlighted: true },
                ]
            }
        }
    ],
    faq: [
        {
            id: 'faq-modern-grid',
            name: 'Grade de Perguntas Modernas',
            description: 'Perguntas em grade com visual clean.',
            content: {
                variant: 'grid',
                title: 'Central de Ajuda',
                fontFamily: 'font-impact',
                questions: [
                    { question: 'É fácil de usar?', answer: 'Completamente intuitivo!' },
                    { question: 'Posso exportar?', answer: 'Sim, exportação para Next.js completa.' },
                ]
            }
        },
        {
            id: 'faq-accordion-plus',
            name: 'Acordeão Moderno',
            description: 'Visual clássico de perguntas e respostas com ícones interativos.',
            content: {
                variant: 'accordion',
                title: 'Perguntas Frequentes',
                fontFamily: 'font-sans',
                questions: [
                    { question: 'Como funciona o suporte?', answer: 'Temos suporte 24/7 via chat e e-mail.' },
                    { question: 'Posso cancelar a qualquer momento?', answer: 'Sim, não há fidelidade em nenhum plano.' },
                    { question: 'Os sites são responsivos?', answer: 'Sim, 100% otimizados para todos os dispositivos.' },
                ]
            }
        }
    ],
    contact: [
        {
            id: 'contact-glass-split',
            name: 'Contact Glass Split',
            description: 'Informações à esquerda, formulário à direita com fundo suave.',
            content: {
                variant: 'split',
                title: 'Vamos Conversar',
                subtitle: 'Nossa equipe está pronta para te atender.',
                email: 'hello@alrion.tech',
                phone: '+55 11 9999-9999',
                address: 'Digital World, Internet',
                buttonText: 'Enviar Mensagem',
                buttonColor: '#3b82f6',
                fontFamily: 'font-tech',
            }
        },
        {
            id: 'contact-minimal-clean',
            name: 'Minimal Clean Mono',
            description: 'Foco total no formulário com design ultra limpo.',
            content: {
                variant: 'minimal',
                title: 'Diga Olá',
                subtitle: 'Responderemos em menos de 24 horas.',
                email: 'contact@brand.com',
                buttonText: 'Iniciar Conexão',
                fontFamily: 'font-sans',
            }
        },
        {
            id: 'contact-dark-premium',
            name: 'Premium Dark Form',
            description: 'Visual noturno sofisticado com detalhes em dourado/indigo.',
            content: {
                variant: 'dark-premium',
                title: 'Inicie seu Projeto',
                subtitle: 'Exclusividade em cada detalhe.',
                email: 'vip@concierge.com',
                address: 'Av. Paulista, 1000 - SP',
                buttonText: 'Agendar Consultoria',
                buttonColor: '#6366f1',
                backgroundColor: '#020617',
                fontFamily: 'font-serif',
            }
        },
        {
            id: 'contact-geometric',
            name: 'Geométrico Moderno',
            description: 'Layout dinâmico com formas e cores sólidas.',
            content: {
                variant: 'geometric',
                title: 'HUB_CONTACT',
                subtitle: 'Sincronize suas ideias conosco.',
                email: 'sync@hub.io',
                buttonText: 'SYNC_NOW',
                buttonColor: '#10b981',
                fontFamily: 'font-mono',
            }
        }
    ]
};

export const blockSequenceLogic: Record<string, BlockType[]> = {
  header: ['hero', 'text'],
  hero: ['features', 'text', 'gallery'],
  features: ['pricing', 'testimonials', 'cta'],
  text: ['cta', 'features', 'gallery'],
  gallery: ['testimonials', 'cta'],
  testimonials: ['pricing', 'cta', 'contact'],
  pricing: ['faq', 'cta'],
  faq: ['contact', 'cta'],
  cta: ['footer', 'contact'],
  contact: ['footer'],
  footer: []
};

