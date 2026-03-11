'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { templates } from '@/lib/templates';
import { Block, BlockType } from '@/lib/types';
import { defaultBlockContent } from '@/lib/blocks';
import { blockVariations, blockSequenceLogic } from '@/lib/block-variations';
import { BlockRenderer } from '@/components/BlockRenderer';
import { generateProject, ProjectFile, Framework } from '@/lib/generator';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  ArrowLeft, Code, Download, Layout, Plus, Settings, Menu,
  Trash2, GripVertical, ChevronUp, ChevronDown, Check, X,
  Monitor, Laptop, Tablet, Smartphone, ArrowUp,
  Settings2, Type, Sparkles, Upload, ChevronLeft, ChevronRight
} from 'lucide-react';

type PreviewMode = 'desktop' | 'notebook' | 'tablet' | 'smartphone' | 'iphone';

function EditorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const templateId = searchParams.get('template') || 'blank';

  const [blocks, setBlocks] = useState<Block[]>(() => {
    const template = templates.find(t => t.id === templateId) || templates[0];
    return JSON.parse(JSON.stringify(template.blocks));
  });
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [exportFramework, setExportFramework] = useState<Framework>('nextjs');
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [isAddingBlock, setIsAddingBlock] = useState(false);
  const [selectedBlockTypeForVariation, setSelectedBlockTypeForVariation] = useState<BlockType | null>(null);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [isMobileLeftOpen, setIsMobileLeftOpen] = useState(false);
  const [isMobileRightOpen, setIsMobileRightOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');
  const [demoMode, setDemoMode] = useState(false);
  const blockIdCounter = useRef(0);

  const translateKey = (key: string) => {
    const translations: Record<string, string> = {
      title: 'Título',
      subtitle: 'Subtítulo',
      text: 'Texto',
      buttonText: 'Texto do Botão',
      secondaryButtonText: 'Texto do Botão Secundário',
      backgroundColor: 'Cor de Fundo',
      textColor: 'Cor do Texto',
      buttonColor: 'Cor do Botão',
      buttonTextColor: 'Cor do Texto do Botão',
      image: 'Imagem',
      backgroundImage: 'Imagem de Fundo',
      logoText: 'Texto da Logo',
      logoImage: 'Imagem da Logo',
      email: 'E-mail',
      address: 'Endereço',
      phone: 'Telefone',
      modalTitle: 'Título do Janela',
      modalText: 'Texto da Janela',
      modalButton1Text: 'Texto do Botão 1',
      modalButton2Text: 'Texto do Botão 2',
      scrollBehavior: 'Comportamento da Rolagem',
      mobileMenuBreakpoint: 'Ponto de Quebra Mobile',
      mobileMenuVariant: 'Estilo do Menu Mobile',
      logoPosition: 'Posição da Logo',
      menuPosition: 'Posição do Menu',
      headerAlignment: 'Alinhamento do Cabeçalho',
      fontFamily: 'Fonte do Bloco',
      clickableImages: 'Imagens Clicáveis (Abrir Modal)',
      showDarkModeToggle: 'Exibir Alternador de Tema',
      showSecondaryButton: 'Exibir Botão Secundário',
      isSticky: 'Cabeçalho Congelado (Acompanha a Página)',
      isFloating: 'Cabeçalho Flutuante',
      variant: 'Variação Visual',
      modalType: 'Tipo de Janela (Modal)',
      imagePosition: 'Posição da Imagem',
      links: 'Links do Menu',
      items: 'Itens',
      plans: 'Planos de Preços',
      questions: 'Perguntas Frequentes',
    };
    return translations[key] || key.replace(/([A-Z])/g, ' $1').trim();
  };

  const handleImageUpload = (id: string, field: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      handleUpdateBlockContent(id, field, reader.result as string);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddBlock = (type: BlockType, customContent?: any) => {
    const mergedContent = customContent 
      ? { ...JSON.parse(JSON.stringify(defaultBlockContent[type])), ...JSON.parse(JSON.stringify(customContent)) }
      : JSON.parse(JSON.stringify(defaultBlockContent[type]));

    const newBlock: Block = {
      id: `${type}-${Date.now()}`,
      type,
      content: mergedContent,
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
    setIsAddingBlock(false);
    setSelectedBlockTypeForVariation(null);
  };

  const handleRemoveBlock = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBlocks(blocks.filter(b => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    if (direction === 'up' && index > 0) {
      const newBlocks = [...blocks];
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
      setBlocks(newBlocks);
    } else if (direction === 'down' && index < blocks.length - 1) {
      const newBlocks = [...blocks];
      [newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]];
      setBlocks(newBlocks);
    }
  };

  const handleUpdateBlockContent = (id: string, field: string, value: any) => {
    setBlocks(blocks.map(block => {
      if (block.id === id) {
        return {
          ...block,
          content: {
            ...block.content,
            [field]: value
          }
        };
      }
      return block;
    }));
  };

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  useEffect(() => {
    if (selectedBlockId) {
      if (window.innerWidth < 1024) {
        setIsMobileRightOpen(true);
      } else {
        setIsRightSidebarOpen(true);
      }
    }
  }, [selectedBlockId]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden relative">
      {/* Topbar */}
      <header className="absolute top-4 left-4 right-4 h-14 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl flex items-center justify-between px-4 z-30 shadow-sm">
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setIsMobileLeftOpen(!isMobileLeftOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors lg:hidden"
            title="Menu de Blocos"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={() => router.push('/')}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors hidden md:block"
            title="Voltar para o Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="h-4 w-px bg-gray-300 hidden md:block"></div>
          <span className="font-semibold text-gray-900 truncate max-w-[100px] md:max-w-none">Editor</span>
        </div>

        {/* Device Preview Controls - Hidden on very small screens */}
        <div className="hidden sm:flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          {(['desktop', 'notebook', 'tablet', 'smartphone', 'iphone'] as PreviewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setPreviewMode(mode)}
              className={`p-1.5 rounded-md transition-colors ${previewMode === mode ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              title={`Visualização: ${mode}`}
            >
              {mode === 'desktop' && <Monitor className="w-4 h-4" />}
              {mode === 'notebook' && <Laptop className="w-4 h-4" />}
              {mode === 'tablet' && <Tablet className="w-4 h-4" />}
              {mode === 'smartphone' && <Smartphone className="w-4 h-4" />}
              {mode === 'iphone' && <Smartphone className="w-4 h-4" />}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 md:gap-3">
          <button
            onClick={() => setDemoMode(!demoMode)}
            className={`flex items-center gap-2 p-2 md:px-4 md:py-2 text-sm font-medium rounded-lg transition-colors border ${demoMode ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'}`}
          >
            {demoMode ? <X className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
            <span className="hidden md:inline">{demoMode ? 'Sair da Demonstração' : 'Demonstração'}</span>
          </button>
          {!demoMode && (
            <>
              <button
                onClick={() => setShowCode(true)}
                className="flex items-center gap-2 p-2 md:px-4 md:py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title="Ver Código"
              >
                <Code className="w-4 h-4" />
                <span className="hidden lg:inline">Código</span>
              </button>
              <button
                className="flex items-center gap-2 p-2 md:px-4 md:py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                title="Exportar"
              >
                <Download className="w-4 h-4" />
                <span className="hidden lg:inline">Exportar</span>
              </button>
              <button
                onClick={() => setIsMobileRightOpen(!isMobileRightOpen)}
                className={`p-2 rounded-lg transition-colors border lg:hidden ${selectedBlockId ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'text-gray-500 bg-white border-gray-300'}`}
                title="Propriedades"
              >
                <Settings className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </header>

      <div className={`flex-1 pt-20 md:pt-24 pb-4 px-2 md:px-4 flex gap-4 overflow-hidden ${demoMode ? 'pt-20' : ''}`}>
        {/* Backdrop for mobile sidebars */}
        {(isMobileLeftOpen || isMobileRightOpen) && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[35] lg:hidden"
            onClick={() => { setIsMobileLeftOpen(false); setIsMobileRightOpen(false); }}
          />
        )}

        {/* Left Sidebar - Blocks List */}
        {!demoMode && (
          <aside className={`
            bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl flex flex-col shrink-0 shadow-sm transition-all duration-300 
            fixed inset-y-4 left-4 z-40 lg:relative lg:inset-0
            ${isMobileLeftOpen ? 'translate-x-0' : '-translate-x-[calc(100%+2rem)] lg:translate-x-0'}
            ${isLeftSidebarOpen ? 'w-64' : 'w-16'}
          `}>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              {isLeftSidebarOpen && (
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Layout className="w-4 h-4 text-indigo-500" />
                  Estrutura
                </h2>
              )}
              <div className={`flex items-center ${isLeftSidebarOpen ? 'gap-2' : 'flex-col gap-4 w-full'}`}>
                <button
                  onClick={() => setIsAddingBlock(!isAddingBlock)}
                  className="p-1.5 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors"
                  title="Adicionar Bloco"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                  title={isLeftSidebarOpen ? "Recolher" : "Expandir"}
                >
                  {isLeftSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {blocks.map((block, index) => (
                <div
                  key={block.id}
                  onClick={() => {
                    setSelectedBlockId(block.id);
                    if (!isLeftSidebarOpen) setIsLeftSidebarOpen(true);
                  }}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-all ${selectedBlockId === block.id
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-900'
                    : 'bg-white border-transparent hover:bg-gray-50 text-gray-700'
                    }`}
                  title={block.type}
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-4 h-4 text-gray-400 shrink-0" />
                    {isLeftSidebarOpen && (
                      <span className="text-sm font-medium truncate">
                        {block.type === 'header' ? 'Cabeçalho' :
                          block.type === 'hero' ? 'Hero' :
                            block.type === 'features' ? 'Recursos' :
                              block.type === 'text' ? 'Texto' :
                                block.type === 'cta' ? 'Chamada' :
                                  block.type === 'footer' ? 'Rodapé' :
                                    block.type === 'gallery' ? 'Galeria' :
                                      block.type === 'testimonials' ? 'Depoimentos' :
                                        block.type === 'pricing' ? 'Preços' :
                                          block.type === 'faq' ? 'FAQ' :
                                            block.type === 'contact' ? 'Contato' : block.type}
                      </span>
                    )}
                  </div>
                  {isLeftSidebarOpen && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex flex-col">
                        <button onClick={(e) => handleMoveBlock(index, 'up', e)} disabled={index === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-30">
                          <ChevronUp className="w-3 h-3" />
                        </button>
                        <button onClick={(e) => handleMoveBlock(index, 'down', e)} disabled={index === blocks.length - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-30">
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>
                      <button onClick={(e) => handleRemoveBlock(block.id, e)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {blocks.length === 0 && isLeftSidebarOpen && (
                <div className="p-6 text-center text-gray-500 text-sm">
                  Seu site está vazio. Adicione um bloco para começar.
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Main Canvas */}
        <main className={`flex-1 h-full overflow-y-auto rounded-xl relative scroll-smooth custom-scrollbar ${demoMode ? 'bg-transparent' : 'bg-gray-50/50'}`}>
          <div className={`mx-auto pb-32 transition-all duration-300 flex flex-col items-center w-full @container ${demoMode ? 'max-w-full px-0 pb-0' :
            previewMode === 'desktop' ? 'max-w-full px-8' :
              previewMode === 'notebook' ? 'max-w-[1024px]' :
                previewMode === 'tablet' ? 'max-w-[767px]' :
                  previewMode === 'smartphone' ? 'max-w-[360px]' :
                    'max-w-[390px]' // iphone
            }`}>
            <div className={`w-full bg-white flex flex-col ${demoMode ? 'min-h-screen rounded-none shadow-none border-0' : 'shadow-xl rounded-xl border border-gray-200 min-h-[800px]'}`}>
              {blocks.map((block) => (
                <div
                  key={block.id}
                  id={`block-${block.id}`}
                  onClick={() => !demoMode && setSelectedBlockId(block.id)}
                  className={`relative group transition-all ${demoMode ? '' : 'cursor-pointer'} ${!demoMode && selectedBlockId === block.id ? 'ring-2 ring-indigo-500 z-10' : !demoMode ? 'hover:ring-2 hover:ring-indigo-300/50' : ''
                    }`}
                >
                  {!demoMode && (
                    <div className={`absolute top-2 right-2 flex items-center gap-2 opacity-0 transition-opacity z-20 ${selectedBlockId === block.id ? 'opacity-100' : 'group-hover:opacity-100'
                      }`}>
                      <div className="bg-indigo-600 text-white text-xs px-2 py-1 rounded shadow-sm">
                        Editar {
                          block.type === 'header' ? 'Cabeçalho' :
                            block.type === 'hero' ? 'Hero' :
                              block.type === 'features' ? 'Recursos' :
                                block.type === 'text' ? 'Texto' :
                                  block.type === 'cta' ? 'Chamada' :
                                    block.type === 'footer' ? 'Rodapé' :
                                      block.type === 'gallery' ? 'Galeria' :
                                        block.type === 'testimonials' ? 'Depoimentos' :
                                          block.type === 'pricing' ? 'Preços' :
                                            block.type === 'faq' ? 'FAQ' :
                                              block.type === 'contact' ? 'Contato' : block.type
                        }
                      </div>
                      <button
                        onClick={(e) => handleRemoveBlock(block.id, e)}
                        className="bg-red-500 hover:bg-red-600 text-white p-1 rounded shadow-sm transition-colors"
                        title="Excluir bloco"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <div className={!demoMode && selectedBlockId === block.id ? 'opacity-100' : !demoMode ? 'opacity-90 group-hover:opacity-100' : ''}>
                    <BlockRenderer block={block} />
                  </div>
                </div>
              ))}
              {blocks.length === 0 && !demoMode && (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                  <Layout className="w-16 h-16 mb-4 opacity-20" />
                  <p className="text-lg font-medium">O canvas está vazio</p>
                  <p className="text-sm">Adicione blocos usando o painel lateral</p>
                  <button
                    onClick={() => setIsAddingBlock(true)}
                    className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Adicionar Bloco
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Right Sidebar - Properties */}
        {!demoMode && (
          <aside className={`
            bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl flex flex-col shrink-0 shadow-sm transition-all duration-300
            fixed inset-y-4 right-4 z-40 lg:relative lg:inset-0
            ${isMobileRightOpen ? 'translate-x-0' : 'translate-x-[calc(100%+2rem)] lg:translate-x-0'}
            ${isRightSidebarOpen ? 'w-80' : 'lg:w-0 lg:opacity-0 lg:pointer-events-none lg:overflow-hidden'}
          `}>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-500" />
                <h2 className="font-semibold text-gray-900">Propriedades</h2>
              </div>
              <button
                onClick={() => setIsRightSidebarOpen(false)}
                className="hidden lg:block p-1 text-gray-400 hover:text-gray-600 rounded-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMobileRightOpen(false)}
                className="lg:hidden p-1 text-gray-400 hover:text-gray-600 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {selectedBlock ? (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1">
                      Bloco: {
                        selectedBlock.type === 'header' ? 'Cabeçalho' :
                          selectedBlock.type === 'hero' ? 'Hero' :
                            selectedBlock.type === 'features' ? 'Recursos' :
                              selectedBlock.type === 'text' ? 'Texto' :
                                selectedBlock.type === 'cta' ? 'Chamada' :
                                  selectedBlock.type === 'footer' ? 'Rodapé' :
                                    selectedBlock.type === 'gallery' ? 'Galeria' :
                                      selectedBlock.type === 'testimonials' ? 'Depoimentos' :
                                        selectedBlock.type === 'pricing' ? 'Preços' :
                                          selectedBlock.type === 'faq' ? 'FAQ' :
                                            selectedBlock.type === 'contact' ? 'Contato' : selectedBlock.type
                      }
                    </h3>
                    <p className="text-xs text-gray-500">Edite o conteúdo deste bloco abaixo.</p>
                  </div>

                  {(() => {
                    const entries = Object.entries(selectedBlock.content);
                    // Ensure mobileMenuBreakpoint and other new properties are present for headers even if missing in template
                    if (selectedBlock.type === 'header') {
                      if (!selectedBlock.content.hasOwnProperty('logoPosition')) entries.push(['logoPosition', 'left']);
                      if (!selectedBlock.content.hasOwnProperty('menuPosition')) entries.push(['menuPosition', 'center']);
                      if (!selectedBlock.content.hasOwnProperty('mobileMenuBreakpoint')) entries.push(['mobileMenuBreakpoint', 'md']);
                      if (!selectedBlock.content.hasOwnProperty('mobileMenuVariant')) entries.push(['mobileMenuVariant', 'side-slide']);
                      if (!selectedBlock.content.hasOwnProperty('linkTargets')) entries.push(['linkTargets', {}]);
                      if (!selectedBlock.content.hasOwnProperty('isSticky')) entries.push(['isSticky', false]);
                      if (!selectedBlock.content.hasOwnProperty('isFloating')) entries.push(['isFloating', false]);
                      if (!selectedBlock.content.hasOwnProperty('scrollBehavior')) entries.push(['scrollBehavior', 'smooth']);
                    }
                    if (selectedBlock.type === 'gallery') {
                      if (!selectedBlock.content.hasOwnProperty('clickableImages')) entries.push(['clickableImages', false]);
                      if (!selectedBlock.content.hasOwnProperty('modalType')) entries.push(['modalType', 'fullscreen']);
                      if (!selectedBlock.content.hasOwnProperty('modalTitle')) entries.push(['modalTitle', '']);
                      if (!selectedBlock.content.hasOwnProperty('modalText')) entries.push(['modalText', '']);
                      if (!selectedBlock.content.hasOwnProperty('modalButton1Text')) entries.push(['modalButton1Text', '']);
                      if (!selectedBlock.content.hasOwnProperty('modalButton2Text')) entries.push(['modalButton2Text', '']);
                    }
                    if (!selectedBlock.content.hasOwnProperty('fontFamily')) {
                      entries.push(['fontFamily', 'font-sans']);
                    }

                    return entries
                      .sort(([a], [b]) => {
                        // Prioritize menu configuration for headers
                        if (a === 'mobileMenuBreakpoint') return -1;
                        if (b === 'mobileMenuBreakpoint') return 1;
                        // Prioritize titles and logos
                        if (a.toLowerCase().includes('title') || a.toLowerCase().includes('logo')) return -1;
                        if (b.toLowerCase().includes('title') || b.toLowerCase().includes('logo')) return 1;
                        return 0;
                      })
                      .map(([key, value]) => {
                        if (key === 'items' && Array.isArray(value)) {
                          return (
                            <div key={key} className="space-y-4">
                              <label className="block text-sm font-medium text-gray-700 capitalize">Itens</label>
                              {value.map((item: any, idx: number) => (
                                <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                                  <div className="text-xs font-semibold text-gray-500 uppercase">Item {idx + 1}</div>
                                  {Object.keys(item).map(itemKey => (
                                    <div key={itemKey}>
                                      <label className="block text-xs text-gray-500 mb-1 capitalize">{itemKey}</label>
                                      {itemKey === 'description' || itemKey === 'quote' ? (
                                        <textarea
                                          value={item[itemKey]}
                                          onChange={(e) => {
                                            const newItems = [...value];
                                            newItems[idx] = { ...newItems[idx], [itemKey]: e.target.value };
                                            handleUpdateBlockContent(selectedBlock.id, 'items', newItems);
                                          }}
                                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                          rows={3}
                                        />
                                      ) : itemKey.toLowerCase().includes('image') ? (
                                        <div className="space-y-2">
                                          <div className="flex gap-2">
                                            <input
                                              type="text"
                                              value={item[itemKey]}
                                              onChange={(e) => {
                                                const newItems = [...value];
                                                newItems[idx] = { ...newItems[idx], [itemKey]: e.target.value };
                                                handleUpdateBlockContent(selectedBlock.id, 'items', newItems);
                                              }}
                                              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                              placeholder="URL da imagem"
                                            />
                                            <label className="flex items-center justify-center px-3 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition-colors">
                                              <Upload className="w-4 h-4 text-gray-600" />
                                              <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                  if (e.target.files && e.target.files[0]) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                      const newItems = [...value];
                                                      newItems[idx] = { ...newItems[idx], [itemKey]: reader.result as string };
                                                      handleUpdateBlockContent(selectedBlock.id, 'items', newItems);
                                                    };
                                                    reader.readAsDataURL(e.target.files[0]);
                                                  }
                                                }}
                                              />
                                            </label>
                                          </div>
                                          {item[itemKey] && (
                                            <div className="mt-2 relative h-20 rounded-md overflow-hidden border border-gray-200">
                                              {/* eslint-disable-next-line @next/next/no-img-element */}
                                              <img src={item[itemKey]} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <input
                                          type="text"
                                          value={item[itemKey]}
                                          onChange={(e) => {
                                            const newItems = [...value];
                                            newItems[idx] = { ...newItems[idx], [itemKey]: e.target.value };
                                            handleUpdateBlockContent(selectedBlock.id, 'items', newItems);
                                          }}
                                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          );
                        }

                        if (key === 'plans' && Array.isArray(value)) {
                          return (
                            <div key={key} className="space-y-4">
                              <label className="block text-sm font-medium text-gray-700 capitalize">Planos</label>
                              {value.map((plan: any, idx: number) => (
                                <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                                  <div className="text-xs font-semibold text-gray-500 uppercase">Plano {idx + 1}</div>
                                  {Object.keys(plan).map(planKey => (
                                    <div key={planKey}>
                                      <label className="block text-xs text-gray-500 mb-1 capitalize">{planKey}</label>
                                      {planKey === 'features' ? (
                                        <textarea
                                          value={plan[planKey].join('\n')}
                                          onChange={(e) => {
                                            const newPlans = [...value];
                                            newPlans[idx] = { ...newPlans[idx], [planKey]: e.target.value.split('\n') };
                                            handleUpdateBlockContent(selectedBlock.id, 'plans', newPlans);
                                          }}
                                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                          rows={3}
                                          placeholder="Um recurso por linha"
                                        />
                                      ) : planKey.toLowerCase().includes('color') ? (
                                        <div className="flex items-center gap-2">
                                          <input
                                            type="color"
                                            value={plan[planKey]}
                                            onChange={(e) => {
                                              const newPlans = [...value];
                                              newPlans[idx] = { ...newPlans[idx], [planKey]: e.target.value };
                                              handleUpdateBlockContent(selectedBlock.id, 'plans', newPlans);
                                            }}
                                            className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                                          />
                                          <input
                                            type="text"
                                            value={plan[planKey]}
                                            onChange={(e) => {
                                              const newPlans = [...value];
                                              newPlans[idx] = { ...newPlans[idx], [planKey]: e.target.value };
                                              handleUpdateBlockContent(selectedBlock.id, 'plans', newPlans);
                                            }}
                                            className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                          />
                                        </div>
                                      ) : (
                                        <input
                                          type="text"
                                          value={plan[planKey]}
                                          onChange={(e) => {
                                            const newPlans = [...value];
                                            newPlans[idx] = { ...newPlans[idx], [planKey]: e.target.value };
                                            handleUpdateBlockContent(selectedBlock.id, 'plans', newPlans);
                                          }}
                                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          );
                        }

                        if (key === 'questions' && Array.isArray(value)) {
                          return (
                            <div key={key} className="space-y-4">
                              <label className="block text-sm font-medium text-gray-700 capitalize">Perguntas</label>
                              {value.map((q: any, idx: number) => (
                                <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                                  <div className="text-xs font-semibold text-gray-500 uppercase">Pergunta {idx + 1}</div>
                                  <div>
                                    <label className="block text-xs text-gray-500 mb-1">Pergunta</label>
                                    <input
                                      type="text"
                                      value={q.question}
                                      onChange={(e) => {
                                        const newQ = [...value];
                                        newQ[idx] = { ...newQ[idx], question: e.target.value };
                                        handleUpdateBlockContent(selectedBlock.id, 'questions', newQ);
                                      }}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-500 mb-1">Resposta</label>
                                    <textarea
                                      value={q.answer}
                                      onChange={(e) => {
                                        const newQ = [...value];
                                        newQ[idx] = { ...newQ[idx], answer: e.target.value };
                                        handleUpdateBlockContent(selectedBlock.id, 'questions', newQ);
                                      }}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                      rows={3}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          );
                        }

                        if (key === 'images' && Array.isArray(value)) {
                          return (
                            <div key={key} className="space-y-3">
                              <label className="block text-sm font-medium text-gray-700 capitalize">Imagens</label>
                              <div className="grid grid-cols-2 gap-2">
                                {value.map((imgUrl, idx) => (
                                  <div key={idx} className="relative group rounded-md overflow-hidden border border-gray-200 aspect-square bg-gray-100">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={imgUrl} alt={`Image ${idx}`} className="w-full h-full object-cover" />
                                    <button
                                      onClick={() => {
                                        const newImages = [...value];
                                        newImages.splice(idx, 1);
                                        handleUpdateBlockContent(selectedBlock.id, key, newImages);
                                      }}
                                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Adicionar URL"
                                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      const val = e.currentTarget.value;
                                      if (val) {
                                        handleUpdateBlockContent(selectedBlock.id, key, [...value, val]);
                                        e.currentTarget.value = '';
                                      }
                                    }
                                  }}
                                />
                                <label className="flex items-center justify-center px-3 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition-colors">
                                  <Upload className="w-4 h-4 text-gray-600" />
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          handleUpdateBlockContent(selectedBlock.id, key, [...value, reader.result as string]);
                                        };
                                        reader.readAsDataURL(e.target.files[0]);
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                          );
                        }

                        if (key === 'links' && Array.isArray(value)) {
                          return (
                            <div key={key} className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700 capitalize">Links (separados por vírgula)</label>
                              <input
                                type="text"
                                value={value.join(', ')}
                                onChange={(e) => handleUpdateBlockContent(selectedBlock.id, key, e.target.value.split(',').map(s => s.trim()))}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            </div>
                          );
                        }

                        if (key === 'linkTargets') {
                          const links = selectedBlock.content.links || [];
                          const otherBlocks = blocks.filter(b => b.id !== selectedBlock.id);
                          return (
                            <div key={key} className="space-y-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <label className="block text-sm font-bold text-gray-700">Ancoragem de Links</label>
                              <p className="text-xs text-gray-500 mb-2">Vincule os itens do menu a outras seções da página.</p>
                              {links.map((link: string, idx: number) => (
                                <div key={idx} className="flex items-center justify-between gap-2">
                                  <span className="text-sm font-medium text-gray-600 truncate w-1/3">{link}</span>
                                  <select
                                    value={(value as Record<string, string>)?.[link] || ''}
                                    onChange={(e) => {
                                      const newTargets = { ...(value as Record<string, string> || {}) };
                                      newTargets[link] = e.target.value;
                                      handleUpdateBlockContent(selectedBlock.id, key, newTargets);
                                    }}
                                    className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                  >
                                    <option value="">Sem vínculo</option>
                                    {otherBlocks.map(b => (
                                      <option key={b.id} value={b.id}>
                                        {b.type.charAt(0).toUpperCase() + b.type.slice(1)} ({b.id.substring(0, 4)})
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              ))}
                            </div>
                          );
                        }

                        if (key === 'logoPosition') {
                          return (
                            <div key={key} className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">{translateKey(key)}</label>
                              <select
                                value={value as string}
                                onChange={(e) => handleUpdateBlockContent(selectedBlock.id, key, e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white appearance-none cursor-pointer"
                                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                              >
                                <option value="left">Esquerda</option>
                                <option value="center">Centro</option>
                                <option value="right">Direita</option>
                              </select>
                            </div>
                          );
                        }

                        if (key === 'menuPosition') {
                          return (
                            <div key={key} className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">{translateKey(key)}</label>
                              <select
                                value={value as string}
                                onChange={(e) => handleUpdateBlockContent(selectedBlock.id, key, e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white appearance-none cursor-pointer"
                                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                              >
                                <option value="left">Esquerda</option>
                                <option value="center">Centro</option>
                                <option value="right">Direita</option>
                              </select>
                            </div>
                          );
                        }

                        if (key === 'mobileMenuVariant') {
                          return (
                            <div key={key} className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700 capitalize">Estilo do Menu Mobile</label>
                              <select
                                value={value as string}
                                onChange={(e) => handleUpdateBlockContent(selectedBlock.id, key, e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white appearance-none cursor-pointer"
                                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                              >
                                <option value="side-slide">Slide Lateral (Padrão)</option>
                                <option value="full-overlay">Overlay Tela Cheia</option>
                                <option value="bottom-sheet">Bottom Sheet (Gaveta)</option>
                                <option value="centered-fade">Fade Centralizado</option>
                                <option value="minimal-top">Drop Top Minimalista</option>
                              </select>
                            </div>
                          );
                        }

                        if (key === 'scrollBehavior') {
                          return (
                            <div key={key} className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700 capitalize">Comportamento de Rolagem (Ancoragem)</label>
                              <select
                                value={value as string}
                                onChange={(e) => handleUpdateBlockContent(selectedBlock.id, key, e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                              >
                                <option value="smooth">Suave (Smooth)</option>
                                <option value="auto">Simples (Auto)</option>
                              </select>
                            </div>
                          );
                        }

                        if (key === 'mobileMenuBreakpoint') {
                          return (
                            <div key={key} className="space-y-2 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                              <div className="flex items-center gap-2 text-indigo-700">
                                <Menu className="w-4 h-4" />
                                <label className="block text-sm font-bold">Configuração do Menu</label>
                              </div>
                              <p className="text-xs text-indigo-600 mb-2">Escolha quando o menu deve se transformar em um ícone (hambúrguer).</p>
                              <select
                                value={value as string}
                                onChange={(e) => handleUpdateBlockContent(selectedBlock.id, key, e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"
                              >
                                <option value="always">Sempre (Menu Hamburguer)</option>
                                <option value="md">Dispositivos Móveis (Padrão)</option>
                                <option value="lg">Tablets e Celulares</option>
                                <option value="never">Nunca (Menu Horizontal)</option>
                              </select>
                            </div>
                          );
                        }

                        if (key === 'fontFamily') {
                          return (
                            <div key={key} className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700 capitalize">Fonte do Bloco</label>
                              <select
                                value={value as string}
                                onChange={(e) => handleUpdateBlockContent(selectedBlock.id, key, e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white appearance-none cursor-pointer font-bold text-indigo-700"
                                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                              >
                                <option value="font-sans">Inter (Moderno/Corporativo)</option>
                                <option value="font-serif">Playfair Display (Elegante/Editorial)</option>
                                <option value="font-tech">Space Grotesk (Tech/Futurista)</option>
                                <option value="font-mono">Roboto Mono (Técnico/Minimalista)</option>
                                <option value="font-impact">Montserrat (Impacto/Forte)</option>
                              </select>
                            </div>
                          );
                        }

                        if (key === 'imagePosition') {
                          return (
                            <div key={key} className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700 capitalize">Posição da Imagem</label>
                              <select
                                value={value as string}
                                onChange={(e) => handleUpdateBlockContent(selectedBlock.id, key, e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white appearance-none cursor-pointer"
                                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                              >
                                <option value="right">Direita</option>
                                <option value="left">Esquerda</option>
                              </select>
                            </div>
                          );
                        }

                        if (key.toLowerCase().includes('color')) {
                          return (
                            <div key={key} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              {translateKey(key)}
                            </label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="color"
                                  value={value as string}
                                  onChange={(e) => handleUpdateBlockContent(selectedBlock.id, key, e.target.value)}
                                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                                />
                                <input
                                  type="text"
                                  value={value as string}
                                  onChange={(e) => handleUpdateBlockContent(selectedBlock.id, key, e.target.value)}
                                  className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                              </div>
                            </div>
                          );
                        }

                        if (key.toLowerCase().includes('image')) {
                          return (
                            <div key={key} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              {translateKey(key)}
                            </label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={value as string}
                                  onChange={(e) => handleUpdateBlockContent(selectedBlock.id, key, e.target.value)}
                                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  placeholder="URL da imagem"
                                />
                                <label className="flex items-center justify-center px-3 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition-colors">
                                  <Upload className="w-4 h-4 text-gray-600" />
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        handleImageUpload(selectedBlock.id, key, e.target.files[0]);
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                              {typeof value === 'string' && value && (
                                <div className="mt-2 relative h-24 rounded-md overflow-hidden border border-gray-200 bg-gray-100">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={value as string} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                              )}
                            </div>
                          );
                        }

                        if (typeof value === 'boolean') {
                          return (
                            <div key={key} className="flex items-center justify-between py-2 group/prop">
                              <label className="text-sm font-medium text-gray-700">
                                {translateKey(key)}
                              </label>
                              <button
                                onClick={() => handleUpdateBlockContent(selectedBlock.id, key, !value)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${value ? 'bg-indigo-600' : 'bg-gray-300'}`}
                              >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                              </button>
                            </div>
                          );
                        }

                        if (key === 'modalType') {
                          return (
                            <div key={key} className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">{translateKey(key)}</label>
                              <select
                                value={value as string}
                                onChange={(e) => handleUpdateBlockContent(selectedBlock.id, key, e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                              >
                                <option value="fullscreen">Tela Cheia (Apenas Imagem)</option>
                                <option value="split">Dividido (Imagem + Texto/Botões)</option>
                              </select>
                            </div>
                          );
                        }

                        return (
                          <div key={key} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              {translateKey(key)}
                            </label>
                            {typeof value === 'string' && value.length > 50 ? (
                              <textarea
                                value={value}
                                onChange={(e) => handleUpdateBlockContent(selectedBlock.id, key, e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                rows={4}
                              />
                            ) : (
                              <input
                                type="text"
                                value={value as string}
                                onChange={(e) => handleUpdateBlockContent(selectedBlock.id, key, e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            )}
                          </div>
                        );
                      })
                  })()}
                  <div className="pt-6 border-t border-gray-100">
                    <button
                      onClick={(e) => handleRemoveBlock(selectedBlock.id, e as any)}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Excluir este bloco
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 text-sm mt-10">
                  Selecione um bloco no canvas ou na estrutura para editar suas propriedades.
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* Add Block Modal */}
      {isAddingBlock && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4 md:p-6 overflow-hidden">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3">
                {selectedBlockTypeForVariation && (
                  <button
                    onClick={() => setSelectedBlockTypeForVariation(null)}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedBlockTypeForVariation ? `Modelos de ${selectedBlockTypeForVariation === 'header' ? 'Cabeçalho' : selectedBlockTypeForVariation === 'features' ? 'Recursos' : selectedBlockTypeForVariation === 'cta' ? 'Chamada' : selectedBlockTypeForVariation.charAt(0).toUpperCase() + selectedBlockTypeForVariation.slice(1)}` : 'Adicionar Bloco'}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {selectedBlockTypeForVariation ? 'Escolha uma variação abaixo.' : 'Escolha um componente para adicionar ao seu site.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setIsAddingBlock(false); setSelectedBlockTypeForVariation(null); }}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto custom-scrollbar">
              {!selectedBlockTypeForVariation ? (
                <div className="space-y-10">
                  {/* Recommended Section */}
                  {(() => {
                    const lastBlock = blocks[blocks.length - 1];
                    const recommendedTypes = lastBlock ? blockSequenceLogic[lastBlock.type] : ['header', 'hero'];
                    if (!recommendedTypes || recommendedTypes.length === 0) return null;

                    return (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 px-1">
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Sugestão Inteligente: Próximos Passos</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {recommendedTypes.map((type) => (
                            <button
                              key={`rec-${type}`}
                              onClick={() => setSelectedBlockTypeForVariation(type as BlockType)}
                              className="group relative p-4 border-2 border-indigo-100 bg-indigo-50/30 rounded-2xl flex flex-col items-center gap-3 hover:border-indigo-600 hover:bg-white hover:shadow-xl transition-all duration-500"
                            >
                              <div className="absolute -top-2 right-2 bg-indigo-600 text-[8px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-lg">RECOMENDADO</div>
                              <div className="w-12 h-12 bg-white shadow-sm border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                                {type === 'header' ? <Layout className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                              </div>
                              <span className="text-xs font-bold text-indigo-900 tracking-tight text-center capitalize">
                                {type === 'header' ? 'Cabeçalho' : 
                                 type === 'hero' ? 'Banner Principal' : 
                                 type === 'features' ? 'Recursos' : 
                                 type === 'cta' ? 'Chamada' : 
                                 type === 'gallery' ? 'Galeria' : 
                                 type === 'pricing' ? 'Preços' : 
                                 type === 'contact' ? 'Contato' : type}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  {/* All Blocks Section */}
                  <div className="space-y-4">
                    <div className="px-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Todos os Componentes</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {(['header', 'hero', 'features', 'text', 'cta', 'footer', 'gallery', 'testimonials', 'pricing', 'faq', 'contact'] as BlockType[]).map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedBlockTypeForVariation(type)}
                          className="group p-4 border border-gray-100 rounded-2xl flex flex-col items-center gap-3 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm transition-all duration-300"
                        >
                          <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                            {type === 'header' ? <Layout className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                          </div>
                          <span className="text-xs font-semibold text-gray-700 tracking-tight text-center">
                            {type === 'header' ? 'Cabeçalho' : 
                             type === 'hero' ? 'Banner Principal' : 
                             type === 'features' ? 'Recursos' : 
                             type === 'text' ? 'Texto' : 
                             type === 'cta' ? 'Chamada' : 
                             type === 'footer' ? 'Rodapé' : 
                             type === 'gallery' ? 'Galeria' : 
                             type === 'testimonials' ? 'Depoimentos' : 
                             type === 'pricing' ? 'Preços' : 
                             type === 'faq' ? 'FAQ' : 
                             type === 'contact' ? 'Contato' : type}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Smart Theme Filter Info */}
                  {(() => {
                    const lastBlock = blocks[blocks.length - 1];
                    const currentTheme = lastBlock?.content?.theme || (blocks.find(b => b.content?.theme)?.content?.theme);
                    
                    if (!currentTheme) return null;

                    return (
                      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-white p-2 rounded-xl shadow-sm">
                            <Sparkles className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-indigo-900">Composição Inteligente Ativa</p>
                            <p className="text-[10px] text-indigo-600 mt-0.5">Estamos sugerindo blocos do tema <span className="uppercase font-black">{currentTheme}</span> para manter o estilo do seu site.</p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(() => {
                      const lastBlock = blocks[blocks.length - 1];
                      const currentTheme = lastBlock?.content?.theme || (blocks.find(b => b.content?.theme)?.content?.theme);
                      
                      // Sort variations so themed ones come first
                      const variations = [...blockVariations[selectedBlockTypeForVariation]].sort((a, b) => {
                        if (a.theme === currentTheme) return -1;
                        if (b.theme === currentTheme) return 1;
                        return 0;
                      });

                      return variations.map((variation) => (
                        <button
                          key={variation.id}
                          onClick={() => handleAddBlock(selectedBlockTypeForVariation, { ...variation.content, theme: variation.theme })}
                          className={`group flex flex-col text-left border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${variation.theme === currentTheme ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg' : 'border-gray-100 hover:border-indigo-400'}`}
                        >
                          <div className={`aspect-video flex items-center justify-center border-b border-gray-100 relative group-hover:opacity-90 transition-all ${(variation.content.backgroundColor && variation.content.backgroundColor.includes('#0')) ||
                              variation.theme === 'tech' || variation.theme === 'luxury'
                              ? 'bg-gray-900' : 'bg-gray-50'
                            }`}>
                            
                            {/* Theme Badge */}
                            {variation.theme && (
                              <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter z-10 shadow-sm ${
                                variation.theme === currentTheme 
                                  ? 'bg-indigo-600 text-white animate-pulse' 
                                  : 'bg-white/90 text-gray-500'
                              }`}>
                                {variation.theme === currentTheme ? '⭐ PAR IDEAL' : variation.theme}
                              </div>
                            )}

                        {/* More Dynamic Fake Preview */}
                        <div className={`w-4/5 h-3/5 rounded shadow-sm border overflow-hidden p-2 flex flex-col gap-1.5 transition-all ${(variation.content.backgroundColor && variation.content.backgroundColor.includes('#0')) ||
                            variation.name.toLowerCase().includes('dark') ||
                            variation.name.toLowerCase().includes('noturno') ||
                            variation.name.toLowerCase().includes('preto')
                            ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                          }`}>
                          <div className={`h-1.5 w-1/2 rounded ${variation.name.toLowerCase().includes('vibrante') || variation.name.toLowerCase().includes('azul') || variation.name.toLowerCase().includes('marca')
                              ? 'bg-indigo-400' : 'bg-gray-200'
                            } ${variation.id.includes('center') || variation.name.toLowerCase().includes('centralizado') ? 'mx-auto' : ''}`} />

                          <div className="space-y-1">
                            <div className={`h-1 w-full rounded ${variation.name.toLowerCase().includes('dark') ? 'bg-gray-700' : 'bg-gray-100'}`} />
                            <div className={`h-1 w-3/4 rounded ${variation.name.toLowerCase().includes('dark') ? 'bg-gray-700' : 'bg-gray-100'} ${variation.id.includes('center') || variation.name.toLowerCase().includes('centralizado') ? 'mx-auto' : ''}`} />
                          </div>

                          {variation.content.image || variation.content.backgroundImage ? (
                            <div className="mt-1 h-8 w-full bg-indigo-100/50 rounded flex items-center justify-center">
                              <div className="w-4 h-4 bg-indigo-200 rounded-full opacity-50" />
                            </div>
                          ) : null}

                          <div className={`mt-auto h-2.5 w-1/3 rounded-sm ${variation.name.toLowerCase().includes('vibrante') || variation.name.toLowerCase().includes('azul') || variation.name.toLowerCase().includes('marca')
                              ? 'bg-white' : 'bg-indigo-500'
                            } ${variation.id.includes('center') || variation.name.toLowerCase().includes('centralizado') ? 'mx-auto' : 'self-start'}`} />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-indigo-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                            Selecionar
                          </div>
                        </div>
                      </div>
                        <div className="p-4 bg-white">
                          <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                            {variation.name}
                            {variation.theme === currentTheme && <Sparkles className="w-3 h-3 text-indigo-500" />}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{variation.description}</p>
                        </div>
                      </button>
                    ));
                  })()}
                </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Code Modal */}
      {showCode && (() => {
        const projectFiles = generateProject(blocks, exportFramework);
        const currentFile = projectFiles[selectedFileIndex] || projectFiles[0];
        
        return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[200] p-4 md:p-12 backdrop-blur-xl">
          <div className="bg-[#0a0c10] rounded-[3rem] shadow-3xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden border border-white/10 ring-1 ring-white/5">
            {/* Modal Header */}
            <div className="flex flex-col md:flex-row items-center justify-between p-8 border-b border-white/5 bg-[#0a0c10] gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-600/20 p-3 rounded-2xl border border-indigo-500/20">
                  <Code className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight uppercase italic italic-style">Export Engine <span className="text-indigo-500">v2.0</span></h3>
                  <div className="flex gap-2 mt-1">
                    {(['nextjs', 'react', 'static'] as Framework[]).map((fw) => (
                      <button 
                        key={fw}
                        onClick={() => { setExportFramework(fw); setSelectedFileIndex(0); }}
                        className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold transition-all ${exportFramework === fw ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/5 text-gray-500 hover:text-gray-300'}`}
                      >
                        {fw === 'nextjs' ? 'Next.js Project' : fw === 'react' ? 'React (Vite)' : 'Static (HTML/CSS)'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(currentFile.content);
                    alert('Arquivo copiado!');
                  }}
                  className="px-6 py-3 text-sm font-black text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl transition-all uppercase tracking-widest flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Copiar Arquivo
                </button>
                <button 
                  onClick={() => setShowCode(false)} 
                  className="bg-white/5 p-3 text-gray-400 hover:text-white hover:bg-red-500/20 hover:text-red-400 rounded-2xl transition-all border border-white/5"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex flex-1 overflow-hidden">
              {/* File Tree Sidebar */}
              <div className="w-64 border-r border-white/5 bg-[#0a0c10] flex flex-col">
                <div className="p-6">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> FILE_TREE.LOG
                  </div>
                  <div className="space-y-1">
                    {projectFiles.map((file, idx) => {
                      const parts = file.path.split('/');
                      const name = parts[parts.length - 1];
                      const folderName = parts.length > 1 ? parts[0] + '/' : '';
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedFileIndex(idx)}
                          className={`w-full text-left p-3 rounded-xl transition-all flex flex-col group ${selectedFileIndex === idx ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}
                        >
                          {folderName && <span className={`text-[8px] font-mono leading-none mb-1 ${selectedFileIndex === idx ? 'text-indigo-200' : 'text-gray-600'}`}>{folderName}</span>}
                          <span className={`text-xs font-bold font-mono tracking-tight ${selectedFileIndex === idx ? '' : 'truncate'}`}>{name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Code Editor Preview */}
              <div className="flex-1 overflow-auto bg-[#0a0c10] relative">
                <div className="absolute top-4 right-6 text-[10px] font-mono text-gray-700 pointer-events-none uppercase tracking-widest">
                  READ_ONLY // {currentFile.path}
                </div>
                <SyntaxHighlighter
                  language={currentFile.path.endsWith('.json') ? 'json' : (currentFile.path.endsWith('.js') ? 'javascript' : (currentFile.path.endsWith('.html') ? 'html' : 'tsx'))}
                  style={vscDarkPlus}
                  customStyle={{ margin: 0, padding: '2rem', background: 'transparent', fontSize: '0.8rem', lineHeight: '1.6' }}
                >
                  {currentFile.content}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
        );
      })()}

      <style jsx global>{`
        /* Premium Select Styling */
        select {
          appearance: none !important;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234F46E5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7' /%3E%3C/svg%3E") !important;
          background-repeat: no-repeat !important;
          background-position: right 1rem center !important;
          background-size: 0.9rem !important;
          padding-right: 2.5rem !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        select:focus {
          border-color: #4F46E5 !important;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1) !important;
          background-position: right 1rem center !important;
        }

        /* Dropdown 'Tray' Styling */
        select option {
          background-color: #ffffff !important;
          color: #1f2937 !important;
          padding: 1rem !important;
          font-weight: 600 !important;
          font-family: inherit !important;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 text-indigo-600 font-medium">Carregando editor...</div>}>
      <EditorContent />
    </Suspense>
  );
}
