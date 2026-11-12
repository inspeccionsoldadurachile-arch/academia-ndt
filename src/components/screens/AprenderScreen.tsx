import React, { useState } from 'react';
import { COURSES, QUIZ } from '../../data/content';
import { ProgressApi } from '../../store';
import { Bar, Icon, Quiz, Rich, Sheet } from '../ui';
import { lessonPct, METHOD_ICON } from './RutaScreen';

const OPEN = ['VT', 'PT'];

export const AprenderScreen: React.FC<{ api: ProgressApi; method: string; onMethod: (c: string) => void }> = ({ api, method, onMethod }) => {
  const { p } = api;
  const [lesson, setLesson] = useState<number | null>(null);
  const [quiz, setQuiz] = useState(false);
  const C = COURSES[method];
  const L = lesson !== null ? C.lessons[lesson] : null;
  const pct = lessonPct(p, method);

  return (
    <div className="flex flex-col w-full px-3.5 space-y-3.5 max-w-2xl mx-auto">
      <div className="grid grid-cols-2 gap-1 bg-[#040f1d] p-1 rounded-lg border border-[#1d3557]">
        {OPEN.map((c) => (
          <button
            key={c}
            onClick={() => onMethod(c)}
            className={`py-2 rounded text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all ${
              method === c ? 'bg-[#ff6b00] text-white shadow-sm' : 'text-[#9db4d4] hover:text-white'
            }`}
          >
            <Icon name={METHOD_ICON[c]} className="text-[15px]" />
            {c} · {COURSES[c].name}
          </button>
        ))}
      </div>

      <section className="space-y-2">
        <span className="text-[10px] text-[#4cd6fb] font-bold uppercase tracking-wider block">
          {method} · {C.lessons.length} lecciones
        </span>
        <h1 className="text-xl font-extrabold text-white leading-tight">{C.name}</h1>
        <Bar pct={pct} />
      </section>

      <section className="space-y-2">
        {C.lessons.map((l: { t: string; min: number }, i: number) => {
          const done = p.done[method + i];
          return (
            <button
              key={i}
              onClick={() => setLesson(i)}
              className="w-full flex items-center gap-3 text-left bg-[#0d1e33] border border-[#1d3557] rounded-xl p-3.5 hover:border-[#4cd6fb]/60 active:scale-[.98] transition-all"
            >
              <span className="font-['JetBrains_Mono',monospace] text-[11px] text-[#9db4d4] w-6 shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <span className="flex-1 min-w-0">
                <span className="block font-bold text-white text-sm">{l.t}</span>
                <span className="block text-[11px] text-[#9db4d4]">{l.min} min de lectura</span>
              </span>
              <span
                className={`w-7 h-7 rounded-full grid place-items-center border-2 shrink-0 ${
                  done ? 'bg-[#2bd97c] border-[#2bd97c] text-[#081423]' : 'border-[#1d3557] text-[#1d3557]'
                }`}
              >
                <Icon name="check" className="text-[16px]" />
              </span>
            </button>
          );
        })}
      </section>

      <section className="bg-gradient-to-br from-[#112238] to-[#0d1e33] border border-[#1d3557] rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Icon name="quiz" className="text-[22px] text-[#ff6b00]" />
          <h3 className="font-extrabold text-white">Quiz de {method}</h3>
        </div>
        <p className="text-[13px] text-[#9db4d4]">
          {QUIZ[method].length} preguntas tipo examen con explicación.
          {p.best[method] !== undefined && ` Tu mejor resultado: ${p.best[method]}%.`}
        </p>
        <button onClick={() => setQuiz(true)} className="w-full py-3 rounded-lg bg-[#ff6b00] text-white font-bold text-sm active:scale-[.98]">
          Hacer el quiz
        </button>
      </section>

      <Sheet
        open={!!L}
        onClose={() => setLesson(null)}
        eyebrow={`${method} · Lección ${(lesson ?? 0) + 1} de ${C.lessons.length}`}
        title={L?.t || ''}
      >
        {L && (
          <div className="space-y-4">
            <Rich html={L.body} className="lesson-body" />
            <button
              onClick={() => {
                api.completeLesson(method + lesson);
                if (lesson! < C.lessons.length - 1) setLesson(lesson! + 1);
                else {
                  setLesson(null);
                  setQuiz(true);
                }
              }}
              className="w-full py-3 rounded-lg bg-[#ff6b00] text-white font-bold text-sm active:scale-[.98]"
            >
              {lesson === C.lessons.length - 1 ? 'Completar y hacer el quiz' : 'Completar y seguir'}
            </button>
          </div>
        )}
      </Sheet>

      <Sheet open={quiz} onClose={() => setQuiz(false)} eyebrow="Quiz" title={`Quiz de ${C.name}`}>
        <Quiz
          key={method + String(quiz)}
          questions={QUIZ[method]}
          onAnswer={(ok) => api.recordAnswer(method, ok)}
          onFinish={(pct) => api.recordResult(method, pct)}
          onExit={() => setQuiz(false)}
        />
      </Sheet>
    </div>
  );
};
