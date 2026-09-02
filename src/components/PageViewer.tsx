import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MessageCircle,
  Maximize2,
  Sliders,
  CheckCircle,
  ExternalLink,
  Shield,
  Heart,
  Clock,
  Feather,
  Droplets,
  BookOpen,
  Layers,
  Smile,
  ShieldCheck,
  Palette,
  Calendar,
  Star,
  Bookmark,
  Gift,
  MapPin,
  Instagram,
  PenTool,
  Type,
} from 'lucide-react';
import { CatalogPage } from '../types';
import { buildWhatsAppUrl, WHATSAPP_DISPLAY, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/catalogData';

interface PageViewerProps {
  pages: CatalogPage[];
  currentPageIndex: number;
  onPageChange: (index: number) => void;
  onOpenCustomizerWithProduct?: (productId: 'keychain' | 'pen' | 'agenda' | 'duo' | 'box') => void;
  onOpenCare: () => void;
}

export const PageViewer: React.FC<PageViewerProps> = ({
  pages,
  currentPageIndex,
  onPageChange,
  onOpenCustomizerWithProduct,
  onOpenCare,
}) => {
  const [shimmerActive, setShimmerActive] = useState<boolean>(true);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const currentPage = pages[currentPageIndex];

  // Map icons helper
  const renderIcon = (iconName?: string) => {
    const props = { className: 'w-4 h-4 text-[#C59B7D] shrink-0' };
    switch (iconName) {
      case 'Clock': return <Clock {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Feather': return <Feather {...props} />;
      case 'Heart': return <Heart {...props} />;
      case 'PenTool': return <PenTool {...props} />;
      case 'Type': return <Type {...props} />;
      case 'BookOpen': return <BookOpen {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'CheckCircle': return <CheckCircle {...props} />;
      case 'Smile': return <Smile {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'Calendar': return <Calendar {...props} />;
      case 'Star': return <Star {...props} />;
      case 'Bookmark': return <Bookmark {...props} />;
      case 'Gift': return <Gift {...props} />;
      case 'Droplets': return <Droplets {...props} />;
      case 'MessageCircle': return <MessageCircle {...props} />;
      case 'Instagram': return <Instagram {...props} />;
      case 'MapPin': return <MapPin {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  const mapCategoryToProductType = (pageId: number): 'keychain' | 'pen' | 'agenda' | 'duo' | 'box' => {
    switch (pageId) {
      case 4: return 'pen';
      case 5: return 'agenda';
      case 7: return 'keychain';
      case 8: return 'duo';
      case 9: return 'box';
      default: return 'keychain';
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (currentPageIndex < pages.length - 1) {
          onPageChange(currentPageIndex + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentPageIndex > 0) {
          onPageChange(currentPageIndex - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageIndex, pages.length, onPageChange]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50 && currentPageIndex < pages.length - 1) {
      onPageChange(currentPageIndex + 1);
    } else if (diff < -50 && currentPageIndex > 0) {
      onPageChange(currentPageIndex - 1);
    }
    setTouchStart(null);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-4 md:py-8 px-2 md:px-4">
      {/* Top Floating Controls */}
      <div className="w-full max-w-md md:max-w-lg mb-3 flex items-center justify-between text-xs font-sans-clean text-[#1E2022]/70 px-2">
        <div className="flex items-center gap-2">
          <span className="font-serif-editorial italic text-sm text-[#C59B7D]">Principio .ec</span>
          <span className="text-[#C59B7D]/40">•</span>
          <span>Formato Móvil Editorial 9:16</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShimmerActive(!shimmerActive)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-colors cursor-pointer border ${
              shimmerActive
                ? 'bg-[#C59B7D]/15 border-[#C59B7D] text-[#1E2022] font-medium'
                : 'bg-transparent border-[#C59B7D]/30 text-[#1E2022]/60'
            }`}
            title="Efecto de refracción de luz en la resina"
          >
            <Sparkles className={`w-3 h-3 ${shimmerActive ? 'text-[#C59B7D]' : 'text-gray-400'}`} />
            <span>{shimmerActive ? 'Brillo de Luz: ON' : 'Brillo: OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main 9:16 Canvas Frame */}
      <div
        className="relative w-full max-w-[440px] md:max-w-[480px] aspect-[9/16] shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden border border-[#C59B7D]/30 transition-all duration-300 select-none"
        style={{
          backgroundColor: currentPage.bgColor,
          color: currentPage.textColor || '#1E2022',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full h-full flex flex-col justify-between relative overflow-y-auto custom-scrollbar p-6 sm:p-8"
          >
            {/* Header Margin Space (Simulating 140px safe zone) */}
            <div className="w-full">
              {/* Brand Top Rule */}
              <div className="flex items-center justify-between pb-3 border-b border-[#C59B7D]/25">
                <div className="flex items-center gap-2.5">
                  <span className="serif text-sm tracking-[0.3em] uppercase font-light text-[#1E2022]">
                    Principio
                  </span>
                  {currentPage.highlightTag && (
                    <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-xs bg-[#C59B7D]/15 text-[#C59B7D] font-sans-clean font-medium">
                      {currentPage.highlightTag}
                    </span>
                  )}
                </div>
                <div className="text-[10px] tracking-[0.25em] font-sans-clean text-[#C59B7D] uppercase font-medium">
                  {currentPage.categoryNumber ? `SEC. ${currentPage.categoryNumber}` : 'EDICIÓN 2026'}
                </div>
              </div>
            </div>

            {/* Page Dynamic Content Body */}
            <div className="my-auto py-4 flex flex-col justify-center">
              {/* PAGE TYPE: COVER */}
              {currentPage.type === 'cover' && (
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-[#C59B7D]"></span>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#C59B7D] font-sans-clean font-medium">
                      {currentPage.subtitle}
                    </span>
                    <span className="h-px w-8 bg-[#C59B7D]"></span>
                  </div>

                  <h2 className="serif text-3xl sm:text-4xl md:text-5xl font-light leading-none text-[#1E2022]">
                    {currentPage.title}
                  </h2>

                  {currentPage.tagline && (
                    <div className="serif italic text-lg sm:text-xl text-[#C59B7D]">
                      “{currentPage.tagline}”
                    </div>
                  )}

                  {/* Hero Image Presentation with Arched Frame */}
                  {currentPage.image && (
                    <div className="relative w-full max-w-[300px] mx-auto my-2 group">
                      <div className="bg-[#EAE4DC] w-full rounded-t-full relative overflow-hidden p-3 border border-black/5 shadow-md">
                        <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none" />
                        <div className="relative aspect-[4/5] rounded-t-full overflow-hidden border border-white/60">
                          <img
                            src={currentPage.image}
                            alt={currentPage.imageAlt || 'Principio Resina'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                          {shimmerActive && <div className="absolute inset-0 resin-gold-shimmer pointer-events-none" />}
                          <button
                            onClick={() => setZoomedImage(currentPage.image || null)}
                            className="absolute bottom-2 right-2 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-xs backdrop-blur-xs transition-colors cursor-pointer"
                            title="Ver detalle en alta resolución"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-[#1E2022]/80 font-sans-clean font-light leading-relaxed max-w-xs mx-auto">
                    {currentPage.description}
                  </p>

                  <button
                    onClick={() => onPageChange(1)}
                    className="btn-bottle-green mt-2 inline-flex items-center gap-2 px-8 py-3 rounded-sm text-xs font-sans-clean uppercase tracking-[0.2em] font-semibold hover:opacity-90 transition-all shadow-md cursor-pointer group"
                  >
                    <span>{currentPage.ctaText || 'Desliza para explorar'}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              {/* PAGE TYPE: MANIFESTO */}
              {currentPage.type === 'manifesto' && (
                <div className="flex flex-col space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-[#C59B7D]"></span>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#C59B7D] font-sans-clean font-medium">
                      {currentPage.subtitle}
                    </span>
                  </div>

                  <h2 className="serif text-2xl sm:text-3xl font-light leading-tight text-[#1E2022]">
                    {currentPage.title}
                  </h2>

                  <div className="serif italic text-base text-[#C59B7D]">
                    {currentPage.tagline}
                  </div>

                  <p className="text-xs sm:text-sm font-sans-clean font-light leading-relaxed text-[#1E2022]/85 border-l-2 border-[#C59B7D] pl-3.5">
                    {currentPage.description}
                  </p>

                  {/* Detailed Craft Pillars */}
                  {currentPage.detailedSpecs && (
                    <div className="grid grid-cols-2 gap-2.5 pt-2">
                      {currentPage.detailedSpecs.map((spec, i) => (
                        <div
                          key={i}
                          className="p-3 bg-[#EAE4DC]/70 rounded-xs border border-[#C59B7D]/25 flex flex-col gap-1 shadow-2xs"
                        >
                          <div className="flex items-center gap-1.5 text-[#C59B7D]">
                            {renderIcon(spec.icon)}
                            <span className="text-[10px] font-sans-clean uppercase tracking-wider font-semibold text-[#1E2022]">
                              {spec.label}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#1E2022]/75 font-sans-clean leading-tight font-light">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 flex justify-between items-center">
                    <button
                      onClick={() => onOpenCare()}
                      className="inline-flex items-center gap-1.5 text-xs text-[#C59B7D] hover:underline font-sans-clean font-medium cursor-pointer"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Guía de Cuidados de Lujo</span>
                    </button>

                    <button
                      onClick={() => onPageChange(currentPageIndex + 1)}
                      className="btn-bottle-green inline-flex items-center gap-1.5 px-5 py-2.5 rounded-sm text-[10px] font-sans-clean uppercase tracking-[0.2em] font-semibold hover:opacity-90 transition-all cursor-pointer shadow-xs"
                    >
                      <span>Ver Catálogo</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* PAGE TYPE: CATEGORY SEPARATOR */}
              {currentPage.type === 'category' && (
                <div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
                  <div className="serif text-7xl sm:text-8xl font-light text-[#C59B7D]/35 leading-none">
                    {currentPage.categoryNumber}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-3">
                      <span className="h-px w-6 bg-[#C59B7D]"></span>
                      <span className="text-[10px] tracking-[0.35em] uppercase text-[#1E2022] font-sans-clean font-semibold">
                        {currentPage.category}
                      </span>
                      <span className="h-px w-6 bg-[#C59B7D]"></span>
                    </div>
                    <h2 className="serif text-3xl sm:text-4xl font-light text-[#1E2022]">
                      {currentPage.title}
                    </h2>
                    <div className="serif italic text-base text-[#C59B7D]">
                      {currentPage.subtitle}
                    </div>
                  </div>

                  <div className="w-16 h-px bg-[#C59B7D] mx-auto" />

                  <p className="text-xs text-[#1E2022]/75 font-sans-clean font-light leading-relaxed max-w-xs mx-auto">
                    {currentPage.description}
                  </p>

                  <button
                    onClick={() => onPageChange(currentPageIndex + 1)}
                    className="btn-bottle-green mt-4 inline-flex items-center gap-2 px-8 py-3 rounded-sm text-xs font-sans-clean uppercase tracking-[0.2em] font-semibold hover:opacity-90 transition-all shadow-md cursor-pointer group"
                  >
                    <span>{currentPage.ctaText || 'Entrar a la Colección'}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              {/* PAGE TYPE: PRODUCT SPECIFICATION */}
              {currentPage.type === 'product' && (
                <div className="flex flex-col space-y-3.5">
                  {/* Photo Canvas with Floating Tags & Natural Arch Accent */}
                  {currentPage.image && (
                    <div className="relative w-full aspect-[4/3] rounded-t-2xl rounded-b-lg overflow-hidden shadow-md border border-[#C59B7D]/30 group bg-[#EAE4DC]/50">
                      <img
                        src={currentPage.image}
                        alt={currentPage.imageAlt || currentPage.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      {shimmerActive && <div className="absolute inset-0 resin-gold-shimmer pointer-events-none" />}

                      {/* Floating Macro Zoom Button */}
                      <button
                        onClick={() => setZoomedImage(currentPage.image || null)}
                        className="absolute bottom-2 right-2 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-xs backdrop-blur-xs transition-colors cursor-pointer"
                        title="Ver macro en alta resolución"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Floating Studio Customize Tag */}
                      {onOpenCustomizerWithProduct && (
                        <button
                          onClick={() => onOpenCustomizerWithProduct(mapCategoryToProductType(currentPage.id))}
                          className="absolute top-2 left-2 flex items-center gap-1.5 px-3 py-1.5 bg-[#1E2022]/85 hover:bg-[#1E2022] text-white rounded-xs text-[9px] font-sans-clean uppercase tracking-wider font-semibold backdrop-blur-xs transition-colors cursor-pointer border border-[#C59B7D]/40 shadow-xs"
                          title="Simular personalización en tiempo real"
                        >
                          <Sliders className="w-3 h-3 text-[#C59B7D]" />
                          <span>Simulador 3D</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Title & Subtitle */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="h-px w-6 bg-[#C59B7D]"></span>
                      <span className="text-[10px] tracking-[0.25em] uppercase text-[#C59B7D] font-sans-clean font-medium">
                        {currentPage.subtitle}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h2 className="serif text-2xl sm:text-3xl font-light text-[#1E2022]">
                        {currentPage.title}
                      </h2>
                      {currentPage.price && (
                        <div className="serif text-xl sm:text-2xl font-normal text-[#1E2022] shrink-0">
                          {currentPage.price}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] sm:text-xs text-[#1E2022]/80 font-sans-clean font-light leading-relaxed">
                    {currentPage.description}
                  </p>

                  {/* Specifications Grid */}
                  {currentPage.detailedSpecs && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {currentPage.detailedSpecs.map((spec, i) => (
                        <div
                          key={i}
                          className="p-2.5 bg-[#EAE4DC]/60 rounded-xs border border-[#C59B7D]/20 flex items-start gap-2"
                        >
                          {renderIcon(spec.icon)}
                          <div className="flex flex-col">
                            <span className="text-[9px] font-sans-clean uppercase tracking-wider font-semibold text-[#C59B7D] leading-tight">
                              {spec.label}
                            </span>
                            <span className="text-[10px] text-[#1E2022]/80 font-sans-clean font-light leading-tight mt-0.5">
                              {spec.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Direct WhatsApp Action Button */}
                  <div className="pt-2">
                    <a
                      href={buildWhatsAppUrl(currentPage.whatsappMessage || `Hola Principio, me interesa ${currentPage.title}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-bottle-green w-full flex items-center justify-center gap-2 py-3 px-4 rounded-sm text-xs font-sans-clean uppercase tracking-[0.2em] font-semibold shadow-md hover:opacity-90 transition-all cursor-pointer border border-white/10"
                    >
                      <MessageCircle className="w-4 h-4 text-[#C59B7D]" />
                      <span>{currentPage.ctaText || 'Pedir por WhatsApp'}</span>
                    </a>
                  </div>
                </div>
              )}

              {/* PAGE TYPE: GUIDE */}
              {currentPage.type === 'guide' && (
                <div className="flex flex-col space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="h-px w-6 bg-[#C59B7D]"></span>
                      <span className="text-[10px] tracking-[0.25em] uppercase text-[#C59B7D] font-sans-clean font-medium">
                        {currentPage.subtitle}
                      </span>
                    </div>
                    <h2 className="serif text-2xl sm:text-3xl font-light text-[#1E2022]">
                      {currentPage.title}
                    </h2>
                  </div>

                  {currentPage.image && (
                    <div className="relative w-full aspect-[16/9] rounded-xs overflow-hidden shadow-xs border border-[#C59B7D]/30 group">
                      <img
                        src={currentPage.image}
                        alt="Muestrario de texturas K, A, G, M"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {shimmerActive && <div className="absolute inset-0 resin-gold-shimmer pointer-events-none" />}
                    </div>
                  )}

                  {/* Step by step cards */}
                  <div className="space-y-2 pt-1">
                    {currentPage.detailedSpecs?.map((spec, i) => (
                      <div
                        key={i}
                        className="p-2.5 bg-white/80 rounded-xs border border-[#C59B7D]/30 flex items-start gap-2.5 shadow-2xs"
                      >
                        <div className="p-1.5 rounded-xs bg-[#EAE4DC] text-[#C59B7D]">
                          {renderIcon(spec.icon)}
                        </div>
                        <div>
                          <div className="text-[10px] font-sans-clean uppercase tracking-wider font-semibold text-[#1E2022]">
                            {spec.label}
                          </div>
                          <div className="text-[10px] text-[#1E2022]/75 font-sans-clean leading-tight font-light">
                            {spec.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action CTA: Customizer when enabled, or direct WhatsApp consultation */}
                  {onOpenCustomizerWithProduct ? (
                    <button
                      onClick={() => onOpenCustomizerWithProduct('keychain')}
                      className="btn-bottle-green w-full flex items-center justify-center gap-2 py-3 px-4 rounded-sm text-xs font-sans-clean uppercase tracking-[0.2em] font-semibold shadow-md hover:opacity-90 transition-all cursor-pointer border border-white/10"
                    >
                      <Sparkles className="w-4 h-4 text-[#C59B7D]" />
                      <span>{currentPage.ctaText || 'Abrir Simulador de Personalización'}</span>
                    </button>
                  ) : (
                    <a
                      href={buildWhatsAppUrl(currentPage.whatsappMessage || 'Hola Principio, revisé la guía de personalización y deseo cotizar una pieza a medida.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-bottle-green w-full flex items-center justify-center gap-2 py-3 px-4 rounded-sm text-xs font-sans-clean uppercase tracking-[0.2em] font-semibold shadow-md hover:opacity-90 transition-all cursor-pointer border border-white/10"
                    >
                      <MessageCircle className="w-4 h-4 text-[#C59B7D]" />
                      <span>{currentPage.ctaText || 'Consultar Personalización por WhatsApp'}</span>
                    </a>
                  )}
                </div>
              )}

              {/* PAGE TYPE: BACKCOVER */}
              {currentPage.type === 'backcover' && (
                <div className="flex flex-col items-center text-center space-y-5 py-6 text-[#F7F5F0]">
                  {/* Large Logo Isotype */}
                  <div className="w-16 h-16 rounded-full border-2 border-[#C59B7D] flex items-center justify-center bg-[#25282A] text-[#C59B7D] serif text-3xl font-light shadow-lg">
                    P
                  </div>

                  <div>
                    <h2 className="serif text-3xl sm:text-4xl font-light tracking-[0.3em] uppercase text-[#F7F5F0]">
                      Principio
                    </h2>
                    <div className="serif italic text-base text-[#C59B7D] mt-1">
                      {currentPage.subtitle}
                    </div>
                  </div>

                  <p className="text-xs text-[#F7F5F0]/75 font-sans-clean font-light leading-relaxed max-w-xs mx-auto">
                    {currentPage.description}
                  </p>

                  {/* Direct Contact Pillars */}
                  <div className="w-full space-y-2 text-left">
                    <a
                      href={buildWhatsAppUrl('Hola Principio, vi la contraportada del catálogo y deseo hacer un pedido.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xs bg-[#282B2E] hover:bg-[#313539] border border-[#C59B7D]/30 flex items-center justify-between text-xs font-sans-clean text-[#F7F5F0] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-[#25D366]" />
                        <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[#C59B7D]" />
                    </a>

                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xs bg-[#282B2E] hover:bg-[#313539] border border-[#C59B7D]/30 flex items-center justify-between text-xs font-sans-clean text-[#F7F5F0] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Instagram className="w-4 h-4 text-[#C59B7D]" />
                        <span>Instagram: {INSTAGRAM_HANDLE}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[#C59B7D]" />
                    </a>

                    <div className="p-2.5 rounded-xs bg-[#282B2E] border border-[#C59B7D]/20 flex items-center gap-2 text-xs font-sans-clean text-[#F7F5F0]/80">
                      <MapPin className="w-4 h-4 text-[#C59B7D]" />
                      <span>Guayaquil — Envíos a todo el Ecuador</span>
                    </div>
                  </div>

                  <a
                    href={buildWhatsAppUrl('Hola Principio, revisé el catálogo 2026 completo y deseo consultar opciones para un pedido.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-transparent hover:bg-white/10 text-[#F7F5F0] rounded-sm text-xs font-sans-clean uppercase tracking-[0.2em] font-semibold transition-all border border-[#C59B7D] cursor-pointer"
                  >
                    <span>{currentPage.ctaText || 'Iniciar Pedido en WhatsApp'}</span>
                  </a>
                </div>
              )}
            </div>

            {/* Footer Margin Space (Simulating 160px safe zone & minimal pagination) */}
            <div className="w-full pt-3 border-t border-[#C59B7D]/25 flex items-center justify-between text-[10px] font-sans-clean uppercase tracking-widest text-[#C59B7D]">
              <div className="flex items-center gap-2">
                <span>@Principio.ec</span>
              </div>
              <div className="serif italic text-xs lowercase tracking-normal">
                {currentPage.pageNumber}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Floating Navigation Controls */}
      <div className="w-full max-w-md md:max-w-lg mt-4 flex items-center justify-between gap-3 px-2">
        <button
          onClick={() => currentPageIndex > 0 && onPageChange(currentPageIndex - 1)}
          disabled={currentPageIndex === 0}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans-clean font-medium transition-all ${
            currentPageIndex === 0
              ? 'opacity-30 cursor-not-allowed bg-transparent text-gray-400'
              : 'bg-[#EAE4DC] hover:bg-[#dfd7cc] text-[#1E2022] cursor-pointer shadow-xs'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        {/* Page Dots / Scrub Bar */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] py-1 custom-scrollbar">
          {pages.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => onPageChange(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentPageIndex === idx
                  ? 'w-6 bg-[#C59B7D]'
                  : 'w-2 bg-[#EAE4DC] hover:bg-[#C59B7D]/60'
              }`}
              title={`Ir a página ${p.pageNumber}`}
            />
          ))}
        </div>

        <button
          onClick={() => currentPageIndex < pages.length - 1 && onPageChange(currentPageIndex + 1)}
          disabled={currentPageIndex === pages.length - 1}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans-clean font-medium transition-all ${
            currentPageIndex === pages.length - 1
              ? 'opacity-30 cursor-not-allowed bg-transparent text-gray-400'
              : 'bg-[#1F3E35] hover:bg-[#18322a] text-white cursor-pointer shadow-xs'
          }`}
        >
          <span>Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Macro Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-2xl max-h-[90vh] bg-[#F7F5F0] rounded-2xl overflow-hidden p-2 shadow-2xl border border-[#C59B7D]">
            <img
              src={zoomedImage}
              alt="Detalle Macro Resina"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 text-center">
              <div className="font-serif-editorial text-base text-[#1E2022]">
                Detalle Macro — Resina Cristalina & Acabados de Autor
              </div>
              <div className="text-xs text-[#C59B7D] font-sans-clean mt-0.5">
                Haz clic en cualquier lugar para cerrar
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
