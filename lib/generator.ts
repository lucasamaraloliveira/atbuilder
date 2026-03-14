import { Block } from './types';

export interface ProjectFile {
    path: string;
    content: string;
}

export type Framework = 'nextjs' | 'react' | 'static';

const getComponentName = (type: string) => type.charAt(0).toUpperCase() + type.slice(1);

export function generateProject(blocks: Block[], framework: Framework): ProjectFile[] {
    switch (framework) {
        case 'nextjs':
            return generateNextJsProject(blocks);
        case 'react':
            return generateReactProject(blocks);
        case 'static':
            return generateStaticProject(blocks);
        default:
            return [];
    }
}

function generateNextJsProject(blocks: Block[]): ProjectFile[] {
    const files: ProjectFile[] = [];

    // Create individual component files
    const blockTypes = Array.from(new Set(blocks.map(b => b.type)));

    blockTypes.forEach(type => {
        const componentName = getComponentName(type);
        files.push({
            path: `components/${componentName}.tsx`,
            content: generateComponentCode(type)
        });
    });

    // Page component
    const imports = blockTypes.map(type => `import ${getComponentName(type)} from '@/components/${getComponentName(type)}';`).join('\n');
    const components = blocks.map(block => `<${getComponentName(block.type)} content={${JSON.stringify(block.content, null, 2)}} />`).join('\n        ');

    files.push({
        path: 'app/page.tsx',
        content: `'use client';\nimport React from 'react';\n${imports}\n\nexport default function Page() {\n  return (\n    <main className="min-h-screen flex flex-col">\n        ${components}\n    </main>\n  );\n}`
    });

    files.push({
        path: 'app/layout.tsx',
        content: `import './globals.css';\nimport { Inter } from 'next/font/google';\n\nconst inter = Inter({ subsets: ['latin'] });\n\nexport const metadata = {\n  title: 'Alrion Generated Site',\n  description: 'Created with Alrion ATBuilder',\n};\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="pt-BR">\n      <body className={inter.className}>{children}</body>\n    </html>\n  );\n}`
    });

    files.push({
        path: 'app/globals.css',
        content: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n:root {\n  --foreground-rgb: 0, 0, 0;\n  --background-start-rgb: 214, 219, 220;\n  --background-end-rgb: 255, 255, 255;\n}\n\nbody {\n  color: rgb(var(--foreground-rgb));\n  background: #ffffff;\n}\n\n/* Custom Fonts */\n.font-sans { font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; }\n.font-serif { font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif; }\n.font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }\n.font-tech { font-family: 'Space Grotesk', sans-serif; }\n.font-impact { font-family: 'Montserrat', sans-serif; }\n\n.serif-style { font-style: italic; }\n.italic-style { font-style: italic; }`
    });

    files.push({
        path: 'package.json',
        content: JSON.stringify({
            name: "alrion-generated-nextjs",
            version: "1.0.0",
            private: true,
            scripts: { "dev": "next dev", "build": "next build", "start": "next start", "lint": "next lint" },
            dependencies: {
                "next": "latest",
                "react": "latest",
                "react-dom": "latest",
                "lucide-react": "latest",
                "tailwind-merge": "latest",
                "clsx": "latest",
                "framer-motion": "latest"
            },
            devDependencies: {
                "typescript": "latest",
                "@types/node": "latest",
                "@types/react": "latest",
                "@types/react-dom": "latest",
                "tailwindcss": "latest",
                "postcss": "latest",
                "autoprefixer": "latest"
            }
        }, null, 2)
    });

    files.push({
        path: 'tailwind.config.js',
        content: `/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  content: [\n    './app/**/*.{js,ts,jsx,tsx}',\n    './components/**/*.{js,ts,jsx,tsx}',\n  ],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}`
    });

    return files;
}

function generateComponentCode(type: string): string {
    const name = getComponentName(type);

    // This is a simplified version of the logic in BlockRenderer
    // In a real scenario, we would have a library of these component templates
    let content = `import React from 'react';\nimport { Check, ArrowRight, Zap, Shield, Rocket, Plus, Menu, X, Smartphone, Monitor, Layout, Star, Quote } from 'lucide-react';\n\nexport default function ${name}({ content }: any) {\n  const { fontFamily = 'font-sans', variant = 'default' } = content;\n  \n  return (\n    <section className={\`\${fontFamily} py-20 bg-white border-b\`}>\n       <div className="max-w-7xl mx-auto px-8">\n`;

    if (type === 'header') {
        content = `import React, { useState } from 'react';\nimport { Menu, X, Shield, Rocket } from 'lucide-react';\n\nexport default function Header({ content }: any) {\n  const [isMenuOpen, setIsMenuOpen] = useState(false);\n  const { variant, logoText, links = [], isSticky, isFloating, logoPosition, menuPosition, fontFamily = 'font-sans' } = content;\n  \n  let headerClass = \`w-full py-4 bg-white border-b border-gray-100 transition-all duration-300 \${fontFamily}\`;\n  if (isSticky) headerClass += " sticky top-0 z-50";\n  if (isFloating) headerClass += " mt-4 w-[calc(100%-2rem)] mx-auto rounded-2xl shadow-xl border border-gray-200";\n\n  return (\n    <header className={headerClass}>\n      <div className="max-w-7xl mx-auto flex items-center justify-between px-8">\n        <div className="text-2xl font-black text-indigo-600 tracking-tighter">{logoText}</div>\n        <nav className="hidden md:flex items-center gap-8">\n          {links.map((link: string) => (\n            <a key={link} href="#" className="text-sm font-bold uppercase tracking-widest text-gray-600 hover:text-indigo-600">{link}</a>\n          ))}\n        </nav>\n        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>\n          {isMenuOpen ? <X /> : <Menu />}\n        </button>\n      </div>\n    </header>\n  );\n}`;
    } else if (type === 'hero') {
        content = `import React from 'react';\nimport { ArrowRight } from 'lucide-react';\n\nexport default function Hero({ content }: any) {\n  const { title, subtitle, buttonText, secondaryButtonText, showSecondaryButton, fontFamily = 'font-sans', variant } = content;\n  return (\n    <section className={\`py-32 px-8 text-center bg-white \${fontFamily}\`}>\n      <div className="max-w-4xl mx-auto space-y-8">\n        <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-none uppercase italic">{title}</h1>\n        <p className="text-xl text-gray-500 max-w-2xl mx-auto">{subtitle}</p>\n        <div className="flex justify-center gap-4">\n          <button className="px-10 py-5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all flex items-center gap-2">{buttonText} <ArrowRight className="w-5 h-5" /></button>\n          {showSecondaryButton && <button className="px-10 py-5 border border-gray-200 text-gray-900 font-bold rounded-2xl hover:bg-gray-50 transition-all">{secondaryButtonText}</button>}\n        </div>\n      </div>\n    </section>\n  );\n}`;
    } else if (type === 'features') {
        content = `import React from 'react';\nimport { Zap } from 'lucide-react';\n\nexport default function Features({ content }: any) {\n  const { title, items = [], fontFamily = 'font-sans' } = content;\n  return (\n    <section className={\`py-24 px-8 bg-gray-50 \${fontFamily}\`}>\n      <div className="max-w-7xl mx-auto">\n        <h2 className="text-4xl font-black text-center mb-20 tracking-tight uppercase italic">{title}</h2>\n        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">\n          {items.map((item: any, i: number) => (\n            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">\n               <div className="w-16 h-16 bg-white shadow-lg rounded-2xl flex items-center justify-center mb-8 border border-gray-50"><Zap className="text-indigo-600 w-8 h-8" /></div>\n               <h3 className="text-2xl font-bold mb-4">{item.title}</h3>\n               <p className="text-gray-500">{item.description}</p>\n            </div>\n          ))}\n        </div>\n      </div>\n    </section>\n  );\n}`;
    } else if (type === 'cta') {
        content = `import React from 'react';\n\nexport default function Cta({ content }: any) {\n  const { title, subtitle, buttonText, fontFamily = 'font-sans', backgroundColor = '#4f46e5' } = content;\n  return (\n    <section className={\`py-24 px-8 text-center \${fontFamily}\`} style={{ backgroundColor }}>\n      <div className="max-w-4xl mx-auto space-y-8">\n        <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">{title}</h2>\n        <p className="text-xl text-white/90">{subtitle}</p>\n        <button className="px-12 py-5 bg-white text-indigo-600 font-black rounded-2xl uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">{buttonText}</button>\n      </div>\n    </section>\n  );\n}`;
    } else if (type === 'footer') {
        content = `import React from 'react';\n\nexport default function Footer({ content }: any) {\n  const { text, fontFamily = 'font-sans', backgroundColor = '#ffffff' } = content;\n  return (\n    <footer className={\`py-12 px-8 border-t border-gray-100 \${fontFamily}\`} style={{ backgroundColor }}>\n      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">\n        <div className="font-bold text-gray-900 tracking-tighter text-xl">Alrion.</div>\n        <p className="text-sm text-gray-500 font-medium">{text}</p>\n        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">© 2026 Crafted in ATBuilder</div>\n      </div>\n    </footer>\n  );\n}`;
    } else if (type === 'text') {
        content = `import React from 'react';\n\nexport default function Text({ content }: any) {\n  const { title, text, fontFamily = 'font-sans' } = content;\n  return (\n    <section className={\`py-24 px-8 bg-white \${fontFamily}\`}>\n      <div className="max-w-3xl mx-auto text-center space-y-6">\n        <h2 className="text-4xl font-bold text-gray-900 leading-tight">{title}</h2>\n        <p className="text-lg text-gray-600 leading-relaxed font-medium">{text}</p>\n      </div>\n    </section>\n  );\n}`;
    } else if (type === 'gallery') {
        content = `import React from 'react';\nimport { Plus } from 'lucide-react';\n\nexport default function Gallery({ content }: any) {\n  const { title, images = [], fontFamily = 'font-sans' } = content;\n  return (\n    <section className={\`py-24 px-8 bg-white \${fontFamily}\`}>\n      <div className="max-w-7xl mx-auto">\n        <h2 className="text-4xl font-black text-center mb-20 tracking-tight uppercase italic decoration-indigo-500/30 underline decoration-8 underline-offset-8">{title}</h2>\n        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">\n          {images.map((img: string, i: number) => (\n            <div key={i} className="break-inside-avoid relative rounded-[2rem] overflow-hidden group shadow-lg hover:shadow-2xl transition-all cursor-pointer">\n               <img src={img} alt="Gallery" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />\n               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Plus className="text-white w-12 h-12" /></div>\n            </div>\n          ))}\n        </div>\n      </div>\n    </section>\n  );\n}`;
    }

    return content;
}

function generateReactProject(blocks: Block[]): ProjectFile[] {
    const files: ProjectFile[] = [];

    // Simplistic React export (similar to Next.js but for Vite)
    files.push({
        path: 'src/App.jsx',
        content: `import React from 'react';\nimport Header from './components/Header';\nimport Hero from './components/Hero';\n\nexport default function App() {\n  return (\n    <div className="min-h-screen bg-white">\n       <Header content={{ logoText: "Alrion", links: ["Home", "About", "Contact"] }} />\n       <Hero content={{ title: "Vite Export", subtitle: "Project exported from Alrion." }} />\n       {/* Rest of the blocks would be rendered here */}\n    </div>\n  );\n}`
    });

    files.push({
        path: 'src/main.jsx',
        content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);`
    });

    files.push({
        path: 'package.json',
        content: JSON.stringify({
            name: "alrion-react-vite",
            version: "1.0.0",
            scripts: { "dev": "vite", "build": "vite build", "preview": "vite preview" },
            dependencies: { "react": "latest", "react-dom": "latest", "lucide-react": "latest" },
            devDependencies: { "vite": "latest", "@vitejs/plugin-react": "latest", "tailwindcss": "latest", "autoprefixer": "latest", "postcss": "latest" }
        }, null, 2)
    });

    return files;
}

function generateStaticProject(blocks: Block[]): ProjectFile[] {
    return [
        {
            path: 'index.html',
            content: `<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Alrion Static Site</title>\n  <script src="https://cdn.tailwindcss.com"></script>\n  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">\n  <style>\n    .font-tech { font-family: 'Space Grotesk', sans-serif; }\n    .font-impact { font-family: 'Montserrat', sans-serif; }\n    .serif-style { font-style: italic; font-family: serif; }\n  </style>\n</head>\n<body class="bg-white text-gray-900">\n  <main class="flex flex-col w-full">\n     <section class="py-32 text-center bg-gray-50">\n        <h1 class="text-6xl font-black italic uppercase tracking-tighter">Static Export</h1>\n        <p class="mt-4 text-xl text-gray-500">Seu site completo em HTML/CSS.</p>\n     </section>\n     <!-- Blocks content would be rendered here -->\n  </main>\n</body>\n</html>`
        }
    ];
}
