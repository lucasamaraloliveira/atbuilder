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
    hero: [
        // CORPORATE (5)
        { id: 'hr-corp-1', name: 'Corporate Impact Direct', theme: 'corporate', description: 'Banner de alto impacto com azul institucional e foco direto.', content: { variant: 'impact', theme: 'corporate', backgroundColor: '#1e3a8a' } },
        { id: 'hr-corp-2', name: 'Corporate Executive Split', theme: 'corporate', description: 'Layout dividido moderno para executivos e grandes empresas.', content: { variant: 'split', theme: 'corporate', imagePosition: 'right' } },
        { id: 'hr-corp-3', name: 'Corporate Business Pro', theme: 'corporate', description: 'Design limpo, profissional e focado em credibilidade.', content: { variant: 'default', theme: 'corporate', backgroundColor: '#f8fafc' } },
        { id: 'hr-corp-4', name: 'Corporate Editorial Serif', theme: 'corporate', description: 'Minimalismo sofisticado com tipografia serifada.', content: { variant: 'elegant', theme: 'corporate' } },
        { id: 'hr-corp-5', name: 'Corporate Tech Focus', theme: 'corporate', description: 'Visual corporativo com toques tecnológicos sutis.', content: { variant: 'tech', theme: 'corporate', backgroundColor: '#0f172a' } },

        // GLASS (5)
        { id: 'hr-glass-1', name: 'Glass Floating Ice', theme: 'glass', description: 'Efeito de vidro flutuante com visual ártico.', content: { variant: 'glass', theme: 'glass', backgroundColor: 'transparent' } },
        { id: 'hr-glass-2', name: 'Glass Split Horizon', theme: 'glass', description: 'Divisão translúcida sobre fundo vibrante.', content: { variant: 'split', theme: 'glass', imagePosition: 'left' } },
        { id: 'hr-glass-3', name: 'Glass Center Glow', theme: 'glass', description: 'Impacto central com brilho periférico e vidro.', content: { variant: 'impact', theme: 'glass', backgroundColor: 'rgba(255,255,255,0.05)' } },
        { id: 'hr-glass-4', name: 'Glass Dark Frost', theme: 'glass', description: 'Vidro escuro temperado para um visual noturno moderno.', content: { variant: 'tech', theme: 'glass', backgroundColor: 'rgba(0,0,0,0.4)' } },
        { id: 'hr-glass-5', name: 'Glass Elegant Mist', theme: 'glass', description: 'Serifas e vidro sutil em um layout minimalista.', content: { variant: 'elegant', theme: 'glass' } },

        // MINIMAL (5)
        { id: 'hr-min-1', name: 'Minimal Pure White', theme: 'minimal', description: 'Pureza total e foco absoluto na mensagem.', content: { variant: 'default', theme: 'minimal', backgroundColor: '#ffffff' } },
        { id: 'hr-min-2', name: 'Minimal Editorial Art', theme: 'minimal', description: 'Estilo de revista com muito espaço negativo.', content: { variant: 'elegant', theme: 'minimal', backgroundColor: '#fafafa' } },
        { id: 'hr-min-3', name: 'Minimal Split Balance', theme: 'minimal', description: 'Equilíbrio zen entre tipografia e imagem.', content: { variant: 'split', theme: 'minimal', imagePosition: 'right', backgroundColor: '#ffffff' } },
        { id: 'hr-min-4', name: 'Minimal High Contrast', theme: 'minimal', description: 'Preto e branco puro para um visual marcante.', content: { variant: 'impact', theme: 'minimal', backgroundColor: '#111111' } },
        { id: 'hr-min-5', name: 'Minimal Soft Gray', theme: 'minimal', description: 'Minimalismo em tons de cinza suave e acolhedor.', content: { variant: 'default', theme: 'minimal', backgroundColor: '#f3f4f6' } },

        // TECH (5)
        { id: 'hr-tech-1', name: 'Tech Cyber Neon', theme: 'tech', description: 'Estética futurista com acentos cyan e modo dark.', content: { variant: 'tech', theme: 'tech', backgroundColor: '#000000' } },
        { id: 'hr-tech-2', name: 'Tech Data Grid', theme: 'tech', description: 'Visual técnico focado em infraestrutura e dados.', content: { variant: 'tech', theme: 'tech', backgroundColor: '#020617' } },
        { id: 'hr-tech-3', name: 'Tech Interface Split', theme: 'tech', description: 'Layout dividido estilo HUD de alta tecnologia.', content: { variant: 'split', theme: 'tech', backgroundColor: '#080112' } },
        { id: 'hr-tech-4', name: 'Tech Terminal Impact', theme: 'tech', description: 'Impacto total inspirado em terminais de comando.', content: { variant: 'impact', theme: 'tech', backgroundColor: '#0a0a0a' } },
        { id: 'hr-tech-5', name: 'Tech Logic Minimal', theme: 'tech', description: 'Minimalismo técnico para developers e engenheiros.', content: { variant: 'default', theme: 'tech', backgroundColor: '#111827' } },

        // NEOBRUTALIST (5)
        { id: 'hr-neo-1', name: 'Neo Yellow Power', theme: 'neobrutalist', description: 'Impacto brutal com amarelo atômico e sombras.', content: { variant: 'impact', theme: 'neobrutalist', backgroundColor: '#facc15' } },
        { id: 'hr-neo-2', name: 'Neo Split Brutal', theme: 'neobrutalist', description: 'Layout dividido com bordas maciças e contraste.', content: { variant: 'split', theme: 'neobrutalist', imagePosition: 'right', backgroundColor: '#ffffff' } },
        { id: 'hr-neo-3', name: 'Neo Red Aggressive', theme: 'neobrutalist', description: 'Design ousado em vermelho vivo.', content: { variant: 'impact', theme: 'neobrutalist', backgroundColor: '#ef4444' } },
        { id: 'hr-neo-4', name: 'Neo Clean Raw', theme: 'neobrutalist', description: 'O estilo brutalista em cores limpas e cruas.', content: { variant: 'default', theme: 'neobrutalist', backgroundColor: '#ffffff' } },
        { id: 'hr-neo-5', name: 'Neo Cyan Pop', theme: 'neobrutalist', description: 'Cores pop e estrutura neobrutalista dinâmica.', content: { variant: 'tech', theme: 'neobrutalist', backgroundColor: '#22d3ee' } },

        // LUXURY (5)
        { id: 'hr-lux-1', name: 'Luxury Gold Leaf', theme: 'luxury', description: 'Sofisticação em preto real e tons dourados.', content: { variant: 'elegant', theme: 'luxury', backgroundColor: '#000000' } },
        { id: 'hr-lux-2', name: 'Luxury Marble Split', theme: 'luxury', description: 'Elegância clássica com visual de mármore.', content: { variant: 'split', theme: 'luxury', imagePosition: 'left', backgroundColor: '#fdfcfe' } },
        { id: 'hr-lux-3', name: 'Luxury Royal Night', theme: 'luxury', description: 'Azul marinho profundo e tipografia nobre.', content: { variant: 'impact', theme: 'luxury', backgroundColor: '#020617' } },
        { id: 'hr-lux-4', name: 'Luxury Minimal Silk', theme: 'luxury', description: 'Minimalismo de luxo em tons seda.', content: { variant: 'default', theme: 'luxury', backgroundColor: '#fcfcfc' } },
        { id: 'hr-lux-5', name: 'Luxury Velvet Rose', theme: 'luxury', description: 'Visual aveludado e poético com serifas.', content: { variant: 'elegant', theme: 'luxury', backgroundColor: '#2e1065' } },

        // CLEAN (5)
        { id: 'hr-clean-1', name: 'Clean Soft Blue', theme: 'clean', description: 'Atmosfera leve, arejada e convidativa.', content: { variant: 'default', theme: 'clean', backgroundColor: '#f0f9ff' } },
        { id: 'hr-clean-2', name: 'Clean Split Nature', theme: 'clean', description: 'Equilíbrio natural entre texto e imagem.', content: { variant: 'split', theme: 'clean', imagePosition: 'right', backgroundColor: '#ffffff' } },
        { id: 'hr-clean-3', name: 'Clean Modern Impact', theme: 'clean', description: 'Design contemporâneo direto e limpo.', content: { variant: 'impact', theme: 'clean', backgroundColor: '#f8fafc' } },
        { id: 'hr-clean-4', name: 'Clean Glassy Touch', theme: 'clean', description: 'Minimalismo moderno com toque vítreo.', content: { variant: 'default', theme: 'clean', backgroundColor: '#ffffff' } },
        { id: 'hr-clean-5', name: 'Clean Indigo Wave', theme: 'clean', description: 'Visual fluído e extremamente limpo.', content: { variant: 'elegant', theme: 'clean', backgroundColor: '#f5f3ff' } },

        // VIBRANT (5)
        { id: 'hr-vib-1', name: 'Vibrant Orange Energy', theme: 'vibrant', description: 'Energia pura em laranja energético.', content: { variant: 'impact', theme: 'vibrant', backgroundColor: '#f97316' } },
        { id: 'hr-vib-2', name: 'Vibrant Split Pop', theme: 'vibrant', description: 'Contraste pop entre cores e formas.', content: { variant: 'split', theme: 'vibrant', imagePosition: 'left', backgroundColor: '#ec4899' } },
        { id: 'hr-vib-3', name: 'Vibrant Electric Flow', theme: 'vibrant', description: 'Visual elétrico e futurista vibrante.', content: { variant: 'impact', theme: 'vibrant', backgroundColor: '#a855f7' } },
        { id: 'hr-vib-4', name: 'Vibrant Yellow Sun', theme: 'vibrant', description: 'Alegria e otimismo em cores solares.', content: { variant: 'default', theme: 'vibrant', backgroundColor: '#eab308' } },
        { id: 'hr-vib-5', name: 'Vibrant Indigo Dream', theme: 'vibrant', description: 'Design onírico com cores saturadas.', content: { variant: 'elegant', theme: 'vibrant', backgroundColor: '#6366f1' } },
    ],

    features: [
        // CORPORATE (5)
        { id: 'f-corp-1', name: 'Corporate Grid Pro', theme: 'corporate', description: 'Grid tradicional com ícones profissionais.', content: { variant: 'grid', theme: 'corporate' } },
        { id: 'f-corp-2', name: 'Corporate Executive List', theme: 'corporate', description: 'Lista horizontal para serviços de alto nível.', content: { variant: 'horizontal', theme: 'corporate' } },
        { id: 'f-corp-3', name: 'Corporate Blue Cards', theme: 'corporate', description: 'Cards com fundo azul suave e bordas arredondadas.', content: { variant: 'grid', theme: 'corporate', backgroundColor: '#f0f9ff' } },
        { id: 'f-corp-4', name: 'Corporate Dark Service', theme: 'corporate', description: 'Visual dark profundo para empresas de tecnologia.', content: { variant: 'dark', theme: 'corporate' } },
        { id: 'f-corp-5', name: 'Corporate Minimalist', theme: 'corporate', description: 'Foco total no texto e organização limpa.', content: { variant: 'minimal', theme: 'corporate' } },

        // GLASS (5)
        { id: 'f-glass-1', name: 'Glass Frosted Grid', theme: 'glass', description: 'Efeito de vidro fosco em grid moderno.', content: { variant: 'grid', theme: 'glass' } },
        { id: 'f-glass-2', name: 'Glass Floating Shadow', theme: 'glass', description: 'Cards flutuantes com sombras suaves.', content: { variant: 'grid', theme: 'glass', backgroundColor: 'rgba(255,255,255,0.05)' } },
        { id: 'f-glass-3', name: 'Glass Translucent Row', theme: 'glass', description: 'Linhas translúcidas que se adaptam ao fundo.', content: { variant: 'horizontal', theme: 'glass' } },
        { id: 'f-glass-4', name: 'Glass Dark Frost', theme: 'glass', description: 'Vidro escurecido para interfaces sofisticadas.', content: { variant: 'dark', theme: 'glass' } },
        { id: 'f-glass-5', name: 'Glass Minimal Prism', theme: 'glass', description: 'Minimalismo com refrações vítreas.', content: { variant: 'minimal', theme: 'glass' } },

        // MINIMAL (5)
        { id: 'f-min-1', name: 'Minimal Pure White', theme: 'minimal', description: 'Pureza visual com muito espaço branco.', content: { variant: 'minimal', theme: 'minimal' } },
        { id: 'f-min-2', name: 'Minimal Line Grid', theme: 'minimal', description: 'Divisões por linhas finas e elegantes.', content: { variant: 'grid', theme: 'minimal', backgroundColor: '#ffffff' } },
        { id: 'f-min-3', name: 'Minimal Soft Border', theme: 'minimal', description: 'Bordas arredondadas e cinza extremamente leve.', content: { variant: 'grid', theme: 'minimal', backgroundColor: '#fafafa' } },
        { id: 'f-min-4', name: 'Minimal Editorial', theme: 'minimal', description: 'Estética de revista com foco em tipografia.', content: { variant: 'horizontal', theme: 'minimal' } },
        { id: 'f-min-5', name: 'Minimal Gray Scale', theme: 'minimal', description: 'Variações sutis de cinza para foco máximo.', content: { variant: 'dark', theme: 'minimal', backgroundColor: '#f3f4f6' } },

        // TECH (5)
        { id: 'f-tech-1', name: 'Tech Cyber Grid', theme: 'tech', description: 'Grid futurista com acentos neon cyan.', content: { variant: 'grid', theme: 'tech', backgroundColor: '#000000' } },
        { id: 'f-tech-2', name: 'Tech Data Modules', theme: 'tech', description: 'Visual de terminal e módulos de dados.', content: { variant: 'dark', theme: 'tech', backgroundColor: '#020617' } },
        { id: 'f-tech-3', name: 'Tech Logic Row', theme: 'tech', description: 'Comparações técnicas em lista horizontal.', content: { variant: 'horizontal', theme: 'tech' } },
        { id: 'f-tech-4', name: 'Tech HUD Interface', theme: 'tech', description: 'Estilo Head-Up Display para sistemas.', content: { variant: 'grid', theme: 'tech', backgroundColor: '#0a0a0a' } },
        { id: 'f-tech-5', name: 'Tech Minimalist Bit', theme: 'tech', description: 'Minimalismo técnico para dev-tools.', content: { variant: 'minimal', theme: 'tech' } },

        // NEOBRUTALIST (5)
        { id: 'f-neo-1', name: 'Neo Power Blocks', theme: 'neobrutalist', description: 'Contraste bruto com bordas 4px e sombras.', content: { variant: 'grid', theme: 'neobrutalist', backgroundColor: '#ffffff' } },
        { id: 'f-neo-2', name: 'Neo Pop Yellow', theme: 'neobrutalist', description: 'Cards vibrantes sobre fundo amarelo.', content: { variant: 'grid', theme: 'neobrutalist', backgroundColor: '#facc15' } },
        { id: 'f-neo-3', name: 'Neo Brutal Row', theme: 'neobrutalist', description: 'Lista horizontal com impacto visual máximo.', content: { variant: 'horizontal', theme: 'neobrutalist' } },
        { id: 'f-neo-4', name: 'Neo Dark Punch', theme: 'neobrutalist', description: 'Estilo brutalista em fundo escuro.', content: { variant: 'dark', theme: 'neobrutalist' } },
        { id: 'f-neo-5', name: 'Neo Cyan Sharp', theme: 'neobrutalist', description: 'Cores cyan e bordas extremamente definidas.', content: { variant: 'grid', theme: 'neobrutalist', backgroundColor: '#22d3ee' } },

        // LUXURY (5)
        { id: 'f-lux-1', name: 'Luxury Gold Trim', theme: 'luxury', description: 'Detalhes em dourado e fontes serifadas.', content: { variant: 'grid', theme: 'luxury', backgroundColor: '#000000' } },
        { id: 'f-lux-2', name: 'Luxury Marble Card', theme: 'luxury', description: 'Visual clássico de mármore e seda.', content: { variant: 'grid', theme: 'luxury', backgroundColor: '#fdfcfe' } },
        { id: 'f-lux-3', name: 'Luxury Elegant Row', theme: 'luxury', description: 'Serviços exclusivos em layout horizontal.', content: { variant: 'horizontal', theme: 'luxury' } },
        { id: 'f-lux-4', name: 'Luxury Royal Night', theme: 'luxury', description: 'Azul marinho e contraste ouro.', content: { variant: 'dark', theme: 'luxury', backgroundColor: '#020617' } },
        { id: 'f-lux-5', name: 'Luxury Minimal Silk', theme: 'luxury', description: 'Minimalismo de elite para marcas premium.', content: { variant: 'minimal', theme: 'luxury' } },

        // CLEAN (5)
        { id: 'f-clean-1', name: 'Clean Soft Azure', theme: 'clean', description: 'Leveza total com tons de azul céu.', content: { variant: 'grid', theme: 'clean', backgroundColor: '#f0f9ff' } },
        { id: 'f-clean-2', name: 'Clean Modern White', theme: 'clean', description: 'Grid contemporâneo e arejado.', content: { variant: 'grid', theme: 'clean', backgroundColor: '#ffffff' } },
        { id: 'f-clean-3', name: 'Clean Essential List', theme: 'clean', description: 'Lista horizontal para fácil leitura.', content: { variant: 'horizontal', theme: 'clean' } },
        { id: 'f-clean-4', name: 'Clean Pastel Mix', theme: 'clean', description: 'Cores pastéis suaves para diversidade.', content: { variant: 'grid', theme: 'clean', backgroundColor: '#f8fafc' } },
        { id: 'f-clean-5', name: 'Clean Indigo Zen', theme: 'clean', description: 'Visual zen com toques de indigo.', content: { variant: 'minimal', theme: 'clean' } },

        // VIBRANT (5)
        { id: 'f-vib-1', name: 'Vibrant Orange Pop', theme: 'vibrant', description: 'Energia máxima com laranja saturado.', content: { variant: 'grid', theme: 'vibrant', backgroundColor: '#f97316' } },
        { id: 'f-vib-2', name: 'Vibrant Purple Pulse', theme: 'vibrant', description: 'Layout dinâmico em tons de roxo.', content: { variant: 'grid', theme: 'vibrant', backgroundColor: '#a855f7' } },
        { id: 'f-vib-3', name: 'Vibrant Pink Grid', theme: 'vibrant', description: 'Foco e vibração com rosa choque.', content: { variant: 'grid', theme: 'vibrant', backgroundColor: '#ec4899' } },
        { id: 'f-vib-4', name: 'Vibrant Yellow Burst', theme: 'vibrant', description: 'Alegria solar e cards impactantes.', content: { variant: 'horizontal', theme: 'vibrant', backgroundColor: '#eab308' } },
        { id: 'f-vib-5', name: 'Vibrant Dark Electric', theme: 'vibrant', description: 'Contraste elétrico sobre fundo escuro.', content: { variant: 'dark', theme: 'vibrant' } },
    ],

    text: [
        // CORPORATE (5)
        { id: 'tx-corp-1', name: 'Corporate Story Split', theme: 'corporate', description: 'Texto e imagem divididos para narrativa empresarial.', content: { variant: 'split', theme: 'corporate', imagePosition: 'right' } },
        { id: 'tx-corp-2', name: 'Corporate Executive Brief', theme: 'corporate', description: 'Resumo centralizado com tipografia séria.', content: { variant: 'default', theme: 'corporate' } },
        { id: 'tx-corp-3', name: 'Corporate Editorial Pro', theme: 'corporate', description: 'Layout de artigo executivo com serifas sutis.', content: { variant: 'elegant', theme: 'corporate' } },
        { id: 'tx-corp-4', name: 'Corporate Tech Report', theme: 'corporate', description: 'Estilo de relatório técnico com visual preciso.', content: { variant: 'tech', theme: 'corporate' } },
        { id: 'tx-corp-5', name: 'Corporate Reverse Split', theme: 'corporate', description: 'Imagem à esquerda para variação narrativa.', content: { variant: 'split', theme: 'corporate', imagePosition: 'left' } },

        // GLASS (5)
        { id: 'tx-glass-1', name: 'Glass Narrative Split', theme: 'glass', description: 'Texto sobre vidro com imagem lateral.', content: { variant: 'split', theme: 'glass', imagePosition: 'right' } },
        { id: 'tx-glass-2', name: 'Glass Ethereal Elegant', theme: 'glass', description: 'Visual etéreo e refinado com transparências.', content: { variant: 'elegant', theme: 'glass' } },
        { id: 'tx-glass-3', name: 'Glass Tech Overlay', theme: 'glass', description: 'Texto técnico em bloco de vidro escuro.', content: { variant: 'tech', theme: 'glass' } },
        { id: 'tx-glass-4', name: 'Glass Minimal Pure', theme: 'glass', description: 'Foco no texto com leve brilho vítreo.', content: { variant: 'default', theme: 'glass' } },
        { id: 'tx-glass-5', name: 'Glass Reverse Story', theme: 'glass', description: 'Layout espelhado com efeitos de refração.', content: { variant: 'split', theme: 'glass', imagePosition: 'left' } },

        // MINIMAL (5)
        { id: 'tx-min-1', name: 'Minimal Editorial Art', theme: 'minimal', description: 'Estética de revista com muito espaço negativo.', content: { variant: 'elegant', theme: 'minimal' } },
        { id: 'tx-min-2', name: 'Minimal Split Balance', theme: 'minimal', description: 'Equilíbrio zen entre texto e imagem.', content: { variant: 'split', theme: 'minimal', imagePosition: 'right' } },
        { id: 'tx-min-3', name: 'Minimal Pure Center', theme: 'minimal', description: 'Pureza total e foco absoluto na mensagem.', content: { variant: 'default', theme: 'minimal' } },
        { id: 'tx-min-4', name: 'Minimal Tech Logic', theme: 'minimal', description: 'Minimalismo funcional para documentação.', content: { variant: 'tech', theme: 'minimal' } },
        { id: 'tx-min-5', name: 'Minimal Left Image', theme: 'minimal', description: 'Narrativa visual com foco à esquerda.', content: { variant: 'split', theme: 'minimal', imagePosition: 'left' } },

        // TECH (5)
        { id: 'tx-tech-1', name: 'Tech System Log', theme: 'tech', description: 'Visual de terminal para logs de sistema.', content: { variant: 'tech', theme: 'tech' } },
        { id: 'tx-tech-2', name: 'Tech Interface Split', theme: 'tech', description: 'Apresentação técnica dividida com estilo HUD.', content: { variant: 'split', theme: 'tech', imagePosition: 'right' } },
        { id: 'tx-tech-3', name: 'Tech Data Elegant', theme: 'tech', description: 'Sofisticação técnica com tipografia precisa.', content: { variant: 'elegant', theme: 'tech' } },
        { id: 'tx-tech-4', name: 'Tech Core Signal', theme: 'tech', description: 'Destaque central para informações críticas.', content: { variant: 'default', theme: 'tech' } },
        { id: 'tx-tech-5', name: 'Tech Reverse Protocol', theme: 'tech', description: 'Layout invertido para fluxos alternativos.', content: { variant: 'split', theme: 'tech', imagePosition: 'left' } },

        // NEOBRUTALIST (5)
        { id: 'tx-neo-1', name: 'Neo Brutal Story', theme: 'neobrutalist', description: 'Texto impactante com bordas e sombras pesadas.', content: { variant: 'split', theme: 'neobrutalist', imagePosition: 'right' } },
        { id: 'tx-neo-2', name: 'Neo Punchy Center', theme: 'neobrutalist', description: 'Foco central com design agressivo e limpo.', content: { variant: 'default', theme: 'neobrutalist' } },
        { id: 'tx-neo-3', name: 'Neo Editorial Blast', theme: 'neobrutalist', description: 'Estilo de revista alternativa e brutalista.', content: { variant: 'elegant', theme: 'neobrutalist' } },
        { id: 'tx-neo-4', name: 'Neo Tech Raw', theme: 'neobrutalist', description: 'Estética técnica rudimentar e poderosa.', content: { variant: 'tech', theme: 'neobrutalist' } },
        { id: 'tx-neo-5', name: 'Neo Left Impact', theme: 'neobrutalist', description: 'Equilíbrio brutalista com imagem à esquerda.', content: { variant: 'split', theme: 'neobrutalist', imagePosition: 'left' } },

        // LUXURY (5)
        { id: 'tx-lux-1', name: 'Luxury Editorial Gold', theme: 'luxury', description: 'Apresentação refinada com toques dourados.', content: { variant: 'elegant', theme: 'luxury' } },
        { id: 'tx-lux-2', name: 'Luxury Split Marble', theme: 'luxury', description: 'Equilíbrio clássico com tons de mármore.', content: { variant: 'split', theme: 'luxury', imagePosition: 'right' } },
        { id: 'tx-lux-3', name: 'Luxury Royal Center', theme: 'luxury', description: 'Tipografia nobre centralizada e impactante.', content: { variant: 'default', theme: 'luxury' } },
        { id: 'tx-lux-4', name: 'Luxury Tech Silk', theme: 'luxury', description: 'Documentação técnica para produtos de elite.', content: { variant: 'tech', theme: 'luxury' } },
        { id: 'tx-lux-5', name: 'Luxury Velvet Split', theme: 'luxury', description: 'Narrativa poética com visual aveludado.', content: { variant: 'split', theme: 'luxury', imagePosition: 'left' } },

        // CLEAN (5)
        { id: 'tx-clean-1', name: 'Clean Airy Story', theme: 'clean', description: 'Design leve e fluído para leitura fácil.', content: { variant: 'split', theme: 'clean', imagePosition: 'right' } },
        { id: 'tx-clean-2', name: 'Clean Zen Center', theme: 'clean', description: 'Foco total no essencial e organização zen.', content: { variant: 'default', theme: 'clean' } },
        { id: 'tx-clean-3', name: 'Clean Modern Elegant', theme: 'clean', description: 'Minimalismo contemporâneo sofisticado.', content: { variant: 'elegant', theme: 'clean' } },
        { id: 'tx-clean-4', name: 'Clean Soft Tech', theme: 'clean', description: 'Visual técnico amigável e acessível.', content: { variant: 'tech', theme: 'clean' } },
        { id: 'tx-clean-5', name: 'Clean Nature Split', theme: 'clean', description: 'Imagem à esquerda com visual orgânico.', content: { variant: 'split', theme: 'clean', imagePosition: 'left' } },

        // VIBRANT (5)
        { id: 'tx-vib-1', name: 'Vibrant Pop Story', theme: 'vibrant', description: 'Narrativa enérgica com cores saturadas.', content: { variant: 'split', theme: 'vibrant', imagePosition: 'right' } },
        { id: 'tx-vib-2', name: 'Vibrant Electric Center', theme: 'vibrant', description: 'Impacto visual vibrante centralizado.', content: { variant: 'default', theme: 'vibrant' } },
        { id: 'tx-vib-3', name: 'Vibrant Dynamic Editorial', theme: 'vibrant', description: 'Visual de revista pop dinâmico.', content: { variant: 'elegant', theme: 'vibrant' } },
        { id: 'tx-vib-4', name: 'Vibrant Neon Protocol', theme: 'vibrant', description: 'Instruções técnicas em cores neon.', content: { variant: 'tech', theme: 'vibrant' } },
        { id: 'tx-vib-5', name: 'Vibrant Flash Split', theme: 'vibrant', description: 'Contraste pop entre imagem e mensagem.', content: { variant: 'split', theme: 'vibrant', imagePosition: 'left' } },
    ],

    cta: [
        // CORPORATE (5)
        { id: 'ct-corp-1', name: 'Corporate Direct Indigo', theme: 'corporate', description: 'CTA clássico com azul institucional.', content: { variant: 'default', theme: 'corporate', backgroundColor: '#4f46e5' } },
        { id: 'ct-corp-2', name: 'Corporate Executive Dark', theme: 'corporate', description: 'Visual sóbrio e autoritário em preto.', content: { variant: 'default', theme: 'corporate', backgroundColor: '#000000' } },
        { id: 'ct-corp-3', name: 'Corporate Action Clean', theme: 'corporate', description: 'Fundo branco com botão de destaque.', content: { variant: 'default', theme: 'corporate', backgroundColor: '#ffffff', buttonColor: '#4f46e5', buttonTextColor: '#fff' } },
        { id: 'ct-corp-4', name: 'Corporate Sky Focus', theme: 'corporate', description: 'Cores suaves para conversão amigável.', content: { variant: 'default', theme: 'corporate', backgroundColor: '#f0f9ff', buttonColor: '#4f46e5', buttonTextColor: '#fff' } },
        { id: 'ct-corp-5', name: 'Corporate Brand Blue', theme: 'corporate', description: 'Cor da marca Alrion integrada.', content: { variant: 'default', theme: 'corporate', backgroundColor: '#009BDB' } },

        // GLASS (5)
        { id: 'ct-glass-1', name: 'Glass Crystal Call', theme: 'glass', description: 'Visual vítreo sobre fundo dinâmico.', content: { variant: 'glass', theme: 'glass' } },
        { id: 'ct-glass-2', name: 'Glass Dark Frost', theme: 'glass', description: 'Efeito fosco escuro de alta sofisticação.', content: { variant: 'glass', theme: 'glass', backgroundColor: 'rgba(0,0,0,0.4)' } },
        { id: 'ct-glass-3', name: 'Glass Ethereal Mist', theme: 'glass', description: 'Transparência suave e visual onírico.', content: { variant: 'glass', theme: 'glass', backgroundColor: 'rgba(255,255,255,0.1)' } },
        { id: 'ct-glass-4', name: 'Glass Gradient Glow', theme: 'glass', description: 'Vidro integrado a gradientes de cor.', content: { variant: 'glass', theme: 'glass', backgroundColor: 'rgba(99,102,241,0.2)' } },
        { id: 'ct-glass-5', name: 'Glass Pure Reflection', theme: 'glass', description: 'Reflexos sutis em layout minimalista.', content: { variant: 'glass', theme: 'glass', backgroundColor: 'rgba(255,255,255,0.05)' } },

        // MINIMAL (5)
        { id: 'ct-min-1', name: 'Minimal Pure Center', theme: 'minimal', description: 'Foco total no botão e mensagem curta.', content: { variant: 'default', theme: 'minimal', backgroundColor: '#ffffff' } },
        { id: 'ct-min-2', name: 'Minimal Soft Gray', theme: 'minimal', description: 'Tons de cinza para ação não intrusiva.', content: { variant: 'default', theme: 'minimal', backgroundColor: '#f9fafb' } },
        { id: 'ct-min-3', name: 'Minimal High Contrast', theme: 'minimal', description: 'Impacto total em preto e branco.', content: { variant: 'default', theme: 'minimal', backgroundColor: '#111111', buttonColor: '#ffffff', buttonTextColor: '#000' } },
        { id: 'ct-min-4', name: 'Minimal Line Art', theme: 'minimal', description: 'Minimalismo com foco em contornos.', content: { variant: 'default', theme: 'minimal', backgroundColor: '#fafafa' } },
        { id: 'ct-min-5', name: 'Minimal Essential Indigo', theme: 'minimal', description: 'Toque de cor sobre base minimalista.', content: { variant: 'default', theme: 'minimal', backgroundColor: '#ffffff', buttonColor: '#6366f1', buttonTextColor: '#fff' } },

        // TECH (5)
        { id: 'ct-tech-1', name: 'Tech Cyber Neon', theme: 'tech', description: 'Visual futurista com acento cyan.', content: { variant: 'default', theme: 'tech', backgroundColor: '#000000', buttonColor: '#22d3ee', buttonTextColor: '#000' } },
        { id: 'ct-tech-2', name: 'Tech Data Signal', theme: 'tech', description: 'Visual de terminal técnico para conversão.', content: { variant: 'default', theme: 'tech', backgroundColor: '#020617' } },
        { id: 'ct-tech-3', name: 'Tech Deep Logic', theme: 'tech', description: 'Cores profundas e foco em performance.', content: { variant: 'default', theme: 'tech', backgroundColor: '#0f172a' } },
        { id: 'ct-tech-4', name: 'Tech HUD Interface', theme: 'tech', description: 'Estilo de cockpit de alta tecnologia.', content: { variant: 'default', theme: 'tech', backgroundColor: '#0a0a0a' } },
        { id: 'ct-tech-5', name: 'Tech Minimal Protocol', theme: 'tech', description: 'Simplicidade técnica direto ao ponto.', content: { variant: 'default', theme: 'tech', backgroundColor: '#111827' } },

        // NEOBRUTALIST (5)
        { id: 'ct-neo-1', name: 'Neo Yellow Power', theme: 'neobrutalist', description: 'Amarelo vibrante com sombras pesadas.', content: { variant: 'default', theme: 'neobrutalist', backgroundColor: '#facc15' } },
        { id: 'ct-neo-2', name: 'Neo Red Aggressive', theme: 'neobrutalist', description: 'Design ousado em vermelho puro.', content: { variant: 'default', theme: 'neobrutalist', backgroundColor: '#ef4444' } },
        { id: 'ct-neo-3', name: 'Neo Brutal White', theme: 'neobrutalist', description: 'Branco bruto com bordas maciças.', content: { variant: 'default', theme: 'neobrutalist', backgroundColor: '#ffffff', buttonColor: '#000', buttonTextColor: '#fff' } },
        { id: 'ct-neo-4', name: 'Neo Cyan Pop', theme: 'neobrutalist', description: 'Impacto pop em cyan elétrico.', content: { variant: 'default', theme: 'neobrutalist', backgroundColor: '#22d3ee' } },
        { id: 'ct-neo-5', name: 'Neo Black Impact', theme: 'neobrutalist', description: 'Preto total com botões vibrantes.', content: { variant: 'default', theme: 'neobrutalist', backgroundColor: '#000000', buttonColor: '#facc15', buttonTextColor: '#000' } },

        // LUXURY (5)
        { id: 'ct-lux-1', name: 'Luxury Gold Night', theme: 'luxury', description: 'Preto real com acentos dourados.', content: { variant: 'default', theme: 'luxury', backgroundColor: '#000000', buttonColor: '#fefefe', buttonTextColor: '#000' } },
        { id: 'ct-lux-2', name: 'Luxury Royal Navy', theme: 'luxury', description: 'Azul marinho e elegância clássica.', content: { variant: 'default', theme: 'luxury', backgroundColor: '#020617' } },
        { id: 'ct-lux-3', name: 'Luxury Silk Center', theme: 'luxury', description: 'Minimalismo de luxo em tons seda.', content: { variant: 'default', theme: 'luxury', backgroundColor: '#fcfcfc', buttonColor: '#000', buttonTextColor: '#fff' } },
        { id: 'ct-lux-4', name: 'Luxury Marble Call', theme: 'luxury', description: 'Estética clássica de mármore e ouro.', content: { variant: 'default', theme: 'luxury', backgroundColor: '#fdfcfe' } },
        { id: 'ct-lux-5', name: 'Luxury Velvet Action', theme: 'luxury', description: 'Visual aveludado profundo e poético.', content: { variant: 'default', theme: 'luxury', backgroundColor: '#2e1065' } },

        // CLEAN (5)
        { id: 'ct-clean-1', name: 'Clean Soft Sky', theme: 'clean', description: 'Atmosfera leve e arejada para ação.', content: { variant: 'default', theme: 'clean', backgroundColor: '#f0f9ff' } },
        { id: 'ct-clean-2', name: 'Clean Modern White', theme: 'clean', description: 'Design contemporâneo limpo e claro.', content: { variant: 'default', theme: 'clean', backgroundColor: '#ffffff' } },
        { id: 'ct-clean-3', name: 'Clean Indigo Zen', theme: 'clean', description: 'Visual focado com toques de indigo.', content: { variant: 'default', theme: 'clean', backgroundColor: '#f5f3ff' } },
        { id: 'ct-clean-4', name: 'Clean Nature Flow', theme: 'clean', description: 'Cores orgânicas e visual fluído.', content: { variant: 'default', theme: 'clean', backgroundColor: '#f8fafc' } },
        { id: 'ct-clean-5', name: 'Clean Minimal Action', theme: 'clean', description: 'O máximo de simplicidade no CTA.', content: { variant: 'default', theme: 'clean', backgroundColor: '#ffffff', buttonColor: '#000', buttonTextColor: '#fff' } },

        // VIBRANT (5)
        { id: 'ct-vib-1', name: 'Vibrant Orange energy', theme: 'vibrant', description: 'Energia pura em laranja saturado.', content: { variant: 'default', theme: 'vibrant', backgroundColor: '#f97316' } },
        { id: 'ct-vib-2', name: 'Vibrant Purple Pulse', theme: 'vibrant', description: 'Layout vibrante em tons roxos.', content: { variant: 'default', theme: 'vibrant', backgroundColor: '#a855f7' } },
        { id: 'ct-vib-3', name: 'Vibrant Pink Flash', theme: 'vibrant', description: 'Destaque total com rosa choque.', content: { variant: 'default', theme: 'vibrant', backgroundColor: '#ec4899' } },
        { id: 'ct-vib-4', name: 'Vibrant Yellow Sun', theme: 'vibrant', description: 'Otimismo em cores solares.', content: { variant: 'default', theme: 'vibrant', backgroundColor: '#eab308' } },
        { id: 'ct-vib-5', name: 'Vibrant Indigo Dream', theme: 'vibrant', description: 'Visual onírico com cores intensas.', content: { variant: 'default', theme: 'vibrant', backgroundColor: '#6366f1' } },
    ],

    footer: [
        // CORPORATE (5)
        { id: 'ft-corp-1', name: 'Corporate Standard White', theme: 'corporate', description: 'Rodapé limpo e profissional com fundo branco.', content: { variant: 'default', theme: 'corporate', backgroundColor: '#ffffff' } },
        { id: 'ft-corp-2', name: 'Corporate Mega Menu Pro', theme: 'corporate', description: 'Organização em colunas para sites complexos.', content: { variant: 'mega', theme: 'corporate' } },
        { id: 'ft-corp-3', name: 'Corporate Dark Executive', theme: 'corporate', description: 'Visual sóbrio e autoritário em cinza escuro.', content: { variant: 'centered', theme: 'corporate', backgroundColor: '#111827' } },
        { id: 'ft-corp-4', name: 'Corporate Blue Business', theme: 'corporate', description: 'Rodapé integrado com azul institucional.', content: { variant: 'default', theme: 'corporate', backgroundColor: '#f8fafc' } },
        { id: 'ft-corp-5', name: 'Corporate Minimal Link', theme: 'corporate', description: 'Apenas os links essenciais para foco total.', content: { variant: 'centered', theme: 'corporate' } },

        // GLASS (5)
        { id: 'ft-glass-1', name: 'Glass Frosted Bottom', theme: 'glass', description: 'Efeito de vidro fosco flutuante na base.', content: { variant: 'mega', theme: 'glass' } },
        { id: 'ft-glass-2', name: 'Glass Translucent Center', theme: 'glass', description: 'Rodapé centralizado com leve transparência.', content: { variant: 'centered', theme: 'glass' } },
        { id: 'ft-glass-3', name: 'Glass Dark Ethereal', theme: 'glass', description: 'Visual noturno com reflexos sutis.', content: { variant: 'centered', theme: 'glass', backgroundColor: 'rgba(0,0,0,0.8)' } },
        { id: 'ft-glass-4', name: 'Glass Minimal Prism', theme: 'glass', description: 'Links sobre base vítrea minimalista.', content: { variant: 'default', theme: 'glass' } },
        { id: 'ft-glass-5', name: 'Glass Gradient Base', theme: 'glass', description: 'Integração de vidro com gradientes de fundo.', content: { variant: 'mega', theme: 'glass', backgroundColor: 'rgba(255,255,255,0.05)' } },

        // MINIMAL (5)
        { id: 'ft-min-1', name: 'Minimal Pure White', theme: 'minimal', description: 'O máximo de simplicidade e organização.', content: { variant: 'default', theme: 'minimal', backgroundColor: '#ffffff', textColor: '#666' } },
        { id: 'ft-min-2', name: 'Minimal Soft Gray', theme: 'minimal', description: 'Tons de cinza leve para fechamento suave.', content: { variant: 'default', theme: 'minimal', backgroundColor: '#f9fafb', textColor: '#999' } },
        { id: 'ft-min-3', name: 'Minimal Dark Center', theme: 'minimal', description: 'Rodapé escuro centralizado e elegante.', content: { variant: 'centered', theme: 'minimal', backgroundColor: '#111111' } },
        { id: 'ft-min-4', name: 'Minimal Editorial Art', theme: 'minimal', description: 'Design de revista com foco em tipografia.', content: { variant: 'mega', theme: 'minimal' } },
        { id: 'ft-min-5', name: 'Minimal Essential Duo', theme: 'minimal', description: 'Apenas logo e copyright para pureza total.', content: { variant: 'default', theme: 'minimal' } },

        // TECH (5)
        { id: 'ft-tech-1', name: 'Tech System Console', theme: 'tech', description: 'Visual de terminal técnico para devs.', content: { variant: 'centered', theme: 'tech', backgroundColor: '#0a0a0a' } },
        { id: 'ft-tech-2', name: 'Tech Data Grid Bottom', theme: 'tech', description: 'Organização em módulos técnicos de dados.', content: { variant: 'mega', theme: 'tech', backgroundColor: '#020617' } },
        { id: 'ft-tech-3', name: 'Tech Cyber Protocol', theme: 'tech', description: 'Estética futurista com acentos cyan.', content: { variant: 'centered', theme: 'tech', backgroundColor: '#000000' } },
        { id: 'ft-tech-4', name: 'Tech Deep Logic Row', theme: 'tech', description: 'Links horizontais precisos e eficientes.', content: { variant: 'default', theme: 'tech', backgroundColor: '#111827' } },
        { id: 'ft-tech-5', name: 'Tech HUD Interface', theme: 'tech', description: 'Fechamento de site estilo painel de controle.', content: { variant: 'mega', theme: 'tech' } },

        // NEOBRUTALIST (5)
        { id: 'ft-neo-1', name: 'Neo Brutal Blocks', theme: 'neobrutalist', description: 'Rodapé com divisões marcantes e sombras.', content: { variant: 'mega', theme: 'neobrutalist', backgroundColor: '#ffffff' } },
        { id: 'ft-neo-2', name: 'Neo Pop Yellow Footer', theme: 'neobrutalist', description: 'Impacto total em amarelo e preto.', content: { variant: 'centered', theme: 'neobrutalist', backgroundColor: '#facc15' } },
        { id: 'ft-neo-3', name: 'Neo Contrast Center', theme: 'neobrutalist', description: 'Puro contraste para fechamento impactante.', content: { variant: 'centered', theme: 'neobrutalist', backgroundColor: '#ffffff' } },
        { id: 'ft-neo-4', name: 'Neo Cyan Row', theme: 'neobrutalist', description: 'Visual pop em cyan e bordas espessas.', content: { variant: 'default', theme: 'neobrutalist', backgroundColor: '#22d3ee' } },
        { id: 'ft-neo-5', name: 'Neo Black Punch', theme: 'neobrutalist', description: 'Design agressivo em preto e branco.', content: { variant: 'mega', theme: 'neobrutalist', backgroundColor: '#000000' } },

        // LUXURY (5)
        { id: 'ft-lux-1', name: 'Luxury Gold Leaf', theme: 'luxury', description: 'Sofisticação real com detalhes dourados.', content: { variant: 'centered', theme: 'luxury', backgroundColor: '#000000' } },
        { id: 'ft-lux-2', name: 'Luxury Royal Navy', theme: 'luxury', description: 'Azul marinho profundo e organização mega.', content: { variant: 'mega', theme: 'luxury', backgroundColor: '#020617' } },
        { id: 'ft-lux-3', name: 'Luxury Minimal Silk', theme: 'luxury', description: 'Minimalismo premium em tons pérola.', content: { variant: 'default', theme: 'luxury', backgroundColor: '#fcfcfc' } },
        { id: 'ft-lux-4', name: 'Luxury Marble Layout', theme: 'luxury', description: 'Estética clássica de mármore e seda.', content: { variant: 'mega', theme: 'luxury', backgroundColor: '#fdfcfe' } },
        { id: 'ft-lux-5', name: 'Luxury Velvet Night', theme: 'luxury', description: 'Rodapé aveludado e poético com serifas.', content: { variant: 'centered', theme: 'luxury', backgroundColor: '#2e1065' } },

        // CLEAN (5)
        { id: 'ft-clean-1', name: 'Clean Soft Azure', theme: 'clean', description: 'Leveza total com tons de céu.', content: { variant: 'default', theme: 'clean', backgroundColor: '#f0f9ff' } },
        { id: 'ft-clean-2', name: 'Clean Modern Mega', theme: 'clean', description: 'Grid contemporâneo organizado e claro.', content: { variant: 'mega', theme: 'clean', backgroundColor: '#ffffff' } },
        { id: 'ft-clean-3', name: 'Clean Zen Center', theme: 'clean', description: 'Foco no essencial e organização zen.', content: { variant: 'centered', theme: 'clean' } },
        { id: 'ft-clean-4', name: 'Clean Nature Row', theme: 'clean', description: 'Cores orgânicas e visual fluído.', content: { variant: 'default', theme: 'clean', backgroundColor: '#f8fafc' } },
        { id: 'ft-clean-5', name: 'Clean Minimalism', theme: 'clean', description: 'Fechamento ultra-simples para sites modernos.', content: { variant: 'centered', theme: 'clean' } },

        // VIBRANT (5)
        { id: 'ft-vib-1', name: 'Vibrant Orange energy', theme: 'vibrant', description: 'Energia pura em laranja saturado.', content: { variant: 'centered', theme: 'vibrant', backgroundColor: '#f97316' } },
        { id: 'ft-vib-2', name: 'Vibrant Purple Pulse', theme: 'vibrant', description: 'Layout vibrante em tons roxos.', content: { variant: 'mega', theme: 'vibrant', backgroundColor: '#a855f7' } },
        { id: 'ft-vib-3', name: 'Vibrant Pink Flash', theme: 'vibrant', description: 'Destaque total com rosa choque.', content: { variant: 'centered', theme: 'vibrant', backgroundColor: '#ec4899' } },
        { id: 'ft-vib-4', name: 'Vibrant Yellow Sun', theme: 'vibrant', description: 'Otimismo em cores solares.', content: { variant: 'default', theme: 'vibrant', backgroundColor: '#eab308' } },
        { id: 'ft-vib-5', name: 'Vibrant Indigo Dream', theme: 'vibrant', description: 'Visual onírico com cores intensas.', content: { variant: 'mega', theme: 'vibrant', backgroundColor: '#6366f1' } },
    ],

    gallery: [
        // CORPORATE (5)
        { id: 'g-corp-1', name: 'Corporate Portfolio Grid', theme: 'corporate', description: 'Grid clássico para cases de sucesso.', content: { variant: 'default', theme: 'corporate' } },
        { id: 'g-corp-2', name: 'Corporate Action Gallery', theme: 'corporate', description: 'Imagens clicáveis com modal informativo.', content: { variant: 'default', theme: 'corporate', clickableImages: true, modalType: 'split' } },
        { id: 'g-corp-3', name: 'Corporate Dark Showcase', theme: 'corporate', description: 'Exposição em fundo escuro para elegância.', content: { variant: 'default', theme: 'corporate', backgroundColor: '#0f172a' } },
        { id: 'g-corp-4', name: 'Corporate Clean Mosaic', theme: 'corporate', description: 'Mosaico organizado e profissional.', content: { variant: 'default', theme: 'corporate', backgroundColor: '#f8fafc' } },
        { id: 'g-corp-5', name: 'Corporate Full Impact', theme: 'corporate', description: 'Imagens em tela cheia para foco máximo.', content: { variant: 'default', theme: 'corporate', clickableImages: true, modalType: 'fullscreen' } },

        // GLASS (5)
        { id: 'g-glass-1', name: 'Glass Masonry Night', theme: 'glass', description: 'Mosaico translúcido sobre fundo escuro.', content: { variant: 'masonry-dark', theme: 'glass' } },
        { id: 'g-glass-2', name: 'Glass Crystal Focus', theme: 'glass', description: 'Foco individual com efeitos de refração.', content: { variant: 'default', theme: 'glass', clickableImages: true } },
        { id: 'g-glass-3', name: 'Glass Frosted Grid', theme: 'glass', description: 'Efeito de vidro fosco entre as imagens.', content: { variant: 'default', theme: 'glass', backgroundColor: 'rgba(255,255,255,0.05)' } },
        { id: 'g-glass-4', name: 'Glass Ethereal Split', theme: 'glass', description: 'Modal dividido com visual etéreo.', content: { variant: 'default', theme: 'glass', clickableImages: true, modalType: 'split' } },
        { id: 'g-glass-5', name: 'Glass Prism Display', theme: 'glass', description: 'Exibição dinâmica com visual vítreo.', content: { variant: 'masonry-dark', theme: 'glass', backgroundColor: 'rgba(99,102,241,0.1)' } },

        // MINIMAL (5)
        { id: 'g-min-1', name: 'Minimal Editorial Art', theme: 'minimal', description: 'Estética de galeria de arte contemporânea.', content: { variant: 'minimal-editorial', theme: 'minimal' } },
        { id: 'g-min-2', name: 'Minimal Pure Grid', theme: 'minimal', description: 'Grid rigoroso e limpo em fundo branco.', content: { variant: 'default', theme: 'minimal', backgroundColor: '#ffffff' } },
        { id: 'g-min-3', name: 'Minimal Zen Masonry', theme: 'minimal', description: 'Mosaico fluído e equilibrado.', content: { variant: 'minimal-editorial', theme: 'minimal', backgroundColor: '#fafafa' } },
        { id: 'g-min-4', name: 'Minimal Soft Focus', theme: 'minimal', description: 'Foco suave com sombras delicadas.', content: { variant: 'default', theme: 'minimal', clickableImages: true } },
        { id: 'g-min-5', name: 'Minimal Gray Scale', theme: 'minimal', description: 'Portfólio em tons de cinza sofisticados.', content: { variant: 'minimal-editorial', theme: 'minimal', backgroundColor: '#f3f4f6' } },

        // TECH (5)
        { id: 'g-tech-1', name: 'Tech Matrix Masonry', theme: 'tech', description: 'Mosaico dinâmico com visual de sistema.', content: { variant: 'masonry-dark', theme: 'tech' } },
        { id: 'g-tech-2', name: 'Tech HUD Showcase', theme: 'tech', description: 'Galeria técnica com estilo de interface.', content: { variant: 'default', theme: 'tech', backgroundColor: '#000000' } },
        { id: 'g-tech-3', name: 'Tech Code Gallery', theme: 'tech', description: 'Visual de terminal aplicado a imagens.', content: { variant: 'masonry-dark', theme: 'tech', backgroundColor: '#0a0a0a' } },
        { id: 'g-tech-4', name: 'Tech Visual Protocol', theme: 'tech', description: 'Organização técnica com modal informativo.', content: { variant: 'default', theme: 'tech', clickableImages: true, modalType: 'split' } },
        { id: 'g-tech-5', name: 'Tech Logic Grid', theme: 'tech', description: 'Grid preciso para especificações visuais.', content: { variant: 'default', theme: 'tech', backgroundColor: '#111827' } },

        // NEOBRUTALIST (5)
        { id: 'g-neo-1', name: 'Neo Power Grid', theme: 'neobrutalist', description: 'Imagens com bordas 4px e sombras brutas.', content: { variant: 'default', theme: 'neobrutalist', backgroundColor: '#ffffff' } },
        { id: 'g-neo-2', name: 'Neo Pop Masonry', theme: 'neobrutalist', description: 'Mosaico vibrante em fundo amarelo.', content: { variant: 'masonry-dark', theme: 'neobrutalist', backgroundColor: '#facc15' } },
        { id: 'g-neo-3', name: 'Neo Brutal Focus', theme: 'neobrutalist', description: 'Foco individual com alto contraste.', content: { variant: 'default', theme: 'neobrutalist', clickableImages: true, modalType: 'split' } },
        { id: 'g-neo-4', name: 'Neo Cyan Display', theme: 'neobrutalist', description: 'Galeria pop em cor cyan energética.', content: { variant: 'default', theme: 'neobrutalist', backgroundColor: '#22d3ee' } },
        { id: 'g-neo-5', name: 'Neo Black Impact', theme: 'neobrutalist', description: 'Exposição impactante em fundo preto.', content: { variant: 'masonry-dark', theme: 'neobrutalist', backgroundColor: '#000000' } },

        // LUXURY (5)
        { id: 'g-lux-1', name: 'Luxury Palace Gallery', theme: 'luxury', description: 'Apresentação nobre com toques dourados.', content: { variant: 'minimal-editorial', theme: 'luxury' } },
        { id: 'g-lux-2', name: 'Luxury Royal Night', theme: 'luxury', description: 'Showcase profundo para marcas de elite.', content: { variant: 'masonry-dark', theme: 'luxury', backgroundColor: '#000000' } },
        { id: 'g-lux-3', name: 'Luxury Marble Grid', theme: 'luxury', description: 'Organização clássica e refinada.', content: { variant: 'default', theme: 'luxury', backgroundColor: '#fdfcfe' } },
        { id: 'g-lux-4', name: 'Luxury Elite Split', theme: 'luxury', description: 'Modal dividido para narrativa de luxo.', content: { variant: 'default', theme: 'luxury', clickableImages: true, modalType: 'split' } },
        { id: 'g-lux-5', name: 'Luxury Silk Art', theme: 'luxury', description: 'Minimalismo de luxo em tons suaves.', content: { variant: 'minimal-editorial', theme: 'luxury', backgroundColor: '#fcfcfc' } },

        // CLEAN (5)
        { id: 'g-clean-1', name: 'Clean Soft Azure', theme: 'clean', description: 'Atmosfera leve e visual refrescante.', content: { variant: 'default', theme: 'clean', backgroundColor: '#f0f9ff' } },
        { id: 'g-clean-2', name: 'Clean Nature Masonry', theme: 'clean', description: 'Mosaico fluído e equilibrado.', content: { variant: 'minimal-editorial', theme: 'clean' } },
        { id: 'g-clean-3', name: 'Clean Urban Grid', theme: 'clean', description: 'Organização contemporânea e clara.', content: { variant: 'default', theme: 'clean', backgroundColor: '#ffffff' } },
        { id: 'g-clean-4', name: 'Clean Modern Focus', theme: 'clean', description: 'Foco no detalhe com visual arejado.', content: { variant: 'default', theme: 'clean', clickableImages: true } },
        { id: 'g-clean-5', name: 'Clean Indigo Zen', theme: 'clean', description: 'Visual zen para portfólios modernos.', content: { variant: 'minimal-editorial', theme: 'clean', backgroundColor: '#f5f3ff' } },

        // VIBRANT (5)
        { id: 'g-vib-1', name: 'Vibrant Pop Grid', theme: 'vibrant', description: 'Energia máxima em grid colorido.', content: { variant: 'default', theme: 'vibrant', backgroundColor: '#f97316' } },
        { id: 'g-vib-2', name: 'Vibrant Pulse Masonry', theme: 'vibrant', description: 'Mosaico dinâmico em tons roxos.', content: { variant: 'masonry-dark', theme: 'vibrant', backgroundColor: '#a855f7' } },
        { id: 'g-vib-3', name: 'Vibrant Pink Flash', theme: 'vibrant', description: 'Destaque total com rosa choque.', content: { variant: 'default', theme: 'vibrant', backgroundColor: '#ec4899' } },
        { id: 'g-vib-4', name: 'Vibrant Yellow Sun', theme: 'vibrant', description: 'Alegria e otimismo visual.', content: { variant: 'default', theme: 'vibrant', backgroundColor: '#eab308' } },
        { id: 'g-vib-5', name: 'Vibrant Indigo Dream', theme: 'vibrant', description: 'Visual onírico intenso e marcante.', content: { variant: 'masonry-dark', theme: 'vibrant', backgroundColor: '#6366f1' } },
    ],

    testimonials: [
        // CORPORATE (5)
        { id: 't-corp-1', name: 'Corporate Trust Cards', theme: 'corporate', description: 'Proof social com visual profissional.', content: { variant: 'default', theme: 'corporate' } },
        { id: 't-corp-2', name: 'Corporate Minimal Quote', theme: 'corporate', description: 'Citação única de alto impacto executivo.', content: { variant: 'minimal', theme: 'corporate' } },
        { id: 't-corp-3', name: 'Corporate Blue Proof', theme: 'corporate', description: 'Feedback em tons institucionais suaves.', content: { variant: 'default', theme: 'corporate', backgroundColor: '#f0f9ff' } },
        { id: 't-corp-4', name: 'Corporate Dark Review', theme: 'corporate', description: 'Visual sóbrio para reviews premium.', content: { variant: 'dark', theme: 'corporate' } },
        { id: 't-corp-5', name: 'Corporate Column List', theme: 'corporate', description: 'Múltiplos depoimentos em organização clara.', content: { variant: 'default', theme: 'corporate', backgroundColor: '#ffffff' } },

        // GLASS (5)
        { id: 't-glass-1', name: 'Glass Frosted Review', theme: 'glass', description: 'Review sobre base vítrea moderna.', content: { variant: 'default', theme: 'glass' } },
        { id: 't-glass-2', name: 'Glass Ethereal Quote', theme: 'glass', description: 'Citação artística com visual etéreo.', content: { variant: 'minimal', theme: 'glass' } },
        { id: 't-glass-3', name: 'Glass Dark Frost', theme: 'glass', description: 'Reviews em vidro escuro e refinado.', content: { variant: 'dark', theme: 'glass' } },
        { id: 't-glass-4', name: 'Glass Floating Proof', theme: 'glass', description: 'Social proof flutuante e translúcido.', content: { variant: 'default', theme: 'glass', backgroundColor: 'rgba(255,255,255,0.05)' } },
        { id: 't-glass-5', name: 'Glass Prism Social', theme: 'glass', description: 'Feedbacks com efeitos de refração vítrea.', content: { variant: 'default', theme: 'glass', backgroundColor: 'rgba(99,102,241,0.1)' } },

        // MINIMAL (5)
        { id: 't-min-1', name: 'Minimal Pure Quote', theme: 'minimal', description: 'O essencial da voz do cliente.', content: { variant: 'minimal', theme: 'minimal' } },
        { id: 't-min-2', name: 'Minimal Soft Grid', theme: 'minimal', description: 'Grid de depoimentos leve e limpo.', content: { variant: 'default', theme: 'minimal', backgroundColor: '#ffffff' } },
        { id: 't-min-3', name: 'Minimal Editorial Art', theme: 'minimal', description: 'Estética de revista para feedbacks.', content: { variant: 'minimal', theme: 'minimal', backgroundColor: '#fafafa' } },
        { id: 't-min-4', name: 'Minimal Gray Story', theme: 'minimal', description: 'Relatos em escala de cinza sofisticada.', content: { variant: 'default', theme: 'minimal', backgroundColor: '#f3f4f6' } },
        { id: 't-min-5', name: 'Minimal Essential Duo', theme: 'minimal', description: 'Pares de depoimentos em foco total.', content: { variant: 'default', theme: 'minimal' } },

        // TECH (5)
        { id: 't-tech-1', name: 'Tech System Log Proof', theme: 'tech', description: 'Feedbacks com visual de terminal.', content: { variant: 'dark', theme: 'tech' } },
        { id: 't-tech-2', name: 'Tech Signal Review', theme: 'tech', description: 'Apresentação técnica de validação.', content: { variant: 'default', theme: 'tech', backgroundColor: '#000000' } },
        { id: 't-tech-3', name: 'Tech Cyber Protocol', theme: 'tech', description: 'Social proof futurista com acento cyan.', content: { variant: 'dark', theme: 'tech', backgroundColor: '#0a0a0a' } },
        { id: 't-tech-4', name: 'Tech Logic Minimal', theme: 'tech', description: 'Citação técnica direta e precisa.', content: { variant: 'minimal', theme: 'tech' } },
        { id: 't-tech-5', name: 'Tech HUD Validation', theme: 'tech', description: 'Reviews em estilo painel de controle.', content: { variant: 'default', theme: 'tech', backgroundColor: '#020617' } },

        // NEOBRUTALIST (5)
        { id: 't-neo-1', name: 'Neo Power Cards', theme: 'neobrutalist', description: 'Depoimentos com bordas e sombras brutas.', content: { variant: 'default', theme: 'neobrutalist', backgroundColor: '#ffffff' } },
        { id: 't-neo-2', name: 'Neo Punchy Quote', theme: 'neobrutalist', description: 'Citação bruta em fundo vibrante.', content: { variant: 'minimal', theme: 'neobrutalist', backgroundColor: '#facc15' } },
        { id: 't-neo-3', name: 'Neo Contrast Proof', theme: 'neobrutalist', description: 'Puro contraste para feedbacks marcantes.', content: { variant: 'default', theme: 'neobrutalist' } },
        { id: 't-neo-4', name: 'Neo Cyan Flash', theme: 'neobrutalist', description: 'Review pop em cyan elétrico.', content: { variant: 'default', theme: 'neobrutalist', backgroundColor: '#22d3ee' } },
        { id: 't-neo-5', name: 'Neo Black Impact', theme: 'neobrutalist', description: 'Social proof agressivo em preto.', content: { variant: 'dark', theme: 'neobrutalist', backgroundColor: '#000000' } },

        // LUXURY (5)
        { id: 't-lux-1', name: 'Luxury Royal Proof', theme: 'luxury', description: 'Apresentação nobre com serifas.', content: { variant: 'minimal', theme: 'luxury' } },
        { id: 't-lux-2', name: 'Luxury Gold Trim Review', theme: 'luxury', description: 'Reviews refinadas com toques ouro.', content: { variant: 'default', theme: 'luxury', backgroundColor: '#000000' } },
        { id: 't-lux-3', name: 'Luxury Elite Center', theme: 'luxury', description: 'Citação centralizada e sofisticada.', content: { variant: 'minimal', theme: 'luxury', backgroundColor: '#fcfcfc' } },
        { id: 't-lux-4', name: 'Luxury Marble Story', theme: 'luxury', description: 'Relatos em visual de mármore e seda.', content: { variant: 'default', theme: 'luxury', backgroundColor: '#fdfcfe' } },
        { id: 't-lux-5', name: 'Luxury Velvet Night', theme: 'luxury', description: 'Reviews poéticas em visual aveludado.', content: { variant: 'dark', theme: 'luxury', backgroundColor: '#2e1065' } },

        // CLEAN (5)
        { id: 't-clean-1', name: 'Clean Zenith Review', theme: 'clean', description: 'Visual arejado para feedbacks positivos.', content: { variant: 'default', theme: 'clean' } },
        { id: 't-clean-2', name: 'Clean Soft Sky', theme: 'clean', description: 'Aura leve e refrescante para reviews.', content: { variant: 'default', theme: 'clean', backgroundColor: '#f0f9ff' } },
        { id: 't-clean-3', name: 'Clean Modern Quote', theme: 'clean', description: 'Minimalismo contemporâneo focado.', content: { variant: 'minimal', theme: 'clean' } },
        { id: 't-clean-4', name: 'Clean Zen Proof', theme: 'clean', description: 'Equilíbrio e clareza total no relato.', content: { variant: 'default', theme: 'clean', backgroundColor: '#ffffff' } },
        { id: 't-clean-5', name: 'Clean Indigo Flow', theme: 'clean', description: 'Reviews fluídas com tons de indigo.', content: { variant: 'default', theme: 'clean', backgroundColor: '#f5f3ff' } },

        // VIBRANT (5)
        { id: 't-vib-1', name: 'Vibrant Pop Social', theme: 'vibrant', description: 'Energia pop aplicada à prova social.', content: { variant: 'default', theme: 'vibrant', backgroundColor: '#f97316' } },
        { id: 't-vib-2', name: 'Vibrant Electric Quote', theme: 'vibrant', description: 'Citação vibrante em tons púrpuras.', content: { variant: 'minimal', theme: 'vibrant', backgroundColor: '#a855f7' } },
        { id: 't-vib-3', name: 'Vibrant Pink Power', theme: 'vibrant', description: 'Feedbacks enérgicos em rosa choque.', content: { variant: 'default', theme: 'vibrant', backgroundColor: '#ec4899' } },
        { id: 't-vib-4', name: 'Vibrant Yellow Sun', theme: 'vibrant', description: 'Otimismo compartilhado em cores solares.', content: { variant: 'default', theme: 'vibrant', backgroundColor: '#eab308' } },
        { id: 't-vib-5', name: 'Vibrant Indigo Dream', theme: 'vibrant', description: 'Relatos marcantes com cores intensas.', content: { variant: 'default', theme: 'vibrant', backgroundColor: '#6366f1' } },
    ],

    pricing: [
        // CORPORATE (5)
        { id: 'p-corp-1', name: 'Corporate Standard Plans', theme: 'corporate', description: 'Tabela de preços profissional para B2B.', content: { variant: 'default', theme: 'corporate' } },
        { id: 'p-corp-2', name: 'Corporate SaaS modern', theme: 'corporate', description: 'Visual moderno para serviços de software.', content: { variant: 'saas', theme: 'corporate' } },
        { id: 'p-corp-3', name: 'Corporate Business Focus', theme: 'corporate', description: 'Destaque para o plano mais popular.', content: { variant: 'saas', theme: 'corporate', highlightedIndex: 1 } },
        { id: 'p-corp-4', name: 'Corporate Minimalist Pricing', theme: 'corporate', description: 'Simplicidade e clareza nos valores.', content: { variant: 'minimal', theme: 'corporate' } },
        { id: 'p-corp-5', name: 'Corporate Blue Highlights', theme: 'corporate', description: 'Tons institucionais com ênfase em benefícios.', content: { variant: 'default', theme: 'corporate', backgroundColor: '#f8fafc' } },

        // GLASS (5)
        { id: 'p-glass-1', name: 'Glass Crystal Plans', theme: 'glass', description: 'Tabelas de preços translúcidas e modernas.', content: { variant: 'saas', theme: 'glass' } },
        { id: 'p-glass-2', name: 'Glass Frosted SaaS', theme: 'glass', description: 'Efeito de vidro fosco para planos digitais.', content: { variant: 'saas', theme: 'glass', backgroundColor: 'rgba(255,255,255,0.05)' } },
        { id: 'p-glass-3', name: 'Glass Minimal Prism', theme: 'glass', description: 'Visual vítreo ultra-limpo para preços.', content: { variant: 'minimal', theme: 'glass' } },
        { id: 'p-glass-4', name: 'Glass Ethereal Focus', theme: 'glass', description: 'Pano de fundo vítreo para plano em destaque.', content: { variant: 'saas', theme: 'glass', highlightedIndex: 1 } },
        { id: 'p-glass-5', name: 'Glass Dark Translucent', theme: 'glass', description: 'Planos em vidro escurecido sofisticado.', content: { variant: 'default', theme: 'glass', backgroundColor: 'rgba(0,0,0,0.4)' } },

        // MINIMAL (5)
        { id: 'p-min-1', name: 'Minimal Pure Pricing', theme: 'minimal', description: 'O máximo de clareza e honestidade visual.', content: { variant: 'minimal', theme: 'minimal' } },
        { id: 'p-min-2', name: 'Minimal Line Plans', theme: 'minimal', description: 'Divisões por linhas finas em fundo branco.', content: { variant: 'default', theme: 'minimal', backgroundColor: '#ffffff' } },
        { id: 'p-min-3', name: 'Minimal Soft SaaS', theme: 'minimal', description: 'Visual SaaS equilibrado e zen.', content: { variant: 'saas', theme: 'minimal' } },
        { id: 'p-min-4', name: 'Minimal Gray scale', theme: 'minimal', description: 'Tons de cinza para foco total no valor.', content: { variant: 'default', theme: 'minimal', backgroundColor: '#f9fafb' } },
        { id: 'p-min-5', name: 'Minimal Essential Duo', theme: 'minimal', description: 'Apenas dois planos para escolha rápida.', content: { variant: 'minimal', theme: 'minimal' } },

        // TECH (5)
        { id: 'p-tech-1', name: 'Tech System Pricing', theme: 'tech', description: 'Tabela de preços com visual de terminal.', content: { variant: 'saas', theme: 'tech' } },
        { id: 'p-tech-2', name: 'Tech HUD Modules', theme: 'tech', description: 'Planos em estilo painel de controle futurista.', content: { variant: 'default', theme: 'tech', backgroundColor: '#000000' } },
        { id: 'p-tech-3', name: 'Tech Cyber Protocol', theme: 'tech', description: 'Visual futurista com acentos neon cyan.', content: { variant: 'saas', theme: 'tech', backgroundColor: '#0a0a0a' } },
        { id: 'p-tech-4', name: 'Tech Logic Minimal', theme: 'tech', description: 'Preços técnicos diretos e sem distrações.', content: { variant: 'minimal', theme: 'tech' } },
        { id: 'p-tech-5', name: 'Tech Data Highlighting', theme: 'tech', description: 'Destaque de módulos para serviços críticos.', content: { variant: 'saas', theme: 'tech', highlightedIndex: 1 } },

        // NEOBRUTALIST (5)
        { id: 'p-neo-1', name: 'Neo Power Plans', theme: 'neobrutalist', description: 'Preços com bordas e sombras brutas.', content: { variant: 'saas', theme: 'neobrutalist', backgroundColor: '#ffffff' } },
        { id: 'p-neo-2', name: 'Neo Pop Yellow Pricing', theme: 'neobrutalist', description: 'Impacto total em fundo amarelo vibrante.', content: { variant: 'default', theme: 'neobrutalist', backgroundColor: '#facc15' } },
        { id: 'p-neo-3', name: 'Neo Contrast SaaS', theme: 'neobrutalist', description: 'Visual SaaS com bordas maciças.', content: { variant: 'saas', theme: 'neobrutalist' } },
        { id: 'p-neo-4', name: 'Neo Cyan Punch', theme: 'neobrutalist', description: 'Preços pop em cyan elétrico.', content: { variant: 'minimal', theme: 'neobrutalist', backgroundColor: '#22d3ee' } },
        { id: 'p-neo-5', name: 'Neo Black Impact', theme: 'neobrutalist', description: 'Planos agressivos em contraste preto/branco.', content: { variant: 'saas', theme: 'neobrutalist', backgroundColor: '#000000' } },

        // LUXURY (5)
        { id: 'p-lux-1', name: 'Luxury Palace Pricing', theme: 'luxury', description: 'Apresentação nobre com toques dourados.', content: { variant: 'default', theme: 'luxury' } },
        { id: 'p-lux-2', name: 'Luxury Royal SaaS', theme: 'luxury', description: 'Software de elite com elegância clássica.', content: { variant: 'saas', theme: 'luxury', backgroundColor: '#000000' } },
        { id: 'p-lux-3', name: 'Luxury Minimal Silk', theme: 'luxury', description: 'Tabelas de planos em tons pérola e seda.', content: { variant: 'minimal', theme: 'luxury' } },
        { id: 'p-lux-4', name: 'Luxury Marble Focus', theme: 'luxury', description: 'Destaque real para o plano exclusivo.', content: { variant: 'saas', theme: 'luxury', highlightedIndex: 1 } },
        { id: 'p-lux-5', name: 'Luxury Velvet Night', theme: 'luxury', description: 'Preços poéticos em visual aveludado.', content: { variant: 'default', theme: 'luxury', backgroundColor: '#2e1065' } },

        // CLEAN (5)
        { id: 'p-clean-1', name: 'Clean Soft Sky Plans', theme: 'clean', description: 'Planos leves para serviços amigáveis.', content: { variant: 'saas', theme: 'clean', backgroundColor: '#f0f9ff' } },
        { id: 'p-clean-2', name: 'Clean Modern SaaS', theme: 'clean', description: 'Layout SaaS contemporâneo e claro.', content: { variant: 'saas', theme: 'clean', backgroundColor: '#ffffff' } },
        { id: 'p-clean-3', name: 'Clean Zen Pricing', theme: 'clean', description: 'Simplicidade total na escolha de planos.', content: { variant: 'minimal', theme: 'clean' } },
        { id: 'p-clean-4', name: 'Clean Azure Focus', theme: 'clean', description: 'Destaque central em azul refrescante.', content: { variant: 'saas', theme: 'clean', highlightedIndex: 1 } },
        { id: 'p-clean-5', name: 'Clean Indigo Value', theme: 'clean', description: 'Tabela de preços integrada e fluída.', content: { variant: 'default', theme: 'clean', backgroundColor: '#f5f3ff' } },

        // VIBRANT (5)
        { id: 'p-vib-1', name: 'Vibrant Pop Plans', theme: 'vibrant', description: 'Energia total na apresentação de preços.', content: { variant: 'saas', theme: 'vibrant', backgroundColor: '#f97316' } },
        { id: 'p-vib-2', name: 'Vibrant Electric SaaS', theme: 'vibrant', description: 'Impacto vibrante em tons púrpuras.', content: { variant: 'saas', theme: 'vibrant', backgroundColor: '#a855f7' } },
        { id: 'p-vib-3', name: 'Vibrant Pink Flash', theme: 'vibrant', description: 'Destaque total com rosa choque.', content: { variant: 'default', theme: 'vibrant', backgroundColor: '#ec4899' } },
        { id: 'p-vib-4', name: 'Vibrant Yellow Sun', theme: 'vibrant', description: 'Otimismo claro na tabela de valores.', content: { variant: 'saas', theme: 'vibrant', backgroundColor: '#eab308' } },
        { id: 'p-vib-5', name: 'Vibrant Indigo Dream', theme: 'vibrant', description: 'Preços com cores intensas e marcantes.', content: { variant: 'saas', theme: 'vibrant', backgroundColor: '#6366f1' } },
    ],
    faq: [
        // CORPORATE (5)
        { id: 'fq-corp-1', name: 'Corporate Accordion Pro', theme: 'corporate', description: 'Perguntas frequentes em colunas organizadas.', content: { variant: 'accordion', theme: 'corporate' } },
        { id: 'fq-corp-2', name: 'Corporate Grid List', theme: 'corporate', description: 'Visual de grade para respostas diretas.', content: { variant: 'default', theme: 'corporate' } },
        { id: 'fq-corp-3', name: 'Corporate Blue Support', theme: 'corporate', description: 'FAQ em tons institucionais amigáveis.', content: { variant: 'accordion', theme: 'corporate', backgroundColor: '#f8fafc' } },
        { id: 'fq-corp-4', name: 'Corporate Dark Logic', theme: 'corporate', description: 'Respostas técnicas em fundo escuro.', content: { variant: 'accordion', theme: 'corporate', backgroundColor: '#111827' } },
        { id: 'fq-corp-5', name: 'Corporate Executive FAQ', theme: 'corporate', description: 'Simplicidade total para dúvidas corporativas.', content: { variant: 'default', theme: 'corporate', backgroundColor: '#ffffff' } },

        // GLASS (5)
        { id: 'fq-glass-1', name: 'Glass Crystal FAQ', theme: 'glass', description: 'Acordeões translúcidos e modernos.', content: { variant: 'accordion', theme: 'glass' } },
        { id: 'fq-glass-2', name: 'Glass Frosted Grid', theme: 'glass', description: 'Respostas sobre base de vidro fosco.', content: { variant: 'default', theme: 'glass', backgroundColor: 'rgba(255,255,255,0.05)' } },
        { id: 'fq-glass-3', name: 'Glass Ethereal List', theme: 'glass', description: 'Dúvidas em visual etéreo e refinado.', content: { variant: 'accordion', theme: 'glass' } },
        { id: 'fq-glass-4', name: 'Glass Dark Translucent', theme: 'glass', description: 'FAQ em vidro escurecido sofisticado.', content: { variant: 'accordion', theme: 'glass', backgroundColor: 'rgba(0,0,0,0.6)' } },
        { id: 'fq-glass-5', name: 'Glass Prism Support', theme: 'glass', description: 'Visual vítreo dinâmico para suporte.', content: { variant: 'default', theme: 'glass', backgroundColor: 'rgba(99,102,241,0.1)' } },

        // MINIMAL (5)
        { id: 'fq-min-1', name: 'Minimal Pure Accordion', theme: 'minimal', description: 'O máximo de clareza e organização.', content: { variant: 'accordion', theme: 'minimal' } },
        { id: 'fq-min-2', name: 'Minimal Line Grid', theme: 'minimal', description: 'Respostas diretas separadas por linhas.', content: { variant: 'default', theme: 'minimal', backgroundColor: '#ffffff' } },
        { id: 'fq-min-3', name: 'Minimal Soft FAQ', theme: 'minimal', description: 'Visual amigável e zen para dúvidas.', content: { variant: 'accordion', theme: 'minimal', backgroundColor: '#fafafa' } },
        { id: 'fq-min-4', name: 'Minimal Gray Column', theme: 'minimal', description: 'Tons de cinza para foco total na resposta.', content: { variant: 'default', theme: 'minimal', backgroundColor: '#f9fafb' } },
        { id: 'fq-min-5', name: 'Minimal Essential Info', theme: 'minimal', description: 'Apenas o essencial para guiar o usuário.', content: { variant: 'accordion', theme: 'minimal' } },

        // TECH (5)
        { id: 'fq-tech-1', name: 'Tech System Accordion', theme: 'tech', description: 'FAQ com visual de terminal técnico.', content: { variant: 'accordion', theme: 'tech' } },
        { id: 'fq-tech-2', name: 'Tech HUD Modules', theme: 'tech', description: 'Respostas em estilo interface futurista.', content: { variant: 'default', theme: 'tech', backgroundColor: '#000000' } },
        { id: 'fq-tech-3', name: 'Tech Cyber Protocol', theme: 'tech', description: 'Suporte técnico com acentos neon cyan.', content: { variant: 'accordion', theme: 'tech', backgroundColor: '#0a0a0a' } },
        { id: 'fq-tech-4', name: 'Tech Logic Minimal', theme: 'tech', description: 'FAQ direto para usuários avançados.', content: { variant: 'default', theme: 'tech' } },
        { id: 'fq-tech-5', name: 'Tech Data Support', theme: 'tech', description: 'Organização técnica de documentação.', content: { variant: 'accordion', theme: 'tech', backgroundColor: '#020617' } },

        // NEOBRUTALIST (5)
        { id: 'fq-neo-1', name: 'Neo Power Accordion', theme: 'neobrutalist', description: 'FAQ com bordas e sombras maciças.', content: { variant: 'accordion', theme: 'neobrutalist', backgroundColor: '#ffffff' } },
        { id: 'fq-neo-2', name: 'Neo Pop Yellow FAQ', theme: 'neobrutalist', description: 'Impacto total em fundo amarelo.', content: { variant: 'default', theme: 'neobrutalist', backgroundColor: '#facc15' } },
        { id: 'fq-neo-3', name: 'Neo Contrast Support', theme: 'neobrutalist', description: 'Puro contraste para dúvidas comuns.', content: { variant: 'accordion', theme: 'neobrutalist' } },
        { id: 'fq-neo-4', name: 'Neo Cyan Punch', theme: 'neobrutalist', description: 'Suporte pop em cyan elétrico.', content: { variant: 'default', theme: 'neobrutalist', backgroundColor: '#22d3ee' } },
        { id: 'fq-neo-5', name: 'Neo Black Impact', theme: 'neobrutalist', description: 'Perguntas agressivas em preto/branco.', content: { variant: 'accordion', theme: 'neobrutalist', backgroundColor: '#000000' } },

        // LUXURY (5)
        { id: 'fq-lux-1', name: 'Luxury Royal Accordion', theme: 'luxury', description: 'Sofisticação real para perguntas.', content: { variant: 'accordion', theme: 'luxury' } },
        { id: 'fq-lux-2', name: 'Luxury Gold Trim FAQ', theme: 'luxury', description: 'Respostas refinadas com toques ouro.', content: { variant: 'default', theme: 'luxury', backgroundColor: '#000000' } },
        { id: 'fq-lux-3', name: 'Luxury Minimal Silk', theme: 'luxury', description: 'Dúvidas em tons pérola e seda.', content: { variant: 'accordion', theme: 'luxury', backgroundColor: '#fcfcfc' } },
        { id: 'fq-lux-4', name: 'Luxury Marble Grid', theme: 'luxury', description: 'Visual de mármore para suporte clássico.', content: { variant: 'default', theme: 'luxury', backgroundColor: '#fdfcfe' } },
        { id: 'fq-lux-5', name: 'Luxury Velvet Night', theme: 'luxury', description: 'Suporte poético em visual aveludado.', content: { variant: 'accordion', theme: 'luxury', backgroundColor: '#2e1065' } },

        // CLEAN (5)
        { id: 'fq-clean-1', name: 'Clean Soft Sky FAQ', theme: 'clean', description: 'Atmosfera leve para tirar dúvidas.', content: { variant: 'accordion', theme: 'clean', backgroundColor: '#f0f9ff' } },
        { id: 'fq-clean-2', name: 'Clean Modern Support', theme: 'clean', description: 'Suporte contemporâneo e claro.', content: { variant: 'default', theme: 'clean', backgroundColor: '#ffffff' } },
        { id: 'fq-clean-3', name: 'Clean Zen Accordion', theme: 'clean', description: 'Simplicidade total e organização zen.', content: { variant: 'accordion', theme: 'clean' } },
        { id: 'fq-clean-4', name: 'Clean Nature List', theme: 'clean', description: 'Respostas fluídas em cores orgânicas.', content: { variant: 'default', theme: 'clean', backgroundColor: '#f8fafc' } },
        { id: 'fq-clean-5', name: 'Clean Indigo Flow', theme: 'clean', description: 'Suporte integrado em tons indigo.', content: { variant: 'accordion', theme: 'clean', backgroundColor: '#f5f3ff' } },

        // VIBRANT (5)
        { id: 'fq-vib-1', name: 'Vibrant Pop Accordion', theme: 'vibrant', description: 'Energia total nas respostas.', content: { variant: 'accordion', theme: 'vibrant', backgroundColor: '#f97316' } },
        { id: 'fq-vib-2', name: 'Vibrant Purple Pulse', theme: 'vibrant', description: 'Suporte dinâmico em tons púrpuras.', content: { variant: 'default', theme: 'vibrant', backgroundColor: '#a855f7' } },
        { id: 'fq-vib-3', name: 'Vibrant Pink FAQ', theme: 'vibrant', description: 'Destaque total com rosa choque.', content: { variant: 'accordion', theme: 'vibrant', backgroundColor: '#ec4899' } },
        { id: 'fq-vib-4', name: 'Vibrant Yellow Grid', theme: 'vibrant', description: 'Otimismo claro nas perguntas frequentes.', content: { variant: 'default', theme: 'vibrant', backgroundColor: '#eab308' } },
        { id: 'fq-vib-5', name: 'Vibrant Indigo Dream', theme: 'vibrant', description: 'FAQ com cores intensas e marcantes.', content: { variant: 'accordion', theme: 'vibrant', backgroundColor: '#6366f1' } },
    ],
    contact: [
        // CORPORATE (5)
        { id: 'c-corp-1', name: 'Corporate Split Form', theme: 'corporate', description: 'Formulário dividido profissional.', content: { variant: 'split', theme: 'corporate' } },
        { id: 'c-corp-2', name: 'Corporate Minimal info', theme: 'corporate', description: 'Apenas os contatos essenciais.', content: { variant: 'minimal', theme: 'corporate' } },
        { id: 'c-corp-3', name: 'Corporate Executive Dark', theme: 'corporate', description: 'Visual sóbrio e autoritário em preto.', content: { variant: 'dark-premium', theme: 'corporate', backgroundColor: '#111827' } },
        { id: 'c-corp-4', name: 'Corporate Blue Business', theme: 'corporate', description: 'Contato em tons azul institucional.', content: { variant: 'split', theme: 'corporate', backgroundColor: '#f8fafc' } },
        { id: 'c-corp-5', name: 'Corporate Global Support', theme: 'corporate', description: 'Informações globais e formulário limpo.', content: { variant: 'split', theme: 'corporate', backgroundColor: '#ffffff' } },

        // GLASS (5)
        { id: 'c-glass-1', name: 'Glass Crystal Contact', theme: 'glass', description: 'Formulário translúcido e moderno.', content: { variant: 'geometric', theme: 'glass' } },
        { id: 'c-glass-2', name: 'Glass Frosted Split', theme: 'glass', description: 'Visual de vidro fosco dividido.', content: { variant: 'split', theme: 'glass' } },
        { id: 'c-glass-3', name: 'Glass Ethereal Mist', theme: 'glass', description: 'Contato em visual etéreo e vítreo.', content: { variant: 'minimal', theme: 'glass' } },
        { id: 'c-glass-4', name: 'Glass Dark Translucent', theme: 'glass', description: 'Vidro escurecido para contatos premium.', content: { variant: 'dark-premium', theme: 'glass' } },
        { id: 'c-glass-5', name: 'Glass Prism geometric', theme: 'glass', description: 'Layout geométrico com reflexos.', content: { variant: 'geometric', theme: 'glass', backgroundColor: 'rgba(99,102,241,0.1)' } },

        // MINIMAL (5)
        { id: 'c-min-1', name: 'Minimal Pure Split', theme: 'minimal', description: 'O máximo de clareza e organização.', content: { variant: 'split', theme: 'minimal' } },
        { id: 'c-min-2', name: 'Minimal Zen Contact', theme: 'minimal', description: 'Contato zen com muito espaço branco.', content: { variant: 'minimal', theme: 'minimal' } },
        { id: 'c-min-3', name: 'Minimal Dark Premium', theme: 'minimal', description: 'Estética premium em preto profundo.', content: { variant: 'dark-premium', theme: 'minimal', backgroundColor: '#111111' } },
        { id: 'c-min-4', name: 'Minimal Gray Column', theme: 'minimal', description: 'Tons de cinza para foco na mensagem.', content: { variant: 'split', theme: 'minimal', backgroundColor: '#f9fafb' } },
        { id: 'c-min-5', name: 'Minimal Essential Info', theme: 'minimal', description: 'Simplicidade total para conexão direta.', content: { variant: 'minimal', theme: 'minimal' } },

        // TECH (5)
        { id: 'c-tech-1', name: 'Tech System Terminal', theme: 'tech', description: 'Contato com visual de terminal.', content: { variant: 'geometric', theme: 'tech' } },
        { id: 'c-tech-2', name: 'Tech HUD Interface', theme: 'tech', description: 'Formulário em estilo painel futurista.', content: { variant: 'split', theme: 'tech', backgroundColor: '#000000' } },
        { id: 'c-tech-3', name: 'Tech Cyber Protocol', theme: 'tech', description: 'Protocolo de contato com neon cyan.', content: { variant: 'dark-premium', theme: 'tech', backgroundColor: '#0a0a0a' } },
        { id: 'c-tech-4', name: 'Tech Logic Minimal', theme: 'tech', description: 'Contato direto para usuários avançados.', content: { variant: 'minimal', theme: 'tech' } },
        { id: 'c-tech-5', name: 'Tech Data Connection', theme: 'tech', description: 'Visual de módulos técnicos de suporte.', content: { variant: 'geometric', theme: 'tech', backgroundColor: '#020617' } },

        // NEOBRUTALIST (5)
        { id: 'c-neo-1', name: 'Neo Power Split', theme: 'neobrutalist', description: 'Contato com bordas e sombras brutas.', content: { variant: 'split', theme: 'neobrutalist', backgroundColor: '#ffffff' } },
        { id: 'c-neo-2', name: 'Neo Pop Yellow Contact', theme: 'neobrutalist', description: 'Impacto total em fundo amarelo.', content: { variant: 'geometric', theme: 'neobrutalist', backgroundColor: '#facc15' } },
        { id: 'c-neo-3', name: 'Neo Contrast Form', theme: 'neobrutalist', description: 'Puro contraste para conexão marcante.', content: { variant: 'split', theme: 'neobrutalist' } },
        { id: 'c-neo-4', name: 'Neo Cyan Punch', theme: 'neobrutalist', description: 'Contato pop em cyan elétrico.', content: { variant: 'minimal', theme: 'neobrutalist', backgroundColor: '#22d3ee' } },
        { id: 'c-neo-5', name: 'Neo Black Impact', theme: 'neobrutalist', description: 'Design agressivo em preto/branco.', content: { variant: 'dark-premium', theme: 'neobrutalist', backgroundColor: '#000000' } },

        // LUXURY (5)
        { id: 'c-lux-1', name: 'Luxury Royal Split', theme: 'luxury', description: 'Sofisticação real para contatos.', content: { variant: 'split', theme: 'luxury' } },
        { id: 'c-lux-2', name: 'Luxury Gold Night', theme: 'luxury', description: 'Contato refinado com toques dourados.', content: { variant: 'dark-premium', theme: 'luxury', backgroundColor: '#000000' } },
        { id: 'c-lux-3', name: 'Luxury Minimal Silk', theme: 'luxury', description: 'Inquéritos em tons pérola e seda.', content: { variant: 'minimal', theme: 'luxury', backgroundColor: '#fcfcfc' } },
        { id: 'c-lux-4', name: 'Luxury Marble Geometric', theme: 'luxury', description: 'Visual de mármore e layout clássico.', content: { variant: 'geometric', theme: 'luxury', backgroundColor: '#fdfcfe' } },
        { id: 'c-lux-5', name: 'Luxury Velvet split', theme: 'luxury', description: 'Conexão poética em visual aveludado.', content: { variant: 'split', theme: 'luxury', backgroundColor: '#2e1065' } },

        // CLEAN (5)
        { id: 'c-clean-1', name: 'Clean Soft Sky Contact', theme: 'clean', description: 'Atmosfera leve para conectar.', content: { variant: 'split', theme: 'clean', backgroundColor: '#f0f9ff' } },
        { id: 'c-clean-2', name: 'Clean Modern Geometric', theme: 'clean', description: 'Contato contemporâneo e claro.', content: { variant: 'geometric', theme: 'clean', backgroundColor: '#ffffff' } },
        { id: 'c-clean-3', name: 'Clean Zen Split', theme: 'clean', description: 'Simplicidade total e organização zen.', content: { variant: 'split', theme: 'clean' } },
        { id: 'c-clean-4', name: 'Clean Nature Info', theme: 'clean', description: 'Dados fluídos em cores orgânicas.', content: { variant: 'minimal', theme: 'clean', backgroundColor: '#f8fafc' } },
        { id: 'c-clean-5', name: 'Clean Indigo Flow', theme: 'clean', description: 'Contato integrado em tons indigo.', content: { variant: 'split', theme: 'clean', backgroundColor: '#f5f3ff' } },

        // VIBRANT (5)
        { id: 'c-vib-1', name: 'Vibrant Pop Split', theme: 'vibrant', description: 'Energia total no formulário.', content: { variant: 'split', theme: 'vibrant', backgroundColor: '#f97316' } },
        { id: 'c-vib-2', name: 'Vibrant Purple Pulse', theme: 'vibrant', description: 'Contato dinâmico em tons púrpuras.', content: { variant: 'geometric', theme: 'vibrant', backgroundColor: '#a855f7' } },
        { id: 'c-vib-3', name: 'Vibrant Pink Flash', theme: 'vibrant', description: 'Destaque total com rosa choque.', content: { variant: 'split', theme: 'vibrant', backgroundColor: '#ec4899' } },
        { id: 'c-vib-4', name: 'Vibrant Yellow Sun', theme: 'vibrant', description: 'Otimismo claro para conexão.', content: { variant: 'split', theme: 'vibrant', backgroundColor: '#eab308' } },
        { id: 'c-vib-5', name: 'Vibrant Indigo Dream', theme: 'vibrant', description: 'Contato com cores intensas e marcantes.', content: { variant: 'geometric', theme: 'vibrant', backgroundColor: '#6366f1' } },
    ],

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
