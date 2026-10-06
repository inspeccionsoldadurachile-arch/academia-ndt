import React, { useState } from 'react';
import { ROADMAP_STEPS } from '../../data/mockData';
import { RoadMapStep, InspectorProfile } from '../../types';

interface RutaScreenProps {
  profile: InspectorProfile;
  totalLogHours: number;
}

export const RutaScreen: React.FC<RutaScreenProps> = ({ profile, totalLogHours }) => {
  const [dailyHoursGoal, setDailyHoursGoal] = useState<number>(6);

  const hoursRemaining = Math.max(0, 400 - totalLogHours);
  const daysRemaining = Math.ceil(hoursRemaining / (dailyHoursGoal || 1));
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + daysRemaining);

  return (
    <div className="flex flex-col w-full px-3.5 space-y-3.5 max-w-2xl mx-auto">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#112238] to-[#0d1e33] border border-[#1d3557] rounded-xl p-3.5 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#ff6b00] to-[#00d2ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px] text-white">explore</span>
            </div>
            <div>
              <span className="text-[10px] text-[#4cd6fb] font-bold uppercase tracking-wider block">
                CARRERA Y CALIFICACIÓN OFICIAL
              </span>
              <h2 className="text-base font-extrabold text-white leading-tight">
                Ruta Formativa NDT
              </h2>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#081423] border border-[#1d3557] text-[#ff6b00] text-[10px] font-bold uppercase">
            FASE NIVEL II
          </span>
        </div>
      </section>

      {/* SNT-TC-1A Hours Estimator Widget */}
      <section className="bg-[#112238] border border-[#1d3557] rounded-xl p-3.5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-white text-xs uppercase">
              Calculador de Meta Nivel II
            </h3>
            <span className="text-[10px] text-[#9db4d4]">
              Horas de terreno requeridas según ASNT SNT-TC-1A
            </span>
          </div>
          <span className="text-xs font-bold text-[#4cd6fb] tabular-nums">
            {totalLogHours} / 400 hrs
          </span>
        </div>

        <div className="w-full h-2.5 bg-[#040f1d] rounded-full overflow-hidden border border-[#1d3557]">
          <div 
            className="h-full bg-gradient-to-r from-[#00d2ff] to-[#ff6b00] transition-all rounded-full"
            style={{ width: `${Math.min(100, (totalLogHours / 400) * 100)}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs bg-[#0d1e33] p-2.5 rounded border border-[#1d3557]">
          <div>
            <label className="text-[9px] text-[#9db4d4] uppercase block">
              Horas Promedio por Jornada:
            </label>
            <div className="flex items-center gap-1 mt-1">
              <input
                type="number"
                min="1"
                max="12"
                value={dailyHoursGoal}
                onChange={(e) => setDailyHoursGoal(parseFloat(e.target.value) || 1)}
                className="w-16 bg-[#081423] border border-[#1d3557] text-white text-xs font-bold rounded p-1 text-center"
              />
              <span className="text-[#9db4d4] text-[11px]">hrs/día</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[9px] text-[#9db4d4] uppercase block">
              Estimación de Titulación:
            </span>
            <span className="text-[#ff6b00] font-extrabold text-xs block mt-1">
              En {daysRemaining} días de turno
            </span>
            <span className="text-[9px] text-[#9db4d4]">
              ({estimatedDate.toLocaleDateString('es-CL', { month: 'short', year: 'numeric' })})
            </span>
          </div>
        </div>
      </section>

      {/* Stepper Roadmap */}
      <section className="space-y-3">
        <span className="text-[10px] text-[#9db4d4] uppercase font-bold tracking-wider block">
          Etapas de la Carrera Técnica
        </span>

        {ROADMAP_STEPS.map((step, idx) => {
          const isCurrent = step.status === 'actual';
          const isDone = step.status === 'completado';

          return (
            <div 
              key={step.id}
              className={`p-3.5 rounded-xl border text-xs relative overflow-hidden transition-all ${
                isCurrent
                  ? 'bg-gradient-to-b from-[#112238] to-[#0d1e33] border-[#4cd6fb]/60 shadow-md'
                  : isDone
                  ? 'bg-[#112238] border-[#1d3557]'
                  : 'bg-[#081423] border-[#1d3557] opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    isDone 
                      ? 'bg-[#00e676] text-[#003543]' 
                      : isCurrent 
                      ? 'bg-[#ff6b00] text-white' 
                      : 'bg-[#1d3557] text-[#9db4d4]'
                  }`}>
                    {isDone ? '✓' : idx + 1}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#4cd6fb] block leading-tight">
                      {step.level}
                    </span>
                    <h4 className="font-extrabold text-white text-xs mt-0.5">
                      {step.title}
                    </h4>
                  </div>
                </div>

                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                  isDone 
                    ? 'bg-[#00e676]/20 text-[#00e676]' 
                    : isCurrent 
                    ? 'bg-[#ff6b00]/20 text-[#ff6b00]' 
                    : 'bg-[#1d3557] text-[#9db4d4]'
                }`}>
                  {isDone ? 'APROBADO' : isCurrent ? 'EN PROCESO' : 'BLOQUEADO'}
                </span>
              </div>

              <div className="mt-2.5 pt-2 border-t border-[#1d3557]/60 grid grid-cols-2 gap-2 text-[11px]">
                <div className="text-[#9db4d4]">
                  <span>Requisito: </span>
                  <span className="text-white font-medium">{step.normRequirement}</span>
                </div>
                <div className="text-right text-[#9db4d4]">
                  <span>Examen: </span>
                  <span className="text-[#4cd6fb]">{step.examType}</span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Upcoming Official Examination Cohorts */}
      <section className="bg-[#112238] border border-[#1d3557] rounded-xl p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-white text-xs uppercase">
            Fechas de Exámenes Oficiales en Chile
          </h3>
          <span className="text-[10px] text-[#ff6b00] font-bold">2026</span>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="p-2 rounded bg-[#0d1e33] border border-[#1d3557] flex items-center justify-between">
            <div>
              <span className="text-white font-bold block">Antofagasta · Sede Minera</span>
              <span className="text-[10px] text-[#9db4d4]">Examen Práctico MT / UT Nivel II</span>
            </div>
            <span className="text-[11px] text-[#4cd6fb] font-semibold">18 Nov 2026</span>
          </div>

          <div className="p-2 rounded bg-[#0d1e33] border border-[#1d3557] flex items-center justify-between">
            <div>
              <span className="text-white font-bold block">Santiago · Laboratorio Central</span>
              <span className="text-[10px] text-[#9db4d4]">Examen Específico AWS D1.1</span>
            </div>
            <span className="text-[11px] text-[#4cd6fb] font-semibold">05 Dic 2026</span>
          </div>
        </div>
      </section>
    </div>
  );
};
