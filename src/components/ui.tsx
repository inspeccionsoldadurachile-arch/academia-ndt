import React, { useEffect, useRef, useState } from 'react';

// Los esquemas SVG usan colores como var(--x) en atributos; el navegador solo los
// interpreta como estilo, así que los pasamos a style al montar.
export const Rich: React.FC<{ html: string; className?: string }> = ({ html, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.querySelectorAll('svg *').forEach((el) => {
      (['fill', 'stroke'] as const).forEach((a) => {
        const v = el.getAttribute(a);
        if (v && v.startsWith('var(')) (el as SVGElement).style[a] = v;
      });
    });
  }, [html]);
  return <div ref={ref} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};

export const Icon: React.FC<{ name: string; className?: string; fill?: boolean }> = ({ name, className = '', fill }) => (
  <span
    className={`material-symbols-outlined leading-none ${className}`}
    style={fill ? { fontVariationSettings: "'FILL' 1" } : undefined}
    aria-hidden="true"
  >
    {name}
  </span>
);

export const Bar: React.FC<{ pct: number; color?: string }> = ({ pct, color = '#ff6b00' }) => (
  <div className="h-1.5 w-full rounded-full bg-[#1d3557] overflow-hidden">
    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
  </div>
);

export const Sheet: React.FC<{ open: boolean; onClose: () => void; title: string; eyebrow?: string; children: React.ReactNode }> = ({
  open,
  onClose,
  title,
  eyebrow,
  children
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-[#040f1d]/90 backdrop-blur-sm flex justify-center overflow-y-auto">
      <div className="w-full max-w-2xl min-h-full bg-[#081423] border-x border-[#1d3557] px-3.5 pt-[calc(env(safe-area-inset-top,0px)+12px)] pb-28 animate-[sheetIn_.25s_ease-out]">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            {eyebrow && <span className="text-[10px] text-[#4cd6fb] font-bold uppercase tracking-wider block">{eyebrow}</span>}
            <h2 className="text-lg font-extrabold text-white leading-tight">{title}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="shrink-0 w-9 h-9 rounded-full bg-[#0d1e33] border border-[#1d3557] text-[#9db4d4] hover:text-white flex items-center justify-center active:scale-95"
          >
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export interface Question {
  q: string;
  o: string[];
  a: number;
  e: string;
  img?: string;
  svg?: string;
}

export const Quiz: React.FC<{
  questions: Question[];
  onAnswer: (ok: boolean) => void;
  onFinish: (pct: number) => void;
  onExit: () => void;
}> = ({ questions, onAnswer, onFinish, onExit }) => {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [ok, setOk] = useState(0);
  const item = questions[i];

  if (!item) {
    const pct = Math.round((100 * ok) / questions.length);
    return (
      <div className="flex flex-col items-center text-center gap-3 py-6">
        <div
          className="w-36 h-36 rounded-full grid place-items-center"
          style={{ background: `conic-gradient(#ff6b00 ${pct * 3.6}deg, #1d3557 0)` }}
        >
          <div className="w-28 h-28 rounded-full bg-[#081423] grid place-items-center">
            <span className="text-3xl font-extrabold text-white tabular-nums">
              {ok}/{questions.length}
            </span>
          </div>
        </div>
        <h3 className="text-lg font-extrabold text-white">
          {pct === 100 ? '¡Dominas este bloque!' : pct >= 70 ? 'Buen resultado' : 'Sigue practicando'}
        </h3>
        <p className="text-sm text-[#9db4d4] max-w-xs">
          {pct >= 70 ? 'Puedes repetirlo para afianzar o avanzar al siguiente tema.' : 'Revisa las explicaciones y vuelve a intentarlo.'}
        </p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              setI(0);
              setOk(0);
              setPicked(null);
            }}
            className="px-4 py-2.5 rounded-lg bg-[#ff6b00] text-white font-bold text-sm active:scale-95"
          >
            Repetir
          </button>
          <button onClick={onExit} className="px-4 py-2.5 rounded-lg border border-[#1d3557] text-[#d7e3f9] font-semibold text-sm active:scale-95">
            Volver
          </button>
        </div>
      </div>
    );
  }

  const answered = picked !== null;
  const right = answered && picked === item.a;
  return (
    <div className="space-y-3">
      <div className="flex gap-1">
        {questions.map((_, k) => (
          <span key={k} className={`h-1 flex-1 rounded ${k <= i ? 'bg-[#ff6b00]' : 'bg-[#1d3557]'}`} />
        ))}
      </div>
      <span className="text-[10px] text-[#9db4d4] font-bold uppercase tracking-wider block">
        Pregunta {i + 1} de {questions.length}
      </span>
      {(item.img || item.svg) && (
        <Rich html={item.img || item.svg!} className="quiz-figure rounded-xl overflow-hidden border border-[#1d3557] bg-[#0d1e33]" />
      )}
      <h3 className="text-base font-bold text-white leading-snug">{item.q}</h3>
      <div className="flex flex-col gap-2">
        {item.o.map((o, k) => {
          const state = !answered ? '' : k === item.a ? 'right' : k === picked ? 'wrong' : 'dim';
          return (
            <button
              key={k}
              disabled={answered}
              onClick={() => {
                setPicked(k);
                const good = k === item.a;
                if (good) setOk((n) => n + 1);
                onAnswer(good);
              }}
              className={`opt ${state} text-left text-sm px-3.5 py-3 rounded-lg border transition-all active:scale-[.98] ${
                state === 'right'
                  ? 'bg-[#0f3a2a] border-[#2bd97c] text-white'
                  : state === 'wrong'
                  ? 'bg-[#3a1620] border-[#ff4d6a] text-white'
                  : state === 'dim'
                  ? 'bg-[#0d1e33] border-[#1d3557] text-[#9db4d4] opacity-60'
                  : 'bg-[#0d1e33] border-[#1d3557] text-[#d7e3f9] hover:border-[#4cd6fb]'
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
      {answered && (
        <>
          <div className={`border-l-[3px] pl-3 py-1 text-sm animate-[sheetIn_.25s_ease-out] ${right ? 'border-[#2bd97c]' : 'border-[#ff4d6a]'}`}>
            <strong className="text-white">{right ? 'Correcto. ' : 'Incorrecto. '}</strong>
            <span className="text-[#c4d3ea]">{item.e}</span>
          </div>
          <button
            onClick={() => {
              const next = i + 1;
              if (next >= questions.length) onFinish(Math.round((100 * ok) / questions.length));
              setI(next);
              setPicked(null);
              window.scrollTo({ top: 0 });
            }}
            className="w-full py-3 rounded-lg bg-[#ff6b00] text-white font-bold text-sm active:scale-[.98]"
          >
            {i === questions.length - 1 ? 'Ver resultado' : 'Siguiente'}
          </button>
        </>
      )}
    </div>
  );
};
