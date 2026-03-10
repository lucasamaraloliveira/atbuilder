import { Block } from './types';

export interface ProjectFile {
    path: string;
    content: string;
}

export type Framework = 'nextjs' | 'react' | 'static';

// Shared logic for generating component names
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

// Helper to sanitize class names for different frameworks
function getBaseStyles(block: Block) {
    const { fontFamily, variant } = block.content;
    return `const fontFamily = "${fontFamily || 'font-sans'}";\nconst variant = "${variant || 'default'}";`;
}

function generateNextJsProject(blocks: Block[]): ProjectFile[] {
    const files: ProjectFile[] = [];
    
    // Create individual component files
    const blockTypes = Array.from(new Set(blocks.map(b => b.type)));
    
    blockTypes.forEach(type => {
        const componentName = getComponentName(type);
        if (type === 'header') {
          files.push({
            path: `components/${componentName}.tsx`,
            content: `import React, { useState } from 'react';\nimport Image from 'next/image';\nimport { Menu, X, Moon, Sun } from 'lucide-react';\n\nexport default function Header({ content }: any) {\n  const [isMenuOpen, setIsMenuOpen] = useState(false);\n  const { variant, logoText, logoImage, links, isSticky, isFloating, logoPosition, menuPosition, fontFamily } = content;\n  \n  let containerClass = "max-w-7xl mx-auto flex items-center px-8 relative";\n  const isVertical = logoPosition === 'center';\n  if (isVertical) containerClass += " flex-col gap-8 justify-center items-center py-6";\n  else if (logoPosition === 'right') containerClass += " flex-row-reverse justify-between";\n  else containerClass += " justify-between";\n\n  let navClass = "hidden md:flex items-center gap-8";\n  if (!isVertical) {\n    if (menuPosition === 'center') navClass += " absolute left-1/2 -translate-x-1/2";\n    else if (menuPosition === 'left' && logoPosition === 'left') navClass += " ml-12 mr-auto";\n    else if (menuPosition === 'left' && logoPosition === 'right') navClass += " mr-12 ml-auto flex-row-reverse";\n    else if (menuPosition === 'right' && logoPosition === 'left') navClass += " ml-auto mr-12";\n    else if (menuPosition === 'right' && logoPosition === 'right') navClass += " mr-auto ml-12 flex-row-reverse";\n  }\n\n  return (\n    <header className={\`w-full \${isSticky ? 'sticky top-0' : 'relative'} z-50 \${fontFamily} py-4 bg-white border-b\`}>\n      <div className={containerClass}>\n        <div className="text-2xl font-black text-indigo-600">\n          {logoImage ? <img src={logoImage} alt="Logo" className="h-8" /> : logoText}\n        </div>\n        <nav className={navClass}>\n          {links.map((link: string) => (\n            <a key={link} href="#" className="text-sm font-bold uppercase tracking-widest text-gray-600 hover:text-indigo-600">{link}</a>\n          ))}\n        </nav>\n        <div className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>\n          {isMenuOpen ? <X /> : <Menu />}\n        </div>\n      </div>\n    </header>\n  );\n}`
          });
        } else {
          files.push({
            path: `components/${componentName}.tsx`,
            content: `import React from 'react';\nimport Image from 'next/image';\nimport { Check, ArrowRight, Zap, Shield, Rocket, Plus } from 'lucide-react';\n\nexport default function ${componentName}({ content }: any) {\n  const { fontFamily, variant } = content;\n  return (\n    <section className={\`\${fontFamily} py-20 bg-white border-b\`}>\n       <div className="max-w-7xl mx-auto px-8">\n          <h2 className="text-4xl font-black">{content.title || content.logoText}</h2>\n          <p className="text-gray-500 mt-4">{content.subtitle || content.text}</p>\n       </div>\n    </section>\n  );\n}`
          });
        }
    });

    // Page component
    const imports = blockTypes.map(type => `import ${getComponentName(type)} from '@/components/${getComponentName(type)}';`).join('\n');
    const components = blocks.map(block => `<${getComponentName(block.type)} key="${block.id}" content={${JSON.stringify(block.content, null, 2)}} />`).join('\n        ');

    files.push({
        path: 'app/page.tsx',
        content: `import React from 'react';\n${imports}\n\nexport default function Page() {\n  return (\n    <main className="min-h-screen flex flex-col">\n        ${components}\n    </main>\n  );\n}`
    });

    files.push({
        path: 'app/layout.tsx',
        content: `import './globals.css';\nimport { Inter } from 'next/font/google';\n\nconst inter = Inter({ subsets: ['latin'] });\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en">\n      <body className={inter.className}>{children}</body>\n    </html>\n  );\n}`
    });

    files.push({
        path: 'package.json',
        content: JSON.stringify({
            name: "alrion-generated-nextjs",
            version: "1.0.0",
            scripts: { "dev": "next dev", "build": "next build", "start": "next start" },
            dependencies: { "next": "latest", "react": "latest", "react-dom": "latest", "lucide-react": "latest", "tailwind-merge": "latest", "clsx": "latest" },
            devDependencies: { "typescript": "latest", "@types/node": "latest", "@types/react": "latest", "tailwindcss": "latest", "postcss": "latest", "autoprefixer": "latest" }
        }, null, 2)
    });

    return files;
}

function generateReactProject(blocks: Block[]): ProjectFile[] {
    const files: ProjectFile[] = [];
    
    files.push({
        path: 'src/App.jsx',
        content: `import React from 'react';\n\nexport default function App() {\n  return (\n    <div className="min-h-screen bg-gray-50">\n       <h1 className="p-20 text-center font-bold text-4xl">React Vite Project</h1>\n       <p className="text-center text-gray-500">All ${blocks.length} blocks would be rendered here in a componentized way.</p>\n    </div>\n  );\n}`
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
            content: `<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Alrion Static Export</title>\n  <script src="https://cdn.tailwindcss.com"></script>\n</head>\n<body className="bg-white text-gray-900">\n  <main class="flex flex-col w-full">\n     <!-- Static components rendered here -->\n     <section class="py-20 text-center">\n        <h1 class="text-5xl font-black">Exportação Estática HTML/CSS/JS</h1>\n        <p class="mt-4 text-gray-500">Componentização via templates HTML.</p>\n     </section>\n  </main>\n</body>\n</html>`
        },
        {
            path: 'script.js',
            content: `// Client-side interactions\ndocument.addEventListener('DOMContentLoaded', () => {\n  console.log('Site ready!');\n});`
        }
    ];
}
