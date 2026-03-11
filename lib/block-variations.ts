import { BlockType } from './types';

export interface BlockVariation {
    id: string;
    name: string;
    theme?: string;
    description: string;
    content: any;
}

const THEMES = ['corporate', 'glass', 'minimal', 'tech', 'neobrutalist', 'luxury', 'clean', 'vibrant'];

export const blockVariations: Record<BlockType, BlockVariation[]> = {
    header: [
        // CORPORATE (5)
        { id: 'h-corp-1', name: 'Corporate Pro', theme: 'corporate', description: 'Logo à esquerda, menu centralizado. Visual limpo e profissional.', content: { variant: 'corporate', logoPosition: 'left', menuPosition: 'center', fontFamily: 'font-sans' } },
        { id: 'h-corp-2', name: 'Corporate Executive', theme: 'corporate', description: 'Menu à direita e fixo no topo. Ideal para navegação rápida.', content: { variant: 'corporate', logoPosition: 'left', menuPosition: 'right', isSticky: true, fontFamily: 'font-sans' } },
        { id: 'h-corp-3', name: 'Corporate Classic', theme: 'corporate', description: 'Logo e menu alinhados à esquerda. Tradicional e eficiente.', content: { variant: 'corporate', logoPosition: 'left', menuPosition: 'left', fontFamily: 'font-sans' } },
        { id: 'h-corp-4', name: 'Corporate Centered', theme: 'corporate', description: 'Logo centralizada com menu logo abaixo. Foco total na marca.', content: { variant: 'corporate', logoPosition: 'center', menuPosition: 'center', fontFamily: 'font-sans' } },
        { id: 'h-corp-5', name: 'Corporate Reverse', theme: 'corporate', description: 'Inversão total: Logo à direita e menu à esquerda.', content: { variant: 'corporate', logoPosition: 'right', menuPosition: 'left', fontFamily: 'font-sans' } },

        // GLASS (5)
        { id: 'h-glass-1', name: 'Glass Floating', theme: 'glass', description: 'Efeito de vidro flutuante com bordas arredondadas.', content: { variant: 'glass', isFloating: true, isSticky: true, theme: 'glass' } },
        { id: 'h-glass-2', name: 'Glass Translucent', theme: 'glass', description: 'Barra translúcida fixa que se mescla ao fundo.', content: { variant: 'glass', isFloating: false, isSticky: true, theme: 'glass' } },
        { id: 'h-glass-3', name: 'Glass Minimal', theme: 'glass', description: 'Logo centralizada com desfoque suave de fundo.', content: { variant: 'glass', logoPosition: 'center', isFloating: true, theme: 'glass' } },
        { id: 'h-glass-4', name: 'Glass Action', theme: 'glass', description: 'Foco em botões com menu à direita e vidro nítido.', content: { variant: 'glass', logoPosition: 'left', menuPosition: 'right', theme: 'glass' } },
        { id: 'h-glass-5', name: 'Glass Darkly', theme: 'glass', description: 'Versão em vidro escurecido para fundos vibrantes.', content: { variant: 'glass', theme: 'glass', isSticky: true, backgroundColor: 'rgba(0,0,0,0.5)' } },

        // MINIMAL (5)
        { id: 'h-min-1', name: 'Minimal Clean', theme: 'minimal', description: 'O máximo de simplicidade com foco em tipografia.', content: { variant: 'minimal', logoPosition: 'left', fontFamily: 'font-sans' } },
        { id: 'h-min-2', name: 'Minimal Ultra', theme: 'minimal', description: 'Logo e menu centralizados com muito espaço negativo.', content: { variant: 'minimal', logoPosition: 'center', menuPosition: 'center', fontFamily: 'font-sans' } },
        { id: 'h-min-3', name: 'Minimal Side', theme: 'minimal', description: 'Extremos: Logo à esquerda e menu à direita.', content: { variant: 'minimal', logoPosition: 'left', menuPosition: 'right', fontFamily: 'font-sans' } },
        { id: 'h-min-4', name: 'Minimal Line', theme: 'minimal', description: 'Fino e elegante com borda inferior sutil.', content: { variant: 'minimal', isSticky: true, fontFamily: 'font-sans' } },
        { id: 'h-min-5', name: 'Minimal Dark', theme: 'minimal', description: 'Minimalismo em tons profundos de preto.', content: { variant: 'dark', backgroundColor: '#111', logoPosition: 'center', fontFamily: 'font-sans' } },

        // TECH (5)
        { id: 'h-tech-1', name: 'Tech Terminal', theme: 'tech', description: 'Estilo console com fonte mono e fundo preto.', content: { variant: 'dark', backgroundColor: '#000', fontFamily: 'font-mono', theme: 'tech' } },
        { id: 'h-tech-2', name: 'Tech Grid', theme: 'tech', description: 'Navegação técnica com menu à direita e linhas finas.', content: { variant: 'dark', logoPosition: 'left', menuPosition: 'right', fontFamily: 'font-tech', theme: 'tech' } },
        { id: 'h-tech-3', name: 'Tech Cyber', theme: 'tech', description: 'Efeito flutuante com bordas em cyan e desfoque.', content: { variant: 'glass', isFloating: true, isSticky: true, fontFamily: 'font-tech', theme: 'tech' } },
        { id: 'h-tech-4', name: 'Tech Interface', theme: 'tech', description: 'Logo à direita e menu à esquerda. Estilo HUD.', content: { variant: 'dark', logoPosition: 'right', menuPosition: 'left', fontFamily: 'font-tech', theme: 'tech' } },
        { id: 'h-tech-5', name: 'Tech Console', theme: 'tech', description: 'Centralizado sólido com fonte de sistema.', content: { variant: 'dark', logoPosition: 'center', fontFamily: 'font-mono', theme: 'tech' } },

        // NEOBRUTALIST (5)
        { id: 'h-neo-1', name: 'Neo Pop', theme: 'neobrutalist', description: 'Bordas grossas e fundo amarelo vibrante.', content: { theme: 'neobrutalist', backgroundColor: '#ffde00', fontFamily: 'font-impact' } },
        { id: 'h-neo-2', name: 'Neo Contrast', theme: 'neobrutalist', description: 'Puro contraste com branco e sombras pesadas.', content: { theme: 'neobrutalist', backgroundColor: '#fff', fontFamily: 'font-impact' } },
        { id: 'h-neo-3', name: 'Neo Floating', theme: 'neobrutalist', description: 'Bloco solto com sombra paralela preta.', content: { theme: 'neobrutalist', isFloating: true, fontFamily: 'font-impact' } },
        { id: 'h-neo-4', name: 'Neo Reverse', theme: 'neobrutalist', description: 'Layout invertido com bordas maciças.', content: { theme: 'neobrutalist', logoPosition: 'right', menuPosition: 'left', fontFamily: 'font-impact' } },
        { id: 'h-neo-5', name: 'Neo Sticky', theme: 'neobrutalist', description: 'Fixo no topo com contorno definido.', content: { theme: 'neobrutalist', isSticky: true, fontFamily: 'font-impact' } },

        // LUXURY (5)
        { id: 'h-lux-1', name: 'Luxury Gold', theme: 'luxury', description: 'Preto real com tipografia serifada.', content: { variant: 'dark', backgroundColor: '#0a0a0a', fontFamily: 'font-serif', theme: 'luxury' } },
        { id: 'h-lux-2', name: 'Luxury Elegance', theme: 'luxury', description: 'Totalmente centralizado com fonte clássica.', content: { variant: 'minimal', logoPosition: 'center', fontFamily: 'font-serif', theme: 'luxury' } },
        { id: 'h-lux-3', name: 'Luxury Sidebar', theme: 'luxury', description: 'Logo à esquerda e menu à direita em serif.', content: { logoPosition: 'left', menuPosition: 'right', fontFamily: 'font-serif', theme: 'luxury' } },
        { id: 'h-lux-4', name: 'Luxury Floating', theme: 'luxury', description: 'Flutuante sutil com sombras elegantes.', content: { variant: 'glass', isFloating: true, fontFamily: 'font-serif', theme: 'luxury' } },
        { id: 'h-lux-5', name: 'Luxury Royal', theme: 'luxury', description: 'Fundo azul marinho profundo e texto sofisticado.', content: { variant: 'dark', backgroundColor: '#1a1a2e', fontFamily: 'font-serif', theme: 'luxury' } },

        // CLEAN (5)
        { id: 'h-clean-1', name: 'Clean Simple', theme: 'clean', description: 'Simplicidade nórdica. Logo à esquerda.', content: { logoPosition: 'left', theme: 'clean', fontFamily: 'font-sans' } },
        { id: 'h-clean-2', name: 'Clean Essential', theme: 'clean', description: 'Foco no essencial, tudo centralizado.', content: { logoPosition: 'center', menuPosition: 'center', theme: 'clean', fontFamily: 'font-sans' } },
        { id: 'h-clean-3', name: 'Clean Sticky', theme: 'clean', description: 'Fixo e discreto com borda fina.', content: { isSticky: true, logoPosition: 'left', theme: 'clean', fontFamily: 'font-sans' } },
        { id: 'h-clean-4', name: 'Clean Overlay', theme: 'clean', description: 'Preparado para menus em overlay modernos.', content: { mobileMenuVariant: 'full-overlay', theme: 'clean', fontFamily: 'font-sans' } },
        { id: 'h-clean-5', name: 'Clean Action', theme: 'clean', description: 'Extremos limpos. Logo esquerda, menu direita.', content: { logoPosition: 'left', menuPosition: 'right', theme: 'clean', fontFamily: 'font-sans' } },

        // VIBRANT (5)
        { id: 'h-vib-1', name: 'Vibrant Indigo', theme: 'vibrant', description: 'Fundo indigo energético e ícones vivos.', content: { backgroundColor: '#6366f1', theme: 'vibrant', variant: 'dark', fontFamily: 'font-impact' } },
        { id: 'h-vib-2', name: 'Vibrant Rounded', theme: 'vibrant', description: 'Visual pop com bordas muito arredondadas.', content: { isFloating: true, logoPosition: 'center', theme: 'vibrant', fontFamily: 'font-impact' } },
        { id: 'h-vib-3', name: 'Vibrant Glassy', theme: 'vibrant', description: 'Vidro colorido com brilho intenso.', content: { variant: 'glass', isFloating: true, theme: 'vibrant', fontFamily: 'font-impact' } },
        { id: 'h-vib-4', name: 'Vibrant Playful', theme: 'vibrant', description: 'Cores de destaque e layout dinâmico.', content: { logoPosition: 'right', menuPosition: 'left', theme: 'vibrant', fontFamily: 'font-impact' } },
        { id: 'h-vib-5', name: 'Vibrant Contrast', theme: 'vibrant', description: 'Fundo rosa choque para marcas ousadas.', content: { variant: 'dark', backgroundColor: '#f43f5e', theme: 'vibrant', fontFamily: 'font-impact' } },
    ],
    hero: THEMES.flatMap(theme => 
        Array.from({ length: 5 }).map((_, i) => {
            const configs = [
                { suffix: 'Impact', props: { variant: 'impact' } },
                { suffix: 'Split Left', props: { variant: 'split', imagePosition: 'right' } },
                { suffix: 'Split Right', props: { variant: 'split', imagePosition: 'left' } },
                { suffix: 'Elegant', props: { variant: 'elegant' } },
                { suffix: 'Futuristic', props: { variant: 'tech' } }
            ];
            const config = configs[i];
            return {
                id: `hr-${theme}-${i+1}`,
                name: `${theme.toUpperCase()} Hero ${config.suffix}`,
                theme,
                description: `Banner principal ${theme} em formato ${config.suffix.toLowerCase()}.`,
                content: { ...config.props, theme, backgroundColor: i === 3 ? '#fefefe' : (i === 4 ? '#050505' : undefined) }
            };
        })
    ),
    features: THEMES.flatMap(theme => 
        Array.from({ length: 5 }).map((_, i) => {
            const configs = [
                { suffix: 'Grid', props: { variant: 'grid' } },
                { suffix: 'Dark Mode', props: { variant: 'dark' } },
                { suffix: 'Minimalist', props: { variant: 'minimal' } },
                { suffix: 'Horizontal', props: { variant: 'horizontal' } },
                { suffix: 'Accent Cards', props: { variant: 'grid', backgroundColor: '#f0f9ff' } }
            ];
            const config = configs[i];
            return {
                id: `f-${theme}-${i+1}`,
                name: `${theme.charAt(0).toUpperCase() + theme.slice(1)} Features ${config.suffix}`,
                theme,
                description: `Lista de recursos ${theme} com layout ${config.suffix.toLowerCase()}.`,
                content: { ...config.props, theme }
            };
        })
    ),
    text: THEMES.flatMap(theme => 
        Array.from({ length: 5 }).map((_, i) => {
            const configs = [
                { suffix: 'Editorial', props: { variant: 'elegant' } },
                { suffix: 'Side Image', props: { variant: 'split', imagePosition: 'right' } },
                { suffix: 'Tech Log', props: { variant: 'tech' } },
                { suffix: 'Simple Center', props: { variant: 'default' } },
                { suffix: 'Inverted Split', props: { variant: 'split', imagePosition: 'left' } }
            ];
            const config = configs[i];
            return {
                id: `tx-${theme}-${i+1}`,
                name: `Text ${theme} ${config.suffix}`,
                theme,
                description: `Seção de texto ${theme} para ${config.suffix.toLowerCase()}.`,
                content: { ...config.props, theme }
            };
        })
    ),
    cta: THEMES.flatMap(theme => 
        Array.from({ length: 5 }).map((_, i) => {
            const configs = [
                { suffix: 'Direct', props: { variant: 'default', backgroundColor: '#4f46e5' } },
                { suffix: 'Glassy', props: { variant: 'glass' } },
                { suffix: 'Dark Focus', props: { variant: 'default', backgroundColor: '#000' } },
                { suffix: 'Clean', props: { variant: 'default', backgroundColor: '#fff', buttonColor: '#4f46e5', buttonTextColor: '#fff' } },
                { suffix: 'Brand Color', props: { variant: 'default', backgroundColor: '#009BDB' } }
            ];
            const config = configs[i];
            return {
                id: `ct-${theme}-${i+1}`,
                name: `CTA ${theme} ${config.suffix}`,
                theme,
                description: `Chamada para ação ${theme} - estilo ${config.suffix.toLowerCase()}.`,
                content: { ...config.props, theme }
            };
        })
    ),
    footer: THEMES.flatMap(theme => 
        Array.from({ length: 5 }).map((_, i) => {
            const configs = [
                { suffix: 'Corporate', props: { variant: 'default', backgroundColor: '#fff' } },
                { suffix: 'Mega Menu', props: { variant: 'mega' } },
                { suffix: 'Dark Center', props: { variant: 'centered', backgroundColor: '#000' } },
                { suffix: 'Tech Bottom', props: { variant: 'centered', backgroundColor: '#0a0a0a' } },
                { suffix: 'Minimal', props: { variant: 'default', backgroundColor: '#f9fafb', textColor: '#666' } }
            ];
            const config = configs[i];
            return {
                id: `ft-${theme}-${i+1}`,
                name: `Footer ${theme} ${config.suffix}`,
                theme,
                description: `Rodapé ${theme} com organização ${config.suffix.toLowerCase()}.`,
                content: { ...config.props, theme }
            };
        })
    ),
    gallery: THEMES.flatMap(theme => 
        Array.from({ length: 5 }).map((_, i) => {
            const configs = [
                { suffix: 'Grid', props: { variant: 'default' } },
                { suffix: 'Dark Masonry', props: { variant: 'masonry-dark' } },
                { suffix: 'Editorial', props: { variant: 'minimal-editorial' } },
                { suffix: 'Light Mosaic', props: { variant: 'default', backgroundColor: '#f8fafc' } },
                { suffix: 'Focus', props: { variant: 'default', clickableImages: true } }
            ];
            const config = configs[i];
            return {
                id: `g-${theme}-${i+1}`,
                name: `Gallery ${theme} ${config.suffix}`,
                theme,
                description: `Portfólio visual ${theme} em formato ${config.suffix.toLowerCase()}.`,
                content: { ...config.props, theme }
            };
        })
    ),
    testimonials: THEMES.flatMap(theme => 
        Array.from({ length: 5 }).map((_, i) => {
            const configs = [
                { suffix: 'Cards', props: { variant: 'default' } },
                { suffix: 'Minimal Strip', props: { variant: 'minimal' } },
                { suffix: 'Tech Decrypt', props: { variant: 'dark' } },
                { suffix: 'Social Proof', props: { variant: 'default', backgroundColor: '#fff' } },
                { suffix: 'Alt Grid', props: { variant: 'default', backgroundColor: '#f0f4ff' } }
            ];
            const config = configs[i];
            return {
                id: `t-${theme}-${i+1}`,
                name: `Social ${theme} ${config.suffix}`,
                theme,
                description: `Feedback de clientes ${theme} - ${config.suffix.toLowerCase()}.`,
                content: { ...config.props, theme }
            };
        })
    ),
    pricing: THEMES.flatMap(theme => 
        Array.from({ length: 5 }).map((_, i) => {
            const configs = [
                { suffix: 'Standard', props: { variant: 'default' } },
                { suffix: 'Modern SaaS', props: { variant: 'saas' } },
                { suffix: 'Minimalist', props: { variant: 'minimal' } },
                { suffix: 'Alt Highlights', props: { variant: 'default', backgroundColor: '#f9fafb' } },
                { suffix: 'Focus Plan', props: { variant: 'saas', highlightedIndex: 1 } }
            ];
            const config = configs[i];
            return {
                id: `p-${theme}-${i+1}`,
                name: `Pricing ${theme} ${config.suffix}`,
                theme,
                description: `Tabela de preços ${theme} para ${config.suffix.toLowerCase()}.`,
                content: { ...config.props, theme }
            };
        })
    ),
    faq: THEMES.flatMap(theme => 
        Array.from({ length: 5 }).map((_, i) => {
            const configs = [
                { suffix: 'Accordion', props: { variant: 'accordion' } },
                { suffix: 'Grid List', props: { variant: 'default' } },
                { suffix: 'Clean White', props: { variant: 'accordion', backgroundColor: '#fff' } },
                { suffix: 'Dark Tech', props: { variant: 'accordion', backgroundColor: '#0a0a0a' } },
                { suffix: 'Soft Indigo', props: { variant: 'default', backgroundColor: '#f5f7ff' } }
            ];
            const config = configs[i];
            return {
                id: `fq-${theme}-${i+1}`,
                name: `FAQ ${theme} ${config.suffix}`,
                theme,
                description: `Perguntas frequentes ${theme} em ${config.suffix.toLowerCase()}.`,
                content: { ...config.props, theme }
            };
        })
    ),
    contact: THEMES.flatMap(theme => 
        Array.from({ length: 5 }).map((_, i) => {
            const configs = [
                { suffix: 'Split Form', props: { variant: 'split' } },
                { suffix: 'Minimal Info', props: { variant: 'minimal' } },
                { suffix: 'Premium Dark', props: { variant: 'dark-premium', backgroundColor: '#000' } },
                { suffix: 'Geometric Tech', props: { variant: 'geometric' } },
                { suffix: 'Corp White', props: { variant: 'split', backgroundColor: '#fff' } }
            ];
            const config = configs[i];
            return {
                id: `c-${theme}-${i+1}`,
                name: `Contact ${theme} ${config.suffix}`,
                theme,
                description: `Seção de contato ${theme} - ${config.suffix.toLowerCase()}.`,
                content: { ...config.props, theme }
            };
        })
    ),
};

export const blockSequenceLogic: Record<string, BlockType[]> = {
  header: ['hero', 'text'],
  hero: ['features', 'gallery', 'text'],
  features: ['cta', 'testimonials', 'pricing'],
  text: ['cta', 'features', 'gallery'],
  gallery: ['testimonials', 'cta'],
  testimonials: ['pricing', 'faq', 'cta'],
  pricing: ['faq', 'contact'],
  faq: ['contact', 'footer'],
  cta: ['footer', 'testimonials'],
  contact: ['footer'],
};
