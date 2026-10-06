import React from 'react';
import { ASSETS } from '../data/assets';
import { InspectorProfile } from '../types';

interface HeaderProps {
  profile: InspectorProfile;
  onOpenProfile: () => void;
  onOpenStreakInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ profile, onOpenProfile, onOpenStreakInfo }) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#081423]/95 backdrop-blur-xl border-b border-[#1d3557]/80 shadow-[0_4px_20px_rgba(0,0,0,0.5)] pt-safe">
      <div className="max-w-2xl mx-auto h-16 px-3.5 flex items-center justify-between gap-2">
        {/* Brand Zone */}
        <div className="flex items-center gap-2.5 min-w-0">
          <button 
            onClick={onOpenProfile}
            className="flex items-center gap-2 text-left hover:opacity-95 transition-opacity"
            title="Inspección Soldadura Chile"
          >
            <img 
              src={ASSETS.logoHeader} 
              alt="Inspección Soldadura Chile" 
              className="h-9 w-auto max-w-[170px] object-contain shrink-0"
              referrerPolicy="no-referrer"
            />
          </button>
          <span className="h-4 w-[1px] bg-[#1d3557]"></span>
          <span className="px-1.5 py-0.5 rounded bg-[#112238] border border-[#1d3557] text-[#4cd6fb] font-semibold text-[10px] tracking-widest shrink-0 uppercase">
            NDT
          </span>
        </div>

        {/* User Stats & Avatar Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Level & Streak Capsule */}
          <button
            onClick={onOpenStreakInfo}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#0d1e33] border border-[#1d3557] hover:border-[#4cd6fb]/50 transition-all text-left"
            title="Ver estadísticas de XP y racha"
          >
            <div className="flex flex-col items-end">
              <span className="font-bold text-[10px] text-[#4cd6fb] leading-none">
                NVL I
              </span>
              <span className="font-normal text-[10px] text-[#9db4d4] leading-none mt-0.5 tabular-nums">
                {(profile.xp / 1000).toFixed(1)}k XP
              </span>
            </div>
            <div className="h-4 w-[1px] bg-[#1d3557] mx-0.5"></div>
            <div className="flex items-center gap-0.5 text-[#ff6b00] font-bold text-[11px]">
              <span 
                className="material-symbols-outlined text-[15px] leading-none" 
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              <span className="tabular-nums">{profile.streakDays}d</span>
            </div>
          </button>

          {/* Official Isotype Ring Button */}
          <button
            onClick={onOpenProfile}
            className="relative cursor-pointer group active:scale-95 transition-transform"
            title="Perfil de Inspector"
          >
            <div className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-[#ff6b00] via-[#1d3557] to-[#4cd6fb] group-hover:shadow-[0_0_10px_rgba(255,107,0,0.4)] transition-shadow">
              <img 
                src={ASSETS.isotipoOficial} 
                alt="Isotipo Oficial" 
                className="w-full h-full rounded-full object-cover bg-[#081423]"
                referrerPolicy="no-referrer"
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
