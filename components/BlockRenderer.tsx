'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Block } from '@/lib/types';
import { Menu, X, Moon, Sun, Check, ArrowRight, Zap, Shield, Rocket, Plus, Quote, ChevronDown } from 'lucide-react';

export function BlockRenderer({ block }: { block: Block }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getBreakpointClass = (breakpoint: string) => {
    if (breakpoint === 'always') return 'hidden';
    if (breakpoint === 'never') return 'flex';
    switch (breakpoint) {
      case 'lg': return 'hidden @5xl:flex';
      case 'md':
      default: return 'hidden @3xl:flex';
    }
  };

  const getMobileMenuClass = (breakpoint: string) => {
    if (breakpoint === 'always') return 'block';
    if (breakpoint === 'never') return 'hidden';
    switch (breakpoint) {
      case 'lg': return '@5xl:hidden';
      case 'md':
      default: return '@3xl:hidden';
    }
  };

  const handleScrollTo = (targetId: string, behavior: 'smooth' | 'auto') => {
    if (!targetId) return;
    const element = document.getElementById(`block-${targetId}`);
    if (element) {
      element.scrollIntoView({ behavior });
    }
  };

  const fontFamily = block.content.fontFamily || 'font-sans';
  const variant = block.content.variant || 'default';

  switch (block.type) {
    case 'header': {
      const isSticky = block.content.isSticky;
      const isFloating = block.content.isFloating;
      const logoPosition = block.content.logoPosition || 'left';
      const menuPosition = block.content.menuPosition || 'center';
      const scrollBehavior = block.content.scrollBehavior || 'smooth';
      const linkTargets = block.content.linkTargets || {};

      let headerClass = `transition-all duration-300 ${fontFamily}`;
      let containerClass = "max-w-7xl mx-auto flex items-center px-8 relative";

      // Base Styles
      if (variant === 'dark') {
        headerClass += " w-full py-5 bg-gray-950 border-gray-800 text-white";
        if (!isFloating && variant !== 'glass') headerClass += " border-b";
      } else {
        headerClass += " w-full py-4 bg-white border-gray-100";
        if (!isFloating && variant !== 'glass') headerClass += " border-b";
      }

      // Handle Centered Logo (Vertical Layout)
      const isVertical = logoPosition === 'center';
      if (isVertical) {
        containerClass += " flex-col gap-8 justify-center items-center py-6";
      } else if (logoPosition === 'right') {
        containerClass += " flex-row-reverse justify-between";
      } else {
        containerClass += " justify-between";
      }

      // Floating/Sticky logic (already correct, just preserving)
      if (isFloating || variant === 'glass') {
        headerClass = headerClass.replace('w-full', 'w-[calc(100%-2rem)] mx-auto mt-4 rounded-2xl shadow-xl border');
        headerClass += variant === 'glass' ? " bg-white/70 backdrop-blur-md border-white/20" : (variant === 'dark' ? " bg-gray-950/90 backdrop-blur-md border-gray-800" : " bg-white/90 backdrop-blur-md border-gray-200");
      }
      if (isSticky) {
        headerClass += " sticky z-50";
        headerClass += (isFloating || variant === 'glass') ? " top-4" : " top-0";
      } else { headerClass += " relative"; }

      // Menu alignment logic inside the container
      let navClass = "hidden md:flex items-center gap-8";
      if (!isVertical) {
        if (menuPosition === 'center') navClass += " absolute left-1/2 -translate-x-1/2";
        else if (menuPosition === 'left' && logoPosition === 'left') navClass += " ml-12 mr-auto";
        else if (menuPosition === 'left' && logoPosition === 'right') navClass += " mr-12 ml-auto flex-row-reverse";
        else if (menuPosition === 'right' && logoPosition === 'left') navClass += " ml-auto mr-12";
        else if (menuPosition === 'right' && logoPosition === 'right') navClass += " mr-auto ml-12 flex-row-reverse";
      }

      return (
        <header className={headerClass} style={variant === 'dark' ? { backgroundColor: block.content.backgroundColor } : {}}>
          <div className={containerClass}>
            {/* Logo Section */}
            <div className={`text-2xl font-black tracking-tighter ${variant === 'dark' ? 'text-white' : 'text-indigo-600'}`}>
              {block.content.logoImage ? (
                <Image src={block.content.logoImage} alt="Logo" width={140} height={35} className="h-7 w-auto object-contain" referrerPolicy="no-referrer" />
              ) : block.content.logoText}
            </div>

            {/* Menu Section */}
            <nav className={navClass}>
              {block.content.links.map((link: string, i: number) => (
                <span
                  key={i}
                  onClick={() => handleScrollTo(linkTargets[link], scrollBehavior)}
                  className={`text-sm font-bold uppercase tracking-widest cursor-pointer transition-colors ${variant === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-indigo-600'}`}
                >
                  {link}
                </span>
              ))}
            </nav>

            {/* Actions Section */}
            <div className={`flex items-center gap-4 ${isVertical && menuPosition === 'center' ? 'w-full justify-center pt-4 border-t border-gray-100' : ''}`}>
               {block.content.showDarkModeToggle && (
                <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-full transition-colors ${variant === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
               )}
               <button className={`${getMobileMenuClass(block.content.mobileMenuBreakpoint || 'md')} p-2`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                 {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
               </button>
            </div>
          </div>

          {/* Mobile Menu Variations */}
          {isMenuOpen && (
            <div className={`fixed inset-0 z-[60] ${block.content.mobileMenuVariant === 'full-overlay' ? '' : 'pointer-events-none'}`}>
              {/* Overlay Backdrop */}
              <div 
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => setIsMenuOpen(false)}
              ></div>

              {/* Side Slide */}
              {(!block.content.mobileMenuVariant || block.content.mobileMenuVariant === 'side-slide') && (
                <div className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl p-10 pointer-events-auto animate-in slide-in-from-right duration-300">
                  <div className="flex justify-between items-center mb-12">
                    <div className="text-xl font-black text-indigo-600 tracking-tighter">{block.content.logoText}</div>
                    <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8 text-gray-400" /></button>
                  </div>
                  <nav className="flex flex-col gap-8">
                    {block.content.links.map((link: string, i: number) => (
                      <span key={i} onClick={() => { handleScrollTo(linkTargets[link], scrollBehavior); setIsMenuOpen(false); }} className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4">{link}</span>
                    ))}
                  </nav>
                </div>
              )}

              {/* Full Overlay */}
              {block.content.mobileMenuVariant === 'full-overlay' && (
                <div className="absolute inset-0 bg-indigo-600 flex flex-col items-center justify-center pointer-events-auto animate-in fade-in zoom-in duration-300 p-8">
                  <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-white"><X className="w-10 h-10" /></button>
                  <nav className="flex flex-col items-center gap-10">
                    {block.content.links.map((link: string, i: number) => (
                      <span key={i} onClick={() => { handleScrollTo(linkTargets[link], scrollBehavior); setIsMenuOpen(false); }} className="text-4xl md:text-6xl font-black text-white hover:scale-110 transition-transform cursor-pointer lowercase italic italic-style tracking-tighter">{link}</span>
                    ))}
                  </nav>
                </div>
              )}

              {/* Bottom Sheet */}
              {block.content.mobileMenuVariant === 'bottom-sheet' && (
                <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-[3rem] p-12 pointer-events-auto animate-in slide-in-from-bottom duration-300 shadow-2xl">
                  <div className="w-16 h-1.5 bg-gray-200 rounded-full mx-auto mb-10"></div>
                  <nav className="grid grid-cols-2 gap-8">
                    {block.content.links.map((link: string, i: number) => (
                      <div key={i} onClick={() => { handleScrollTo(linkTargets[link], scrollBehavior); setIsMenuOpen(false); }} className="p-6 bg-gray-50 rounded-3xl flex items-center justify-center font-bold text-gray-900 text-lg">{link}</div>
                    ))}
                  </nav>
                </div>
              )}

              {/* Centered Fade */}
              {block.content.mobileMenuVariant === 'centered-fade' && (
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="bg-white/90 backdrop-blur-xl w-full max-w-sm rounded-[3rem] p-12 pointer-events-auto animate-in fade-in zoom-in duration-300 shadow-3xl text-center border border-white">
                    <button onClick={() => setIsMenuOpen(false)} className="mx-auto mb-8 bg-gray-100 p-3 rounded-full"><X className="w-6 h-6 text-gray-900" /></button>
                    <nav className="flex flex-col gap-6">
                      {block.content.links.map((link: string, i: number) => (
                        <span key={i} onClick={() => { handleScrollTo(linkTargets[link], scrollBehavior); setIsMenuOpen(false); }} className="text-xl font-black text-gray-900 uppercase tracking-widest">{link}</span>
                      ))}
                    </nav>
                  </div>
                </div>
              )}

              {/* Minimal Top */}
              {block.content.mobileMenuVariant === 'minimal-top' && (
                <div className="absolute top-0 left-0 w-full bg-white border-b border-gray-100 pointer-events-auto animate-in slide-in-from-top duration-300 p-8 shadow-xl">
                  <div className="max-w-7xl mx-auto flex flex-col gap-6">
                    <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                      <div className="text-lg font-bold text-gray-900">Navegação</div>
                      <X className="w-6 h-6 cursor-pointer" onClick={() => setIsMenuOpen(false)} />
                    </div>
                    <nav className="flex flex-wrap gap-4">
                      {block.content.links.map((link: string, i: number) => (
                        <span key={i} onClick={() => { handleScrollTo(linkTargets[link], scrollBehavior); setIsMenuOpen(false); }} className="px-5 py-2 bg-gray-50 rounded-full text-sm font-bold text-gray-600 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer">{link}</span>
                      ))}
                    </nav>
                  </div>
                </div>
              )}
            </div>
          )}
        </header>
      );
    }

    case 'hero': {
      const bgStyle = block.content.backgroundImage ? {
        backgroundImage: `url(${block.content.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : { backgroundColor: block.content.backgroundColor || '#ffffff' };

      if (variant === 'impact') {
        return (
          <section className={`w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-8 relative overflow-hidden ${fontFamily}`} style={bgStyle}>
            {block.content.backgroundImage && <div className="absolute inset-0 bg-black/60 z-0"></div>}
            <div className="max-w-5xl space-y-8 relative z-10">
              <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter uppercase italic">{block.content.title}</h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">{block.content.subtitle}</p>
              <div className="flex gap-4 justify-center pt-8">
                <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest hover:bg-white/90 transition-all transform hover:scale-105 shadow-2xl rounded-sm">
                  {block.content.buttonText}
                </button>
              </div>
            </div>
          </section>
        );
      }

      if (variant === 'split') {
        return (
          <section className={`w-full min-h-[70vh] grid grid-cols-1 md:grid-cols-2 bg-gray-50 overflow-hidden ${fontFamily}`}>
            <div className="p-12 md:p-24 flex flex-col justify-center space-y-8">
              <span className="text-indigo-600 font-bold uppercase tracking-[0.3em] text-sm">Próxima Geração</span>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">{block.content.title}</h1>
              <p className="text-xl text-gray-500 leading-relaxed">{block.content.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                  {block.content.buttonText} <ArrowRight className="w-4 h-4" />
                </button>
                {block.content.showSecondaryButton && (
                  <button className="px-8 py-4 border border-gray-200 text-gray-900 font-bold rounded-xl hover:bg-white transition-all">
                    {block.content.secondaryButtonText}
                  </button>
                )}
              </div>
            </div>
            <div className="relative h-96 md:h-auto">
              <div className="absolute inset-0 bg-indigo-600/10 mix-blend-multiply z-10"></div>
              <Image src={block.content.backgroundImage || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200'} alt="Hero" fill className="object-cover" />
            </div>
          </section>
        );
      }

      if (variant === 'elegant') {
         return (
          <section className={`w-full py-24 md:py-48 px-8 bg-white border-y border-gray-50 ${fontFamily}`}>
            <div className="max-w-4xl mx-auto text-center space-y-12">
               <h1 className="text-5xl md:text-8xl font-serif text-gray-950 italic serif-style tracking-tight">{block.content.title}</h1>
               <div className="w-24 h-px bg-gray-900 mx-auto"></div>
               <p className="text-lg md:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto italic">{block.content.subtitle}</p>
               <button className="px-10 py-4 border border-gray-950 text-gray-950 uppercase tracking-[0.2em] font-medium hover:bg-gray-950 hover:text-white transition-all duration-700">
                 {block.content.buttonText}
               </button>
            </div>
          </section>
         )
      }

      if (variant === 'tech') {
        return (
          <section className={`w-full py-24 px-8 bg-[#0a0a0a] text-cyan-500 relative overflow-hidden ${fontFamily}`}>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="max-w-4xl mx-auto relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-mono uppercase tracking-widest">System Status: Optimal</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase border-l-4 border-cyan-500 pl-6">{block.content.title}</h1>
              <p className="text-lg text-gray-400 font-mono mb-10 max-w-xl">{"> "}{block.content.subtitle}</p>
              <button className="px-8 py-4 bg-cyan-500 text-black font-black uppercase tracking-tighter hover:bg-cyan-400 transition-all clip-path-polygon">
                {block.content.buttonText}
              </button>
            </div>
          </section>
        )
      }

      // Default Hero
      return (
        <section className={`w-full py-24 px-8 text-center bg-white ${fontFamily}`}>
          <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">{block.content.title}</h1>
            <p className="text-xl text-gray-500">{block.content.subtitle}</p>
            <button className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-bold">{block.content.buttonText}</button>
          </div>
        </section>
      );
    }

    case 'features': {
       if (variant === 'dark') {
         return (
           <section className={`w-full py-24 px-8 bg-gray-950 text-white ${fontFamily}`}>
             <div className="max-w-7xl mx-auto">
               <h2 className="text-3xl font-black uppercase tracking-widest mb-20 text-center">{block.content.title}</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-gray-800 border border-gray-800">
                 {block.content.items.map((item: any, i: number) => (
                   <div key={i} className="bg-gray-950 p-12 hover:bg-gray-900 transition-colors group">
                     <Zap className="w-10 h-10 text-indigo-500 mb-6 group-hover:scale-110 transition-transform" />
                     <h3 className="text-xl font-bold mb-4 uppercase">{item.title}</h3>
                     <p className="text-gray-400 leading-relaxed font-mono text-sm">{item.description}</p>
                   </div>
                 ))}
               </div>
             </div>
           </section>
         )
       }

       if (variant === 'minimal') {
         return (
            <section className={`w-full py-32 px-8 bg-white ${fontFamily}`}>
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
                <div className="flex-1">
                  <h2 className="text-5xl font-serif italic mb-8">{block.content.title}</h2>
                  <div className="w-12 h-1 bg-gray-200"></div>
                </div>
                <div className="flex-[2] grid grid-cols-1 sm:grid-cols-2 gap-12">
                  {block.content.items.map((item: any, i: number) => (
                    <div key={i} className="space-y-4">
                       <span className="text-xs text-gray-400 font-bold tracking-widest uppercase">0{i+1}</span>
                       <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                       <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
         )
       }

       if (variant === 'horizontal') {
         return (
            <section className={`w-full py-24 px-8 bg-indigo-50 ${fontFamily}`}>
              <div className="max-w-5xl mx-auto space-y-12">
                <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter text-center">{block.content.title}</h2>
                <div className="flex flex-col gap-6">
                  {block.content.items.map((item: any, i: number) => (
                    <div key={i} className="bg-white p-6 rounded-2xl flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shrink-0">
                        <Check className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900">{item.title}</h3>
                        <p className="text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
         )
       }

       // Default Features (Grid)
       return (
         <section className={`w-full py-24 px-8 bg-gray-50 ${fontFamily}`}>
           <div className="max-w-7xl mx-auto">
             <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">{block.content.title}</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {block.content.items.map((item: any, i: number) => (
                 <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 items-start text-left">
                    <div className="w-16 h-16 bg-white shadow-lg rounded-2xl flex items-center justify-center mb-8 border border-gray-50">
                      {item.image ? <Image src={item.image} alt={item.title} width={32} height={32} /> : <Zap className="text-indigo-600 w-8 h-8" />}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{item.description}</p>
                 </div>
               ))}
             </div>
           </div>
         </section>
       );
    }

    case 'text': {
       if (variant === 'split') {
         return (
            <section className={`w-full py-24 px-8 bg-white ${fontFamily}`}>
              <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center`}>
                <div className={block.content.imagePosition === 'right' ? 'order-1' : 'order-2'}>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">{block.content.title}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">{block.content.text}</p>
                </div>
                <div className={`relative h-[500px] rounded-3xl overflow-hidden shadow-2xl ${block.content.imagePosition === 'right' ? 'order-2' : 'order-1'}`}>
                  <Image src={block.content.image || 'https://picsum.photos/seed/text/800/800'} alt="Content" fill className="object-cover" />
                </div>
              </div>
            </section>
         )
       }
       if (variant === 'elegant') {
         return (
           <section className={`w-full py-32 px-8 bg-gray-50 ${fontFamily}`}>
             <div className="max-w-3xl mx-auto text-center space-y-10 font-serif">
                <h2 className="text-5xl italic text-gray-900 leading-tight tracking-tight px-12">{block.content.title}</h2>
                <p className="text-xl italic text-gray-500 leading-relaxed">{block.content.text}</p>
                <div className="pt-6 italic font-bold tracking-widest text-indigo-600">— The Alrion House</div>
             </div>
           </section>
         )
       }
       if (variant === 'tech') {
         return (
            <section className={`w-full py-24 px-8 bg-black border-y border-indigo-900/30 ${fontFamily}`}>
              <div className="max-w-5xl mx-auto p-12 bg-gray-900/50 rounded-2xl border border-indigo-500/20 backdrop-blur-sm">
                <h2 className="text-indigo-400 font-mono text-2xl mb-6 flex items-center gap-2">
                  <span className="text-cyan-500 text-sm">{">"}</span> {block.content.title}
                </h2>
                <div className="space-y-4">
                   <p className="text-gray-400 font-mono leading-relaxed bg-black/40 p-6 rounded-lg border-l-2 border-indigo-500">
                     {block.content.text}
                   </p>
                </div>
              </div>
            </section>
         )
       }
       return (
        <section className={`w-full py-24 px-8 bg-white ${fontFamily}`}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{block.content.title}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{block.content.text}</p>
          </div>
        </section>
       );
    }

    case 'cta': {
       const bgStyle = block.content.backgroundImage ? {
         backgroundImage: `url(${block.content.backgroundImage})`,
         backgroundSize: 'cover',
         backgroundPosition: 'center',
       } : { backgroundColor: block.content.backgroundColor || '#3b82f6' };

       if (variant === 'glass') {
         return (
            <section className={`w-full py-32 px-8 relative overflow-hidden ${fontFamily}`} style={bgStyle}>
              <div className="absolute inset-0 bg-black/40 z-0"></div>
              <div className="max-w-5xl mx-auto relative z-10">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-12 md:p-24 rounded-[3rem] text-center space-y-8 shadow-2xl">
                   <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{block.content.title}</h2>
                   <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">{block.content.subtitle}</p>
                   <div className="pt-8">
                      <button className="px-12 py-5 bg-white text-indigo-600 font-black rounded-full uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                        {block.content.buttonText}
                      </button>
                   </div>
                </div>
              </div>
            </section>
         )
       }

       return (
        <section className={`w-full py-24 px-8 text-center bg-indigo-600 ${fontFamily}`} style={bgStyle}>
          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">{block.content.title}</h2>
            <p className="text-xl text-white/90 font-light">{block.content.subtitle}</p>
            <button
               className="px-12 py-5 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-gray-50 transition-colors uppercase tracking-widest"
               style={block.content.buttonColor ? { backgroundColor: block.content.buttonColor, color: block.content.buttonTextColor } : {}}
            >
               {block.content.buttonText}
            </button>
          </div>
        </section>
       );
    }

    case 'footer': {
      if (variant === 'mega') {
        return (
          <footer className={`w-full py-24 px-8 bg-white border-t border-gray-100 ${fontFamily}`} style={{ backgroundColor: block.content.backgroundColor }}>
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 md:gap-8">
              <div className="col-span-2 lg:col-span-2 space-y-8">
                <div className="text-3xl font-black tracking-tighter text-indigo-600 uppercase">Alrion.</div>
                <p className="text-gray-500 max-w-sm leading-relaxed font-medium">{block.content.text}</p>
                <div className="flex gap-4">
                  {Array(4).fill(0).map((_, i) => <div key={i} className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"><Plus className="w-4 h-4" /></div>)}
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="font-bold text-gray-950 uppercase tracking-widest text-xs">Plataforma</h4>
                <ul className="space-y-4 text-sm text-gray-500 font-medium cursor-pointer">
                  <li className="hover:text-indigo-600 transition-colors">Características</li>
                  <li className="hover:text-indigo-600 transition-colors">API & Docs</li>
                  <li className="hover:text-indigo-600 transition-colors">Enterprise</li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="font-bold text-gray-950 uppercase tracking-widest text-xs">Recursos</h4>
                <ul className="space-y-4 text-sm text-gray-500 font-medium cursor-pointer">
                  <li className="hover:text-indigo-600 transition-colors">Blog</li>
                  <li className="hover:text-indigo-600 transition-colors">Comunidade</li>
                  <li className="hover:text-indigo-600 transition-colors">Suporte</li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="font-bold text-gray-950 uppercase tracking-widest text-xs">Empresa</h4>
                <ul className="space-y-4 text-sm text-gray-500 font-medium cursor-pointer">
                  <li className="hover:text-indigo-600 transition-colors">Sobre Nós</li>
                  <li className="hover:text-indigo-600 transition-colors">Carreiras</li>
                  <li className="hover:text-indigo-600 transition-colors">Privacidade</li>
                </ul>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-50 text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">
              © 2026 ALRION CO. OPERATING UNDER GLOBAL PROTOCOLS.
            </div>
          </footer>
        );
      }

       if (variant === 'centered') {
         return (
            <footer className={`w-full py-20 px-8 bg-gray-950 text-white ${fontFamily}`} style={{ backgroundColor: block.content.backgroundColor }}>
              <div className="max-w-7xl mx-auto text-center space-y-8">
                <div className="text-3xl font-black tracking-tighter text-indigo-500 uppercase italic">Alrion Tech</div>
                <p className="text-gray-400 font-light max-w-md mx-auto leading-relaxed">{block.content.text}</p>
                <div className="flex justify-center gap-6">
                   {['Twitter', 'Instagram', 'LinkedIn'].map(s => (
                     <span key={s} className="text-xs uppercase tracking-[0.3em] text-gray-500 hover:text-white cursor-pointer transition-colors">{s}</span>
                   ))}
                </div>
                <div className="pt-12 text-[10px] text-gray-700 uppercase tracking-widest">© 2026 Crafted in Earth Space.</div>
              </div>
            </footer>
         )
       }
       return (
        <footer className={`w-full py-12 px-8 bg-white border-t border-gray-100 ${fontFamily}`} style={{ backgroundColor: block.content.backgroundColor, color: block.content.textColor }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="font-bold text-gray-900 tracking-tighter">Alrion.</div>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">{block.content.text}</p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-100"></div>
              <div className="w-8 h-8 rounded-full bg-gray-100"></div>
            </div>
          </div>
        </footer>
       );
    }
    
    // Fallback for types previously handled in a simpler way
    case 'gallery':
      const clickableImages = block.content.clickableImages;
      const modalType = block.content.modalType || 'fullscreen';

      if (variant === 'masonry-dark') {
        return (
          <section className={`w-full py-24 px-8 bg-gray-950 ${fontFamily}`} style={{ backgroundColor: block.content.backgroundColor }}>
            <div className="max-w-7xl mx-auto">
               <h2 className="text-5xl font-black text-cyan-400 mb-20 tracking-tighter uppercase italic border-b border-cyan-400 pl-4">{block.content.title}</h2>
               <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 px-2">
                  {block.content.images.map((img: string, i: number) => (
                    <div 
                      key={i} 
                      onClick={() => clickableImages && setSelectedImage(img)}
                      className="mb-4 break-inside-avoid relative rounded-xl overflow-hidden group border border-gray-800 hover:border-cyan-500/50 transition-all cursor-pointer"
                    >
                       <Image src={img} alt={`Img ${i}`} width={500} height={1000} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />
                       <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-500 text-black text-[10px] font-black px-2 py-1 rounded-sm uppercase">P_{i+100}</div>
                    </div>
                  ))}
               </div>
            </div>
            {/* Modal Logic (shared below) */}
          </section>
        )
      }

      if (variant === 'minimal-editorial') {
        return (
          <section className={`w-full py-32 px-8 bg-white ${fontFamily}`}>
            <div className="max-w-5xl mx-auto space-y-24">
              <h2 className="text-6xl font-serif italic text-gray-950 text-center tracking-tight">{block.content.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                {block.content.images.slice(0, 4).map((img: string, i: number) => (
                  <div 
                    key={i} 
                    onClick={() => clickableImages && setSelectedImage(img)}
                    className={`${i % 2 === 0 ? 'mt-0' : 'mt-24'} relative aspect-[3/4] group overflow-hidden cursor-pointer`}
                  >
                    <Image src={img} alt={`Img ${i}`} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                    <div className="absolute inset-0 border border-gray-100 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      }

      return (
        <section className={`w-full py-24 px-8 bg-white ${fontFamily}`}>
          <div className="max-w-7xl mx-auto">
             <h2 className="text-4xl font-black uppercase text-center mb-20 italic underline decoration-indigo-500/30 underline-offset-8 decoration-8">{block.content.title}</h2>
             <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
                {block.content.images.map((img: string, i: number) => (
                  <div 
                    key={i} 
                    onClick={() => clickableImages && setSelectedImage(img)}
                    className={`break-inside-avoid relative rounded-[2rem] overflow-hidden group shadow-lg hover:shadow-2xl transition-all ${clickableImages ? 'cursor-pointer' : ''}`}
                  >
                     <Image src={img} alt={`Img ${i}`} width={500} height={400} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                     {clickableImages && (
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Plus className="text-white w-12 h-12" />
                       </div>
                     )}
                  </div>
                ))}
             </div>
          </div>

          {/* Modal Implementation */}
          {selectedImage && (
            <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-8" onClick={() => setSelectedImage(null)}>
              <button 
                className="absolute top-6 right-6 text-white/70 hover:text-white p-2 transition-colors"
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              >
                <X className="w-10 h-10" />
              </button>
              
              <div 
                className={`bg-white rounded-[3rem] overflow-hidden w-full max-h-full flex flex-col md:flex-row shadow-2xl ${modalType === 'split' ? 'max-w-6xl' : 'max-w-5xl bg-transparent shadow-none'}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`relative ${modalType === 'split' ? 'w-full md:w-3/5 h-[40vh] md:h-[70vh]' : 'w-full h-[85vh]'}`}>
                  <Image 
                    src={selectedImage} 
                    alt="Selected" 
                    fill 
                    className="object-contain" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {modalType === 'split' && (
                  <div className="w-full md:w-2/5 p-10 md:p-14 flex flex-col justify-center bg-white space-y-6">
                    <h3 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight uppercase italic">{block.content.modalTitle || 'Detalhes da Imagem'}</h3>
                    <div className="w-16 h-1 bg-indigo-600"></div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {block.content.modalText || 'Este é um espaço dedicado para descrever sua obra, produto ou captura em detalhes. Engaje seus usuários com contexto e paixão.'}
                    </p>
                    <div className="flex flex-col gap-4 pt-4">
                      <button className="px-8 py-4 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all shadow-lg text-sm">
                        {block.content.modalButton1Text || 'Saiba Mais'}
                      </button>
                      <button className="px-8 py-4 bg-gray-100 text-gray-950 font-black uppercase tracking-widest rounded-2xl hover:bg-gray-200 transition-all text-sm">
                        {block.content.modalButton2Text || 'Ver Coleção'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      );

    case 'testimonials':
      if (variant === 'minimal') {
        return (
          <section className={`w-full py-40 px-8 bg-white ${fontFamily}`}>
            <div className="max-w-4xl mx-auto text-center space-y-12">
               <Quote className="w-16 h-16 text-indigo-100 mx-auto mb-4" fill="currentColor" />
               <h2 className="text-3xl md:text-5xl font-serif italic text-gray-900 leading-tight">&quot;{block.content.items[0].quote}&quot;</h2>
               <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                    {block.content.items[0].avatar && <Image src={block.content.items[0].avatar} alt={block.content.items[0].author} width={64} height={64} className="w-full h-full object-cover" />}
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 text-xl tracking-tight">{block.content.items[0].author}</div>
                    <div className="text-indigo-600 font-medium text-sm uppercase tracking-widest">{block.content.items[0].role}</div>
                  </div>
               </div>
            </div>
          </section>
        );
      }

      if (variant === 'dark') {
        return (
          <section className={`w-full py-24 px-8 bg-black border-y border-white/5 ${fontFamily}`}>
            <div className="max-w-5xl mx-auto space-y-12">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <h2 className="text-green-500 font-mono text-sm tracking-widest uppercase">{block.content.title}</h2>
               </div>
               <div className="space-y-4">
                  {block.content.items.map((item: any, i: number) => (
                    <div key={i} className="p-8 bg-gray-900/40 border border-white/5 rounded-xl font-mono text-xs md:text-sm group hover:border-green-500/30 transition-all">
                       <div className="text-gray-500 mb-2 invisible group-hover:visible">{"> "} SYSTEM_DECRYPTION_ACTIVE...</div>
                       <p className="text-gray-300 leading-relaxed italic mb-4">&quot;{item.quote}&quot;</p>
                       <div className="text-green-400 font-bold">BY: {item.author.toUpperCase()} // ROLE: {item.role.toUpperCase()}</div>
                    </div>
                  ))}
               </div>
            </div>
          </section>
        );
      }

      return (
        <section className={`w-full py-32 px-8 bg-indigo-50 ${fontFamily}`}>
           <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-20">{block.content.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 {block.content.items.map((item: any, i: number) => (
                   <div key={i} className="bg-white/50 backdrop-blur-sm p-12 rounded-[3rem] border border-white/40 shadow-xl relative mt-8">
                      <div className="absolute -top-10 left-12 w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200">
                        {item.avatar && <Image src={item.avatar} alt={item.author} width={80} height={80} className="w-full h-full object-cover" />}
                      </div>
                      <p className="text-xl text-gray-700 italic leading-relaxed pt-6 mb-8 font-light italic">&quot;{item.quote}&quot;</p>
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                         <div className="font-bold text-indigo-900">{item.author}</div>
                         <div className="text-sm font-medium text-indigo-600/70">{item.role}</div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      );

    case 'pricing':
      if (variant === 'minimal') {
        return (
          <section className={`w-full py-32 px-8 bg-white ${fontFamily}`}>
             <div className="max-w-5xl mx-auto">
               <div className="text-center mb-20 space-y-4">
                 <h2 className="text-4xl font-bold text-gray-900">{block.content.title}</h2>
                 <p className="text-gray-500 max-w-xl mx-auto">Preços transparentes para todos os tamanhos de negócio.</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {block.content.plans.map((plan: any, i: number) => (
                   <div key={i} className={`p-10 rounded-3xl border-2 transition-all ${plan.highlighted ? 'border-indigo-600 shadow-2xl' : 'border-gray-100 hover:border-gray-300'}`}>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mb-8">
                        <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                      </div>
                      <ul className="space-y-4 mb-10">
                        {plan.features.map((f: string, j: number) => <li key={j} className="flex items-center gap-3 text-sm text-gray-600 font-medium"> <Check className="w-4 h-4 text-indigo-600" /> {f}</li>)}
                      </ul>
                      <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${plan.highlighted ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200' : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'}`}>
                        {plan.buttonText}
                      </button>
                   </div>
                 ))}
               </div>
             </div>
          </section>
        )
      }

      return (
        <section className={`w-full py-32 px-8 bg-white ${fontFamily}`}>
           <div className="max-w-7xl mx-auto">
              <h2 className="text-5xl font-black italic tracking-tighter text-center mb-24 uppercase">{block.content.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                 {block.content.plans.map((plan: any, i: number) => (
                   <div key={i} className={`p-1px rounded-[3rem] ${plan.highlighted ? 'bg-gradient-to-b from-indigo-600 to-indigo-900 shadow-2xl' : 'bg-gray-100 shadow-sm'}`}>
                      <div className="bg-white p-12 rounded-[3rem] h-full flex flex-col items-center text-center">
                         <h3 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-600 mb-6">{plan.name}</h3>
                         <div className="text-5xl font-black mb-10 text-gray-950 leading-none">{plan.price}</div>
                         <ul className="space-y-4 mb-12 flex-1 text-gray-500 font-medium text-sm">
                            {plan.features.map((f: string, j: number) => <li key={j} className="flex items-center gap-3"> <Check className="w-4 h-4 text-green-500 shrink-0" /> {f}</li>)}
                         </ul>
                         <button className={`w-full py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all ${plan.highlighted ? 'bg-indigo-600 text-white shadow-xl hover:bg-indigo-700' : 'bg-gray-950 text-white hover:bg-black'}`}>
                            {plan.buttonText}
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      );

    case 'faq':
      if (variant === 'accordion') {
        return (
          <section className={`w-full py-32 px-8 bg-white ${fontFamily}`}>
            <div className="max-w-3xl mx-auto">
               <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">{block.content.title}</h2>
               <div className="space-y-px bg-gray-100 border border-gray-100 rounded-3xl overflow-hidden shadow-2xl">
                  {block.content.questions.map((q: any, i: number) => (
                    <div key={i} className="bg-white p-8 group cursor-pointer transition-colors hover:bg-gray-50/50">
                       <div className="flex items-center justify-between gap-6">
                          <h3 className="text-xl font-bold text-gray-900 leading-tight">{q.question}</h3>
                          <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                            <ChevronDown className="w-5 h-5 group-hover:rotate-180 transition-transform" />
                          </div>
                       </div>
                       <div className="max-h-0 group-hover:max-h-96 overflow-hidden transition-all duration-500">
                         <p className="mt-8 text-gray-500 leading-relaxed font-medium text-lg pr-12">{q.answer}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </section>
        );
      }

       return (
         <section className={`w-full py-24 px-8 bg-gray-50 ${fontFamily}`}>
           <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-black uppercase tracking-widest text-center mb-20">{block.content.title}</h2>
              <div className="space-y-4">
                 {block.content.questions.map((q: any, i: number) => (
                   <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                      <div className="flex items-center justify-between">
                         <h3 className="text-xl font-bold text-gray-900">{q.question}</h3>
                         <Plus className="text-indigo-400 group-hover:rotate-45 transition-transform" />
                      </div>
                      <p className="mt-6 text-gray-500 leading-relaxed font-medium">{q.answer}</p>
                   </div>
                 ))}
              </div>
           </div>
         </section>
       );

    case 'contact':
       if (variant === 'minimal') {
         return (
          <section className={`w-full py-32 px-8 bg-white ${fontFamily}`}>
            <div className="max-w-2xl mx-auto text-center space-y-16">
               <div className="space-y-4">
                 <h2 className="text-5xl font-black text-gray-900 tracking-tighter uppercase">{block.content.title}</h2>
                 <p className="text-gray-500 font-medium">{block.content.subtitle}</p>
                 <div className="text-indigo-600 font-bold underline cursor-pointer">{block.content.email}</div>
               </div>
               <div className="space-y-6 text-left">
                  <input placeholder="SEU NOME" className="w-full border-b-2 border-gray-100 py-4 focus:border-indigo-600 outline-none font-bold uppercase tracking-widest text-sm" />
                  <input placeholder="EMAIL" className="w-full border-b-2 border-gray-100 py-4 focus:border-indigo-600 outline-none font-bold uppercase tracking-widest text-sm" />
                  <textarea placeholder="MENSAGEM" rows={3} className="w-full border-b-2 border-gray-100 py-4 focus:border-indigo-600 outline-none font-bold uppercase tracking-widest text-sm resize-none"></textarea>
                  <button className="w-full py-6 bg-gray-950 text-white font-black uppercase tracking-[0.4em] hover:bg-indigo-600 transition-all">Submit Now</button>
               </div>
            </div>
          </section>
         )
       }

       if (variant === 'dark-premium') {
          return (
            <section className={`w-full py-32 px-8 text-white ${fontFamily}`} style={{ backgroundColor: block.content.backgroundColor }}>
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                   <h2 className="text-6xl md:text-8xl font-serif italic serif-style leading-none">{block.content.title}</h2>
                   <div className="flex flex-col gap-6 text-xl text-gray-400 font-light">
                      <p>{block.content.address || 'São Paulo, BR'}</p>
                      <p>{block.content.email}</p>
                   </div>
                </div>
                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-12 md:p-16 rounded-[4rem] flex flex-col gap-10">
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">Inquiry</label>
                      <select className="w-full bg-transparent border-b border-white/20 py-4 outline-none text-2xl font-serif italic text-white appearance-none">
                        <option className="bg-gray-950">Design Project</option>
                        <option className="bg-gray-950">Tech Strategy</option>
                        <option className="bg-gray-950">Partnership</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">Email</label>
                      <input className="w-full bg-transparent border-b border-white/20 py-4 outline-none text-xl font-light placeholder:text-white/20" placeholder="your@email.com" />
                   </div>
                   <button className="mt-6 py-6 border border-white/20 rounded-full hover:bg-white hover:text-gray-950 transition-all font-black uppercase tracking-widest flex items-center justify-center gap-4">
                     {block.content.buttonText} <ArrowRight className="w-5 h-5" />
                   </button>
                </div>
              </div>
            </section>
          )
       }

       if (variant === 'geometric') {
         return (
           <section className={`w-full py-24 px-8 bg-[#00ff9d] ${fontFamily}`}>
             <div className="max-w-7xl mx-auto flex flex-col md:flex-row border-[6px] border-black bg-white shadow-[20px_20px_0px_black] overflow-hidden">
                <div className="flex-1 bg-black p-12 md:p-20 text-white space-y-10">
                   <h2 className="text-6xl font-black uppercase leading-[0.8] tracking-tighter">{block.content.title}</h2>
                   <div className="w-32 h-32 bg-[#00ff9d] rounded-full"></div>
                   <div className="pt-10 space-y-4">
                     <p className="font-mono text-cyan-400">{"> "} LOCATION_DATA: {block.content.address || 'UNKNOWN'}</p>
                     <p className="font-mono text-cyan-400">{"> "} EMAIL_SYNC: {block.content.email}</p>
                   </div>
                </div>
                <div className="flex-1 p-12 md:p-20 flex flex-col gap-8">
                   <input className="w-full p-6 border-4 border-black font-mono text-lg bg-gray-50 focus:bg-white outline-none" placeholder="USER_ID" />
                   <input className="w-full p-6 border-4 border-black font-mono text-lg bg-gray-50 focus:bg-white outline-none" placeholder="ENCRYPT_EMAIL" />
                   <textarea rows={4} className="w-full p-6 border-4 border-black font-mono text-lg bg-gray-50 focus:bg-white outline-none resize-none" placeholder="LOG_MESSAGE"></textarea>
                   <button className="w-full py-6 bg-black text-[#00ff9d] font-black text-2xl uppercase tracking-tighter hover:translate-x-2 hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_#00ff9d] active:shadow-none active:translate-x-0 active:translate-y-0">
                     CONECTAR.EXE
                   </button>
                </div>
             </div>
           </section>
         )
       }

       return (
          <section className={`w-full py-32 px-8 bg-white border-y border-gray-50 ${fontFamily}`}>
             <div className="max-w-7xl mx-auto">
                <div className="bg-indigo-900/100 rounded-[4rem] text-white p-12 md:p-24 grid grid-cols-1 md:grid-cols-2 gap-20 shadow-[-40px_40px_0px_#e0f2fe]">
                  <div className="space-y-12">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none italic uppercase">{block.content.title}</h2>
                    <p className="text-xl text-indigo-100 leading-relaxed font-light">{block.content.subtitle}</p>
                    <div className="space-y-6 pt-10 border-t border-indigo-800">
                       <div className="flex items-center gap-6"> <Shield className="w-10 h-10 text-indigo-400" /> <div> <div className="text-[10px] uppercase tracking-widest text-indigo-300">Email</div> <div className="text-xl font-bold">{block.content.email}</div> </div> </div>
                       <div className="flex items-center gap-6"> <Rocket className="w-10 h-10 text-indigo-400" /> <div> <div className="text-[10px] uppercase tracking-widest text-indigo-300">Address</div> <div className="text-xl font-bold">{block.content.address}</div> </div> </div>
                    </div>
                  </div>
                  <div className="bg-white p-10 md:p-14 rounded-[3rem] text-gray-950 flex flex-col gap-8 shadow-2xl">
                     <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">FullName</label>
                       <input className="w-full bg-gray-50 border-0 border-b-2 border-gray-100 focus:border-indigo-600 focus:bg-white outline-none py-3 text-lg font-bold transition-all" />
                     </div>
                     <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email</label>
                       <input className="w-full bg-gray-50 border-0 border-b-2 border-gray-100 focus:border-indigo-600 focus:bg-white outline-none py-3 text-lg font-bold transition-all" />
                     </div>
                     <button className="w-full py-5 bg-indigo-600 text-white font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-indigo-700 transition-all shadow-xl">{block.content.buttonText}</button>
                  </div>
                </div>
             </div>
          </section>
       );

    default:
      return <div className="p-4 border border-dashed border-red-300 text-red-500">Bloco desconhecido</div>;
  }
}
