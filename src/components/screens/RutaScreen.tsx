import React from 'react';
import { COURSES } from '../../data/content';
import { Progress } from '../../store';
import { Bar, Icon } from '../ui';

export const METHOD_ORDER = ['VT', 'PT', 'MT', 'UT', 'RT'] as const;
export const METHOD_ICON: Record<string, string> = { VT: 'visibility', PT: 'water_drop', MT: 'bolt', UT: 'graphic_eq', RT: 'radiology' };

export const lessonPct = (p: Progress, c: string) => {
  const L = COURSES[c].lessons.length;
  if (!L) return 0;
  return Math.round((100 * COURSES[c].lessons.filter((_: unknown, i: number) => p.done[c + i]).length) / L);
};

export const RutaScreen: React.FC<{ p: Progress; onOpen: (c: string) => void }> = ({ p, onOpen }) => {
  const current = METHOD_ORDER.find((c) => !COURSES[c].locked && lessonPct(p, c) < 100) || 'VT';
  return (
    <div className="flex flex-col w-full px-3.5 space-y-3.5 max-w-2xl mx-auto">
      <section className="bg-gradient-to-b from-[#112238] to-[#0d1e33] border border-[#1d3557] rounded-xl p-4 shadow-lg relative overflow-hidden">
        <span className="text-[10px] text-[#4cd6fb] font-bold uppercase tracking-wider block">Tu ruta de aprendizaje</span>
        <h1 className="text-xl font-extrabold text-white leading-tight mt-0.5">
          {p.name ? `Hola, ${p.name}` : 'Aprende ensayos no destructivos'}
        </h1>
        <p className="text-[13px] text-[#9db4d4] mt-1.5 leading-relaxed">
          Lecciones cortas, preguntas tipo examen y práctica con ilustraciones. Para quien parte en el rubro y para quien prepara su Nivel I o II.
        </p>
        <button
          onClick={() => onOpen(current)}
          className="mt-3 w-full py-3 rounded-lg bg-[#ff6b00] text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-[.98] shadow-[0_4px_16px_rgba(255,107,0,0.3)]"
        >
          <Icon name="play_arrow" fill className="text-[20px]" />
          Continuar con {COURSES[current].name}
        </button>
      </section>

      <ol className="relative space-y-2.5">
        <span className="absolute left-[27px] top-6 bottom-6 w-px bg-[#1d3557]" aria-hidden="true" />
        {METHOD_ORDER.map((c) => {
          const C = COURSES[c];
          const pct = lessonPct(p, c);
          const done = !C.locked && pct === 100;
          return (
            <li key={c}>
              <button
                disabled={C.locked}
                onClick={() => onOpen(c)}
                className={`relative w-full flex items-center gap-3 text-left bg-[#0d1e33] border rounded-xl p-3 transition-all ${
                  C.locked ? 'border-[#1d3557] opacity-55' : c === current ? 'border-[#ff6b00]/70 active:scale-[.98]' : 'border-[#1d3557] hover:border-[#4cd6fb]/60 active:scale-[.98]'
                }`}
              >
                <span
                  className={`z-10 w-12 h-12 shrink-0 rounded-full grid place-items-center border-2 ${
                    done ? 'bg-[#2bd97c] border-[#2bd97c] text-[#081423]' : C.locked ? 'bg-[#081423] border-[#1d3557] text-[#9db4d4]' : 'bg-[#081423] border-[#ff6b00] text-[#ff6b00]'
                  }`}
                >
                  <Icon name={done ? 'check' : C.locked ? 'lock' : METHOD_ICON[c]} className="text-[22px]" />
                </span>
                <span className="flex-1 min-w-0 space-y-1.5">
                  <span className="flex items-center gap-2">
                    <span className="font-['JetBrains_Mono',monospace] text-[11px] font-bold text-[#4cd6fb]">{c}</span>
                    <span className="font-bold text-white text-sm truncate">{C.name}</span>
                  </span>
                  {C.locked ? (
                    <span className="text-[11px] text-[#9db4d4] block">Próximamente</span>
                  ) : (
                    <>
                      <span className="text-[11px] text-[#9db4d4] block">
                        {C.lessons.length} lecciones · {pct}% completado
                      </span>
                      <Bar pct={pct} color={done ? '#2bd97c' : '#ff6b00'} />
                    </>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <p className="text-[11px] text-[#9db4d4] leading-relaxed px-1">
        Esta app te ayuda a estudiar y practicar. No otorga certificación: la certificación de personal NDT la entrega tu empleador según SNT-TC-1A o un organismo según ISO 9712.
      </p>
    </div>
  );
};
