import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LearningProgressScreen } from './components/screens/LearningProgressScreen';
import { TallerScreen } from './components/screens/TallerScreen';
import { AprenderScreen } from './components/screens/AprenderScreen';
import { RutaScreen } from './components/screens/RutaScreen';
import { QrCredentialModal } from './components/modals/QrCredentialModal';
import { SafetyPassModal } from './components/modals/SafetyPassModal';
import { LogbookModal } from './components/modals/LogbookModal';
import { LessonDetailModal } from './components/modals/LessonDetailModal';
import { WeaknessTrainingModal } from './components/modals/WeaknessTrainingModal';
import { BadgeDetailModal } from './components/modals/BadgeDetailModal';
import { EditProfileModal } from './components/modals/EditProfileModal';
import {
  INITIAL_PROFILE,
  INITIAL_LESSONS,
  INITIAL_WEAKNESSES,
  COGNITIVE_METRICS,
  INITIAL_LOGBOOK,
  INITIAL_BADGES
} from './data/mockData';
import { ScreenTab, Lesson, WeaknessTopic, Badge, LogbookEntry, InspectorProfile } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ScreenTab>('avance');
  const [profile, setProfile] = useState<InspectorProfile>(INITIAL_PROFILE);
  const [lessons, setLessons] = useState<Lesson[]>(INITIAL_LESSONS);
  const [weaknesses, setWeaknesses] = useState<WeaknessTopic[]>(INITIAL_WEAKNESSES);
  const [cognitiveMetrics, setCognitiveMetrics] = useState(COGNITIVE_METRICS);
  const [logbook, setLogbook] = useState<LogbookEntry[]>(INITIAL_LOGBOOK);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);

  // Modals state
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isSafetyPassModalOpen, setIsSafetyPassModalOpen] = useState(false);
  const [isLogbookModalOpen, setIsLogbookModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedWeakness, setSelectedWeakness] = useState<WeaknessTopic | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // Toast notification for user actions & XP
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleEarnXp = (amount: number, reason: string) => {
    setProfile((prev) => ({
      ...prev,
      xp: prev.xp + amount
    }));
    showToast(`+${amount} XP: ${reason}`);
  };

  const handleCompleteLessonQuiz = (lessonId: string, passed: boolean) => {
    setLessons((prev) =>
      prev.map((l) => {
        if (l.id === lessonId) {
          const newScore = passed ? Math.min(100, (l.score || 70) + 15) : l.score;
          const newWeaknessScore = passed ? Math.min(100, l.weaknessScore + 18) : l.weaknessScore;
          return {
            ...l,
            score: newScore,
            weaknessScore: newWeaknessScore,
            status: newWeaknessScore >= 80 ? 'completada' : l.status,
            progressPercent: passed ? 100 : l.progressPercent
          };
        }
        return l;
      })
    );

    if (passed) {
      handleEarnXp(30, 'Test de refuerzo superado exitosamente');
    } else {
      showToast('Respuesta incorrecta. Revisa el fundamento técnico.');
    }
  };

  const handleBoostWeaknessMastery = (weaknessId: string) => {
    setWeaknesses((prev) =>
      prev.map((w) => {
        if (w.id === weaknessId) {
          const newMastery = Math.min(100, w.masteryPercent + 22);
          return {
            ...w,
            masteryPercent: newMastery,
            severity: newMastery >= 75 ? 'optima' : 'moderada',
            errorCount: Math.max(0, w.errorCount - 2)
          };
        }
        return w;
      })
    );

    // Also update corresponding lesson
    setLessons((prev) =>
      prev.map((l) => {
        if (weaknessId === 'weak-1' && l.code.includes('MT')) {
          return { ...l, weaknessScore: Math.min(100, l.weaknessScore + 20), status: 'en_progreso' };
        }
        if (weaknessId === 'weak-2' && l.code.includes('PT')) {
          return { ...l, weaknessScore: Math.min(100, l.weaknessScore + 20), status: 'en_progreso' };
        }
        return l;
      })
    );

    handleEarnXp(35, 'Brecha crítica reducida mediante entrenamiento focalizado');
  };

  const handleAddLogbookEntry = (newEntry: Omit<LogbookEntry, 'id'>) => {
    const entry: LogbookEntry = {
      ...newEntry,
      id: `log-${Date.now()}`
    };
    setLogbook([entry, ...logbook]);
    setProfile((prev) => ({
      ...prev,
      hoursPractica: Math.round((prev.hoursPractica + newEntry.hours) * 10) / 10,
      hoursWeekChange: Math.round((prev.hoursWeekChange + newEntry.hours) * 10) / 10,
      xp: prev.xp + Math.round(newEntry.hours * 10)
    }));
    showToast(`Jornada registrada: +${newEntry.hours} hrs añadidas a tu récord`);
  };

  const handleUpdateProfile = (updated: Partial<InspectorProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updated
    }));
    showToast('Perfil de inspector actualizado correctamente');
  };

  const totalLogHours = logbook.reduce((sum, item) => sum + item.hours, 0);

  return (
    <div className="bg-[#081423] text-[#d7e3f9] font-['Montserrat',sans-serif] min-h-screen flex flex-col selection:bg-[#ff6b00] selection:text-white">
      {/* Top Header */}
      <Header
        profile={profile}
        onOpenProfile={() => setIsEditProfileModalOpen(true)}
        onOpenStreakInfo={() => showToast(`Racha activa: ${profile.streakDays} días consecutivos de simulacro!`)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-[76px] pb-24 bg-[#081423] min-h-screen">
        {currentTab === 'avance' && (
          <LearningProgressScreen
            profile={profile}
            lessons={lessons}
            weaknesses={weaknesses}
            cognitiveMetrics={cognitiveMetrics}
            logbook={logbook}
            badges={badges}
            onOpenQr={() => setIsQrModalOpen(true)}
            onOpenSafetyPass={() => setIsSafetyPassModalOpen(true)}
            onOpenLogbook={() => setIsLogbookModalOpen(true)}
            onOpenEditProfile={() => setIsEditProfileModalOpen(true)}
            onSelectLesson={(lesson) => setSelectedLesson(lesson)}
            onTrainWeakness={(weakness) => setSelectedWeakness(weakness)}
            onSelectBadge={(badge) => setSelectedBadge(badge)}
          />
        )}

        {currentTab === 'taller' && (
          <TallerScreen onEarnXp={handleEarnXp} />
        )}

        {currentTab === 'aprender' && (
          <AprenderScreen onEarnXp={handleEarnXp} />
        )}

        {currentTab === 'ruta' && (
          <RutaScreen profile={profile} totalLogHours={totalLogHours} />
        )}
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modals */}
      <QrCredentialModal
        profile={profile}
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
      />

      <SafetyPassModal
        profile={profile}
        isOpen={isSafetyPassModalOpen}
        onClose={() => setIsSafetyPassModalOpen(false)}
      />

      <LogbookModal
        entries={logbook}
        totalHours={totalLogHours}
        isOpen={isLogbookModalOpen}
        onClose={() => setIsLogbookModalOpen(false)}
        onAddEntry={handleAddLogbookEntry}
      />

      <LessonDetailModal
        lesson={selectedLesson}
        isOpen={!!selectedLesson}
        onClose={() => setSelectedLesson(null)}
        onCompleteQuiz={handleCompleteLessonQuiz}
      />

      <WeaknessTrainingModal
        weakness={selectedWeakness}
        isOpen={!!selectedWeakness}
        onClose={() => setSelectedWeakness(null)}
        onBoostMastery={handleBoostWeaknessMastery}
      />

      <BadgeDetailModal
        badge={selectedBadge}
        isOpen={!!selectedBadge}
        onClose={() => setSelectedBadge(null)}
      />

      <EditProfileModal
        profile={profile}
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        onSave={handleUpdateProfile}
      />

      {/* Floating Industrial Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%] px-4 py-2.5 bg-[#0d1e33] border border-[#ff6b00] rounded-lg shadow-[0_4px_20px_rgba(255,107,0,0.35)] flex items-center gap-2.5 text-xs text-white animate-bounce">
          <span className="material-symbols-outlined text-[18px] text-[#ff6b00]">notifications_active</span>
          <span className="font-semibold text-[11px] flex-1">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-[#9db4d4] hover:text-white"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
