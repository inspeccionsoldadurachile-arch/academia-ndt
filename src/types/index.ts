export type ScreenTab = 'ruta' | 'aprender' | 'taller' | 'avance';

export type CertificateStatus = 'aprobado' | 'en_curso' | 'por_iniciar';

export interface Certificate {
  id: string;
  title: string;
  code: string;
  norm: string;
  reg: string;
  description: string;
  hours: string;
  validity?: string;
  status: CertificateStatus;
  score?: string;
  progressPercent?: number;
  totalLessons?: number;
  completedLessons?: number;
  nextMilestone?: string;
  iconUrl: string;
  issueDate?: string;
  expiryDate?: string;
  signedBy?: string;
}

export interface InspectorProfile {
  name: string;
  rut: string;
  regNdt: string;
  level: string;
  specialties: string[];
  status: 'VIGENTE' | 'POR_RENOVAR';
  workplace: string;
  hoursPractica: number;
  hoursWeekChange: number;
  precision: number;
  precisionStandard: string;
  streakDays: number;
  streakStatus: string;
  xp: number;
  nextLevelXp: number;
  avatarUrl: string;
  phone?: string;
  email?: string;
}

export type LessonStatus = 'completada' | 'en_progreso' | 'por_iniciar' | 'requiere_refuerzo';

export interface Lesson {
  id: string;
  title: string;
  code: string;
  norm: string;
  category: string;
  description: string;
  status: LessonStatus;
  progressPercent: number;
  score?: number;
  completedMinutes: number;
  totalMinutes: number;
  keyConcepts: string[];
  weaknessScore: number; // 0-100 (lower means weaker)
  frequencyErrorRate?: string;
  summaryText: string;
  quizPrompt?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface WeaknessTopic {
  id: string;
  topic: string;
  norm: string;
  masteryPercent: number;
  severity: 'critica' | 'moderada' | 'optima';
  errorCount: number;
  diagnosticNote: string;
  recommendation: string;
  actionText: string;
}

export interface CognitiveMetric {
  title: string;
  value: string;
  subtext: string;
  status: 'alerta' | 'estable' | 'optimo';
  trend: string;
}

export interface LogbookEntry {
  id: string;
  date: string;
  company: string;
  facility: string;
  component: string;
  method: 'VT' | 'PT' | 'MT' | 'UT' | 'RT';
  technique: string;
  hours: number;
  supervisor: string;
  status: 'FIRMADO' | 'PENDIENTE';
  avatarUrl: string;
  weldingProcess?: string;
  discontinuitiesFound?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  requirement: string;
  unlocked: boolean;
  unlockedDate?: string;
  iconUrl: string;
}

export interface QuizQuestion {
  id: number;
  norm: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface RoadMapStep {
  id: string;
  level: string;
  title: string;
  normRequirement: string;
  status: 'completado' | 'actual' | 'bloqueado';
  hoursRequired: number;
  hoursCompleted: number;
  modulesCount: number;
  examType: string;
}
