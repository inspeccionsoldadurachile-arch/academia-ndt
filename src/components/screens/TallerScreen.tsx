import React, { useState } from 'react';
import { PRACTICE } from '../../data/content';
import { ProgressApi } from '../../store';
import { Icon, Quiz, Sheet } from '../ui';
import { SimuladoresScreen } from './SimuladoresScreen';

export const TallerScreen: React.FC<{ api: ProgressApi; onToast: (m: string) => void }> = ({ api, onToast }) => {
  const [mode, setMode] = useState<'practica' | 'simuladores'>('practica');
  const [open, setOpen] = useState(false);
  const best = api.p.best['Práctica'];

  return (
    <div className="flex flex-col w-full space-y-3.5">
      <div className="px-3.5 max-w-2xl mx-auto w-full">
        <div className="grid grid-cols-2 gap-1 bg-[#040f1d] p-1 rounded-lg border border-[#1d3557]">
          {(
            [
              ['practica', 'image_search', 'Identificar defectos'],
              ['simuladores', 'science', 'Simuladores']
            ] as const
          ).map(([id, icon, label]) => (
            <button
              key={id}
              onClick={() => setMode(id)}
              className={`py-2 rounded text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all ${
                mode === id ? 'bg-[#ff6b00] text-white shadow-sm' : 'text-[#9db4d4] hover:text-white'
              }`}
            >
              <Icon name={icon} className="text-[15px]" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {mode === 'practica' ? (
        <div className="px-3.5 max-w-2xl mx-auto w-full space-y-3.5">
          <section className="bg-gradient-to-b from-[#112238] to-[#0d1e33] border border-[#1d3557] rounded-xl p-4 space-y-2">
            <span className="text-[10px] text-[#4cd6fb] font-bold uppercase tracking-wider block">Práctica visual</span>
            <h1 className="text-xl font-extrabold text-white leading-tight">¿Qué ves en la imagen?</h1>
            <p className="text-[13px] text-[#9db4d4]">
              {PRACTICE.length} casos con ilustraciones y esquemas: discontinuidades superficiales, indicaciones de PT y defectos internos.
              {best !== undefined && ` Tu mejor resultado: ${best}%.`}
            </p>
            <button onClick={() => setOpen(true)} className="w-full py-3 rounded-lg bg-[#ff6b00] text-white font-bold text-sm active:scale-[.98]">
              Empezar práctica
            </button>
          </section>
          <div className="grid grid-cols-3 gap-2">
            {['grieta-transversal', 'grieta-crater', 'perforacion', 'inclusion-escoria', 'falta-penetracion', 'porosidad-interna'].map((f) => (
              <img key={f} src={`img/${f}.jpg`} alt="" loading="lazy" className="aspect-square w-full object-cover rounded-lg bg-white border border-[#1d3557]" />
            ))}
          </div>
        </div>
      ) : (
        <SimuladoresScreen
          onEarnXp={(n, reason) => {
            api.addXp(n);
            onToast(`+${n} XP: ${reason}`);
          }}
        />
      )}

      <Sheet open={open} onClose={() => setOpen(false)} eyebrow="Taller" title="Práctica visual">
        <Quiz
          key={String(open)}
          questions={PRACTICE}
          onAnswer={(ok) => api.recordAnswer('Práctica', ok)}
          onFinish={(pct) => api.recordResult('Práctica', pct)}
          onExit={() => setOpen(false)}
        />
      </Sheet>
    </div>
  );
};
