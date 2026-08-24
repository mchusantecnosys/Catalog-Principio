import React, { useState } from 'react';
import { X, Share2, Copy, Check, MessageCircle, Instagram, Printer, Download, Sparkles } from 'lucide-react';
import { buildWhatsAppUrl, WHATSAPP_DISPLAY, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/catalogData';

interface ShareExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareExportModal: React.FC<ShareExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://principio.ec/catalogo';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#F7F5F0] rounded-3xl shadow-2xl border border-[#C59B7D]/40 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-[#EAE4DC] border-b border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1F3E35] text-white flex items-center justify-center border border-white/10">
              <Share2 className="w-4 h-4 text-[#C59B7D]" />
            </div>
            <div>
              <h3 className="serif text-lg md:text-xl font-light text-[#1E2022]">
                Compartir & Exportar Catálogo
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-[#C59B7D] font-sans-clean font-medium">
                Formatos interactivos y enlace de autor
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

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Direct Link Share */}
          <div>
            <label className="text-[10px] font-sans-clean font-semibold uppercase tracking-[0.2em] text-[#C59B7D] mb-1.5 block">
              Enlace del Catálogo Interactivo
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 h-11 px-3.5 bg-white border border-[#C59B7D]/40 rounded-xs font-sans-clean text-xs text-[#1E2022] focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className={`h-11 px-4 rounded-xs flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-sans-clean font-semibold transition-all cursor-pointer ${
                  copied
                    ? 'bg-[#1F3E35] text-white'
                    : 'bg-[#EAE4DC] hover:bg-[#dfd7cc] text-[#1E2022] border border-[#C59B7D]/30'
                }`}
              >
                {copied ? <Check className="w-4 h-4 text-[#C59B7D]" /> : <Copy className="w-4 h-4 text-[#C59B7D]" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
          </div>

          {/* Social Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={buildWhatsAppUrl('¡Hola! Te comparto el nuevo catálogo interactivo 2026 de Principio con piezas exclusivas en resina epóxica.')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xs bg-white border border-[#C59B7D]/25 flex items-center gap-3 hover:bg-[#EAE4DC] transition-colors"
            >
              <div className="p-2 rounded-xs bg-[#1F3E35] text-white">
                <MessageCircle className="w-4 h-4 text-[#C59B7D]" />
              </div>
              <div>
                <div className="text-xs font-sans-clean font-semibold uppercase tracking-wider text-[#1E2022]">
                  WhatsApp Directo
                </div>
                <div className="text-[10px] text-[#1E2022]/60 font-sans-clean">
                  Mensaje con enlace
                </div>
              </div>
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xs bg-white border border-[#C59B7D]/25 flex items-center gap-3 hover:bg-[#EAE4DC] transition-colors"
            >
              <div className="p-2 rounded-xs bg-[#EAE4DC] text-[#1E2022]">
                <Instagram className="w-4 h-4 text-[#C59B7D]" />
              </div>
              <div>
                <div className="text-xs font-sans-clean font-semibold uppercase tracking-wider text-[#1E2022]">
                  Instagram Bio
                </div>
                <div className="text-[10px] text-[#1E2022]/60 font-sans-clean">
                  {INSTAGRAM_HANDLE}
                </div>
              </div>
            </a>
          </div>

          {/* Export Technical Specifications */}
          <div className="p-4 rounded-xs bg-[#EAE4DC]/60 border border-[#C59B7D]/30 space-y-2">
            <div className="flex items-center gap-2 text-[#C59B7D] font-sans-clean text-[10px] uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Especificaciones de Exportación Editorial</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-sans-clean text-[#1E2022]/80">
              <div>• <strong>Stories / Reels:</strong> 1080 x 1920 px (9:16)</div>
              <div>• <strong>Carrusel Feed:</strong> 1080 x 1350 px (4:5)</div>
              <div>• <strong>Color Space:</strong> sRGB IEC61966-2.1</div>
              <div>• <strong>Resolución:</strong> 150 - 200 PPI</div>
            </div>
          </div>

          {/* Print / Save PDF option */}
          <button
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xs bg-white hover:bg-[#EAE4DC] border border-[#C59B7D]/40 text-xs font-sans-clean uppercase tracking-wider font-semibold text-[#1E2022] transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#C59B7D]" />
            <span>Imprimir o Guardar como PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
