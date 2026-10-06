import React from 'react';
import { Progress, streak } from '../store';
import { Icon } from './ui';

export const Header: React.FC<{ p: Progress; onOpenProfile: () => void }> = ({ p, onOpenProfile }) => {
  const initials = (p.name || 'NDT')
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <header className="fixed top-0 w-full z-50 bg-[#081423]/95 backdrop-blur-xl border-b border-[#1d3557]/80 shadow-[0_4px_20px_rgba(0,0,0,0.5)] pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-2xl mx-auto h-16 px-3.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <img src="icons/icon-192.png" alt="" className="w-9 h-9 rounded-lg shrink-0" />
          <div className="min-w-0 leading-tight">
            <span className="block text-[10px] text-[#9db4d4] font-semibold uppercase tracking-wider truncate">Inspección Soldadura Chile</span>
            <span className="block text-sm font-extrabold text-white">Academia NDT</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#0d1e33] border border-[#1d3557]">
            <span className="font-bold text-[10px] text-[#4cd6fb] tabular-nums">{p.xp} XP</span>
            <span className="h-4 w-px bg-[#1d3557]" />
            <span className="flex items-center gap-0.5 text-[#ff6b00] font-bold text-[11px]">
              <Icon name="local_fire_department" fill className="text-[15px]" />
              <span className="tabular-nums">{streak(p.days)}d</span>
            </span>
          </div>
          <button
            onClick={onOpenProfile}
            aria-label="Ver mi avance"
            className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-[#ff6b00] via-[#1d3557] to-[#4cd6fb] active:scale-95"
          >
            <span className="w-full h-full rounded-full bg-[#081423] grid place-items-center text-[11px] font-extrabold text-white">{initials}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
