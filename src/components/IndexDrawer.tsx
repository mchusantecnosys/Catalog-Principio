import React from 'react';
import { X, BookOpen, ChevronRight, Sparkles } from 'lucide-react';
import { CatalogPage } from '../types';

interface IndexDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pages: CatalogPage[];
  currentPageIndex: number;
  onSelectPage: (index: number) => void;
}

export const IndexDrawer: React.FC<IndexDrawerProps> = ({
  isOpen,
  onClose,
  pages,
  currentPageIndex,
  onSelectPage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#F7F5F0] h-full shadow-2xl border-l border-[#C59B7D]/30 flex flex-col justify-between">
        {/* Header */}
        <div className="p-5 bg-[#EAE4DC] border-b border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1F3E35] text-white flex items-center justify-center border border-white/10">
              <BookOpen className="w-4 h-4 text-[#C59B7D]" />
            </div>
            <div>
              <h3 className="serif text-lg font-light text-[#1E2022]">
                Índice Editorial de Páginas
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-[#C59B7D] font-sans-clean font-medium">
                Colección 2026 / 2027 — Principio
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm hover:bg-black/10 text-[#1E2022] transition-colors cursor-pointer border border-transparent hover:border-[#C59B7D]/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Page List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {pages.map((page, index) => {
            const isCurrent = currentPageIndex === index;
            return (
              <button
                key={page.id}
                onClick={() => {
                  onSelectPage(index);
                  onClose();
                }}
                className={`w-full p-3 rounded-xs border text-left flex items-center gap-3 transition-all cursor-pointer group ${
                  isCurrent
                    ? 'bg-[#1F3E35] text-white border-[#1F3E35] shadow-xs'
                    : 'bg-white/80 border-[#C59B7D]/25 text-[#1E2022] hover:bg-[#EAE4DC]'
                }`}
              >
                {/* Thumbnail or Badge */}
                <div
                  className={`w-12 h-12 rounded-t-lg rounded-b-xs border flex items-center justify-center shrink-0 serif text-xs font-light overflow-hidden ${
                    isCurrent ? 'border-white/40 bg-white/10 text-white' : 'border-[#C59B7D]/30 bg-[#EAE4DC] text-[#1E2022]'
                  }`}
                >
                  {page.image ? (
                    <img
                      src={page.image}
                      alt={page.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span>{page.pageNumber.split('/')[0].trim()}</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] uppercase tracking-widest font-sans-clean font-semibold ${
                        isCurrent ? 'text-[#C59B7D]' : 'text-[#C59B7D]'
                      }`}
                    >
                      {page.highlightTag || page.subtitle || `PÁGINA ${page.pageNumber}`}
                    </span>
                    <span className={`text-[10px] font-sans-clean ${isCurrent ? 'text-white/70' : 'text-gray-400'}`}>
                      {page.pageNumber}
                    </span>
                  </div>

                  <div
                    className={`serif text-base font-light truncate ${
                      isCurrent ? 'text-white' : 'text-[#1E2022]'
                    }`}
                  >
                    {page.title}
                  </div>

                  {page.price && (
                    <div
                      className={`serif text-sm font-normal mt-0.5 ${
                        isCurrent ? 'text-[#C59B7D]' : 'text-[#1F3E35]'
                      }`}
                    >
                      {page.price}
                    </div>
                  )}
                </div>

                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                    isCurrent ? 'text-white' : 'text-[#C59B7D]'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="p-4 bg-[#EAE4DC] border-t border-black/5 text-center text-[10px] uppercase tracking-widest font-sans-clean text-[#1E2022]/70 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C59B7D]" />
          <span>Piezas curadas a mano con resina de autor</span>
        </div>
      </div>
    </div>
  );
};
