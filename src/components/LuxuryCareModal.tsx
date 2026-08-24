import React from 'react';
import { X, ShieldCheck, Sun, Droplets, Sparkles, Feather, AlertTriangle } from 'lucide-react';

interface LuxuryCareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LuxuryCareModal: React.FC<LuxuryCareModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const careTips = [
    {
      icon: <Sun className="w-5 h-5 text-[#C59B7D]" />,
      title: 'Evitar Luz Solar Directa Prolongada',
      desc: 'Aunque usamos resina epóxica con estabilizadores UV de grado joyero, mantener tus piezas lejos de fuentes de calor extremo o sol intenso prolongará la claridad cristalina.',
    },
    {
      icon: <Feather className="w-5 h-5 text-[#C59B7D]" />,
      title: 'Limpieza Suave con Microfibra',
      desc: 'Para eliminar huellas o polvo, frota delicadamente la superficie con un paño de microfibra seco. No utilices esponjas abrasivas que puedan rallar el brillo espejo.',
    },
    {
      icon: <Droplets className="w-5 h-5 text-[#C59B7D]" />,
      title: 'Cuidado con Químicos Fuertes',
      desc: 'Evita el contacto directo con alcohol en gel, acetona, perfumes directos o disolventes químicos sobre las zonas con caligrafía vinílica y resina.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#C59B7D]" />,
      title: 'Protección de Herrajes Dorados',
      desc: 'Los herrajes y dijes metálicos cuentan con baño en oro pulido. Mantenerlos secos garantiza un lustre brillante y evita la oxidación natural.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#F7F5F0] rounded-3xl shadow-2xl border border-[#C59B7D]/40 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-[#EAE4DC] border-b border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1F3E35] text-white flex items-center justify-center border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#C59B7D]" />
            </div>
            <div>
              <h3 className="serif text-lg md:text-xl font-light text-[#1E2022]">
                Guía de Cuidado de Lujo (Luxury Care)
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-[#C59B7D] font-sans-clean font-medium">
                Preservación del brillo cristalino y caligrafía
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

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
          <p className="text-xs sm:text-sm text-[#1E2022]/80 font-sans-clean font-light leading-relaxed">
            Las creaciones de <strong className="serif text-[#1E2022] font-medium text-base">Principio</strong> son piezas de autor elaboradas a mano con resinas epóxicas de alta pureza. Siguiendo estas sencillas pautas, tu obra conservará su claridad cristalina.
          </p>

          <div className="space-y-3 pt-2">
            {careTips.map((tip, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-white/85 rounded-xs border border-[#C59B7D]/25 flex items-start gap-3 shadow-2xs"
              >
                <div className="p-2 rounded-xs bg-[#EAE4DC] shrink-0 border border-[#C59B7D]/20">
                  {tip.icon}
                </div>
                <div>
                  <h4 className="text-xs font-sans-clean font-semibold uppercase tracking-wider text-[#1E2022]">
                    {tip.title}
                  </h4>
                  <p className="text-[11px] text-[#1E2022]/70 font-sans-clean leading-relaxed mt-0.5">
                    {tip.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xs bg-[#EAE4DC] border border-[#C59B7D]/30 flex items-center gap-2.5 text-[#1E2022] text-xs font-sans-clean">
            <AlertTriangle className="w-4 h-4 text-[#C59B7D] shrink-0" />
            <span className="text-[11px] font-light">
              Tiempo de curado epóxico total: Cada pieza alcanza su dureza máxima tras 5 días de polimerización en taller.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#EAE4DC] border-t border-black/5 text-right">
          <button
            onClick={onClose}
            className="btn-bottle-green px-8 py-2.5 rounded-sm text-xs font-sans-clean uppercase tracking-[0.2em] font-semibold hover:opacity-90 transition-opacity cursor-pointer border border-white/10"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
