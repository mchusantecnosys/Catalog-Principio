import React, { useState } from 'react';
import { X, Sparkles, MessageCircle, RefreshCw, Check, Heart } from 'lucide-react';
import { CustomizerState } from '../types';
import { PIGMENT_OPTIONS, ENCAPSULATED_OPTIONS, buildWhatsAppUrl } from '../data/catalogData';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductType?: 'keychain' | 'pen' | 'agenda' | 'duo' | 'box';
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  initialProductType = 'keychain',
}) => {
  const [state, setState] = useState<CustomizerState>({
    productType: initialProductType,
    initialLetter: 'K',
    customName: 'Kelly',
    specialDate: '10/03/2026',
    basePigment: 'lavender',
    encapsulated: ['gold_leaf', 'fimo_pastel'],
    hardwareColor: 'gold',
    hasCharm: true,
    notes: '',
  });

  const [includeHeart, setIncludeHeart] = useState<boolean>(true);

  if (!isOpen) return null;

  const productConfigs = {
    keychain: { name: "Llavero Monograma 'Kelly'", hasLetter: true, hasDate: false },
    pen: { name: 'Bolígrafo Elegance Custom', hasLetter: false, hasDate: false },
    agenda: { name: 'Agenda A7 Crystal Cover', hasLetter: false, hasDate: false },
    duo: { name: "Llaveros Dúo 'Connection' (Corazones)", hasLetter: false, hasDate: true },
    box: { name: 'Box Regalo Executive Deluxe', hasLetter: true, hasDate: false },
  };

  const currentConfig = productConfigs[state.productType];
  const selectedPigment = PIGMENT_OPTIONS.find((p) => p.id === state.basePigment) || PIGMENT_OPTIONS[1];

  // Toggle encapsulated item
  const toggleEncapsulated = (id: string) => {
    setState((prev) => {
      const exists = prev.encapsulated.includes(id);
      if (exists) {
        return { ...prev, encapsulated: prev.encapsulated.filter((item) => item !== id) };
      } else {
        return { ...prev, encapsulated: [...prev.encapsulated, id] };
      }
    });
  };

  const formattedName = `${state.customName.trim()}${includeHeart ? ' ♡' : ''}`;

  // Generate WhatsApp Message
  const getEncapsulatedNames = () => {
    return state.encapsulated
      .map((id) => ENCAPSULATED_OPTIONS.find((e) => e.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const whatsappMessage = `Hola Principio, diseñé mi pieza en el Simulador del Catálogo:
• Pieza: ${currentConfig.name}
${currentConfig.hasLetter ? `• Inicial: Letra "${state.initialLetter}"\n` : ''}• Nombre en vinilo: "${formattedName}"
${currentConfig.hasDate && state.specialDate ? `• Fecha especial: ${state.specialDate}\n` : ''}• Pigmento base: ${selectedPigment.name}
• Encapsulados: ${getEncapsulatedNames() || 'Ninguno'}
• Herraje: ${state.hardwareColor === 'gold' ? 'Oro Pulido' : state.hardwareColor === 'rosegold' ? 'Oro Rosado' : 'Plata Satinada'}
¿Me podrían confirmar disponibilidad, cotización y tiempo de entrega?`;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#F7F5F0] rounded-3xl shadow-2xl border border-[#C59B7D]/40 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#EAE4DC] border-b border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1F3E35] text-white flex items-center justify-center border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B7D]" />
            </div>
            <div>
              <h3 className="serif text-lg md:text-xl font-light text-[#1E2022]">
                Simulador de Pieza en Resina
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-[#C59B7D] font-sans-clean font-medium">
                Personaliza acabados, caligrafía vinílica y pigmentos en tiempo real
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

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar space-y-6">
          {/* Top: Product Type Selector Tabs */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-6 bg-[#C59B7D]"></span>
              <label className="text-[10px] font-sans-clean font-semibold uppercase tracking-[0.2em] text-[#C59B7D] block">
                1. Selecciona la Pieza Base
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {(Object.keys(productConfigs) as Array<keyof typeof productConfigs>).map((key) => {
                const conf = productConfigs[key];
                const active = state.productType === key;
                return (
                  <button
                    key={key}
                    onClick={() => setState({ ...state, productType: key })}
                    className={`p-2.5 rounded-xs border text-left flex flex-col justify-center transition-all cursor-pointer min-h-[52px] ${
                      active
                        ? 'bg-[#1F3E35] border-[#1F3E35] text-white shadow-xs'
                        : 'bg-white/80 border-[#C59B7D]/25 text-[#1E2022] hover:bg-[#EAE4DC]'
                    }`}
                  >
                    <span className="text-[11px] font-sans-clean font-medium leading-tight">{conf.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Live Preview Visualizer Canvas */}
          <div className="p-6 rounded-sm border border-[#C59B7D]/30 bg-gradient-to-b from-[#F7F5F0] to-[#EAE4DC] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs relative overflow-hidden">
            <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none" />

            {/* Left: The Simulated Visualizer Artwork */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-t-full rounded-b-lg overflow-hidden shadow-xl border-2 border-white/70 flex items-center justify-center p-4 bg-[#EAE4DC]">
              {/* Dynamic Base Resin Layer */}
              <div
                className="absolute inset-0 transition-colors duration-500"
                style={{
                  background: `linear-gradient(135deg, ${selectedPigment.hex} 0%, #FFFFFF 40%, ${selectedPigment.hex} 100%)`,
                  opacity: 0.85,
                }}
              />

              {/* Shimmer Light Layer */}
              <div className="absolute inset-0 resin-gold-shimmer pointer-events-none opacity-80" />

              {/* Simulated Gold or Silver Flakes */}
              {state.encapsulated.includes('gold_leaf') && (
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#ffd700_1.5px,transparent_1.5px)] [background-size:14px_14px] opacity-70" />
              )}
              {state.encapsulated.includes('silver_leaf') && (
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#e0e0e0_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-75" />
              )}
              {state.encapsulated.includes('fimo_pastel') && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-around flex-wrap p-2 text-xs opacity-80">
                  <span>🌸</span>
                  <span>🦋</span>
                  <span>☁️</span>
                  <span>🌷</span>
                </div>
              )}

              {/* Central Letter Initial or Piece Icon */}
              <div className="relative z-10 text-center">
                {currentConfig.hasLetter && (
                  <div className="serif italic text-6xl sm:text-7xl font-normal text-[#1E2022]/85 drop-shadow-xs tracking-tight leading-none">
                    {state.initialLetter}
                  </div>
                )}

                {/* Vinyl Script Custom Name Simulation */}
                <div className="font-cursive text-2xl sm:text-3xl text-[#1E2022] drop-shadow-xs mt-1 whitespace-nowrap">
                  {formattedName || 'Tu Nombre'}
                </div>

                {/* Special Date if applicable */}
                {currentConfig.hasDate && state.specialDate && (
                  <div className="text-[10px] font-sans-clean uppercase tracking-widest text-[#1E2022]/80 mt-1 font-medium">
                    {state.specialDate}
                  </div>
                )}
              </div>

              {/* Simulated Gold Charm Badge */}
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-xs bg-[#EAE4DC] border border-[#C59B7D]/40 text-[8px] font-sans-clean uppercase tracking-wider font-semibold text-[#1E2022] shadow-xs flex items-center gap-1">
                <Heart className="w-2.5 h-2.5 fill-[#C59B7D] text-[#C59B7D]" />
                <span>Made with Love</span>
              </div>
            </div>

            {/* Right: Live Recipe Summary */}
            <div className="flex-1 space-y-2.5 text-xs font-sans-clean text-[#1E2022] relative z-10">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#C59B7D] font-semibold">
                Resumen de tu Configuración
              </div>
              <div className="serif text-2xl font-light text-[#1E2022]">
                {currentConfig.name}
              </div>

              <ul className="space-y-1.5 text-xs text-[#1E2022]/80">
                {currentConfig.hasLetter && (
                  <li>
                    <span className="text-[10px] uppercase tracking-wider text-[#C59B7D] font-medium mr-1.5">Inicial:</span>
                    <strong className="text-[#1E2022] font-semibold">{state.initialLetter}</strong>
                  </li>
                )}
                <li>
                  <span className="text-[10px] uppercase tracking-wider text-[#C59B7D] font-medium mr-1.5">Caligrafía:</span>
                  <strong className="text-[#1E2022] font-semibold">{formattedName}</strong>
                </li>
                <li>
                  <span className="text-[10px] uppercase tracking-wider text-[#C59B7D] font-medium mr-1.5">Tono Base:</span>
                  <span className="text-[#1E2022]">{selectedPigment.name}</span>
                </li>
                <li>
                  <span className="text-[10px] uppercase tracking-wider text-[#C59B7D] font-medium mr-1.5">Encapsulados:</span>
                  <span className="text-[#1E2022]">{getEncapsulatedNames() || 'Sin encapsulados'}</span>
                </li>
                <li>
                  <span className="text-[10px] uppercase tracking-wider text-[#C59B7D] font-medium mr-1.5">Herrajes:</span>
                  <span className="text-[#1E2022]">
                    {state.hardwareColor === 'gold' ? 'Oro Pulido' : state.hardwareColor === 'rosegold' ? 'Oro Rosado' : 'Plata'}
                  </span>
                </li>
              </ul>

              <div className="pt-2 border-t border-[#C59B7D]/25 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-[#C59B7D] font-medium">Confección:</span>
                <span className="text-[11px] font-sans-clean font-medium text-[#1F3E35]">
                  Pieza de Autor Curada a Mano
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Personalization Vinyl & Initial */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentConfig.hasLetter && (
              <div>
                <label className="text-[10px] font-sans-clean font-semibold uppercase tracking-[0.2em] text-[#C59B7D] mb-1.5 block">
                  Inicial / Letra (A - Z)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={1}
                    value={state.initialLetter}
                    onChange={(e) => setState({ ...state, initialLetter: e.target.value.toUpperCase() || 'A' })}
                    className="w-16 h-12 text-center serif text-3xl font-light bg-white border border-[#C59B7D]/40 rounded-xs focus:ring-1 focus:ring-[#C59B7D] focus:outline-none"
                  />
                  <div className="text-[10px] text-[#1E2022]/70 font-sans-clean font-light">
                    Letra mayúscula en tipografía clásica de autor.
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="text-[10px] font-sans-clean font-semibold uppercase tracking-[0.2em] text-[#C59B7D] mb-1.5 block">
                Nombre en Caligrafía Vinilo
              </label>
              <div className="space-y-1.5">
                <input
                  type="text"
                  value={state.customName}
                  onChange={(e) => setState({ ...state, customName: e.target.value })}
                  placeholder="Ej. Kelly, Verónica, Gladys..."
                  className="w-full h-11 px-3.5 bg-white border border-[#C59B7D]/40 rounded-xs font-sans-clean text-sm focus:ring-1 focus:ring-[#C59B7D] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setIncludeHeart(!includeHeart)}
                  className={`text-[10px] uppercase tracking-wider flex items-center gap-1.5 px-3 py-1.5 rounded-xs border transition-colors cursor-pointer ${
                    includeHeart ? 'bg-[#C59B7D]/15 border-[#C59B7D] text-[#1E2022] font-semibold' : 'border-gray-300 text-gray-500'
                  }`}
                >
                  <Heart className={`w-3 h-3 ${includeHeart ? 'fill-[#C59B7D] text-[#C59B7D]' : 'text-gray-400'}`} />
                  <span>Añadir símbolo de corazón (♡) al final</span>
                </button>
              </div>
            </div>

            {currentConfig.hasDate && (
              <div className="sm:col-span-2">
                <label className="text-[10px] font-sans-clean font-semibold uppercase tracking-[0.2em] text-[#C59B7D] mb-1.5 block">
                  Fecha Especial (Aniversario / Encuentro)
                </label>
                <input
                  type="text"
                  value={state.specialDate}
                  onChange={(e) => setState({ ...state, specialDate: e.target.value })}
                  placeholder="Ej. 10/03/2026 o 24.08.2018"
                  className="w-full h-11 px-3.5 bg-white border border-[#C59B7D]/40 rounded-xs font-sans-clean text-sm focus:ring-1 focus:ring-[#C59B7D] focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Section 3: Base Pigment Choice */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-6 bg-[#C59B7D]"></span>
              <label className="text-[10px] font-sans-clean font-semibold uppercase tracking-[0.2em] text-[#C59B7D] block">
                2. Tono de Pigmento Base
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {PIGMENT_OPTIONS.map((pigment) => {
                const isSelected = state.basePigment === pigment.id;
                return (
                  <button
                    key={pigment.id}
                    onClick={() => setState({ ...state, basePigment: pigment.id })}
                    className={`p-2.5 rounded-xs border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#C59B7D] shadow-xs ring-1 ring-[#C59B7D]'
                        : 'bg-white/70 border-[#C59B7D]/25 hover:bg-[#EAE4DC]'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-full border border-black/10 shrink-0 shadow-inner flex items-center justify-center"
                      style={{ backgroundColor: pigment.hex }}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-gray-800" />}
                    </div>
                    <div>
                      <div className="text-xs font-sans-clean font-semibold text-[#1E2022] leading-tight">
                        {pigment.name}
                      </div>
                      <div className="text-[9px] text-[#1E2022]/60 font-sans-clean leading-tight mt-0.5">
                        {pigment.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Encapsulated Materials */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-6 bg-[#C59B7D]"></span>
              <label className="text-[10px] font-sans-clean font-semibold uppercase tracking-[0.2em] text-[#C59B7D] block">
                3. Encapsulados Artesanales
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ENCAPSULATED_OPTIONS.map((opt) => {
                const active = state.encapsulated.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleEncapsulated(opt.id)}
                    className={`p-2.5 rounded-xs border text-left flex items-center justify-between transition-all cursor-pointer ${
                      active
                        ? 'bg-[#C59B7D]/15 border-[#C59B7D] text-[#1E2022] font-medium'
                        : 'bg-white/70 border-[#C59B7D]/25 text-[#1E2022]/70 hover:bg-[#EAE4DC]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-xs border flex items-center justify-center ${
                          active ? 'bg-[#1F3E35] border-[#1F3E35] text-white' : 'border-gray-300 bg-white'
                        }`}
                      >
                        {active && <Check className="w-3 h-3" />}
                      </div>
                      <span className="text-xs font-sans-clean">{opt.name}</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-[#C59B7D] font-sans-clean font-semibold">{opt.tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: Hardware Metallic Tone */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-6 bg-[#C59B7D]"></span>
              <label className="text-[10px] font-sans-clean font-semibold uppercase tracking-[0.2em] text-[#C59B7D] block">
                4. Acabado de Herrajes Metálicos
              </label>
            </div>
            <div className="flex items-center gap-3">
              {[
                { id: 'gold', label: 'Oro Pulido', color: '#D4AF37' },
                { id: 'rosegold', label: 'Oro Rosado', color: '#C59B7D' },
                { id: 'silver', label: 'Plata Satinada', color: '#C0C0C0' },
              ].map((hw) => (
                <button
                  key={hw.id}
                  onClick={() => setState({ ...state, hardwareColor: hw.id as any })}
                  className={`flex-1 py-2 px-3 rounded-xs border text-center text-xs font-sans-clean font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    state.hardwareColor === hw.id
                      ? 'bg-white border-[#C59B7D] shadow-xs text-[#1E2022] font-semibold'
                      : 'bg-white/70 border-[#C59B7D]/25 text-[#1E2022]/70 hover:bg-[#EAE4DC]'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full shrink-0 shadow-xs" style={{ backgroundColor: hw.color }} />
                  <span>{hw.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-6 bg-[#EAE4DC] border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() =>
              setState({
                productType: 'keychain',
                initialLetter: 'K',
                customName: 'Kelly',
                specialDate: '10/03/2026',
                basePigment: 'lavender',
                encapsulated: ['gold_leaf', 'fimo_pastel'],
                hardwareColor: 'gold',
                hasCharm: true,
                notes: '',
              })
            }
            className="text-[10px] font-sans-clean uppercase tracking-widest text-[#1E2022]/70 hover:text-[#1E2022] flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restablecer Opciones</span>
          </button>

          <a
            href={buildWhatsAppUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-bottle-green w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-8 rounded-sm text-xs font-sans-clean uppercase tracking-[0.2em] font-semibold shadow-md hover:opacity-90 transition-all cursor-pointer border border-white/10"
          >
            <MessageCircle className="w-4 h-4 text-[#C59B7D]" />
            <span>Pedir por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
