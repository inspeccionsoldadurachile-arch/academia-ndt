import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { RutaScreen } from './components/screens/RutaScreen';
import { AprenderScreen } from './components/screens/AprenderScreen';
import { TallerScreen } from './components/screens/TallerScreen';
import { AvanceScreen } from './components/screens/AvanceScreen';
import { Icon } from './components/ui';
import { useProgress } from './store';
import { ScreenTab } from './types';

export default function App() {
  const api = useProgress();
  const [tab, setTab] = useState<ScreenTab>('ruta');
  const [method, setMethod] = useState('VT');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 3000);
  };
  const go = (t: ScreenTab) => {
    setTab(t);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#081423] text-[#d7e3f9] font-['Montserrat',sans-serif] min-h-screen flex flex-col selection:bg-[#ff6b00] selection:text-white">
      <Header p={api.p} onOpenProfile={() => go('avance')} />

      <main key={tab} className="flex-1 flex flex-col w-full pt-[calc(env(safe-area-inset-top,0px)+80px)] pb-28 animate-[sheetIn_.25s_ease-out]">
        {tab === 'ruta' && (
          <RutaScreen
            p={api.p}
            onOpen={(c) => {
              setMethod(c);
              go('aprender');
            }}
          />
        )}
        {tab === 'aprender' && <AprenderScreen api={api} method={method} onMethod={setMethod} />}
        {tab === 'taller' && <TallerScreen api={api} onToast={showToast} />}
        {tab === 'avance' && <AvanceScreen api={api} onToast={showToast} />}
      </main>

      <BottomNav currentTab={tab} onSelectTab={go} />

      {toast && (
        <div
          role="status"
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[70] max-w-sm w-[90%] px-4 py-2.5 bg-[#0d1e33] border border-[#ff6b00] rounded-lg shadow-[0_4px_20px_rgba(255,107,0,0.35)] flex items-center gap-2.5 text-white animate-[sheetIn_.25s_ease-out]"
        >
          <Icon name="notifications_active" className="text-[18px] text-[#ff6b00]" />
          <span className="font-semibold text-[12px] flex-1">{toast}</span>
        </div>
      )}
    </div>
  );
}
