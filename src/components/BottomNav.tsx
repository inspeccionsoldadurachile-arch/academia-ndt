import React from 'react';
import { ScreenTab } from '../types';

interface BottomNavProps {
  currentTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs: { id: ScreenTab; label: string; icon: string; fillable?: boolean }[] = [
    { id: 'ruta', label: 'Ruta', icon: 'explore' },
    { id: 'aprender', label: 'Aprender', icon: 'menu_book' },
    { id: 'taller', label: 'Taller', icon: 'center_focus_strong' },
    { id: 'avance', label: 'Avance', icon: 'monitoring', fillable: true }
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#081423]/95 backdrop-blur-xl border-t border-[#1d3557]/80 shadow-[0_-2px_12px_rgba(0,0,0,0.5)]">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16 px-1">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-12 rounded mx-0.5 transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'text-[#ff6b00] bg-[#112238] border border-[#1d3557] shadow-sm'
                  : 'text-[#9db4d4] hover:text-[#d7e3f9] hover:bg-[#0d1e33]/50'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px] leading-none"
                style={
                  isActive && tab.fillable
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                {tab.icon}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
