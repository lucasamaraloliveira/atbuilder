import type {Metadata} from 'next';
import { Inter, Playfair_Display, Space_Grotesk, Roboto_Mono, Montserrat } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-tech' });
const robotoMono = Roboto_Mono({ subsets: ['latin'], variable: '--font-mono' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-impact' });

export const metadata: Metadata = {
  title: 'Alrion Tech Builder',
  description: 'Construtor de sites inteligente em Next.js',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable} ${robotoMono.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased bg-gray-50 text-gray-900" suppressHydrationWarning>{children}</body>
    </html>
  );
}
