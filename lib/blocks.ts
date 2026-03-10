import { Block } from '@/lib/types';
import { generateNextJsCode } from '@/lib/generator';

export const defaultBlockContent = {
  header: {
    logoText: 'MinhaMarca',
    logoImage: '',
    links: ['Início', 'Sobre', 'Serviços', 'Contato'],
    linkTargets: {},
    mobileMenuBreakpoint: 'md',
    showDarkModeToggle: false,
    isSticky: false,
    isFloating: false,
    scrollBehavior: 'smooth',
  },
  hero: {
    title: 'Título Principal Impactante',
    subtitle: 'Um subtítulo persuasivo que explica o valor do seu produto ou serviço em poucas palavras.',
    buttonText: 'Ação Principal',
    buttonColor: '#009BDB',
    buttonTextColor: '#ffffff',
    showSecondaryButton: false,
    secondaryButtonText: 'Saiba Mais',
    secondaryButtonColor: '#f3f4f6',
    secondaryButtonTextColor: '#111827',
    backgroundImage: '',
  },
  features: {
    title: 'Nossos Diferenciais',
    items: [
      { title: 'Benefício 1', description: 'Descrição detalhada do primeiro benefício do seu produto.', image: '' },
      { title: 'Benefício 2', description: 'Descrição detalhada do segundo benefício do seu produto.', image: '' },
      { title: 'Benefício 3', description: 'Descrição detalhada do terceiro benefício do seu produto.', image: '' },
    ],
  },
  text: {
    title: 'Título da Seção',
    text: 'Escreva aqui um parágrafo longo detalhando mais sobre a sua empresa, sua história ou qualquer outra informação relevante para o visitante do site.',
    image: '',
    imagePosition: 'right',
  },
  cta: {
    title: 'Pronto para começar?',
    subtitle: 'Não perca tempo e junte-se a nós hoje mesmo.',
    buttonText: 'Inscreva-se Agora',
    buttonColor: '#ffffff',
    buttonTextColor: '#009BDB',
    backgroundImage: '',
    backgroundColor: '#009BDB',
  },
  footer: {
    text: '© 2026 Minha Empresa. Todos os direitos reservados.',
    backgroundColor: '#111827',
    textColor: '#9ca3af',
  },
  gallery: {
    title: 'Nossa Galeria',
    clickableImages: false,
    modalType: 'fullscreen',
    modalTitle: 'Título da Imagem',
    modalText: 'Descrição detalhada sobre esta imagem.',
    modalButton1Text: 'Ação 1',
    modalButton2Text: 'Ação 2',
    images: [
      'https://picsum.photos/seed/gal1/600/400',
      'https://picsum.photos/seed/gal2/600/400',
      'https://picsum.photos/seed/gal3/600/400',
      'https://picsum.photos/seed/gal4/600/400',
    ],
  },
  testimonials: {
    title: 'O que dizem sobre nós',
    items: [
      { quote: 'O melhor serviço que já utilizei. Recomendo a todos!', author: 'Maria Silva', role: 'CEO, Empresa X', avatar: 'https://picsum.photos/seed/avatar1/100/100' },
      { quote: 'Atendimento excepcional e resultados rápidos.', author: 'João Pedro', role: 'Diretor de Marketing', avatar: 'https://picsum.photos/seed/avatar2/100/100' },
    ],
  },
  pricing: {
    title: 'Planos e Preços',
    plans: [
      { name: 'Básico', price: 'R$ 29/mês', features: ['1 Usuário', 'Suporte Básico', 'Acesso Limitado'], buttonText: 'Assinar Básico', buttonColor: '#009BDB' },
      { name: 'Pro', price: 'R$ 99/mês', features: ['5 Usuários', 'Suporte Prioritário', 'Acesso Total'], buttonText: 'Assinar Pro', buttonColor: '#009BDB' },
    ],
  },
  faq: {
    title: 'Perguntas Frequentes',
    questions: [
      { question: 'Como funciona o período de teste?', answer: 'Você tem 14 dias para testar todas as funcionalidades sem compromisso.' },
      { question: 'Posso cancelar a qualquer momento?', answer: 'Sim, não há fidelidade e o cancelamento pode ser feito com um clique.' },
    ],
  },
  contact: {
    title: 'Entre em Contato',
    subtitle: 'Estamos aqui para ajudar. Preencha o formulário abaixo e entraremos em contato o mais breve possível.',
    email: 'contato@exemplo.com',
    phone: '(11) 99999-9999',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    buttonText: 'Enviar Mensagem',
    buttonColor: '#009BDB',
  },
};
