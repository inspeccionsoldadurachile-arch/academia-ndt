import React, { useState } from 'react';
import { Lesson } from '../../types';

interface LessonDetailModalProps {
  lesson: Lesson | null;
  isOpen: boolean;
  onClose: () => void;
  onCompleteQuiz: (lessonId: string, passed: boolean) => void;
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  lesson,
  isOpen,
  onClose,
  onCompleteQuiz
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  if (!isOpen || !lesson) return null;

  const quiz = lesson.quizPrompt;

  const handleSelectOption = (idx: number) => {
    if (answered || !quiz) return;
    setSelectedOption(idx);
    setAnswered(true);
    const isCorrect = idx === quiz.correctIndex;
    onCompleteQuiz(lesson.id, isCorrect);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setAnswered(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-gradient-to-b from-[#112238] to-[#081423] border border-[#1d3557] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 bg-[#0d1e33] border-b border-[#1d3557] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff6b00] text-[20px]">menu_book</span>
            <div>
              <span className="text-[10px] text-[#4cd6fb] uppercase font-bold tracking-wider block">
                {lesson.code} · {lesson.norm}
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-tight truncate max-w-[280px] block">
                {lesson.title}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#112238] hover:bg-[#1d3557] text-[#9db4d4] hover:text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* Status & Timing Bar */}
          <div className="grid grid-cols-3 gap-2 text-xs bg-[#0b1a2e] border border-[#1d3557] p-3 rounded-xl">
            <div>
              <span className="text-[9px] text-[#9db4d4] uppercase block">Estado</span>
              <span className={`text-[11px] font-bold uppercase ${
                lesson.status === 'completada' ? 'text-[#00e676]' :
                lesson.status === 'requiere_refuerzo' ? 'text-[#ff6b00]' : 'text-[#4cd6fb]'
              }`}>
                {lesson.status.replace('_', ' ')}
              </span>
            </div>
            <div>
              <span className="text-[9px] text-[#9db4d4] uppercase block">Tiempo Lectivo</span>
              <span className="text-white font-semibold tabular-nums">
                {lesson.completedMinutes} / {lesson.totalMinutes} min
              </span>
            </div>
            <div>
              <span className="text-[9px] text-[#9db4d4] uppercase block">Dominio Evaluado</span>
              <span className="text-[#4cd6fb] font-bold tabular-nums">
                {lesson.weaknessScore}%
              </span>
            </div>
          </div>

          {/* Description & Summary */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Objetivo &amp; Alcance Normativo
            </h4>
            <p className="text-xs text-[#d7e3f9] leading-relaxed">
              {lesson.description}
            </p>
            <div className="p-3 bg-[#0d1e33] border border-[#1d3557] rounded-lg text-xs space-y-1">
              <span className="text-[10px] text-[#ff6b00] font-bold uppercase block">
                Diagnóstico del Instructor / Frecuencia de Error:
              </span>
              <p className="text-[11px] text-[#9db4d4]">
                {lesson.summaryText}
              </p>
            </div>
          </div>

          {/* Key Concepts */}
          <div>
            <span className="text-[10px] text-[#9db4d4] uppercase font-bold tracking-wider block mb-1.5">
              Conceptos y Criterios Mandatorios
            </span>
            <div className="flex flex-wrap gap-1.5">
              {lesson.keyConcepts.map((concept, idx) => (
                <span 
                  key={idx} 
                  className="px-2 py-1 bg-[#081423] border border-[#1d3557] text-[#4cd6fb] text-[10px] font-semibold rounded"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Checkpoint Quiz */}
          {quiz && (
            <div className="bg-[#0b1a2e] border border-[#ff6b00]/40 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-[#1d3557] pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#ff6b00]">quiz</span>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Test de Refuerzo Calibrado
                  </span>
                </div>
                {answered && (
                  <button 
                    onClick={handleReset}
                    className="text-[10px] text-[#4cd6fb] hover:underline"
                  >
                    Reintentar
                  </button>
                )}
              </div>

              <p className="text-xs font-semibold text-white">
                {quiz.question}
              </p>

              <div className="space-y-1.5">
                {quiz.options.map((option, idx) => {
                  let optClass = 'bg-[#081423] border-[#1d3557] text-[#d7e3f9] hover:border-[#4cd6fb]/60';
                  if (answered) {
                    if (idx === quiz.correctIndex) {
                      optClass = 'bg-[#00e676]/20 border-[#00e676] text-white';
                    } else if (selectedOption === idx) {
                      optClass = 'bg-[#ff3838]/20 border-[#ff3838] text-white';
                    } else {
                      optClass = 'bg-[#081423] border-[#1d3557] opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={answered}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${optClass}`}
                    >
                      <span>{option}</span>
                      {answered && idx === quiz.correctIndex && (
                        <span className="material-symbols-outlined text-[16px] text-[#00e676]">check_circle</span>
                      )}
                      {answered && selectedOption === idx && idx !== quiz.correctIndex && (
                        <span className="material-symbols-outlined text-[16px] text-[#ff3838]">cancel</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className="p-2.5 bg-[#081423] border border-[#1d3557] rounded text-xs space-y-1">
                  <span className="text-[10px] text-[#00e676] font-bold uppercase block">
                    Fundamento Oficial:
                  </span>
                  <p className="text-[11px] text-[#9db4d4]">
                    {quiz.explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="p-3 bg-[#0d1e33] border-t border-[#1d3557] shrink-0">
          <button
            onClick={onClose}
            className="w-full h-11 bg-[#112238] hover:bg-[#1d3557] border border-[#1d3557] text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-all"
          >
            Cerrar Lección
          </button>
        </div>
      </div>
    </div>
  );
};
