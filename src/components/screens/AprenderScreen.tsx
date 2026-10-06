import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../data/mockData';
import { QuizQuestion } from '../../types';

interface AprenderScreenProps {
  onEarnXp: (amount: number, reason: string) => void;
}

export const AprenderScreen: React.FC<AprenderScreenProps> = ({ onEarnXp }) => {
  const [activeTab, setActiveTab] = useState<'normas' | 'quiz' | 'defectos'>('normas');

  // Quiz state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIdx];

  const handleSelectOption = (idx: number) => {
    if (answered) return;
    setSelectedOption(idx);
    setAnswered(true);
    if (idx === currentQ.correctIndex) {
      setScore(score + 1);
      onEarnXp(20, 'Respuesta correcta en simulacro NDT');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setQuizFinished(true);
      onEarnXp(50, 'Simulacro oficial AWS D1.1 / ASME completado');
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="flex flex-col w-full px-3.5 space-y-3.5 max-w-2xl mx-auto">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#112238] to-[#0d1e33] border border-[#1d3557] rounded-xl p-3.5 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#ff6b00] to-[#00d2ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px] text-white">menu_book</span>
            </div>
            <div>
              <span className="text-[10px] text-[#4cd6fb] font-bold uppercase tracking-wider block">
                ACADEMIA TÉCNICA NDT CHILE
              </span>
              <h2 className="text-base font-extrabold text-white leading-tight">
                Normativas &amp; Simulacros
              </h2>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#081423] border border-[#1d3557] text-[#4cd6fb] text-[10px] font-bold uppercase">
            SNT-TC-1A
          </span>
        </div>

        {/* Sub-tabs */}
        <div className="grid grid-cols-3 gap-1 bg-[#040f1d] p-1 rounded-lg border border-[#1d3557] mt-3">
          <button
            onClick={() => setActiveTab('normas')}
            className={`py-1.5 rounded text-[11px] uppercase tracking-wider font-semibold transition-all text-center ${
              activeTab === 'normas'
                ? 'bg-[#ff6b00] text-white shadow-sm'
                : 'text-[#9db4d4] hover:text-white'
            }`}
          >
            Normas NDT
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`py-1.5 rounded text-[11px] uppercase tracking-wider font-semibold transition-all text-center ${
              activeTab === 'quiz'
                ? 'bg-[#ff6b00] text-white shadow-sm'
                : 'text-[#9db4d4] hover:text-white'
            }`}
          >
            Simulacro (5)
          </button>
          <button
            onClick={() => setActiveTab('defectos')}
            className={`py-1.5 rounded text-[11px] uppercase tracking-wider font-semibold transition-all text-center ${
              activeTab === 'defectos'
                ? 'bg-[#ff6b00] text-white shadow-sm'
                : 'text-[#9db4d4] hover:text-white'
            }`}
          >
            Discontinuidades
          </button>
        </div>
      </section>

      {/* TAB 1: NORMAS */}
      {activeTab === 'normas' && (
        <div className="space-y-3">
          {/* AWS D1.1 */}
          <div className="bg-[#112238] border border-[#1d3557] rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-white">
                AWS D1.1 / D1.1M: Structural Welding Code - Steel
              </span>
              <span className="text-[10px] text-[#ff6b00] font-bold">Cláusula 6</span>
            </div>
            <p className="text-xs text-[#9db4d4] leading-relaxed">
              Estándar para estructuras de acero al carbono y de baja aleación. La Cláusula 6 define las calificaciones del inspector VT, criterios de aceptación visual (Tabla 6.1) para miembros estáticamente y ciclicamente cargados, y requisitos de examen por ultrasonido y radiografía.
            </p>
            <div className="bg-[#0d1e33] p-2 rounded text-[11px] text-[#4cd6fb] flex items-center justify-between">
              <span>Criterio Clave: Socavación &le; 1.0 mm (o 1.6 mm acumulado)</span>
              <span className="text-[10px] text-[#00e676]">Aplicado en Chile</span>
            </div>
          </div>

          {/* ASME Section V */}
          <div className="bg-[#112238] border border-[#1d3557] rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-white">
                ASME Sec. V: Nondestructive Examination
              </span>
              <span className="text-[10px] text-[#4cd6fb] font-bold">Art. 4, 7, 9</span>
            </div>
            <p className="text-xs text-[#9db4d4] leading-relaxed">
              Código obligatorio en recipientes a presión y calderas (ASME VIII / I). El Artículo 9 rige el Examen Visual Directo y Remoto; el Artículo 7 para Partículas Magnéticas; y el Artículo 4 para Examen por Ultrasonido de Soldaduras.
            </p>
            <div className="bg-[#0d1e33] p-2 rounded text-[11px] text-[#4cd6fb] flex items-center justify-between">
              <span>Requisito: Iluminación mínima &ge; 1000 lux en la superficie</span>
              <span className="text-[10px] text-[#00e676]">Calibrado</span>
            </div>
          </div>

          {/* ASTM E165 */}
          <div className="bg-[#112238] border border-[#1d3557] rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-white">
                ASTM E165: Standard Practice for Liquid Penetrant
              </span>
              <span className="text-[10px] text-[#ffb693] font-bold">Tipo II</span>
            </div>
            <p className="text-xs text-[#9db4d4] leading-relaxed">
              Práctica estándar para examen por líquidos penetrantes. Detalla métodos A (lavable con agua), B (post-emulsificable lipofílico), C (removible con solvente), y D (post-emulsificable hidrofílico).
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="bg-[#112238] border border-[#1d3557] rounded-xl p-4 space-y-4">
          {!quizFinished ? (
            <>
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-[#1d3557] pb-2">
                <div>
                  <span className="text-[10px] text-[#4cd6fb] font-bold uppercase block">
                    {currentQ.norm}
                  </span>
                  <span className="text-xs text-white font-semibold">
                    Pregunta {currentQuestionIdx + 1} de {QUIZ_QUESTIONS.length}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#ff6b00] font-bold">
                  <span className="material-symbols-outlined text-[16px]">military_tech</span>
                  <span>{score * 20} pts</span>
                </div>
              </div>

              {/* Question Text */}
              <h3 className="text-sm font-extrabold text-white leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-2">
                {currentQ.options.map((opt, idx) => {
                  let optStyle = 'bg-[#0d1e33] border-[#1d3557] text-[#d7e3f9] hover:border-[#4cd6fb]/60';
                  if (answered) {
                    if (idx === currentQ.correctIndex) {
                      optStyle = 'bg-[#00e676]/20 border-[#00e676] text-white';
                    } else if (selectedOption === idx) {
                      optStyle = 'bg-[#ff3838]/20 border-[#ff3838] text-white';
                    } else {
                      optStyle = 'bg-[#081423] border-[#1d3557] opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={answered}
                      className={`w-full text-left p-3 rounded-lg border text-xs flex items-center justify-between transition-all ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {answered && idx === currentQ.correctIndex && (
                        <span className="material-symbols-outlined text-[18px] text-[#00e676] shrink-0 ml-2">check_circle</span>
                      )}
                      {answered && selectedOption === idx && idx !== currentQ.correctIndex && (
                        <span className="material-symbols-outlined text-[18px] text-[#ff3838] shrink-0 ml-2">cancel</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next */}
              {answered && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="p-3 bg-[#081423] border border-[#1d3557] rounded-lg text-xs space-y-1">
                    <span className="text-[10px] text-[#ff6b00] font-bold uppercase block">
                      Fundamento Normativo Oficial:
                    </span>
                    <p className="text-[#9db4d4] leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className="w-full h-11 bg-[#ff6b00] hover:bg-[#e65c00] text-white text-xs font-semibold tracking-wider uppercase rounded-lg flex items-center justify-center gap-1.5 shadow-[0_2px_10px_rgba(255,107,0,0.35)] transition-all"
                  >
                    <span>{currentQuestionIdx + 1 === QUIZ_QUESTIONS.length ? 'VER RESULTADO' : 'SIGUIENTE PREGUNTA'}</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Quiz Completed Score Card */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full mx-auto p-1 bg-gradient-to-tr from-[#ff6b00] to-[#00d2ff] flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px] text-white">trophy</span>
              </div>

              <div>
                <span className="text-[10px] text-[#00e676] font-bold uppercase tracking-wider block">
                  SIMULACRO EVALUATIVO COMPLETADO
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  {score} / {QUIZ_QUESTIONS.length} Correctas
                </h3>
                <p className="text-xs text-[#9db4d4] mt-1">
                  {score >= 4
                    ? '¡Sobresaliente! Tu conocimiento normativo cumple con el estándar de Nivel II.'
                    : 'Buen intento. Revisa la Cláusula 6 de AWS D1.1 para reforzar tolerancias.'}
                </p>
              </div>

              <div className="p-3 bg-[#0d1e33] border border-[#1d3557] rounded-lg text-xs flex justify-around">
                <div>
                  <span className="text-[10px] text-[#9db4d4] block">Puntaje</span>
                  <span className="text-white font-bold text-sm">{(score / QUIZ_QUESTIONS.length) * 100}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#9db4d4] block">XP Ganado</span>
                  <span className="text-[#ff6b00] font-bold text-sm">+{score * 20 + 50} XP</span>
                </div>
              </div>

              <button
                onClick={handleRestartQuiz}
                className="w-full h-11 bg-[#112238] border border-[#1d3557] hover:border-[#4cd6fb] text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-all"
              >
                REINTENTAR SIMULACRO
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DISCONTINUIDADES */}
      {activeTab === 'defectos' && (
        <div className="space-y-2.5">
          {[
            {
              title: 'Socavación (Undercut)',
              code: 'ISO 6520-1 #501',
              criteria: 'AWS D1.1: Máximo 1.0 mm para t ≤ 25mm. Prohibida en miembros cargados ciclicamente en bordes.',
              cause: 'Velocidad de avance excesiva, voltaje muy alto, ángulo incorrecto del electrodo.'
            },
            {
              title: 'Falta de Fusión (Lack of Fusion)',
              code: 'ISO 6520-1 #401',
              criteria: 'AWS D1.1: Criterio de Rechazo Inmediato (Cero tolerancia en inspección visual).',
              cause: 'Aporte térmico insuficiente, arco desviado, óxidos gruesos en el bisel.'
            },
            {
              title: 'Porosidad Agrupada (Clustered Porosity)',
              code: 'ISO 6520-1 #2013',
              criteria: 'Diámetro máximo individual 2.4 mm. Suma acumulada ≤ 10 mm en 25 mm de cordón.',
              cause: 'Humedad en electrodos básicos E7018, gas de protección insuficiente o corrientes de aire.'
            },
            {
              title: 'Fisura en Frío / ZAC (Cracks)',
              code: 'ISO 6520-1 #100',
              criteria: 'Rechazo absoluto en todos los códigos (AWS, ASME, API). Defecto plano crítico.',
              cause: 'Presencia de hidrógeno difusible, microestructura frágil (martensita) y altos esfuerzos residuales.'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#112238] border border-[#1d3557] rounded-xl p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-white text-xs">{item.title}</h4>
                <span className="text-[10px] text-[#ff6b00] font-semibold">{item.code}</span>
              </div>
              <p className="text-[11px] text-[#4cd6fb]">
                <strong className="text-white">Criterio:</strong> {item.criteria}
              </p>
              <p className="text-[10px] text-[#9db4d4]">
                <strong>Causa Común:</strong> {item.cause}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
