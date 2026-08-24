import React from 'react';
import { CatalogPage } from '../types';
import { Sparkles, Maximize2, MessageCircle, Sliders } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/catalogData';

interface GridViewerProps {
  pages: CatalogPage[];
  onSelectPage: (index: number) => void;
  onOpenCustomizerWithProduct: (productId: 'keychain' | 'pen' | 'agenda' | 'duo' | 'box') => void;
}

export const GridViewer: React.FC<GridViewerProps> = ({
  pages,
  onSelectPage,
  onOpenCustomizerWithProduct,
}) => {
  const mapPageToProduct = (pageId: number): 'keychain' | 'pen' | 'agenda' | 'duo' | 'box' => {
    switch (pageId) {
      case 4: return 'pen';
      case 5: return 'agenda';
      case 7: return 'keychain';
      case 8: return 'duo';
      case 9: return 'box';
      default: return 'keychain';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Intro Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#C59B7D]"></span>
          <span className="text-[10px] font-sans-clean tracking-[0.3em] uppercase text-[#C59B7D] font-medium">
            Vista General de la Colección
          </span>
          <span className="h-px w-8 bg-[#C59B7D]"></span>
        </div>
        <h2 className="serif text-3xl sm:text-4xl font-light text-[#1E2022]">
          Catálogo Editorial Completo (11 Páginas)
        </h2>
        <p className="text-xs sm:text-sm font-sans-clean font-light text-[#1E2022]/75 max-w-lg mx-auto">
          Explora la colección 2026/2027 en formato de alta resolución o personaliza cada pieza en el simulador de autor.
        </p>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {pages.map((page, index) => (
          <div
            key={page.id}
            className="group relative rounded-sm overflow-hidden border border-[#C59B7D]/25 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            style={{ backgroundColor: page.bgColor, color: page.textColor || '#1E2022' }}
          >
            {/* Top Bar */}
            <div className="p-3.5 border-b border-[#C59B7D]/20 flex items-center justify-between">
              <span className="text-[10px] font-sans-clean font-semibold tracking-widest text-[#C59B7D] uppercase">
                {page.pageNumber}
              </span>
              {page.highlightTag && (
                <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#C59B7D]/15 text-[#C59B7D] font-sans-clean font-medium">
                  {page.highlightTag}
                </span>
              )}
            </div>

            {/* Visual Thumbnail */}
            <div
              onClick={() => onSelectPage(index)}
              className="p-4 flex flex-col items-center justify-center cursor-pointer flex-1"
            >
              {page.image ? (
                <div className="relative w-full aspect-[4/3] rounded-t-xl rounded-b-xs overflow-hidden shadow-2xs border border-[#C59B7D]/30 mb-3 bg-[#EAE4DC]/40">
                  <img
                    src={page.image}
                    alt={page.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full border border-[#C59B7D] flex items-center justify-center serif text-2xl text-[#C59B7D] my-4 bg-[#EAE4DC]/50">
                  {page.categoryNumber || '✦'}
                </div>
              )}

              <div className="text-center space-y-1">
                <h3 className="serif text-xl font-light text-inherit leading-snug">
                  {page.title}
                </h3>
                {page.subtitle && (
                  <p className="text-[10px] font-sans-clean uppercase tracking-wider text-[#C59B7D] line-clamp-1">
                    {page.subtitle}
                  </p>
                )}
                {page.price && (
                  <p className="serif text-lg font-normal text-[#1F3E35] mt-1">
                    {page.price}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-3 bg-[#EAE4DC]/60 border-t border-[#C59B7D]/20 flex items-center justify-between gap-2">
              <button
                onClick={() => onSelectPage(index)}
                className="flex-1 py-2 px-3 rounded-xs bg-white/90 hover:bg-white text-[10px] font-sans-clean uppercase tracking-wider font-semibold text-[#1E2022] border border-[#C59B7D]/30 transition-colors cursor-pointer text-center"
              >
                Abrir Página
              </button>

              {page.type === 'product' && (
                <button
                  onClick={() => onOpenCustomizerWithProduct(mapPageToProduct(page.id))}
                  className="p-2 rounded-xs bg-[#1F3E35] text-white hover:opacity-90 transition-opacity cursor-pointer border border-white/10"
                  title="Simular en 3D"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#C59B7D]" />
                </button>
              )}

              {page.whatsappMessage && (
                <a
                  href={buildWhatsAppUrl(page.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xs bg-[#1F3E35] text-white hover:opacity-90 transition-opacity cursor-pointer border border-white/10"
                  title="Pedir por WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#C59B7D]" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
