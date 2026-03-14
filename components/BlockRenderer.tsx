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
      if (block.content.theme === 'neobrutalist') {
        headerClass += " w-full py-6 bg-white border-[4px] border-black shadow-[8px_8px_0px_black]";
      } else if (variant === 'dark' || block.content.theme === 'tech' || block.content.theme === 'luxury') {
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

      // Floating/Sticky logic
      if (isFloating || variant === 'glass') {
        if (block.content.theme === 'neobrutalist') {
           headerClass = headerClass.replace('w-full', 'w-[calc(100%-4rem)] mx-auto mt-6 rounded-none');
        } else {
           headerClass = headerClass.replace('w-full', 'w-[calc(100%-2rem)] mx-auto mt-4 rounded-2xl shadow-xl border');
           headerClass += variant === 'glass' ? " bg-white/70 backdrop-blur-md border-white/20" : (variant === 'dark' ? " bg-gray-950/90 backdrop-blur-md border-gray-800" : " bg-white/90 backdrop-blur-md border-gray-200");
        }
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

      const isReverse = logoPosition === 'right';

      return (
        <header className={headerClass} style={variant === 'dark' ? { backgroundColor: block.content.backgroundColor } : {}}>
          <div className={containerClass}>
            {/* Logo Section */}
            <div className={`text-2xl font-black tracking-tighter ${variant === 'dark' || block.content.theme === 'tech' ? 'text-white' : (block.content.theme === 'neobrutalist' ? 'text-black' : 'text-indigo-600')}`}>
              {block.content.logoImage ? (
                <Image src={block.content.logoImage} alt="Logo" width={140} height={35} className="h-7 w-auto object-contain" referrerPolicy="no-referrer" />
              ) : block.content.logoText}
            </div>

            {/* Menu Section */}
            <nav className={navClass}>
              {block.content.links?.map((link: string, i: number) => (
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
                    {block.content.links?.map((link: string, i: number) => (
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
                    {block.content.links?.map((link: string, i: number) => (
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
                    {block.content.links?.map((link: string, i: number) => (
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
                      {block.content.links?.map((link: string, i: number) => (
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
                      {block.content.links?.map((link: string, i: number) => (
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
      } : { backgroundColor: block.content.backgroundColor || (block.content.theme === 'tech' || block.content.theme === 'luxury' || block.content.theme === 'neobrutalist' ? '#0a0a0a' : '#ffffff') };

      const isNeobrutalist = block.content.theme === 'neobrutalist';
      const isGlass = block.content.theme === 'glass';

      if (variant === 'impact') {
        let sectionClass = `w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-8 relative overflow-hidden ${fontFamily}`;
        let titleClass = "text-6xl md:text-9xl font-black leading-[0.9] tracking-tighter uppercase italic";
        let buttonClass = "px-12 py-5 font-black uppercase tracking-widest transition-all transform hover:scale-105 shadow-2xl";

        if (isNeobrutalist) {
          sectionClass += " border-[6px] border-black";
          titleClass += " text-black drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]";
          buttonClass += " bg-black text-white border-[4px] border-black shadow-[8px_8px_0px_white] hover:shadow-none";
        } else if (isGlass) {
           titleClass += " text-white drop-shadow-lg";
           buttonClass += " bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30";
        } else {
          titleClass += " text-white";
          buttonClass += " bg-white text-black rounded-sm hover:bg-white/90";
        }

        return (
          <section className={sectionClass} style={bgStyle}>
            {block.content.backgroundImage && <div className="absolute inset-0 bg-black/60 z-0"></div>}
            <div className="max-w-5xl space-y-8 relative z-10">
              <h1 className={titleClass}>{block.content.title}</h1>
              <p className={`text-xl md:text-2xl max-w-2xl mx-auto font-light ${isNeobrutalist ? 'text-black font-bold' : 'text-gray-300'}`}>{block.content.subtitle}</p>
              <div className="flex gap-4 justify-center pt-8">
                <button className={buttonClass}>
                  {block.content.buttonText}
                </button>
              </div>
            </div>
          </section>
        );
      }

      if (variant === 'split') {
        const isReverse = block.content.imagePosition === 'left';
        
        return (
          <section className={`w-full min-h-[70vh] grid grid-cols-1 md:grid-cols-2 overflow-hidden ${fontFamily} ${isNeobrutalist ? 'bg-white border-[6px] border-black' : 'bg-gray-50'}`}>
            <div className={`p-12 md:p-24 flex flex-col justify-center space-y-8 ${isReverse ? 'md:order-2' : 'md:order-1'}`}>
              <span className={`font-bold uppercase tracking-[0.3em] text-sm ${isNeobrutalist ? 'text-black' : 'text-indigo-600'}`}>Próxima Geração</span>
              <h1 className={`text-5xl md:text-7xl font-bold leading-tight ${isNeobrutalist ? 'text-black' : 'text-gray-900'}`}>{block.content.title}</h1>
              <p className={`text-xl leading-relaxed ${isNeobrutalist ? 'text-black' : 'text-gray-500'}`}>{block.content.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className={`px-8 py-4 font-bold transition-all flex items-center justify-center gap-2 ${isNeobrutalist ? 'bg-[#ffde00] text-black border-[4px] border-black shadow-[6px_6px_0px_black] hover:shadow-none translate-y-[-2px]' : 'bg-indigo-600 text-white rounded-xl hover:bg-indigo-700'}`}>
                  {block.content.buttonText} <ArrowRight className="w-4 h-4" />
                </button>
                {block.content.showSecondaryButton && (
                  <button className={`px-8 py-4 font-bold transition-all ${isNeobrutalist ? 'bg-white text-black border-[4px] border-black shadow-[6px_6px_0px_black] hover:shadow-none' : 'border border-gray-200 text-gray-900 rounded-xl hover:bg-white'}`}>
                    {block.content.secondaryButtonText}
                  </button>
                )}
              </div>
            </div>
            <div className={`relative h-96 md:h-auto ${isReverse ? 'md:order-1' : 'md:order-2'} ${isNeobrutalist ? 'border-l-[6px] border-black' : ''}`}>
              {!isNeobrutalist && <div className="absolute inset-0 bg-indigo-600/10 mix-blend-multiply z-10"></div>}
              <Image src={block.content.backgroundImage || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200'} alt="Hero" fill className="object-cover" />
            </div>
          </section>
        );
      }

      if (variant === 'elegant') {
         const isLuxury = block.content.theme === 'luxury';
         const isNeobrutalist = block.content.theme === 'neobrutalist';
         
         let sectionClass = `w-full py-24 md:py-48 px-8 ${fontFamily}`;
         if (isNeobrutalist) sectionClass += " bg-white border-y-[6px] border-black shadow-[12px_12px_0px_black] my-12";
         else if (isLuxury) sectionClass += " bg-gray-950 text-white";
         else sectionClass += " bg-white border-y border-gray-50";

         return (
          <section className={sectionClass} style={bgStyle}>
            <div className="max-w-4xl mx-auto text-center space-y-12">
               <h1 className={`text-5xl md:text-8xl tracking-tight ${isNeobrutalist ? 'font-black uppercase italic text-black' : 'font-serif italic text-gray-950'}`}>{block.content.title}</h1>
               <div className={`w-24 h-px mx-auto ${isNeobrutalist ? 'bg-black h-2' : (isLuxury ? 'bg-yellow-500' : 'bg-gray-900')}`}></div>
               <p className={`text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto italic ${isNeobrutalist ? 'text-black font-bold uppercase not-italic' : (isLuxury ? 'text-gray-400' : 'text-gray-600')}`}>{block.content.subtitle}</p>
               <button className={`px-10 py-4 uppercase tracking-[0.2em] font-medium transition-all duration-700 ${isNeobrutalist ? 'bg-black text-white hover:bg-[#ffde00] hover:text-black border-none' : (isLuxury ? 'border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black' : 'border border-gray-950 text-gray-950 hover:bg-gray-950 hover:text-white')}`}>
                 {block.content.buttonText}
               </button>
            </div>
          </section>
         )
      }

      if (variant === 'tech') {
        const isNeobrutalist = block.content.theme === 'neobrutalist';
        const isVibrant = block.content.theme === 'vibrant';
        
        let sectionClass = `w-full py-24 px-8 relative overflow-hidden ${fontFamily}`;
        if (isNeobrutalist) sectionClass += " bg-[#22d3ee] border-y-[6px] border-black";
        else if (isVibrant) sectionClass += " bg-indigo-600";
        else sectionClass += " bg-[#0a0a0a]";

        return (
          <section className={sectionClass} style={bgStyle}>
            <div className={`absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(${isNeobrutalist?'#000':'#1e293b'}_1px,transparent_1px)] [background-size:20px_20px]`}></div>
            <div className="max-w-4xl mx-auto relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-4 h-4 rounded-full animate-pulse ${isNeobrutalist ? 'bg-black' : 'bg-cyan-500'}`}></div>
                <span className={`text-xs font-mono uppercase tracking-widest ${isNeobrutalist ? 'text-black font-black' : 'text-cyan-500'}`}>System Status: Optimal</span>
              </div>
              <h1 className={`text-5xl md:text-8xl font-black mb-8 uppercase border-l-[8px] pl-8 leading-[0.8] ${isNeobrutalist ? 'text-black border-black italic' : 'text-cyan-500 border-cyan-500'}`}>{block.content.title}</h1>
              <p className={`text-xl font-mono mb-12 max-w-xl ${isNeobrutalist ? 'text-black font-bold bg-white p-4 border-[4px] border-black shadow-[8px_8px_0px_black]' : 'text-gray-400'}`}>{"> "}{block.content.subtitle}</p>
              <button className={`px-12 py-6 font-black uppercase tracking-tighter transition-all ${isNeobrutalist ? 'bg-black text-white hover:bg-white hover:text-black border-none shadow-[10px_10px_0px_white]' : 'bg-cyan-500 text-black hover:bg-cyan-400 clip-path-polygon'}`}>
                {block.content.buttonText}
              </button>
            </div>
          </section>
        )
      }

      if (variant === 'glass') {
        return (
          <section className={`w-full min-h-[90vh] flex items-center justify-center p-8 md:p-20 relative overflow-hidden ${fontFamily}`} style={bgStyle}>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 z-0"></div>
            <div className={`max-w-5xl w-full backdrop-blur-2xl border border-white/20 rounded-[4rem] p-12 md:p-32 text-center space-y-12 shadow-2xl relative z-10 ${isNeobrutalist ? 'bg-white border-[6px] border-black rounded-none shadow-[30px_30px_0px_black]' : 'bg-white/10'}`}>
               <h1 className={`text-6xl md:text-9xl font-black tracking-tighter leading-none ${isNeobrutalist ? 'text-black uppercase italic' : 'text-white'}`}>{block.content.title}</h1>
               <p className={`text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed ${isNeobrutalist ? 'text-black font-bold uppercase' : 'text-white/70'}`}>{block.content.subtitle}</p>
               <button className={`px-16 py-6 font-black uppercase tracking-[0.3em] transform hover:scale-105 transition-all shadow-xl ${isNeobrutalist ? 'bg-black text-white hover:bg-[#ffde00] hover:text-black rounded-none' : 'bg-white text-indigo-950 rounded-2xl'}`}>
                 {block.content.buttonText}
               </button>
            </div>
          </section>
        )
      }

      // Default Hero
      let defaultSectionClass = `w-full py-32 px-8 text-center ${fontFamily}`;
      let defaultTitleClass = `text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8`;
      let defaultButtonClass = `px-12 py-6 font-black uppercase tracking-[0.2em] transition-all`;

      if (isNeobrutalist) {
        defaultSectionClass += " bg-white border-y-[6px] border-black my-12";
        defaultTitleClass += " text-black uppercase italic";
        defaultButtonClass += " bg-[#ffde00] text-black border-[6px] border-black shadow-[10px_10px_0px_black] hover:shadow-none hover:translate-x-2 hover:translate-y-2";
      } else if (isGlass) {
        defaultSectionClass += " bg-gradient-to-br from-gray-50 to-indigo-50";
        defaultTitleClass += " text-gray-900";
        defaultButtonClass += " bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-xl";
      } else {
        const isDark = (block.content.backgroundColor && !['#fff', '#ffffff', 'white'].includes(block.content.backgroundColor.toLowerCase())) || block.content.theme === 'tech' || block.content.theme === 'luxury';
        defaultSectionClass += ` ${isDark ? 'bg-gray-950' : 'bg-white'}`;
        defaultTitleClass += ` ${isDark ? 'text-white' : 'text-gray-950'}`;
        defaultButtonClass += ` ${isDark ? 'bg-white text-black' : 'bg-indigo-600 text-white'} rounded-xl hover:opacity-90`;
      }

      return (
        <section className={defaultSectionClass} style={{ backgroundColor: block.content.backgroundColor }}>
          <div className="max-w-5xl mx-auto">
            <h1 className={defaultTitleClass}>{block.content.title}</h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto mb-12 ${isNeobrutalist ? 'text-black font-bold' : (block.content.theme === 'tech' ? 'text-gray-400' : 'text-gray-500')}`}>{block.content.subtitle}</p>
            <button className={defaultButtonClass}>{block.content.buttonText}</button>
          </div>
        </section>
      );
    }

    case 'features': {
      const isNeobrutalist = block.content.theme === 'neobrutalist';
      const isGlass = block.content.theme === 'glass';

      if (variant === 'dark') {
        return (
          <section className={`w-full py-24 px-8 ${isNeobrutalist ? 'bg-black border-y-[6px] border-black' : 'bg-gray-950'} text-white ${fontFamily}`}>
            <div className="max-w-7xl mx-auto">
              <h2 className={`text-3xl font-black uppercase tracking-widest mb-20 text-center ${isNeobrutalist ? 'text-[#ffde00] italic' : ''}`}>{block.content.title}</h2>
              <div className={`grid grid-cols-1 md:grid-cols-3 ${isNeobrutalist ? 'gap-8' : 'gap-1px bg-gray-800 border border-gray-800'}`}>
                {block.content.items?.map((item: any, i: number) => (
                  <div key={i} className={`${isNeobrutalist ? 'bg-white text-black border-[4px] border-black shadow-[8px_8px_0px_#ffde00] p-8' : 'bg-gray-950 p-12 hover:bg-gray-900'} transition-all group`}>
                    <Zap className={`w-10 h-10 ${isNeobrutalist ? 'text-black' : 'text-indigo-500'} mb-6 group-hover:scale-110 transition-transform`} />
                    <h3 className="text-xl font-bold mb-4 uppercase">{item.title}</h3>
                    <p className={`leading-relaxed text-sm ${isNeobrutalist ? 'text-black' : 'text-gray-400 font-mono'}`}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      }

      if (variant === 'minimal') {
        return (
           <section className={`w-full py-32 px-8 ${isNeobrutalist ? 'bg-[#f0f0f0] border-y-[6px] border-black' : 'bg-white'} ${fontFamily}`}>
             <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
               <div className="flex-1">
                 <h2 className={`text-5xl mb-8 ${isNeobrutalist ? 'font-black uppercase italic' : 'font-serif italic'}`}>{block.content.title}</h2>
                 <div className={`w-12 h-1 ${isNeobrutalist ? 'bg-black' : 'bg-gray-200'}`}></div>
               </div>
               <div className="flex-[2] grid grid-cols-1 sm:grid-cols-2 gap-12">
                 {block.content.items?.map((item: any, i: number) => (
                   <div key={i} className={`space-y-4 ${isNeobrutalist ? 'bg-white border-[4px] border-black p-6 shadow-[6px_6px_0px_black]' : ''}`}>
                      <span className={`text-xs font-bold tracking-widest uppercase ${isNeobrutalist ? 'text-black' : 'text-gray-400'}`}>0{i+1}</span>
                      <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      <p className={`text-sm leading-relaxed ${isNeobrutalist ? 'text-black' : 'text-gray-500'}`}>{item.description}</p>
                   </div>
                 ))}
               </div>
             </div>
           </section>
        )
      }

      if (variant === 'horizontal') {
        return (
            <section className={`w-full py-24 px-8 ${fontFamily}`} style={{ backgroundColor: block.content.backgroundColor || (isNeobrutalist ? '#ffffff' : '#f0f4ff') }}>
             <div className="max-w-5xl mx-auto space-y-12">
               <h2 className={`text-4xl font-black uppercase tracking-tighter text-center ${isNeobrutalist ? 'text-black italic' : 'text-gray-900'}`}>{block.content.title}</h2>
               <div className="flex flex-col gap-6">
                 {block.content.items?.map((item: any, i: number) => (
                   <div key={i} className={`p-6 flex items-center gap-6 transition-all ${isNeobrutalist ? 'bg-white border-[4px] border-black shadow-[6px_6px_0px_black] hover:translate-x-2' : 'bg-white rounded-2xl shadow-sm hover:shadow-md'}`}>
                     <div className={`w-12 h-12 flex items-center justify-center shrink-0 ${isNeobrutalist ? 'bg-black' : 'bg-indigo-600 rounded-full'}`}>
                       <Check className="text-white w-6 h-6" />
                     </div>
                     <div>
                       <h3 className="font-bold text-xl text-gray-900">{item.title}</h3>
                       <p className={`text-gray-500 ${isNeobrutalist ? 'text-black' : ''}`}>{item.description}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </section>
        )
      }

      // Default Features (Grid)
      let sectionClass = `w-full py-24 px-8 ${fontFamily}`;
      let itemClass = "transition-all items-start text-left";

      if (isNeobrutalist) {
        sectionClass += " bg-white border-y-[6px] border-black";
        itemClass += " bg-white border-[4px] border-black p-10 shadow-[10px_10px_0px_black] hover:translate-y-[-4px]";
      } else if (isGlass) {
        sectionClass += " bg-gradient-to-br from-indigo-500/10 to-purple-500/10";
        itemClass += " bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[2.5rem] shadow-xl hover:bg-white/20";
      } else {
        sectionClass += " bg-gray-50";
        itemClass += " bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl border border-gray-100";
      }

      return (
        <section className={sectionClass} style={{ backgroundColor: block.content.backgroundColor }}>
          <div className="max-w-7xl mx-auto">
            <h2 className={`text-3xl font-bold text-center mb-16 ${isNeobrutalist ? 'text-black uppercase italic' : 'text-gray-900'}`}>{block.content.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {block.content.items?.map((item: any, i: number) => (
                <div key={i} className={itemClass}>
                   <div className={`w-16 h-16 flex items-center justify-center mb-8 ${isNeobrutalist ? 'bg-black' : isGlass ? 'bg-white/20 backdrop-blur-md rounded-2xl border border-white/30' : 'bg-white shadow-lg rounded-2xl border border-gray-50'}`}>
                     {item.image ? <Image src={item.image} alt={item.title} width={32} height={32} /> : <Zap className={`${isNeobrutalist ? 'text-white' : isGlass ? 'text-white' : 'text-indigo-600'} w-8 h-8`} />}
                   </div>
                   <h3 className={`text-2xl font-bold mb-4 ${isNeobrutalist ? 'text-black uppercase italic' : isGlass ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                   <p className={`leading-relaxed ${isNeobrutalist ? 'text-black' : isGlass ? 'text-white/70' : 'text-gray-500'}`}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 'text': {
      const isNeobrutalist = block.content.theme === 'neobrutalist';
      const isGlass = block.content.theme === 'glass';

      if (variant === 'split') {
        const isReverse = block.content.imagePosition === 'left';
        return (
          <section className={`w-full py-24 px-8 ${fontFamily} ${isNeobrutalist ? 'bg-white border-y-[6px] border-black' : 'bg-white'}`}>
            <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center`}>
              <div className={`${isReverse ? 'md:order-2' : 'md:order-1'}`}>
                <h2 className={`text-4xl md:text-6xl font-black mb-6 ${isNeobrutalist ? 'text-black uppercase italic' : 'text-gray-900'}`}>{block.content.title}</h2>
                <p className={`text-lg leading-relaxed mb-8 ${isNeobrutalist ? 'text-black font-bold' : 'text-gray-600'}`}>{block.content.text}</p>
              </div>
              <div className={`relative h-[500px] overflow-hidden ${isReverse ? 'md:order-1' : 'md:order-2'} ${isNeobrutalist ? 'border-[6px] border-black shadow-[12px_12px_0px_black]' : 'rounded-3xl shadow-2xl'}`}>
                <Image src={block.content.image || 'https://picsum.photos/seed/text/800/800'} alt="Content" fill className="object-cover" />
              </div>
            </div>
          </section>
        );
      }
       if (variant === 'elegant') {
         return (
           <section className={`w-full py-32 px-8 ${isNeobrutalist ? 'bg-[#ffde00] border-y-[6px] border-black' : 'bg-gray-50'} ${fontFamily}`}>
             <div className={`max-w-3xl mx-auto text-center space-y-10 ${isNeobrutalist ? 'font-black' : 'font-serif'}`}>
                <h2 className={`text-5xl leading-tight tracking-tight px-12 ${isNeobrutalist ? 'text-black uppercase italic' : 'text-gray-900 italic'}`}>{block.content.title}</h2>
                <p className={`text-xl leading-relaxed ${isNeobrutalist ? 'text-black' : 'text-gray-500 italic'}`}>{block.content.text}</p>
                <div className={`pt-6 ${isNeobrutalist ? 'text-black font-black uppercase text-2xl italic' : 'italic font-bold tracking-widest text-indigo-600'}`}>— The Alrion House</div>
             </div>
           </section>
         )
       }
       if (variant === 'tech') {
         return (
           <section className={`w-full py-24 px-8 bg-black border-y ${isNeobrutalist ? 'border-black' : 'border-indigo-900/30'} ${fontFamily}`}>
             <div className={`max-w-5xl mx-auto p-12 ${isNeobrutalist ? 'bg-white border-[6px] border-black shadow-[15px_15px_0px_#22d3ee]' : 'bg-gray-900/50 border border-indigo-500/20 backdrop-blur-sm rounded-2xl'}`}>
               <h2 className={`${isNeobrutalist ? 'text-black font-black text-4xl italic uppercase mb-8' : 'text-indigo-400 font-mono text-2xl mb-6 flex items-center gap-2'}`}>
                 {!isNeobrutalist && <span className="text-cyan-500 text-sm">{">"}</span>} {block.content.title}
               </h2>
               <div className="space-y-4">
                  <p className={`${isNeobrutalist ? 'text-black font-bold text-lg leading-relaxed' : 'text-gray-400 font-mono leading-relaxed bg-black/40 p-6 rounded-lg border-l-2 border-indigo-500'}`}>
                    {block.content.text}
                  </p>
               </div>
             </div>
           </section>
         )
       }
       return (
        <section className={`w-full py-24 px-8 text-center ${fontFamily} ${isNeobrutalist ? 'bg-white border-y-[6px] border-black' : 'bg-white'}`}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className={`text-3xl font-black mb-6 ${isNeobrutalist ? 'text-black uppercase italic' : 'text-gray-900'}`}>{block.content.title}</h2>
            <p className={`text-lg leading-relaxed ${isNeobrutalist ? 'text-black font-bold' : 'text-gray-600'}`}>{block.content.text}</p>
          </div>
        </section>
       );
    }

    case 'cta': {
      const isNeobrutalist = block.content.theme === 'neobrutalist';
      const isGlass = block.content.theme === 'glass';

      const bgStyle = block.content.backgroundImage ? {
        backgroundImage: `url(${block.content.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : { backgroundColor: block.content.backgroundColor || (isNeobrutalist ? '#ffffff' : '#4f46e5') };

      if (variant === 'glass' || isGlass) {
        return (
          <section className={`w-full py-32 px-8 relative overflow-hidden ${fontFamily}`} style={bgStyle}>
            <div className="absolute inset-0 bg-black/40 z-0"></div>
            <div className="max-w-5xl mx-auto relative z-10">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-12 md:p-24 rounded-[3rem] text-center space-y-8 shadow-2xl">
                 <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none uppercase">{block.content.title}</h2>
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

      // Default CTA
      let ctaSectionClass = `w-full py-24 px-8 text-center ${fontFamily} relative z-10`;
      let ctaTitleClass = `text-4xl md:text-6xl font-black tracking-tighter leading-none mb-8`;
      let ctaSubtitleClass = `text-xl mb-12`;
      let ctaButtonClass = `px-12 py-5 font-black uppercase tracking-widest transition-all`;

      if (isNeobrutalist) {
        ctaSectionClass += " bg-white border-y-[6px] border-black shadow-[15px_15px_0px_black] my-12 mx-auto max-w-6xl";
        ctaTitleClass += " text-black uppercase italic";
        ctaSubtitleClass += " text-black font-bold";
        ctaButtonClass += " bg-[#facc15] text-black border-[4px] border-black shadow-[8px_8px_0px_black] hover:shadow-none translate-y-[-2px]";
      } else {
        ctaSectionClass += " text-white bg-indigo-600";
        ctaSubtitleClass += " text-white/90 font-light";
        ctaButtonClass += " bg-white text-indigo-600 rounded-2xl hover:bg-gray-50";
      }

      return (
        <section className={ctaSectionClass} style={bgStyle}>
          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <h2 className={ctaTitleClass}>{block.content.title}</h2>
            <p className={ctaSubtitleClass}>{block.content.subtitle}</p>
            <button
               className={ctaButtonClass}
               style={block.content.buttonColor ? { backgroundColor: block.content.buttonColor, color: block.content.buttonTextColor, border: isNeobrutalist ? '4px solid black' : 'none' } : {}}
            >
               {block.content.buttonText}
            </button>
          </div>
        </section>
      );
    }

    case 'footer': {
      const isNeobrutalist = block.content.theme === 'neobrutalist';
      const isGlass = block.content.theme === 'glass';

      if (variant === 'mega') {
        let footerClass = `w-full py-24 px-8 ${fontFamily}`;
        if (isNeobrutalist) footerClass += " bg-white border-t-[6px] border-black";
        else if (isGlass) footerClass += " bg-white/5 backdrop-blur-xl border-t border-white/20";
        else footerClass += " bg-white border-t border-gray-100";

        return (
          <footer className={footerClass} style={{ backgroundColor: block.content.backgroundColor }}>
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 md:gap-8">
              <div className="col-span-2 lg:col-span-2 space-y-8">
                <div className={`text-3xl font-black tracking-tighter uppercase ${isNeobrutalist ? 'text-black italic' : 'text-indigo-600'}`}>Alrion.</div>
                <p className={`max-w-sm leading-relaxed font-medium ${isNeobrutalist ? 'text-black' : 'text-gray-500'}`}>{block.content.text}</p>
                <div className="flex gap-4">
                  {Array(4).fill(0).map((_, i) => (
                    <div key={i} className={`w-10 h-10 flex items-center justify-center transition-all cursor-pointer ${isNeobrutalist ? 'bg-white border-[3px] border-black shadow-[4px_4px_0px_black] hover:shadow-none translate-y-[-2px]' : 'rounded-xl bg-gray-50 border border-gray-100 hover:bg-indigo-600 hover:text-white'}`}>
                      <Plus className="w-4 h-4" />
                    </div>
                  ))}
                </div>
              </div>
              {[
                { title: 'Plataforma', links: ['Características', 'API & Docs', 'Enterprise'] },
                { title: 'Recursos', links: ['Blog', 'Comunidade', 'Suporte'] },
                { title: 'Empresa', links: ['Sobre Nós', 'Carreiras', 'Privacidade'] }
              ].map((col, idx) => (
                <div key={idx} className="space-y-6">
                  <h4 className={`font-bold uppercase tracking-widest text-xs ${isNeobrutalist ? 'text-black' : 'text-gray-950'}`}>{col.title}</h4>
                  <ul className={`space-y-4 text-sm font-medium cursor-pointer ${isNeobrutalist ? 'text-black underline underline-offset-4 decoration-2' : 'text-gray-500'}`}>
                    {col.links.map(link => <li key={link} className="hover:text-indigo-600 transition-colors">{link}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className={`max-w-7xl mx-auto mt-20 pt-8 border-t text-[10px] font-bold uppercase tracking-widest text-center ${isNeobrutalist ? 'border-black text-black' : 'border-gray-50 text-gray-400'}`}>
              © 2026 ALRION CO. OPERATING UNDER GLOBAL PROTOCOLS.
            </div>
          </footer>
        );
      }

      if (variant === 'centered') {
        let footerClass = `w-full py-20 px-8 ${fontFamily}`;
        if (isNeobrutalist) footerClass += " bg-[#facc15] border-t-[6px] border-black text-black";
        else footerClass += " bg-gray-950 text-white";

        return (
          <footer className={footerClass} style={{ backgroundColor: block.content.backgroundColor }}>
            <div className="max-w-7xl mx-auto text-center space-y-8">
              <div className={`text-3xl font-black tracking-tighter uppercase italic ${isNeobrutalist ? 'text-black' : 'text-indigo-500'}`}>Alrion Tech</div>
              <p className={`max-w-md mx-auto leading-relaxed ${isNeobrutalist ? 'font-bold' : 'text-gray-400 font-light'}`}>{block.content.text}</p>
              <div className="flex justify-center gap-6">
                 {['Twitter', 'Instagram', 'LinkedIn'].map(s => (
                   <span key={s} className={`text-xs font-bold uppercase tracking-[0.3em] cursor-pointer transition-colors ${isNeobrutalist ? 'text-black hover:underline' : 'text-gray-500 hover:text-white'}`}>{s}</span>
                 ))}
              </div>
              <div className={`pt-12 text-[10px] uppercase tracking-widest ${isNeobrutalist ? 'text-black' : 'text-gray-700'}`}>© 2026 Crafted in Earth Space.</div>
            </div>
          </footer>
        )
      }

      return (
        <footer className={`w-full py-12 px-8 border-t ${fontFamily} ${isNeobrutalist ? 'bg-white border-black border-t-[4px] text-black' : 'border-gray-100'}`} style={{ backgroundColor: block.content.backgroundColor, color: block.content.textColor }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className={`font-black tracking-tighter ${isNeobrutalist ? 'text-2xl uppercase italic' : 'text-gray-900'}`}>Alrion.</div>
            <p className={`text-sm leading-relaxed font-medium ${isNeobrutalist ? 'font-bold' : 'text-gray-500'}`}>{block.content.text}</p>
            <div className="flex gap-4">
              <div className={`w-8 h-8 rounded-full ${isNeobrutalist ? 'bg-[#ffde00] border-2 border-black shadow-[3px_3px_0px_black]' : 'bg-gray-100'}`}></div>
              <div className={`w-8 h-8 rounded-full ${isNeobrutalist ? 'bg-[#22d3ee] border-2 border-black shadow-[3px_3px_0px_black]' : 'bg-gray-100'}`}></div>
            </div>
          </div>
        </footer>
      );
    }
    
    // Fallback for types previously handled in a simpler way
    case 'gallery': {
      const isNeobrutalist = block.content.theme === 'neobrutalist';
      const isGlass = block.content.theme === 'glass';
      const clickableImages = block.content.clickableImages;
      const modalType = block.content.modalType || 'fullscreen';

      if (variant === 'masonry-dark') {
        return (
          <section className={`w-full py-24 px-8 ${isNeobrutalist ? 'bg-black' : 'bg-gray-950'} ${fontFamily}`} style={{ backgroundColor: block.content.backgroundColor }}>
            <div className="max-w-7xl mx-auto">
               <h2 className={`text-5xl font-black mb-20 tracking-tighter uppercase italic border-b pl-4 ${isNeobrutalist ? 'text-[#ffde00] border-[#ffde00]' : 'text-cyan-400 border-cyan-400'}`}>{block.content.title}</h2>
               <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 px-2">
                  {block.content.images?.map((img: string, i: number) => (
                    <div 
                      key={i} 
                      onClick={() => clickableImages && setSelectedImage(img)}
                      className={`mb-4 break-inside-avoid relative overflow-hidden group transition-all cursor-pointer ${isNeobrutalist ? 'border-[3px] border-[#ffde00] hover:translate-y-[-4px]' : 'rounded-xl border border-gray-800 hover:border-cyan-500/50'}`}
                    >
                       <Image src={img} alt={`Img ${i}`} width={500} height={1000} className={`w-full h-auto transition-all duration-700 ${isNeobrutalist ? '' : 'grayscale hover:grayscale-0'}`} />
                       <div className={`absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black px-2 py-1 rounded-sm uppercase ${isNeobrutalist ? 'bg-[#ffde00] text-black' : 'bg-cyan-500 text-black'}`}>P_{i+100}</div>
                    </div>
                  ))}
               </div>
            </div>
          </section>
        )
      }

      if (variant === 'minimal-editorial') {
        return (
          <section className={`w-full py-32 px-8 ${isNeobrutalist ? 'bg-[#f0f0f0]' : 'bg-white'} ${fontFamily}`}>
            <div className="max-w-5xl mx-auto space-y-24">
              <h2 className={`text-6xl text-center tracking-tight ${isNeobrutalist ? 'font-black uppercase italic text-black' : 'font-serif italic text-gray-950'}`}>{block.content.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                {block.content.images?.slice(0, 4).map((img: string, i: number) => (
                  <div 
                    key={i} 
                    onClick={() => clickableImages && setSelectedImage(img)}
                    className={`${i % 2 === 0 ? 'mt-0' : 'mt-24'} relative aspect-[3/4] group overflow-hidden cursor-pointer ${isNeobrutalist ? 'border-[6px] border-black shadow-[15px_15px_0px_black]' : ''}`}
                  >
                    <Image src={img} alt={`Img ${i}`} fill className={`object-cover transition-all duration-1000 ${isNeobrutalist ? '' : 'grayscale hover:grayscale-0'}`} />
                    {!isNeobrutalist && <div className="absolute inset-0 border border-gray-100 pointer-events-none"></div>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      }

      let sectionClass = `w-full py-24 px-8 ${fontFamily}`;
      if (isNeobrutalist) sectionClass += " bg-white border-y-[6px] border-black";
      else if (isGlass) sectionClass += " bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-3xl";
      else sectionClass += " bg-white";

      return (
        <section className={sectionClass} style={{ backgroundColor: block.content.backgroundColor }}>
          <div className="max-w-7xl mx-auto">
             <h2 className={`text-4xl font-black uppercase text-center mb-20 ${isNeobrutalist ? 'text-black italic' : 'italic underline decoration-indigo-500/30 underline-offset-8 decoration-8'}`}>{block.content.title}</h2>
             <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
                {block.content.images?.map((img: string, i: number) => (
                  <div 
                    key={i} 
                    onClick={() => clickableImages && setSelectedImage(img)}
                    className={`break-inside-avoid relative overflow-hidden group transition-all ${clickableImages ? 'cursor-pointer' : ''} ${isNeobrutalist ? 'border-[4px] border-black shadow-[8px_8px_0px_black] hover:shadow-none translate-x-1' : 'rounded-[2rem] shadow-lg hover:shadow-2xl'}`}
                  >
                     <Image src={img} alt={`Img ${i}`} width={500} height={400} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                     {clickableImages && (
                       <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center ${isNeobrutalist ? 'bg-[#ffde00]/80' : 'bg-black/40'}`}>
                          <Plus className={`${isNeobrutalist ? 'text-black' : 'text-white'} w-12 h-12`} />
                       </div>
                     )}
                  </div>
                ))}
             </div>
          </div>

          {/* Modal Implementation */}
          {selectedImage && (
            <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 ${isNeobrutalist ? 'bg-[#ffde00]/95' : 'bg-black/90'}`} onClick={() => setSelectedImage(null)}>
              <button 
                className={`absolute top-6 right-6 p-2 transition-colors ${isNeobrutalist ? 'text-black border-4 border-black bg-white shadow-[4px_4px_0px_black]' : 'text-white/70 hover:text-white'}`}
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              >
                <X className="w-10 h-10" />
              </button>
              
              <div 
                className={`overflow-hidden w-full max-h-full flex flex-col md:flex-row ${isNeobrutalist ? 'bg-white border-[6px] border-black shadow-[20px_20px_0px_black] rounded-none' : 'bg-white rounded-[3rem] shadow-2xl'} ${modalType === 'split' ? 'max-w-6xl' : 'max-w-5xl bg-transparent shadow-none border-none'}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`relative ${modalType === 'split' ? 'w-full md:w-3/5 h-[40vh] md:h-[70vh]' : 'w-full h-[85vh]'} ${isNeobrutalist && modalType === 'split' ? 'border-r-[6px] border-black' : ''}`}>
                  <Image 
                    src={selectedImage} 
                    alt="Selected" 
                    fill 
                    className="object-contain" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {modalType === 'split' && (
                  <div className={`w-full md:w-2/5 p-10 md:p-14 flex flex-col justify-center space-y-6 ${isNeobrutalist ? 'bg-white' : 'bg-white'}`}>
                    <h3 className={`text-3xl md:text-4xl font-black leading-tight uppercase italic ${isNeobrutalist ? 'text-black' : 'text-gray-900'}`}>{block.content.modalTitle || 'Detalhes da Imagem'}</h3>
                    <div className={`w-16 h-1 ${isNeobrutalist ? 'bg-black h-2' : 'bg-indigo-600'}`}></div>
                    <p className={`text-lg leading-relaxed ${isNeobrutalist ? 'text-black font-bold' : 'text-gray-600'}`}>
                      {block.content.modalText || 'Este é um espaço dedicado para descrever sua obra, produto ou captura em detalhes.'}
                    </p>
                    <div className="flex flex-col gap-4 pt-4">
                      <button className={`px-8 py-4 font-black uppercase tracking-widest transition-all text-sm ${isNeobrutalist ? 'bg-[#22d3ee] text-black border-4 border-black shadow-[6px_6px_0px_black]' : 'bg-indigo-600 text-white rounded-2xl'}`}>
                        {block.content.modalButton1Text || 'Saiba Mais'}
                      </button>
                      <button className={`px-8 py-4 font-black uppercase tracking-widest transition-all text-sm ${isNeobrutalist ? 'bg-white text-black border-4 border-black shadow-[6px_6px_0px_black]' : 'bg-gray-100 text-gray-950 rounded-2xl'}`}>
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
    }

    case 'testimonials': {
      const isNeobrutalist = block.content.theme === 'neobrutalist';
      const isGlass = block.content.theme === 'glass';

      if (variant === 'minimal') {
        return (
          <section className={`w-full py-40 px-8 ${isNeobrutalist ? 'bg-white border-y-[6px] border-black' : 'bg-white'} ${fontFamily}`}>
            <div className={`max-w-4xl mx-auto text-center space-y-12 ${isNeobrutalist ? 'bg-[#ffde00] p-12 border-[4px] border-black shadow-[15px_15px_0px_black]' : ''}`}>
               <Quote className={`w-16 h-16 mx-auto mb-4 ${isNeobrutalist ? 'text-black' : 'text-indigo-100'}`} fill="currentColor" />
               <h2 className={`text-3xl md:text-5xl leading-tight ${isNeobrutalist ? 'font-black uppercase italic text-black' : 'font-serif italic text-gray-900'}`}>&quot;{block.content.items?.[0].quote}&quot;</h2>
               <div className="flex flex-col items-center gap-4">
                  <div className={`w-16 h-16 overflow-hidden ${isNeobrutalist ? 'border-4 border-black' : 'rounded-full border-2 border-gray-100 shadow-sm'}`}>
                    {block.content.items?.[0].avatar && <Image src={block.content.items?.[0].avatar} alt={block.content.items?.[0].author} width={64} height={64} className="w-full h-full object-cover" />}
                  </div>
                  <div className="text-center">
                    <div className={`font-bold text-xl tracking-tight ${isNeobrutalist ? 'text-black uppercase italic' : 'text-gray-900'}`}>{block.content.items?.[0].author}</div>
                    <div className={`font-medium text-sm uppercase tracking-widest ${isNeobrutalist ? 'text-black underline decoration-2' : 'text-indigo-600'}`}>{block.content.items?.[0].role}</div>
                  </div>
               </div>
            </div>
          </section>
        );
      }

      if (variant === 'dark') {
        return (
          <section className={`w-full py-24 px-8 bg-black border-y ${isNeobrutalist ? 'border-black' : 'border-white/5'} ${fontFamily}`}>
            <div className="max-w-5xl mx-auto space-y-12">
               <div className="flex items-center gap-3">
                 <div className={`w-2 h-2 rounded-full animate-pulse ${isNeobrutalist ? 'bg-[#ffde00]' : 'bg-green-500'}`}></div>
                 <h2 className={`font-mono text-sm tracking-widest uppercase ${isNeobrutalist ? 'text-white' : 'text-green-500'}`}>{block.content.title}</h2>
               </div>
               <div className="space-y-4">
                  {block.content.items?.map((item: any, i: number) => (
                    <div key={i} className={`p-8 border rounded-xl font-mono text-xs md:text-sm group transition-all ${isNeobrutalist ? 'bg-white text-black border-black border-[4px] shadow-[8px_8px_0px_#22d3ee]' : 'bg-gray-900/40 border-white/5 group-hover:border-green-500/30 text-gray-300'}`}>
                       {!isNeobrutalist && <div className="text-gray-500 mb-2 invisible group-hover:visible">{"> "} SYSTEM_DECRYPTION_ACTIVE...</div>}
                       <p className={`leading-relaxed italic mb-4 ${isNeobrutalist ? 'font-black' : ''}`}>&quot;{item.quote}&quot;</p>
                       <div className={`${isNeobrutalist ? 'text-black font-black uppercase bg-[#22d3ee] inline-block px-2' : 'text-green-400 font-bold'}`}>BY: {item.author.toUpperCase()} // ROLE: {item.role.toUpperCase()}</div>
                    </div>
                  ))}
               </div>
            </div>
          </section>
        );
      }

      let sectionClass = `w-full py-32 px-8 ${fontFamily}`;
      if (isNeobrutalist) sectionClass += " bg-white border-y-[6px] border-black";
      else if (isGlass) sectionClass += " bg-gradient-to-br from-indigo-500/10 to-purple-500/10";
      else sectionClass += " bg-[#f0f4ff]";

      return (
        <section className={sectionClass} style={{ backgroundColor: block.content.backgroundColor }}>
           <div className="max-w-7xl mx-auto">
              <h2 className={`text-3xl font-bold text-center mb-20 ${isNeobrutalist ? 'text-black uppercase italic text-5xl' : ''}`}>{block.content.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 {block.content.items?.map((item: any, i: number) => (
                   <div key={i} className={`p-12 transition-all relative mt-8 ${isNeobrutalist ? 'bg-white border-[4px] border-black shadow-[12px_12px_0px_black]' : isGlass ? 'bg-white/10 backdrop-blur-xl border border-white/20 rounded-[3rem] shadow-2xl' : 'bg-white/50 backdrop-blur-sm rounded-[3rem] border border-white/40 shadow-xl'}`}>
                      <div className={`absolute -top-10 left-12 w-20 h-20 overflow-hidden ${isNeobrutalist ? 'border-4 border-black' : 'rounded-full border-4 border-white shadow-xl bg-gray-200'}`}>
                        {item.avatar && <Image src={item.avatar} alt={item.author} width={80} height={80} className="w-full h-full object-cover" />}
                      </div>
                      <p className={`text-xl italic leading-relaxed pt-6 mb-8 font-light ${isNeobrutalist ? 'text-black font-bold not-italic' : isGlass ? 'text-white italic' : 'text-gray-700 italic'}`}>&quot;{item.quote}&quot;</p>
                      <div className={`pt-4 border-t flex items-center justify-between ${isNeobrutalist ? 'border-black' : 'border-gray-100'}`}>
                         <div className={`font-bold ${isNeobrutalist ? 'text-black uppercase italic' : isGlass ? 'text-white' : 'text-indigo-900'}`}>{item.author}</div>
                         <div className={`text-sm font-medium ${isNeobrutalist ? 'text-black underline' : isGlass ? 'text-white/60' : 'text-indigo-600/70'}`}>{item.role}</div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      );
    }

    case 'pricing': {
      const isNeobrutalist = block.content.theme === 'neobrutalist';
      const isGlass = block.content.theme === 'glass';

      if (variant === 'saas') {
        return (
          <section className={`w-full py-32 px-8 ${fontFamily}`} style={{ backgroundColor: block.content.backgroundColor || (isNeobrutalist ? '#ffffff' : '#f8fafc') }}>
            <div className="max-w-7xl mx-auto">
              {isNeobrutalist && <h2 className="text-6xl font-black uppercase italic text-center mb-24 underline decoration-8 decoration-black underline-offset-8">{block.content.title}</h2>}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {block.content.plans?.map((plan: any, i: number) => (
                  <div key={i} className={`relative flex flex-col p-12 transition-all ${isNeobrutalist ? 'bg-white border-[6px] border-black shadow-[15px_15px_0px_black] hover:translate-x-2' : 'rounded-[2.5rem] bg-white border border-gray-100 hover:shadow-2xl'} ${plan.highlighted && !isNeobrutalist ? 'scale-105 z-10 border-indigo-500 ring-4 ring-indigo-500/10' : ''}`}>
                    {plan.highlighted && (
                      <div className={`absolute -top-4 left-1/2 -translate-x-1/2 text-white text-[10px] font-black px-4 py-1.5 uppercase tracking-tighter shadow-lg ${isNeobrutalist ? 'bg-black border-2 border-white' : 'bg-indigo-600 rounded-full'}`}>
                        Mais Popular
                      </div>
                    )}
                    <div className="mb-10 text-center md:text-left">
                      <h3 className={`text-xl font-black mb-2 uppercase ${isNeobrutalist ? 'text-black italic' : 'text-gray-900'}`}>{plan.name}</h3>
                      <div className="flex items-baseline justify-center md:justify-start gap-1">
                        <span className={`text-5xl font-black tracking-tighter ${isNeobrutalist ? 'text-black italic' : 'text-gray-900'}`}>{plan.price}</span>
                        <span className={`font-medium lowercase ${isNeobrutalist ? 'text-black font-bold' : 'text-gray-400'}`}>/mês</span>
                      </div>
                    </div>
                    <ul className="space-y-5 mb-12 flex-1">
                      {plan.features?.map((f: string, j: number) => (
                        <li key={j} className={`flex items-center gap-3 text-sm font-medium ${isNeobrutalist ? 'text-black' : 'text-gray-600'}`}>
                          <div className={`w-5 h-5 flex items-center justify-center shrink-0 ${isNeobrutalist ? 'bg-black' : 'bg-indigo-100 rounded-full'}`}>
                            <Check className={`w-3 h-3 ${isNeobrutalist ? 'text-white' : 'text-indigo-600'}`} />
                          </div>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-5 font-black uppercase tracking-widest text-xs transition-all ${isNeobrutalist ? 'bg-[#ffde00] text-black border-4 border-black shadow-[6px_6px_0px_black] hover:shadow-none translate-y-[-2px]' : plan.highlighted ? 'bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-200' : 'bg-gray-50 text-gray-900 rounded-2xl hover:bg-gray-100'}`}>
                      {plan.buttonText}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      }

      if (variant === 'minimal') {
        let sectionClass = `w-full py-32 px-8 ${fontFamily}`;
        if (isNeobrutalist) sectionClass += " bg-white border-y-[6px] border-black";
        else sectionClass += " bg-white";

        return (
          <section className={sectionClass}>
             <div className="max-w-5xl mx-auto">
               <div className="text-center mb-20 space-y-4">
                 <h2 className={`text-4xl font-black ${isNeobrutalist ? 'uppercase italic text-black' : 'text-gray-900'}`}>{block.content.title}</h2>
                 <p className={`max-w-xl mx-auto ${isNeobrutalist ? 'text-black font-medium uppercase text-sm italic' : 'text-gray-500'}`}>Preços transparentes para todos os tamanhos de negócio.</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {block.content.plans?.map((plan: any, i: number) => (
                   <div key={i} className={`p-10 transition-all ${isNeobrutalist ? 'bg-white border-[4px] border-black shadow-[10px_10px_0px_black] hover:bg-[#f0f0f0]' : `rounded-3xl border-2 ${plan.highlighted ? 'border-indigo-600 shadow-2xl' : 'border-gray-100 hover:border-gray-300'}`}`}>
                      <h3 className={`text-lg font-black mb-2 uppercase ${isNeobrutalist ? 'text-black italic' : 'text-gray-900'}`}>{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mb-8">
                        <span className={`text-4xl font-black ${isNeobrutalist ? 'text-black italic' : 'text-gray-900'}`}>{plan.price}</span>
                      </div>
                      <ul className="space-y-4 mb-10">
                        {plan.features?.map((f: string, j: number) => (
                          <li key={j} className={`flex items-center gap-3 text-sm font-medium ${isNeobrutalist ? 'text-black' : 'text-gray-600'}`}>
                            <Check className={`w-4 h-4 ${isNeobrutalist ? 'text-black' : 'text-indigo-600'}`} /> {f}
                          </li>
                        ))}
                      </ul>
                      <button className={`w-full py-4 font-black text-sm transition-all uppercase ${isNeobrutalist ? 'bg-[#22d3ee] text-black border-4 border-black shadow-[6px_6px_0px_black]' : `rounded-xl ${plan.highlighted ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200' : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'}`}`}>
                        {plan.buttonText}
                      </button>
                   </div>
                 ))}
               </div>
             </div>
          </section>
        )
      }

      let defaultSectionClass = `w-full py-32 px-8 ${fontFamily}`;
      if (isNeobrutalist) defaultSectionClass += " bg-white border-y-[6px] border-black";
      else if (isGlass) defaultSectionClass += " bg-gradient-to-br from-indigo-500/10 to-purple-500/10";
      else defaultSectionClass += " bg-white";

      return (
        <section className={defaultSectionClass} style={{ backgroundColor: block.content.backgroundColor }}>
           <div className="max-w-7xl mx-auto">
              <h2 className={`text-5xl font-black italic tracking-tighter text-center mb-24 uppercase ${isNeobrutalist ? 'text-black underline decoration-4 decoration-black' : ''}`}>{block.content.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                 {block.content.plans?.map((plan: any, i: number) => (
                   <div key={i} className={`p-1px transition-all ${isNeobrutalist ? 'bg-black' : isGlass ? 'bg-white/10 backdrop-blur-3xl border border-white/20' : plan.highlighted ? 'bg-gradient-to-b from-indigo-600 to-indigo-900 shadow-2xl' : 'bg-gray-100 shadow-sm'} ${isNeobrutalist ? '' : 'rounded-[3rem]'}`}>
                      <div className={`p-12 h-full flex flex-col items-center text-center ${isNeobrutalist ? 'bg-white border-[4px] border-black shadow-[15px_15px_0px_#ffde00] hover:translate-x-1' : 'bg-white rounded-[3rem]'}`}>
                         <h3 className={`text-sm font-black uppercase tracking-[0.3em] mb-6 ${isNeobrutalist ? 'text-black italic' : 'text-indigo-600'}`}>{plan.name}</h3>
                         <div className={`text-5xl font-black mb-10 leading-none ${isNeobrutalist ? 'text-black' : 'text-gray-950'}`}>{plan.price}</div>
                         <ul className={`space-y-4 mb-12 flex-1 text-sm ${isNeobrutalist ? 'text-black font-bold' : isGlass ? 'text-white' : 'text-gray-500 font-medium'}`}>
                            {plan.features?.map((f: string, j: number) => <li key={j} className="flex items-center gap-3"> <Check className={`w-4 h-4 shrink-0 ${isNeobrutalist ? 'text-black' : 'text-green-500'}`} /> {f}</li>)}
                         </ul>
                         <button className={`w-full py-5 font-black uppercase tracking-widest text-xs transition-all ${isNeobrutalist ? 'bg-[#ffde00] text-black border-4 border-black' : plan.highlighted ? 'bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 rounded-full' : 'bg-gray-950 text-white hover:bg-black rounded-full'}`}>
                            {plan.buttonText}
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      );
    }

    case 'faq': {
      const isNeobrutalist = block.content.theme === 'neobrutalist';
      const isGlass = block.content.theme === 'glass';

      if (variant === 'accordion') {
        return (
          <section className={`w-full py-32 px-8 ${isNeobrutalist ? 'bg-white border-y-[6px] border-black' : isGlass ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10' : 'bg-white'} ${fontFamily}`}>
            <div className={`max-w-3xl mx-auto ${isNeobrutalist ? 'bg-black p-1 shadow-[20px_20px_0px_black]' : ''}`}>
               <h2 className={`text-4xl font-black mb-16 text-center uppercase tracking-tighter ${isNeobrutalist ? 'text-black bg-white p-6 border-[6px] border-black italic mb-0' : 'text-gray-900'}`}>{block.content.title}</h2>
               <div className={`space-y-px overflow-hidden ${isNeobrutalist ? 'bg-black border-[4px] border-black' : isGlass ? 'bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl' : 'bg-gray-100 border border-gray-100 rounded-3xl shadow-2xl'}`}>
                  {block.content.questions?.map((q: any, i: number) => (
                    <div key={i} className={`p-8 group cursor-pointer transition-colors ${isNeobrutalist ? 'bg-white hover:bg-[#ffde00] border-b-[4px] border-black last:border-b-0' : 'bg-white hover:bg-gray-50/50'}`}>
                       <div className="flex items-center justify-between gap-6">
                          <h3 className={`text-xl font-bold leading-tight ${isNeobrutalist ? 'text-black uppercase italic' : 'text-gray-900'}`}>{q.question}</h3>
                          <div className={`w-10 h-10 flex items-center justify-center transition-all ${isNeobrutalist ? 'bg-black text-white' : 'rounded-full border border-gray-100 text-gray-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600'}`}>
                            <ChevronDown className="w-5 h-5 group-hover:rotate-180 transition-transform" />
                          </div>
                       </div>
                       <div className="max-h-0 group-hover:max-h-96 overflow-hidden transition-all duration-500">
                         <p className={`mt-8 leading-relaxed text-lg pr-12 ${isNeobrutalist ? 'text-black font-black uppercase italic text-sm' : 'text-gray-500 font-medium'}`}>{q.answer}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </section>
        );
      }

       return (
         <section className={`w-full py-24 px-8 ${fontFamily} ${isNeobrutalist ? 'bg-white' : ''}`} style={{ backgroundColor: block.content.backgroundColor || (isNeobrutalist ? '#ffffff' : '#f9fafb') }}>
           <div className="max-w-4xl mx-auto">
              <h2 className={`text-3xl font-black uppercase tracking-widest text-center mb-20 ${isNeobrutalist ? 'text-black italic text-5xl underline decoration-8 decoration-black' : ''}`}>{block.content.title}</h2>
              <div className="space-y-4">
                 {block.content.questions?.map((q: any, i: number) => (
                   <div key={i} className={`p-8 transition-all cursor-pointer group ${isNeobrutalist ? 'bg-white border-[4px] border-black shadow-[10px_10px_0px_black] hover:translate-y-[-4px]' : 'bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md'}`}>
                      <div className="flex items-center justify-between">
                         <h3 className={`text-xl font-black uppercase ${isNeobrutalist ? 'text-black italic' : 'text-gray-900'}`}>{q.question}</h3>
                         <Plus className={`${isNeobrutalist ? 'text-black' : 'text-indigo-400'} group-hover:rotate-45 transition-transform`} />
                      </div>
                      <p className={`mt-6 leading-relaxed font-medium ${isNeobrutalist ? 'text-black' : 'text-gray-500'}`}>{q.answer}</p>
                   </div>
                 ))}
              </div>
           </div>
         </section>
       );
    }

    case 'contact': {
      const isNeobrutalist = block.content.theme === 'neobrutalist';
      const isGlass = block.content.theme === 'glass';

       if (variant === 'minimal') {
         return (
          <section className={`w-full py-32 px-8 ${isNeobrutalist ? 'bg-[#ffde00] border-y-[6px] border-black' : 'bg-white'} ${fontFamily}`}>
            <div className={`max-w-2xl mx-auto text-center space-y-16 ${isNeobrutalist ? 'bg-white p-12 border-[6px] border-black shadow-[20px_20px_0px_black]' : ''}`}>
               <div className="space-y-4">
                 <h2 className={`text-5xl font-black tracking-tighter uppercase ${isNeobrutalist ? 'text-black italic' : 'text-gray-900'}`}>{block.content.title}</h2>
                 <p className={`font-medium ${isNeobrutalist ? 'text-black' : 'text-gray-500'}`}>{block.content.subtitle}</p>
                 <div className={`font-bold underline cursor-pointer ${isNeobrutalist ? 'text-black text-2xl' : 'text-indigo-600'}`}>{block.content.email}</div>
               </div>
               <div className="space-y-6 text-left">
                  <input placeholder="SEU NOME" className={`w-full border-b-2 py-4 outline-none font-bold uppercase tracking-widest text-sm ${isNeobrutalist ? 'border-black placeholder:text-black/30' : 'border-gray-100 focus:border-indigo-600'}`} />
                  <input placeholder="EMAIL" className={`w-full border-b-2 py-4 outline-none font-bold uppercase tracking-widest text-sm ${isNeobrutalist ? 'border-black placeholder:text-black/30' : 'border-gray-100 focus:border-indigo-600'}`} />
                  <textarea placeholder="MENSAGEM" rows={3} className={`w-full border-b-2 py-4 outline-none font-bold uppercase tracking-widest text-sm resize-none ${isNeobrutalist ? 'border-black placeholder:text-black/30' : 'border-gray-100 focus:border-indigo-600'}`}></textarea>
                  <button className={`w-full py-6 font-black uppercase tracking-[0.4em] transition-all ${isNeobrutalist ? 'bg-black text-white hover:bg-[#22d3ee] hover:text-black shadow-[8px_8px_0px_black] hover:shadow-none' : 'bg-gray-950 text-white hover:bg-indigo-600'}`}>Submit Now</button>
               </div>
            </div>
          </section>
         )
       }

       if (variant === 'dark-premium') {
          return (
            <section className={`w-full py-32 px-8 text-white ${fontFamily}`} style={{ backgroundColor: block.content.backgroundColor || (isNeobrutalist ? '#000000' : '#0a0a0a') }}>
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                   <h2 className={`text-6xl md:text-8xl leading-none ${isNeobrutalist ? 'font-black uppercase italic' : 'font-serif italic'}`}>{block.content.title}</h2>
                   <div className="flex flex-col gap-6 text-xl text-gray-400 font-light">
                      <p className={isNeobrutalist ? 'text-white font-bold uppercase tracking-widest' : ''}>{block.content.address || 'São Paulo, BR'}</p>
                      <p className={isNeobrutalist ? 'text-[#ffde00] font-black uppercase text-3xl' : ''}>{block.content.email}</p>
                   </div>
                </div>
                <div className={`p-12 md:p-16 flex flex-col gap-10 ${isNeobrutalist ? 'bg-white border-[6px] border-[#ffde00] text-black shadow-[20px_20px_0px_#ffde00]' : 'bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[4rem]'}`}>
                   <div className="space-y-2">
                      <label className={`text-[10px] uppercase tracking-widest font-bold ${isNeobrutalist ? 'text-black' : 'text-indigo-400'}`}>Inquiry</label>
                      <select className={`w-full bg-transparent border-b py-4 outline-none text-2xl appearance-none ${isNeobrutalist ? 'border-black text-black font-black uppercase italic' : 'border-white/20 text-white font-serif italic'}`}>
                        <option className="bg-gray-950">Design Project</option>
                        <option className="bg-gray-950">Tech Strategy</option>
                        <option className="bg-gray-950">Partnership</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className={`text-[10px] uppercase tracking-widest font-bold ${isNeobrutalist ? 'text-black' : 'text-indigo-400'}`}>Email</label>
                      <input className={`w-full bg-transparent border-b py-4 outline-none text-xl placeholder:text-white/20 ${isNeobrutalist ? 'border-black text-black font-black placeholder:text-black/20' : 'border-white/20 text-white font-light'}`} placeholder="your@email.com" />
                   </div>
                   <button className={`mt-6 py-6 transition-all font-black uppercase tracking-widest flex items-center justify-center gap-4 ${isNeobrutalist ? 'bg-black text-white hover:bg-[#ffde00] hover:text-black border-none' : 'bg-transparent border border-white/20 rounded-full hover:bg-white hover:text-gray-950'}`}>
                     {block.content.buttonText} <ArrowRight className="w-5 h-5" />
                   </button>
                </div>
              </div>
            </section>
          )
       }

       if (variant === 'geometric') {
         return (
           <section className={`w-full py-24 px-8 ${isNeobrutalist ? 'bg-[#ffde00]' : 'bg-[#00ff9d]'} ${fontFamily}`}>
             <div className="max-w-7xl mx-auto flex flex-col md:flex-row border-[6px] border-black bg-white shadow-[20px_20px_0px_black] overflow-hidden">
                <div className="flex-1 bg-black p-12 md:p-20 text-white space-y-10">
                   <h2 className="text-6xl font-black uppercase leading-[0.8] tracking-tighter italic">{block.content.title}</h2>
                   <div className={`w-32 h-32 rounded-full ${isNeobrutalist ? 'bg-[#22d3ee]' : 'bg-[#00ff9d]'}`}></div>
                   <div className="pt-10 space-y-4">
                     <p className="font-mono text-cyan-400">{"> "} LOCATION_DATA: {block.content.address || 'UNKNOWN'}</p>
                     <p className="font-mono text-cyan-400">{"> "} EMAIL_SYNC: {block.content.email}</p>
                   </div>
                </div>
                <div className="flex-1 p-12 md:p-20 flex flex-col gap-8">
                   <div className="space-y-12">
                     <h3 className="text-4xl font-black uppercase italic tracking-tighter">Get in Touch</h3>
                     <div className="space-y-8 flex-1">
                        <input className="w-full bg-transparent border-b-4 border-black py-4 outline-none text-2xl font-black uppercase italic placeholder:text-black/10" placeholder="NAME" />
                        <input className="w-full bg-transparent border-b-4 border-black py-4 outline-none text-2xl font-black uppercase italic placeholder:text-black/10" placeholder="EMAIL" />
                        <button className="mt-8 px-12 py-6 bg-black text-white font-black uppercase tracking-[0.3em] hover:bg-[#22d3ee] hover:text-black transition-all">CONNECT_SYNC</button>
                     </div>
                   </div>
                </div>
              </div>
            </section>
         )
       }

       let sectionClass = `w-full py-32 px-8 ${fontFamily}`;
       if (isNeobrutalist) sectionClass += " bg-white border-y-[6px] border-black";
       else if (isGlass) sectionClass += " bg-gradient-to-br from-indigo-500/10 to-purple-500/10";
       else sectionClass += " bg-white";

       return (
          <section className={sectionClass} style={{ backgroundColor: block.content.backgroundColor }}>
             <div className="max-w-7xl mx-auto">
                <div className={`rounded-[4rem] text-white p-12 md:p-24 grid grid-cols-1 md:grid-cols-2 gap-20 ${isNeobrutalist ? 'bg-black shadow-[20px_20px_0px_#ffde00] rounded-none' : 'bg-indigo-900 shadow-[-40px_40px_0px_#e0f2fe]'}`}>
                  <div className="space-y-12">
                    <h2 className={`text-5xl md:text-7xl font-black tracking-tighter leading-none italic uppercase ${isNeobrutalist ? 'text-white' : 'text-white'}`}>{block.content.title}</h2>
                    <p className={`text-xl leading-relaxed font-light ${isNeobrutalist ? 'text-white font-bold' : 'text-indigo-100'}`}>{block.content.subtitle}</p>
                    <div className={`space-y-6 pt-10 border-t ${isNeobrutalist ? 'border-white/20' : 'border-indigo-800'}`}>
                       <div className="flex items-center gap-6"> <Shield className={`w-10 h-10 ${isNeobrutalist ? 'text-[#22d3ee]' : 'text-indigo-400'}`} /> <div> <div className="text-[10px] uppercase tracking-widest text-indigo-300">Email</div> <div className="text-xl font-bold">{block.content.email}</div> </div> </div>
                       <div className="flex items-center gap-6"> <Rocket className={`w-10 h-10 ${isNeobrutalist ? 'text-[#22d3ee]' : 'text-indigo-400'}`} /> <div> <div className="text-[10px] uppercase tracking-widest text-indigo-300">Address</div> <div className="text-xl font-bold">{block.content.address}</div> </div> </div>
                    </div>
                  </div>
                  <div className={`p-10 md:p-14 text-gray-950 flex flex-col gap-8 shadow-2xl ${isNeobrutalist ? 'bg-white border-[6px] border-[#22d3ee] rounded-none' : 'bg-white rounded-[3rem]'}`}>
                     <div className="space-y-2">
                       <label className={`text-[10px] font-black uppercase tracking-widest ${isNeobrutalist ? 'text-black' : 'text-gray-400'}`}>FullName</label>
                       <input className={`w-full py-3 text-lg font-bold transition-all outline-none ${isNeobrutalist ? 'bg-transparent border-b-4 border-black' : 'bg-gray-50 border-0 border-b-2 border-gray-100 focus:border-indigo-600 focus:bg-white'}`} />
                     </div>
                     <div className="space-y-2">
                       <label className={`text-[10px] font-black uppercase tracking-widest ${isNeobrutalist ? 'text-black' : 'text-gray-400'}`}>Email</label>
                       <input className={`w-full py-3 text-lg font-bold transition-all outline-none ${isNeobrutalist ? 'bg-transparent border-b-4 border-black' : 'bg-gray-50 border-0 border-b-2 border-gray-100 focus:border-indigo-600 focus:bg-white'}`} />
                     </div>
                     <button className={`w-full py-5 font-black uppercase tracking-[0.3em] transition-all ${isNeobrutalist ? 'bg-black text-white hover:bg-[#ffde00] hover:text-black shadow-[8px_8px_0px_#22d3ee]' : 'bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 shadow-xl'}`}>{block.content.buttonText}</button>
                  </div>
                </div>
             </div>
          </section>
       );
    }

    default:
      return <div className="p-4 border border-dashed border-red-300 text-red-500">Bloco desconhecido</div>;
  }
}
