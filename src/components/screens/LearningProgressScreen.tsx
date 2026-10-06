import React, { useState } from 'react';
import { ASSETS } from '../../data/assets';
import { InspectorProfile, Lesson, WeaknessTopic, CognitiveMetric, LogbookEntry, Badge } from '../../types';

interface LearningProgressScreenProps {
  profile: InspectorProfile;
  lessons: Lesson[];
  weaknesses: WeaknessTopic[];
  cognitiveMetrics: CognitiveMetric[];
  logbook: LogbookEntry[];
  badges: Badge[];
  onOpenQr: () => void;
  onOpenSafetyPass: () => void;
  onOpenLogbook: () => void;
  onOpenEditProfile: () => void;
  onSelectLesson: (lesson: Lesson) => void;
  onTrainWeakness: (weakness: WeaknessTopic) => void;
  onSelectBadge: (badge: Badge) => void;
}

export const LearningProgressScreen: React.FC<LearningProgressScreenProps> = ({
  profile,
  lessons,
  weaknesses,
  cognitiveMetrics,
  logbook,
  badges,
  onOpenQr,
  onOpenSafetyPass,
  onOpenLogbook,
  onOpenEditProfile,
  onSelectLesson,
  onTrainWeakness,
  onSelectBadge
}) => {
  const [lessonFilter, setLessonFilter] = useState<'all' | 'weak' | 'in_progress' | 'completed'>('all');

  const filteredLessons = lessons.filter((lesson) => {
    if (lessonFilter === 'weak') return lesson.status === 'requiere_refuerzo' || lesson.weaknessScore < 75;
    if (lessonFilter === 'in_progress') return lesson.status === 'en_progreso';
    if (lessonFilter === 'completed') return lesson.status === 'completada';
    return true;
  });

  const totalCompletedMinutes = lessons.reduce((acc, l) => acc + l.completedMinutes, 0);
  const totalPlannedMinutes = lessons.reduce((acc, l) => acc + l.totalMinutes, 0);
  const overallMastery = Math.round(
    lessons.reduce((acc, l) => acc + l.weaknessScore, 0) / (lessons.length || 1)
  );

  const totalLogHours = logbook.reduce((sum, item) => sum + item.hours, 0);

  return (
    <div className="flex flex-col w-full px-3.5 space-y-3.5 max-w-2xl mx-auto">
      {/* Profile Header Card */}
      <section className="bg-gradient-to-b from-[#112238] to-[#0d1e33] border border-[#1d3557] rounded-xl p-3.5 shadow-lg relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -right-8 -top-8 w-36 h-36 bg-[#ff6b00]/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -left-8 -bottom-8 w-36 h-36 bg-[#00d2ff]/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ff6b00] via-[#00d2ff] to-[#ff6b00]"></div>
        
        {/* Watermark */}
        <img 
          alt="" 
          className="absolute right-[-14px] top-[-10px] w-28 h-28 opacity-10 pointer-events-none select-none" 
          src={ASSETS.watermark} 
          referrerPolicy="no-referrer"
        />

        <div className="flex items-start gap-3 relative z-10">
          {/* Avatar with Circular Arc Indicators */}
          <div className="relative shrink-0">
            <div className="w-[78px] h-[78px] rounded-full p-[3px] bg-gradient-to-tr from-[#ff6b00] via-[#00d2ff] to-[#ff6b00] shadow-[0_0_12px_rgba(255,107,0,0.35)] flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#081423] border border-[#081423]">
                <img 
                  alt={`Inspector ${profile.name}`} 
                  className="w-full h-full object-cover" 
                  src={profile.avatarUrl} 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Sub-badge */}
            <div className="absolute -bottom-1 -right-1 bg-[#081423] text-[#4cd6fb] border border-[#1d3557] px-1.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider flex items-center gap-1 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] animate-pulse"></span>
              {profile.specialties.join(' · ')}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 flex flex-col space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="bg-[#1f2b3b] text-[#4cd6fb] border border-[#1d3557] px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold">
                PLAN DE ESTUDIO NDT
              </span>
              <span className="bg-[#00d2ff]/15 text-[#4cd6fb] border border-[#00d2ff]/30 px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  monitoring
                </span>
                DIAGNÓSTICO ACTIVO
              </span>
            </div>

            <h1 className="font-extrabold text-[21px] text-white tracking-tight truncate leading-tight mt-0.5">
              {profile.name}
            </h1>
            <p className="text-[11px] font-normal text-[#9db4d4] truncate">
              RUT: {profile.rut} | Reg. {profile.regNdt}
            </p>
            <p className="text-[11px] font-normal text-[#9db4d4] line-clamp-1">
              {profile.workplace}
            </p>
          </div>
        </div>

        {/* Quick Actions Row */}
        <div className="grid grid-cols-2 gap-2 pt-2 relative z-10">
          <button 
            onClick={onOpenEditProfile}
            className="h-10 px-3 bg-[#112238] border border-[#1d3557] hover:border-[#4cd6fb]/50 active:scale-98 transition-all text-[#d7e3f9] text-[11px] tracking-wider uppercase font-semibold rounded flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[17px] text-[#4cd6fb]">person</span>
            <span>EDITAR PERFIL</span>
          </button>
          <button 
            onClick={onOpenQr}
            className="h-10 px-3 bg-[#ff6b00] hover:bg-[#e65c00] active:scale-98 transition-all text-white text-[11px] tracking-wider uppercase font-semibold rounded flex items-center justify-center gap-1.5 shadow-[0_2px_10px_rgba(255,107,0,0.35)]"
          >
            <span className="material-symbols-outlined text-[17px]">qr_code_2</span>
            <span>CREDENCIAL QR</span>
          </button>
        </div>
      </section>

      {/* Metric Gauges Dashboard */}
      <section className="grid grid-cols-2 gap-2">
        {/* Dominio de Aprendizaje */}
        <div className="bg-[#112238] border border-[#1d3557] rounded-lg p-3 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#9db4d4] uppercase tracking-wider font-semibold">Dominio Global</span>
            <span className="material-symbols-outlined text-[18px] text-[#00d2ff]">school</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-extrabold text-2xl text-white leading-none tabular-nums">
              {overallMastery}
            </span>
            <span className="text-[11px] text-[#4cd6fb] font-semibold">%</span>
          </div>
          <span className="text-[11px] font-normal text-[#00e676] mt-1">
            +5.4% este mes
          </span>
        </div>

        {/* Horas de Estudio Lectivas */}
        <div className="bg-[#112238] border border-[#1d3557] rounded-lg p-3 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#9db4d4] uppercase tracking-wider font-semibold">Tiempo Lectivo</span>
            <span className="material-symbols-outlined text-[18px] text-[#4cd6fb]">timelapse</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-extrabold text-2xl text-white leading-none tabular-nums">
              {(totalCompletedMinutes / 60).toFixed(1)}
            </span>
            <span className="text-[11px] text-[#4cd6fb] font-semibold">hrs</span>
          </div>
          <span className="text-[11px] text-[#ff6b00] mt-1 font-semibold">
            {Math.round((totalCompletedMinutes / totalPlannedMinutes) * 100)}% Currículum
          </span>
        </div>

        {/* Racha Activa */}
        <div className="bg-[#112238] border border-[#1d3557] rounded-lg p-3 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#9db4d4] uppercase tracking-wider font-semibold">Racha de Estudio</span>
            <span 
              className="material-symbols-outlined text-[18px] text-[#ff6b00]" 
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-extrabold text-2xl text-[#ff6b00] leading-none tabular-nums">
              {profile.streakDays}
            </span>
            <span className="text-[11px] text-[#ffb693] font-semibold">Días</span>
          </div>
          <span className="text-[11px] font-normal text-[#9db4d4] mt-1">
            Simulacro Diario OK
          </span>
        </div>

        {/* XP Acumulado */}
        <div className="bg-[#112238] border border-[#1d3557] rounded-lg p-3 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#9db4d4] uppercase tracking-wider font-semibold">XP Acumulado</span>
            <span className="material-symbols-outlined text-[18px] text-[#afc8ec]">bolt</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-extrabold text-2xl text-[#afc8ec] leading-none tabular-nums">
              {profile.xp.toLocaleString()}
            </span>
            <span className="text-[11px] text-[#d4e3ff] font-semibold">XP</span>
          </div>
          <span className="text-[11px] font-normal text-[#9db4d4] mt-1">
            Faltan {profile.nextLevelXp - profile.xp} para Rango II
          </span>
        </div>
      </section>

      {/* SECCIÓN 1: ANÁLISIS DE DEBILIDADES Y BRECHAS CRÍTICAS */}
      <section className="bg-gradient-to-b from-[#112238] to-[#0d1e33] border border-[#1d3557] rounded-xl p-3.5 shadow-md space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#ff6b00]">warning</span>
            <div>
              <h2 className="font-extrabold text-base text-white tracking-tight uppercase">
                Análisis de Debilidades &amp; Brechas
              </h2>
              <span className="text-[10px] text-[#9db4d4]">
                Diagnóstico algorítmico basado en errores de simulacros
              </span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#ff3838]/20 border border-[#ff3838]/40 text-[#ffb4ab] text-[10px] font-bold uppercase">
            2 Puntos Críticos
          </span>
        </div>

        {/* Weakness Cards */}
        <div className="space-y-2.5 pt-1">
          {weaknesses.map((item) => {
            const isCritical = item.severity === 'critica';
            const isModerate = item.severity === 'moderada';
            
            return (
              <div 
                key={item.id}
                className={`p-3 rounded-lg border text-xs space-y-2 transition-all ${
                  isCritical 
                    ? 'bg-[#181124] border-[#ff3838]/40 shadow-sm'
                    : isModerate
                    ? 'bg-[#18192a] border-[#ff6b00]/40'
                    : 'bg-[#0d1e33] border-[#00e676]/30'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                        isCritical ? 'bg-[#ff3838]/30 text-[#ffb4ab]' :
                        isModerate ? 'bg-[#ff6b00]/30 text-[#ffb693]' : 'bg-[#00e676]/30 text-[#00e676]'
                      }`}>
                        {item.severity === 'critica' ? 'Brecha Crítica' : item.severity === 'moderada' ? 'Atención Requerida' : 'Dominado'}
                      </span>
                      <span className="text-[10px] text-[#4cd6fb] font-semibold">
                        {item.norm}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-xs text-white mt-1 leading-snug">
                      {item.topic}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`text-base font-extrabold tabular-nums block ${
                      isCritical ? 'text-[#ff3838]' : isModerate ? 'text-[#ff6b00]' : 'text-[#00e676]'
                    }`}>
                      {item.masteryPercent}%
                    </span>
                    <span className="text-[9px] text-[#9db4d4]">
                      {item.errorCount} fallos reg.
                    </span>
                  </div>
                </div>

                {/* Diagnostic Note */}
                <p className="text-[11px] text-[#9db4d4] bg-[#081423]/70 p-2 rounded border border-[#1d3557]/60 leading-relaxed">
                  <strong className="text-white">Diagnóstico: </strong>{item.diagnosticNote}
                </p>

                {/* Action button to train weakness */}
                <button
                  onClick={() => onTrainWeakness(item)}
                  className={`w-full h-9 rounded text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                    isCritical
                      ? 'bg-[#ff3838] hover:bg-[#d90429] text-white shadow-[0_2px_8px_rgba(255,56,56,0.35)]'
                      : isModerate
                      ? 'bg-[#ff6b00] hover:bg-[#e65c00] text-white'
                      : 'bg-[#112238] border border-[#1d3557] text-[#d7e3f9]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">fitness_center</span>
                  <span>{item.actionText}</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECCIÓN 2: PLAN DE LECCIONES & CURRÍCULUM MODULAR */}
      <section className="flex flex-col space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#00d2ff]">menu_book</span>
            <h2 className="font-extrabold text-base text-white tracking-tight uppercase">
              Lecciones del Programa NDT
            </h2>
          </div>
          <span className="text-[10px] px-2 py-0.5 bg-[#0d1e33] border border-[#1d3557] text-[#4cd6fb] rounded font-semibold tracking-wider uppercase">
            6 Unidades
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="grid grid-cols-4 gap-1 bg-[#040f1d] p-1 rounded-lg border border-[#1d3557]">
          <button 
            onClick={() => setLessonFilter('all')}
            className={`py-1.5 rounded text-[10px] uppercase tracking-wider font-semibold transition-all text-center ${
              lessonFilter === 'all' ? 'bg-[#ff6b00] text-white shadow-sm' : 'text-[#9db4d4] hover:text-white'
            }`}
          >
            Todas ({lessons.length})
          </button>
          <button 
            onClick={() => setLessonFilter('weak')}
            className={`py-1.5 rounded text-[10px] uppercase tracking-wider font-semibold transition-all text-center ${
              lessonFilter === 'weak' ? 'bg-[#ff6b00] text-white shadow-sm' : 'text-[#9db4d4] hover:text-white'
            }`}
          >
            Débiles ({lessons.filter(l => l.status === 'requiere_refuerzo' || l.weaknessScore < 75).length})
          </button>
          <button 
            onClick={() => setLessonFilter('in_progress')}
            className={`py-1.5 rounded text-[10px] uppercase tracking-wider font-semibold transition-all text-center ${
              lessonFilter === 'in_progress' ? 'bg-[#ff6b00] text-white shadow-sm' : 'text-[#9db4d4] hover:text-white'
            }`}
          >
            Activas ({lessons.filter(l => l.status === 'en_progreso').length})
          </button>
          <button 
            onClick={() => setLessonFilter('completed')}
            className={`py-1.5 rounded text-[10px] uppercase tracking-wider font-semibold transition-all text-center ${
              lessonFilter === 'completed' ? 'bg-[#ff6b00] text-white shadow-sm' : 'text-[#9db4d4] hover:text-white'
            }`}
          >
            Listas ({lessons.filter(l => l.status === 'completada').length})
          </button>
        </div>

        {/* Render Lessons List */}
        <div className="space-y-2.5">
          {filteredLessons.map((lesson) => {
            const isWeak = lesson.status === 'requiere_refuerzo' || lesson.weaknessScore < 70;
            const isDone = lesson.status === 'completada';

            return (
              <article 
                key={lesson.id}
                className="bg-[#112238] border border-[#1d3557] rounded-xl p-3.5 shadow-md space-y-2.5 relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] text-[#4cd6fb] font-semibold uppercase">
                        {lesson.code}
                      </span>
                      <span className="text-[10px] text-[#9db4d4]">· {lesson.norm}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                        isDone ? 'bg-[#00e676]/20 text-[#00e676]' :
                        isWeak ? 'bg-[#ff3838]/20 text-[#ffb4ab]' : 'bg-[#ff6b00]/20 text-[#ffb693]'
                      }`}>
                        {isDone ? 'COMPLETADA' : isWeak ? 'REFORZAR' : 'EN PROGRESO'}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-sm text-white mt-1 leading-snug">
                      {lesson.title}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-extrabold text-white tabular-nums block">
                      {lesson.weaknessScore}%
                    </span>
                    <span className="text-[9px] text-[#9db4d4]">Dominio</span>
                  </div>
                </div>

                <p className="text-xs text-[#9db4d4] leading-relaxed line-clamp-2">
                  {lesson.description}
                </p>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-[#9db4d4]">
                    <span>Avance Lectivo: {lesson.completedMinutes}/{lesson.totalMinutes} min</span>
                    <span className="font-semibold text-white">{lesson.progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#040f1d] rounded-full overflow-hidden border border-[#1d3557]">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isDone ? 'bg-[#00e676]' : isWeak ? 'bg-[#ff3838]' : 'bg-[#ff6b00]'
                      }`}
                      style={{ width: `${lesson.progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Key Concepts Chips */}
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {lesson.keyConcepts.map((kc, i) => (
                    <span 
                      key={i}
                      className="px-1.5 py-0.5 rounded bg-[#0d1e33] border border-[#1d3557] text-[#9db4d4] text-[9px]"
                    >
                      {kc}
                    </span>
                  ))}
                </div>

                {/* Action button */}
                <div className="pt-1">
                  <button
                    onClick={() => onSelectLesson(lesson)}
                    className="w-full h-9 bg-[#0d1e33] border border-[#1d3557] hover:border-[#4cd6fb]/60 active:scale-98 transition-all text-[#d7e3f9] text-[11px] uppercase tracking-wider font-semibold rounded flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#4cd6fb]">menu_book</span>
                    <span>VER LECCIÓN &amp; TEST DE REFUERZO</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* SECCIÓN 3: ANALÍTICA COGNITIVA & TELEMETRÍA DEL PROCESO */}
      <section className="bg-[#112238] border border-[#1d3557] rounded-xl p-3.5 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#00d2ff]">insights</span>
            <div>
              <h2 className="font-extrabold text-base text-white tracking-tight uppercase">
                Diagnóstico Cognitivo
              </h2>
              <span className="text-[10px] text-[#9db4d4]">
                Telemetría de precisión para calificación Nivel II
              </span>
            </div>
          </div>
          <span className="text-[10px] text-[#00e676] font-bold">ALTA RETENCIÓN</span>
        </div>

        {/* 4 Telemetry Metrics */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {cognitiveMetrics.map((cm, idx) => (
            <div key={idx} className="p-2.5 bg-[#0d1e33] border border-[#1d3557] rounded-lg text-xs space-y-1">
              <span className="text-[10px] text-[#9db4d4] uppercase font-semibold block truncate">
                {cm.title}
              </span>
              <span className="text-lg font-extrabold text-white block leading-none tabular-nums">
                {cm.value}
              </span>
              <span className="text-[10px] text-[#4cd6fb] block leading-tight">
                {cm.subtext}
              </span>
              <span className="text-[9px] text-[#00e676] block pt-0.5">
                {cm.trend}
              </span>
            </div>
          ))}
        </div>

        {/* Mastery by NDT Method Bars */}
        <div className="space-y-2 pt-1 bg-[#0b1a2e] p-3 rounded-lg border border-[#1d3557]">
          <span className="text-[10px] text-[#9db4d4] uppercase font-bold tracking-wider block">
            Índice de Madurez por Método NDT
          </span>

          <div className="space-y-1.5 text-xs">
            {/* VT */}
            <div>
              <div className="flex justify-between text-[10px] text-[#d7e3f9] mb-0.5">
                <span>Inspección Visual Directa (VT)</span>
                <span className="font-bold text-[#00e676]">94% (Óptimo)</span>
              </div>
              <div className="w-full h-1.5 bg-[#040f1d] rounded-full overflow-hidden">
                <div className="h-full bg-[#00e676] rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>

            {/* Metalurgia */}
            <div>
              <div className="flex justify-between text-[10px] text-[#d7e3f9] mb-0.5">
                <span>Metalurgia &amp; Criterios de Discontinuidades</span>
                <span className="font-bold text-[#4cd6fb]">82% (Competente)</span>
              </div>
              <div className="w-full h-1.5 bg-[#040f1d] rounded-full overflow-hidden">
                <div className="h-full bg-[#4cd6fb] rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>

            {/* PT */}
            <div>
              <div className="flex justify-between text-[10px] text-[#d7e3f9] mb-0.5">
                <span>Líquidos Penetrantes (PT)</span>
                <span className="font-bold text-[#ff6b00]">65% (En Refuerzo)</span>
              </div>
              <div className="w-full h-1.5 bg-[#040f1d] rounded-full overflow-hidden">
                <div className="h-full bg-[#ff6b00] rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            {/* MT */}
            <div>
              <div className="flex justify-between text-[10px] text-[#d7e3f9] mb-0.5">
                <span>Partículas Magnéticas con Yugo (MT)</span>
                <span className="font-bold text-[#ff3838]">48% (Brecha Crítica)</span>
              </div>
              <div className="w-full h-1.5 bg-[#040f1d] rounded-full overflow-hidden">
                <div className="h-full bg-[#ff3838] rounded-full" style={{ width: '48%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: INSIGNIAS Y VALIDACIÓN INSTITUCIONAL */}
      <section className="bg-[#112238] border border-[#1d3557] rounded-xl p-3.5 shadow-md space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#ff6b00]">military_tech</span>
            <h2 className="font-extrabold text-base text-white tracking-tight uppercase">
              Insignias de Competencia
            </h2>
          </div>
          <span className="text-[10px] text-[#4cd6fb] font-semibold tabular-nums">
            {badges.filter(b => b.unlocked).length} de {badges.length} Desbloqueadas
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          {badges.slice(0, 4).map((badge) => (
            <div 
              key={badge.id}
              onClick={() => onSelectBadge(badge)}
              className="p-2.5 bg-[#0d1e33] border border-[#1d3557] hover:border-[#4cd6fb]/50 rounded flex items-start gap-2.5 relative overflow-hidden cursor-pointer transition-all active:scale-98"
            >
              <div className="w-8 h-8 rounded-full p-[1px] bg-gradient-to-r from-[#ff6b00] to-[#00d2ff] shrink-0">
                <img 
                  alt={badge.title} 
                  className="w-full h-full rounded-full object-cover bg-[#081423]" 
                  src={badge.iconUrl} 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-semibold text-white truncate">
                  {badge.title}
                </h4>
                <p className="text-[10px] font-normal text-[#9db4d4] leading-tight mt-0.5 line-clamp-2">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN 5: BITÁCORA DE TERRENO Y PASE DE SEGURIDAD */}
      <section className="bg-[#112238] border border-[#1d3557] rounded-xl p-3.5 shadow-md space-y-3 relative overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <img 
                alt="Bitácora" 
                className="w-6 h-6 rounded-full object-cover shrink-0" 
                src={ASSETS.iconBitacora} 
                referrerPolicy="no-referrer"
              />
              <h2 className="font-extrabold text-base text-white tracking-tight uppercase">
                Bitácora de Horas en Terreno
              </h2>
            </div>
            <p className="text-[10px] font-normal text-[#9db4d4] mt-1">
              Norma SNT-TC-1A / Calificación Nivel II
            </p>
          </div>
          <span className="bg-[#081423] border border-[#1d3557] text-[#4cd6fb] text-[10px] px-2 py-0.5 rounded font-semibold uppercase tabular-nums">
            {Math.round((totalLogHours / 400) * 100)}% Meta
          </span>
        </div>

        <div className="bg-[#0d1e33] border border-[#1d3557] p-3 rounded space-y-2">
          <div className="flex justify-between items-baseline text-xs">
            <span className="text-[#9db4d4] uppercase tracking-wider text-[10px] font-semibold">
              Horas Validadas por Supervisor
            </span>
            <span className="text-[#4cd6fb] font-bold text-xs tabular-nums">
              {totalLogHours} / 400 hrs
            </span>
          </div>
          <div className="w-full h-2.5 bg-[#040f1d] rounded-full overflow-hidden flex border border-[#1d3557]">
            <div 
              className="h-full bg-gradient-to-r from-[#00d2ff] to-[#4cd6fb] transition-all rounded-full" 
              style={{ width: `${Math.min(100, (totalLogHours / 400) * 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] text-[#9db4d4] pt-0.5 font-normal">
            <span>Min. Nivel I: 70 hrs (OK)</span>
            <span>Requisito Nivel II: 400 hrs</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={onOpenLogbook}
            className="h-11 bg-[#0d1e33] border border-[#1d3557] hover:border-[#4cd6fb]/60 active:scale-98 transition-all text-[#4cd6fb] text-xs tracking-wider uppercase font-semibold rounded flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            <span>REGISTRAR HORAS</span>
          </button>

          <button 
            onClick={onOpenSafetyPass}
            className="h-11 bg-[#ff6b00] hover:bg-[#e65c00] active:scale-98 transition-all text-white text-xs tracking-wider uppercase font-semibold rounded flex items-center justify-center gap-1.5 shadow-[0_2px_10px_rgba(255,107,0,0.35)]"
          >
            <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
            <span>PASE DE FAENA</span>
          </button>
        </div>
      </section>
    </div>
  );
};
