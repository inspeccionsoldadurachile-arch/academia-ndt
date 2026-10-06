import React, { useState } from 'react';
import { COURSES } from '../../data/content';
import { ProgressApi, streak } from '../../store';
import { Bar, Icon } from '../ui';
import { lessonPct } from './RutaScreen';

const QUIZZES = ['VT', 'PT', 'Práctica'];

export const AvanceScreen: React.FC<{ api: ProgressApi; onToast: (m: string) => void }> = ({ api, onToast }) => {
  const { p } = api;
  const [name, setName] = useState(p.name);
  const [confirmReset, setConfirmReset] = useState(false);

  const lessons = Object.keys(p.done).length;
  const totals = Object.values(p.stats).reduce((a, s) => ({ ok: a.ok + s.ok, total: a.total + s.total }), { ok: 0, total: 0 });
  const acc = totals.total ? Math.round((100 * totals.ok) / totals.total) : 0;
  const days = streak(p.days);
  const quizAcc = (k: string) => {
    const s = p.stats[k];
    return s && s.total ? Math.round((100 * s.ok) / s.total) : null;
  };
  const weak = QUIZZES.filter((k) => {
    const a = quizAcc(k);
    return a !== null && a < 70;
  });

  const badges = [
    { icon: 'school', title: 'Primera lección', got: lessons >= 1 },
    { icon: 'visibility', title: 'Ruta VT completa', got: lessonPct(p, 'VT') === 100 },
    { icon: 'water_drop', title: 'Ruta PT completa', got: lessonPct(p, 'PT') === 100 },
    { icon: 'target', title: '10 aciertos', got: totals.ok >= 10 },
    { icon: 'local_fire_department', title: 'Racha de 3 días', got: days >= 3 },
    { icon: 'image_search', title: 'Práctica perfecta', got: p.best['Práctica'] === 100 }
  ];

  const stats = [
    { icon: 'bolt', label: 'XP', value: p.xp },
    { icon: 'local_fire_department', label: days === 1 ? 'día de racha' : 'días de racha', value: days },
    { icon: 'menu_book', label: 'lecciones', value: lessons },
    { icon: 'target', label: 'aciertos', value: `${acc}%` }
  ];

  return (
    <div className="flex flex-col w-full px-3.5 space-y-3.5 max-w-2xl mx-auto">
      <section className="grid grid-cols-2 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#0d1e33] border border-[#1d3557] rounded-xl p-3">
            <Icon name={s.icon} className="text-[18px] text-[#ff6b00]" />
            <span className="block text-2xl font-extrabold text-white tabular-nums mt-1">{s.value}</span>
            <span className="block text-[11px] text-[#9db4d4]">{s.label}</span>
          </div>
        ))}
      </section>

      <section className="bg-[#0d1e33] border border-[#1d3557] rounded-xl p-4 space-y-3">
        <h3 className="font-extrabold text-white text-sm">Dominio por tema</h3>
        {QUIZZES.map((k) => {
          const a = quizAcc(k);
          return (
            <div key={k} className="space-y-1">
              <div className="flex justify-between text-[12px]">
                <span className="text-[#d7e3f9]">{k === 'Práctica' ? 'Práctica visual' : `${k} · ${COURSES[k].name}`}</span>
                <span className="text-[#9db4d4] tabular-nums">{a === null ? 'Sin datos' : `${a}%`}</span>
              </div>
              <Bar pct={a ?? 0} color={a !== null && a < 70 ? '#ff4d6a' : '#2bd97c'} />
            </div>
          );
        })}
        {weak.length > 0 ? (
          <p className="text-[12px] text-[#ffb38a] flex gap-1.5">
            <Icon name="warning" className="text-[16px]" />
            Para reforzar: {weak.map((k) => (k === 'Práctica' ? 'práctica visual' : k)).join(', ')}. Repasa las lecciones y repite el quiz.
          </p>
        ) : (
          <p className="text-[12px] text-[#9db4d4]">Responde quizzes para ver en qué temas te conviene reforzar.</p>
        )}
      </section>

      <section className="bg-[#0d1e33] border border-[#1d3557] rounded-xl p-4 space-y-3">
        <h3 className="font-extrabold text-white text-sm">Logros</h3>
        <div className="grid grid-cols-3 gap-2">
          {badges.map((b) => (
            <div key={b.title} className={`flex flex-col items-center text-center gap-1 p-2 rounded-lg ${b.got ? '' : 'opacity-40'}`}>
              <span
                className={`w-11 h-11 rounded-full grid place-items-center border-2 ${
                  b.got ? 'border-[#ff6b00] text-[#ff6b00] bg-[#ff6b00]/10' : 'border-[#1d3557] text-[#9db4d4]'
                }`}
              >
                <Icon name={b.got ? b.icon : 'lock'} fill={b.got} className="text-[20px]" />
              </span>
              <span className="text-[10px] font-semibold text-[#d7e3f9] leading-tight">{b.title}</span>
            </div>
          ))}
        </div>
      </section>

      <form
        className="bg-[#0d1e33] border border-[#1d3557] rounded-xl p-4 space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          api.setName(name.trim());
          onToast('Nombre guardado');
        }}
      >
        <h3 className="font-extrabold text-white text-sm">Tu perfil</h3>
        <label htmlFor="nombre" className="text-[12px] text-[#9db4d4] block">
          ¿Cómo te llamamos?
        </label>
        <div className="flex gap-2">
          <input
            id="nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
            autoComplete="given-name"
            className="flex-1 min-w-0 bg-[#081423] border border-[#1d3557] rounded-lg px-3 py-2.5 text-sm text-white focus:border-[#4cd6fb] outline-none"
          />
          <button type="submit" className="px-4 rounded-lg bg-[#ff6b00] text-white font-bold text-sm active:scale-95">
            Guardar
          </button>
        </div>
        <p className="text-[11px] text-[#9db4d4]">Tu progreso se guarda solo en este celular.</p>
      </form>

      <section className="bg-[#0d1e33] border border-[#1d3557] rounded-xl p-4 space-y-2">
        <h3 className="font-extrabold text-white text-sm">Sobre la app</h3>
        <p className="text-[13px] text-[#c4d3ea] leading-relaxed">
          Academia NDT es una app gratuita de Inspección Soldadura Chile para aprender ensayos no destructivos de forma práctica desde el
          celular, con lecciones cortas, quizzes y casos reales.
        </p>
        <p className="text-[11px] text-[#9db4d4]">Contenido en revisión técnica. Pronto: partículas magnéticas, ultrasonido y radiografía.</p>
      </section>

      <button
        onClick={() => {
          if (!confirmReset) return setConfirmReset(true);
          api.reset();
          setName('');
          setConfirmReset(false);
          onToast('Progreso borrado');
        }}
        className="text-[12px] text-[#9db4d4] underline underline-offset-2 self-center py-2"
      >
        {confirmReset ? 'Toca otra vez para confirmar el borrado' : 'Borrar mi progreso'}
      </button>
    </div>
  );
};
