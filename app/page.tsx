import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { templates } from '@/lib/templates';
import { LayoutTemplate, Plus, Code2, Sparkles } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Alrion <span className="text-indigo-600">Tech Builder</span></span>
          </div>
          <nav className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500">Meus Sites</span>
            <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300"></div>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-6 md:gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Crie seu novo site</h1>
            <p className="text-sm md:text-base text-gray-500">Escolha um modelo moderno em Next.js ou comece do zero.</p>
          </div>

          <Link
            href="/editor?template=blank"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Criar do Zero
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="relative h-48 w-full bg-gray-100 border-b border-gray-100 overflow-hidden">
                <Image
                  src={template.image}
                  alt={template.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <LayoutTemplate className="w-4 h-4 text-indigo-500" />
                  <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-6 flex-1">{template.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                    <Code2 className="w-4 h-4" />
                    <span>Next.js + TS</span>
                  </div>
                  <Link
                    href={`/editor?template=${template.id}`}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors"
                  >
                    Usar Modelo
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
