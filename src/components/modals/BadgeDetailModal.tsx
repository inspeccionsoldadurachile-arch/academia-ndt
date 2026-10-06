import React from 'react';
import { Badge } from '../../types';

interface BadgeDetailModalProps {
  badge: Badge | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({ badge, isOpen, onClose }) => {
  if (!isOpen || !badge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-sm bg-gradient-to-b from-[#112238] to-[#081423] border border-[#1d3557] rounded-2xl shadow-2xl overflow-hidden p-5 text-center space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Badge Icon */}
        <div className="relative mx-auto w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#ff6b00] via-[#00d2ff] to-[#ff6b00] shadow-[0_0_20px_rgba(255,107,0,0.4)] flex items-center justify-center">
          <img 
            src={badge.iconUrl} 
            alt={badge.title} 
            className="w-full h-full rounded-full object-cover bg-[#081423]"
            referrerPolicy="no-referrer"
          />
        </div>

        <div>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
            badge.unlocked 
              ? 'bg-[#00e676]/20 text-[#00e676] border border-[#00e676]/30' 
              : 'bg-[#1d3557] text-[#9db4d4]'
          }`}>
            {badge.unlocked ? 'INSIGNIA DESBLOQUEADA' : 'BLOQUEADA'}
          </span>
          <h3 className="text-lg font-extrabold text-white mt-1.5">
            {badge.title}
          </h3>
          <p className="text-xs text-[#d7e3f9] mt-1 leading-relaxed">
            {badge.description}
          </p>
        </div>

        <div className="bg-[#0b1a2e] border border-[#1d3557] p-3 rounded-lg text-left text-xs space-y-1">
          <span className="text-[10px] text-[#ff6b00] uppercase font-bold block">
            Criterio de Evaluación
          </span>
          <p className="text-[11px] text-[#9db4d4]">
            {badge.requirement}
          </p>
          {badge.unlockedDate && (
            <p className="text-[10px] text-[#4cd6fb] pt-1">
              Desbloqueada el {badge.unlockedDate}
            </p>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full h-10 bg-[#112238] hover:bg-[#1d3557] border border-[#1d3557] text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-all"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
