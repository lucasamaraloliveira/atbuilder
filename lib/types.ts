export type BlockType = 'header' | 'hero' | 'features' | 'text' | 'cta' | 'footer' | 'gallery' | 'testimonials' | 'pricing' | 'faq' | 'contact';

export interface Block {
  id: string;
  type: BlockType;
  content: any;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  blocks: Block[];
}
