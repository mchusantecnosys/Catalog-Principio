import React from 'react';
import { BookOpen, Grid, Sparkles, Shield, Share2, MessageCircle } from 'lucide-react';
import { ViewMode } from '../types';
import { buildWhatsAppUrl, WHATSAPP_DISPLAY } from '../data/catalogData';

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onOpenIndex: () => void;
  onOpenCustomizer?: () => void;
  onOpenCare: () => void;
  onOpenShare: () => void;
  currentPageIndex: number;
  totalPages: number;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  onOpenIndex,
  onOpenCustomizer,
  onOpenCare,
  onOpenShare,
  currentPageIndex,
  totalPages,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-black/5 px-4 md:px-8 py-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenIndex()}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            title="Abrir índice del catálogo"
          >
            <div className="w-9 h-9 rounded-full border border-[#C59B7D] flex items-center justify-center bg-[#EAE4DC] text-[#1E2022] serif text-xl font-light group-hover:scale-105 transition-transform shadow-xs">
              P
            </div>
            <div>
              <h1 className="serif text-xl md:text-2xl letter-spacing-wide font-light tracking-[0.3em] text-[#1E2022] uppercase">
                Principio
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-[#C59B7D] font-sans-clean font-medium -mt-0.5">
                Edición & Colección 2026 / 2027
              </p>
            </div>
          </button>

          {/* Quick Page Indicator in Header */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-[#EAE4DC] rounded-sm border border-[#C59B7D]/30 text-xs font-sans-clean text-[#1E2022]">
            <span className="text-[#C59B7D] font-medium text-[10px] uppercase tracking-widest">Pág.</span>
            <span className="serif italic text-sm">{String(currentPageIndex + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Center: Quick Action Pill for Customizer (if enabled) */}
        {onOpenCustomizer && (
          <div className="flex items-center gap-2">
            <button
              id="header-customizer-btn"
              onClick={onOpenCustomizer}
              className="btn-bottle-green flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-2.5 rounded-sm shadow-md hover:opacity-90 transition-all cursor-pointer font-sans-clean text-xs uppercase tracking-[0.2em] font-semibold border border-white/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C59B7D] animate-pulse" />
              <span>Simulador de Piezas</span>
            </button>
          </div>
        )}

        {/* Right: View Modes & Extra Tools */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Index Button */}
          <button
            id="header-index-btn"
            onClick={onOpenIndex}
            className="p-2 rounded-sm text-[#1E2022] hover:bg-[#EAE4DC] transition-colors cursor-pointer border border-transparent hover:border-[#C59B7D]/30"
            title="Índice de Páginas"
          >
            <BookOpen className="w-4 h-4 text-[#1E2022]" />
          </button>

          {/* View Mode Toggle (Magazine 9:16 vs Grid) */}
          <div className="hidden sm:flex items-center bg-[#EAE4DC] p-0.5 rounded-sm border border-[#C59B7D]/20">
            <button
              onClick={() => setViewMode('magazine')}
              className={`px-3 py-1 text-xs rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer font-sans-clean uppercase tracking-wider text-[10px] ${
                viewMode === 'magazine'
                  ? 'bg-white text-[#1E2022] shadow-xs font-semibold'
                  : 'text-[#1E2022]/70 hover:text-[#1E2022]'
              }`}
              title="Modo Revista Móvil 9:16"
            >
              <span>9:16 Móvil</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 text-xs rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer font-sans-clean uppercase tracking-wider text-[10px] ${
                viewMode === 'grid'
                  ? 'bg-white text-[#1E2022] shadow-xs font-semibold'
                  : 'text-[#1E2022]/70 hover:text-[#1E2022]'
              }`}
              title="Cuadrícula Editorial"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Galería</span>
            </button>
          </div>

          {/* Luxury Care Guide */}
          <button
            id="header-care-btn"
            onClick={onOpenCare}
            className="p-2 rounded-sm text-[#1E2022] hover:bg-[#EAE4DC] transition-colors cursor-pointer border border-transparent hover:border-[#C59B7D]/30"
            title="Cuidado de la Joya de Resina"
          >
            <Shield className="w-4 h-4 text-[#C59B7D]" />
          </button>

          {/* Share / Export */}
          <button
            id="header-share-btn"
            onClick={onOpenShare}
            className="p-2 rounded-sm text-[#1E2022] hover:bg-[#EAE4DC] transition-colors cursor-pointer border border-transparent hover:border-[#C59B7D]/30"
            title="Compartir y Exportar Formatos"
          >
            <Share2 className="w-4 h-4 text-[#1E2022]" />
          </button>

          {/* Direct WhatsApp Pill */}
          <a
            id="header-whatsapp-direct"
            href={buildWhatsAppUrl('Hola Principio, estoy explorando el catálogo interactivo y quisiera más información.')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-[#EAE4DC] hover:bg-[#dfd7cc] text-[#1E2022] text-xs font-sans-clean transition-colors border border-[#C59B7D]/40 uppercase tracking-wider text-[10px] font-semibold"
            title={`Chatear al ${WHATSAPP_DISPLAY}`}
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#1F3E35]" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
};
