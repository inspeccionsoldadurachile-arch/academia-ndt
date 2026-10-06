import React, { useState } from 'react';
import { WeaknessTopic } from '../../types';

interface WeaknessTrainingModalProps {
  weakness: WeaknessTopic | null;
  isOpen: boolean;
  onClose: () => void;
  onBoostMastery: (weaknessId: string) => void;
}

export const WeaknessTrainingModal: React.FC<WeaknessTrainingModalProps> = ({
  weakness,
  isOpen,
  onClose,
  onBoostMastery
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [trainingComplete, setTrainingComplete] = useState(false);

  if (!isOpen || !weakness) return null;

  const questions = [
    {
      q: `Para calibrar la capacidad de sustentación de un yugo electromagnético según ${weakness.norm}, ¿cuál es el peso patrón y frecuencia requerida?`,
      options: [
        "4.5 kg (10 lb) en AC antes de iniciar el turno o tras 6 meses",
        "1.0 kg en cualquier corriente",
        "25 kg con probeta de tracción",
        "No se requiere placa patrón si el cable no está cortado"
      ],
      correct: 0,
      expl: "ASME Sección V Artículo 7 exige verificar la fuerza de levantamiento de 4.5 kg en AC con la máxima separación de polos al inicio de cada jornada o tras reparación."
    },
    {
      q: "¿Cómo se debe colocar el yugo para detectar una fisura longitudinal en el cordón de soldadura?",
      options: [
        "Paralelo al cordón de soldadura",
        "Transversal al cordón (polos perpendiculares al eje del defecto)",
        "A 45 grados sin tocar el metal base",
        "Solo en la raíz por la cara posterior"
      ],
      correct: 1,
      expl: "Las líneas de fuerza magnética deben cortar perpendicularmente el plano de la discontinuidad para maximizar la fuga de flujo magnético detectable."
    }
  ];

  const currentQ = questions[currentStep];

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelectedAns(idx);
    setAnswered(true);
  };

  const handleNext = () => {
    if (currentStep + 1 < questions.length) {
      setCurrentStep(currentStep + 1);
      setSelectedAns(null);
      setAnswered(false);
    } else {
      setTrainingComplete(true);
      onBoostMastery(weakness.id);
    }
  };

  const handleCloseAll = () => {
    setCurrentStep(0);
    setSelectedAns(null);
    setAnswered(false);
    setTrainingComplete(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-md bg-gradient-to-b from-[#112238] to-[#081423] border border-[#1d3557] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 bg-[#0d1e33] border-b border-[#1d3557] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff6b00] text-[20px]">fitness_center</span>
            <div>
              <span className="text-[10px] text-[#ff6b00] uppercase font-bold tracking-wider block">
                Entrenamiento Focalizado en Brecha
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-tight truncate max-w-[280px] block">
                {weakness.topic}
              </span>
            </div>
          </div>
          <button 
            onClick={handleCloseAll}
            className="w-7 h-7 rounded-full bg-[#112238] hover:bg-[#1d3557] text-[#9db4d4] hover:text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {!trainingComplete ? (
            <>
              {/* Question Count */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#9db4d4]">
                  Escenario Clínico {currentStep + 1} de {questions.length}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#ff6b00]/20 text-[#ffb693] font-bold">
                  Brecha Actual: {weakness.masteryPercent}%
                </span>
              </div>

              {/* Question text */}
              <h4 className="text-sm font-extrabold text-white leading-relaxed">
                {currentQ.q}
              </h4>

              {/* Options */}
              <div className="space-y-2">
                {currentQ.options.map((opt, idx) => {
                  let optStyle = 'bg-[#0d1e33] border-[#1d3557] text-[#d7e3f9] hover:border-[#4cd6fb]/60';
                  if (answered) {
                    if (idx === currentQ.correct) {
                      optStyle = 'bg-[#00e676]/20 border-[#00e676] text-white';
                    } else if (selectedAns === idx) {
                      optStyle = 'bg-[#ff3838]/20 border-[#ff3838] text-white';
                    } else {
                      optStyle = 'bg-[#081423] border-[#1d3557] opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={answered}
                      className={`w-full text-left p-3 rounded-lg border text-xs flex items-center justify-between transition-all ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {answered && idx === currentQ.correct && (
                        <span className="material-symbols-outlined text-[16px] text-[#00e676]">check_circle</span>
                      )}
                      {answered && selectedAns === idx && idx !== currentQ.correct && (
                        <span className="material-symbols-outlined text-[16px] text-[#ff3838]">cancel</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className="p-3 bg-[#081423] border border-[#1d3557] rounded-lg text-xs space-y-2 animate-fadeIn">
                  <span className="text-[10px] text-[#00e676] font-bold uppercase block">
                    Explicación Técnica:
                  </span>
                  <p className="text-[11px] text-[#9db4d4]">
                    {currentQ.expl}
                  </p>

                  <button
                    onClick={handleNext}
                    className="w-full h-10 bg-[#ff6b00] hover:bg-[#e65c00] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1 transition-all"
                  >
                    <span>{currentStep + 1 === questions.length ? 'FINALIZAR REFUERZO' : 'SIGUIENTE ESCENARIO'}</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Complete result */
            <div className="text-center py-4 space-y-3">
              <div className="w-14 h-14 rounded-full mx-auto p-1 bg-gradient-to-tr from-[#00e676] to-[#00d2ff] flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px] text-[#081423]">verified</span>
              </div>
              <h3 className="text-base font-extrabold text-white">
                ¡Brecha Reducida con Éxito!
              </h3>
              <p className="text-xs text-[#9db4d4]">
                Has asimilado el concepto clave de {weakness.norm}. Tu dominio en este tópico ha aumentado al <strong className="text-[#00e676]">{Math.min(100, weakness.masteryPercent + 20)}%</strong>.
              </p>
              <div className="p-2.5 bg-[#0d1e33] rounded-lg border border-[#1d3557] text-xs text-[#4cd6fb] font-semibold">
                +35 XP asignados a tu registro de inspector
              </div>
              <button
                onClick={handleCloseAll}
                className="w-full h-11 bg-[#ff6b00] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
              >
                VOLVER AL PANEL DE APRENDIZAJE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
