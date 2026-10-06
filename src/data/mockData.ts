import { ASSETS } from './assets';
import { InspectorProfile, Lesson, WeaknessTopic, CognitiveMetric, LogbookEntry, Badge, QuizQuestion, RoadMapStep } from '../types';

export const INITIAL_PROFILE: InspectorProfile = {
  name: "Matías Rojas C.",
  rut: "18.421.905-K",
  regNdt: "NDT-CL-8824",
  level: "INSPECTOR NIVEL I",
  specialties: ["VT", "PT"],
  status: "VIGENTE",
  workplace: "Faena Minera & Estructuras Pesadas",
  hoursPractica: 42.5,
  hoursWeekChange: 6.5,
  precision: 94.2,
  precisionStandard: "AWS D1.1 Calibrado",
  streakDays: 7,
  streakStatus: "Simulacro Diario OK",
  xp: 1420,
  nextLevelXp: 1500,
  avatarUrl: ASSETS.avatarInspector,
  phone: "+56 9 8452 3910",
  email: "m.rojas.ndt@inspeccionsoldadurachile.cl"
};

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: "les-1",
    title: "Criterios Dimensionales y Tolerancia de Socavación",
    code: "VT-MOD-01",
    norm: "AWS D1.1:2020 Cláusula 6",
    category: "Inspección Visual (VT)",
    description: "Evaluación de socavaciones continuas y acumuladas en juntas sometidas a cargas estáticas vs dinámicas con galga Cambridge.",
    status: "completada",
    progressPercent: 100,
    score: 96,
    completedMinutes: 45,
    totalMinutes: 45,
    weaknessScore: 94,
    frequencyErrorRate: "4% de error",
    keyConcepts: ["Tabla 6.1 AWS", "Límite 1.0mm", "Acumulado 50mm en 300mm", "Galga Hi-Lo"],
    summaryText: "Dominio verificado en calibración de galgas y límites de socavación para espesores t ≤ 25 mm.",
    quizPrompt: {
      question: "¿Cuál es la profundidad máxima permitida de socavación para miembros cargados estáticamente según AWS D1.1 Tabla 6.1?",
      options: ["0.5 mm en todo el cordón", "1.0 mm para cualquier longitud, permitiendo hasta 1.6 mm por 50 mm acumulados en 300 mm", "3.0 mm máximo", "Cero tolerancia"],
      correctIndex: 1,
      explanation: "AWS D1.1 Tabla 6.1 permite hasta 1.0 mm, extendible a 1.6 mm por un acumulado de 50 mm en cada tramo de 300 mm."
    }
  },
  {
    id: "les-2",
    title: "Iluminación, Acceso Óptico y Calibración de Luxómetro",
    code: "VT-MOD-02",
    norm: "ASME Sec. V Art. 9 / T-952",
    category: "Inspección Visual (VT)",
    description: "Requisitos de iluminancia mínima en probeta (1000 lux), ángulo visual no menor a 30° y distancia máxima de 600 mm.",
    status: "completada",
    progressPercent: 100,
    score: 98,
    completedMinutes: 30,
    totalMinutes: 30,
    weaknessScore: 92,
    frequencyErrorRate: "2% de error",
    keyConcepts: ["1000 Lux mínimos", "Ángulo ≥ 30°", "Distancia ≤ 600 mm (24 in)", "Linterna luz blanca"],
    summaryText: "Comprensión sólida de condiciones de visibilidad y requisitos de agudeza visual Jaeger 1.",
    quizPrompt: {
      question: "¿A qué distancia y ángulo máximo se permite realizar un examen visual directo según ASME Sec. V Art. 9?",
      options: ["Distancia ≤ 600 mm y ángulo ≥ 30°", "Distancia ≤ 1000 mm y ángulo ≥ 45°", "Distancia ≤ 300 mm sin límite de ángulo", "A cualquier distancia con lupa"],
      correctIndex: 0,
      explanation: "ASME Sec. V Art. 9 especifica una distancia máxima de 600 mm (24 in) y un ángulo de visión no menor a 30 grados respecto a la superficie."
    }
  },
  {
    id: "les-3",
    title: "Tiempos de Penetración y Secado de Solvente",
    code: "PT-MOD-01",
    norm: "ASTM E165 / ISO 3452-1",
    category: "Líquidos Penetrantes (PT)",
    description: "Determinación de Dwell Time según temperatura y viscosidad, prevención de sobre-lavado y tiempo de secado de revelador.",
    status: "requiere_refuerzo",
    progressPercent: 65,
    score: 68,
    completedMinutes: 35,
    totalMinutes: 50,
    weaknessScore: 62,
    frequencyErrorRate: "32% de error",
    keyConcepts: ["Dwell Time 10-20 min", "Temperatura 10°C-52°C", "Sobre-lavado crítico", "Revelador en suspensión"],
    summaryText: "Se identificaron confusiones recurrentes en tiempos mínimos de escurrido de solvente y aplicación excesiva de paño abrasivo.",
    quizPrompt: {
      question: "¿Qué consecuencia produce aplicar el solvente removedor directamente en spray sobre la soldadura con penetrante?",
      options: ["Acelera el revelado", "Lava el penetrante atrapado dentro de las fisuras superficiales produciendo falsos negativos", "Aumenta la sensibilidad capilar", "No tiene ningún efecto adverso"],
      correctIndex: 1,
      explanation: "El rociado directo de solvente extrae el penetrante de las discontinuidades, invalidando el ensayo y provocando falsos negativos críticos."
    }
  },
  {
    id: "les-4",
    title: "Magnetización con Yugo Portátil y Capacidad de Sustentación",
    code: "MT-MOD-01",
    norm: "ASME Sec. V Art. 7 / ASTM E709",
    category: "Partículas Magnéticas (MT)",
    description: "Cálculo de campo magnético tangencial, prueba de levantamiento de 4.5 kg (AC) vs 18 kg (DC), y orientación de discontinuidades.",
    status: "requiere_refuerzo",
    progressPercent: 40,
    score: 54,
    completedMinutes: 20,
    totalMinutes: 60,
    weaknessScore: 48,
    frequencyErrorRate: "46% de error",
    keyConcepts: ["Levantamiento AC 4.5 kg (10 lb)", "Levantamiento DC 18 kg (40 lb)", "Galga de Torta / Berthold", "Campo Tangencial"],
    summaryText: "Área de debilidad primaria: cálculo de separación entre polos y selección de corriente AC para defectos superficiales.",
    quizPrompt: {
      question: "¿Por qué se prefiere corriente alterna (AC) sobre continua (DC) para detectar fisuras superficiales por fatiga?",
      options: ["Porque la corriente AC penetra hasta el fondo del cordón", "Por el 'efecto piel' que concentra el flujo magnético en la superficie de la pieza", "Porque la corriente AC consume menos energía", "Porque no produce chispas"],
      correctIndex: 1,
      explanation: "El efecto piel (skin effect) en AC concentra las líneas de flujo magnético en la superficie externa, maximizando el campo de fuga en fisuras muy finas."
    }
  },
  {
    id: "les-5",
    title: "Clasificación de Porosidad vs Inclusiones de Escoria",
    code: "MET-MOD-02",
    norm: "ISO 6520-1 / AWS D1.1",
    category: "Metalurgia & Discontinuidades",
    description: "Morfología de discontinuidades redondeadas vs alargadas, densidad admisible por pulgada lineal y causas en procesos SMAW.",
    status: "en_progreso",
    progressPercent: 75,
    score: 82,
    completedMinutes: 40,
    totalMinutes: 50,
    weaknessScore: 78,
    frequencyErrorRate: "18% de error",
    keyConcepts: ["Porosidad aislada vs agrupada", "Inclusión de escoria lineal", "Túnel de escoria", "Aporte térmico"],
    summaryText: "Buen avance en morfología. Reforzar el cálculo de dispersión acumulada de poros en soldaduras de penetración completa.",
    quizPrompt: {
      question: "¿Cuál es la causa metalúrgica principal de la porosidad vermicular (wormhole porosity) en procesos SMAW?",
      options: ["Uso de electrodos básicos sobrecalentados", "Contaminación grave por humedad o gas atrapado que escapa rápidamente durante la solidificación", "Exceso de velocidad de avance únicamente", "Ángulo de bisel muy abierto"],
      correctIndex: 1,
      explanation: "La porosidad vermicular se produce por emanación severa de gases atrapados en el baño de fusión debido a humedad en el fundente o grasa en el bisel."
    }
  },
  {
    id: "les-6",
    title: "Elaboración de Informes NDT y Trazabilidad de No Conformidades",
    code: "QA-MOD-01",
    norm: "ASNT SNT-TC-1A / ISO 9712",
    category: "Aseguramiento de Calidad (QA/QC)",
    description: "Estructura legal de un reporte de inspección: croquis de ubicación, referencia de estacas, firma de validador y dictamen final.",
    status: "por_iniciar",
    progressPercent: 10,
    score: 0,
    completedMinutes: 5,
    totalMinutes: 40,
    weaknessScore: 70,
    keyConcepts: ["Dictamen Conforme / No Conforme", "Croquis dimensional", "Trazabilidad de electrodo", "Firma Nivel II"],
    summaryText: "Unidad introductoria para habilitar el reporte formal ante superintendencia de obras mineras.",
    quizPrompt: {
      question: "¿Qué elemento es mandatorio en un informe de ensayo no destructivo según SNT-TC-1A?",
      options: ["Solo la firma del soldador", "Identificación única de la probeta/junta, procedimiento aplicado, resultados y firma del inspector calificado", "El costo de la reparación", "El certificado de nacimiento del inspector"],
      correctIndex: 1,
      explanation: "El informe debe contener identificación de la junta, norma aplicable, técnica, aceptación/rechazo y firma del inspector acreditado."
    }
  }
];

export const INITIAL_WEAKNESSES: WeaknessTopic[] = [
  {
    id: "weak-1",
    topic: "Fuerza de Sustentación y Verificación de Yugo Magnético AC/DC",
    norm: "ASME Sec. V Art. 7",
    masteryPercent: 48,
    severity: "critica",
    errorCount: 6,
    diagnosticNote: "Confusión reiterada entre el requisito de 4.5 kg para AC y 18 kg para DC a la separación máxima de polos. Dificultad para asociar el efecto piel.",
    recommendation: "Realizar el simulador interactivo de Yugo en el Taller y repasar la regla de levantamiento con placa de peso calibrada.",
    actionText: "Reforzar Yugo Magnético (+35 XP)"
  },
  {
    id: "weak-2",
    topic: "Control de Tiempo de Escurrido y Secado en Líquidos Penetrantes",
    norm: "ASTM E165 / ISO 3452",
    masteryPercent: 62,
    severity: "moderada",
    errorCount: 4,
    diagnosticNote: "Tendencia a apresurar el tiempo de emulsificación y secado previo al revelador en ambientes con temperatura inferior a 10°C.",
    recommendation: "Completar los 5 pasos del simulador PT prestando atención al cronómetro de dwell time y prevención de sobrelavado.",
    actionText: "Practicar Ensayo PT (+25 XP)"
  },
  {
    id: "weak-3",
    topic: "Cálculo de Porosidad Acumulada en Miembros Cíclicos",
    norm: "AWS D1.1 Cláusula 6",
    masteryPercent: 74,
    severity: "moderada",
    errorCount: 3,
    diagnosticNote: "Omisión de la distancia mínima entre poros adyacentes para considerarlos discontinuidad agrupada o alineada.",
    recommendation: "Revisar la ficha técnica de la Tabla 6.1 y la regla de 1 pulgada lineal de espaciamiento.",
    actionText: "Repasar Criterios AWS (+20 XP)"
  },
  {
    id: "weak-4",
    topic: "Medición con Galga Cambridge de Socavación (Undercut)",
    norm: "AWS D1.1 / ASME Art. 9",
    masteryPercent: 94,
    severity: "optima",
    errorCount: 1,
    diagnosticNote: "Excelente calibración motriz. Cero errores en lecturas dimensionales inferiores a 1.0 mm.",
    recommendation: "Mantener la calibración periódica semanal en probetas de terreno.",
    actionText: "Ver Detalle de Maestría"
  }
];

export const COGNITIVE_METRICS: CognitiveMetric[] = [
  {
    title: "Velocidad de Diagnóstico",
    value: "1m 14s",
    subtext: "por probeta inspeccionada",
    status: "optimo",
    trend: "-18s vs mes anterior (Más ágil)"
  },
  {
    title: "Tasa de Falsos Rechazos",
    value: "4.8%",
    subtext: "sobre-evaluación conservadora",
    status: "estable",
    trend: "Dentro del rango óptimo (<5%)"
  },
  {
    title: "Retención Normativa (14d)",
    value: "86.4%",
    subtext: "memoria de fórmulas y tablas",
    status: "optimo",
    trend: "+6.2% gracias al simulador diario"
  },
  {
    title: "Consistencia de Criterio",
    value: "91.8%",
    subtext: "coincidencia con Nivel III",
    status: "optimo",
    trend: "Apto para postular a Nivel II"
  }
];

export const INITIAL_LOGBOOK: LogbookEntry[] = [
  {
    id: "log-1",
    date: "04 Octubre 2026",
    company: "Minera Centinela",
    facility: "Planta Concentradora · Módulo B",
    component: "Celda de Flotación #4",
    method: "VT",
    technique: "VT Cordón 3G SMAW · Galga Cambridge",
    hours: 8.5,
    supervisor: "Carlos Valenzuela - Inspector Nivel II Reg #401",
    status: "FIRMADO",
    avatarUrl: ASSETS.faenaCentinela,
    weldingProcess: "SMAW E7018",
    discontinuitiesFound: "Socavación leve 0.4mm en corona (Aceptable bajo AWS D1.1)"
  },
  {
    id: "log-2",
    date: "02 Octubre 2026",
    company: "Astillero Asmar",
    facility: "Dique Seco Talcahuano",
    component: "Mamparo Estanco B-12",
    method: "PT",
    technique: "PT Tipo II Método C · Solvente Removible",
    hours: 6.0,
    supervisor: "Jorge Silva - Supervisor END ASMAR",
    status: "FIRMADO",
    avatarUrl: ASSETS.faenaAsmar,
    weldingProcess: "FCAW E71T-1",
    discontinuitiesFound: "Sin indicaciones relevantes tras tiempo de revelado 15 min"
  },
  {
    id: "log-3",
    date: "28 Septiembre 2026",
    company: "Minera Escondida BHP",
    facility: "Chancador Primario",
    component: "Viga Cajón Espesador #2",
    method: "VT",
    technique: "Inspección dimensional y alineamiento Hi-Lo",
    hours: 7.5,
    supervisor: "Mauricio Lagos - Auditor QA/QC",
    status: "FIRMADO",
    avatarUrl: ASSETS.faenaCentinela,
    weldingProcess: "SAW Arco Sumergido",
    discontinuitiesFound: "Sobremonta 2.1mm dentro de tolerancia máxima 3.0mm"
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: "badge-1",
    title: "Ojo de Halcón",
    description: "100% de aciertos en defectos de socavación y fisuras en simulaciones prácticas.",
    requirement: "Aprobar 10 simulaciones consecutivas sin falsos negativos.",
    unlocked: true,
    unlockedDate: "20 Sep 2026",
    iconUrl: ASSETS.badgeHalcon
  },
  {
    id: "badge-2",
    title: "Norma al Día",
    description: "15 simulacros AWS D1.1 aprobados consecutivamente con puntaje >90%.",
    requirement: "Resolver banco de preguntas AWS D1.1 Cláusula 6.",
    unlocked: true,
    unlockedDate: "25 Sep 2026",
    iconUrl: ASSETS.badgeNorma
  },
  {
    id: "badge-3",
    title: "Luz Negra UV",
    description: "Calibración de irradiancia >1000 µW/cm² en fluorescencia según ASTM E1417.",
    requirement: "Completar protocolo de inspección de luz UV en cámara oscura.",
    unlocked: true,
    unlockedDate: "30 Sep 2026",
    iconUrl: ASSETS.badgeLuzNegra
  },
  {
    id: "badge-4",
    title: "Faena Extrema",
    description: "+50 horas registradas en faenas de altura geográfica >3.000 msnm.",
    requirement: "Validar horas en Centinela, Collahuasi o El Teniente.",
    unlocked: true,
    unlockedDate: "03 Oct 2026",
    iconUrl: ASSETS.badgeFaena
  },
  {
    id: "badge-5",
    title: "Calibre de Oro",
    description: "Precisión milimétrica inferior a ±0.1 mm con Galga Cambridge y Bridge Cam.",
    requirement: "Medir 20 discontinuidades críticas con error nulo.",
    unlocked: false,
    iconUrl: ASSETS.badgeHalcon
  },
  {
    id: "badge-6",
    title: "Maestro del Yugo",
    description: "Prueba de levantamiento de 4.5 kg (10 lb) en AC completada satisfactoriamente.",
    requirement: "Ensayo práctico de fuerza de sustentación de yugo electromagnético.",
    unlocked: false,
    iconUrl: ASSETS.badgeNorma
  },
  {
    id: "badge-7",
    title: "Guardián de Bitácora",
    description: "Alcanzar 400 horas acreditadas ante supervisor para calificar a Nivel II.",
    requirement: "Completar las 400 horas requeridas por SNT-TC-1A.",
    unlocked: false,
    iconUrl: ASSETS.badgeFaena
  },
  {
    id: "badge-8",
    title: "Inspector AWS CWI",
    description: "Certificación integral de inspector de soldaduras reconocido internacionalmente.",
    requirement: "Aprobar examen oficial AWS de tres partes (A, B, C).",
    unlocked: false,
    iconUrl: ASSETS.badgeLuzNegra
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    norm: "AWS D1.1 / Cláusula 6 (Criterios VT)",
    question: "¿Cuál es la profundidad máxima permitida de socavación (undercut) en miembros cargados estáticamente para espesores iguales o menores a 25 mm?",
    options: [
      "1.0 mm (1/32 in) en cualquier longitud acumulada",
      "No se permite socavación en ninguna circunstancia",
      "Hasta 1.6 mm (1/16 in) para una longitud máxima acumulada de 50 mm en cualquier tramo de 300 mm",
      "2.5 mm si el cordón tiene más de 3 pases"
    ],
    correctIndex: 2,
    explanation: "Según la Tabla 6.1 de AWS D1.1, para miembros cargados estáticamente, la socavación no debe exceder 1.0 mm, excepto que se permite hasta 1.6 mm por un acumulado de 50 mm en 300 mm de cordón."
  },
  {
    id: 2,
    norm: "ASTM E165 (Líquidos Penetrantes)",
    question: "¿Cuál es el tiempo de penetración (dwell time) mínimo recomendado para cordones de soldadura en acero al carbono a temperatura ambiente?",
    options: [
      "1 a 2 minutos",
      "5 a 10 minutos (según Tabla 1 de ASTM E165)",
      "30 a 60 minutos obligatorios",
      "El penetrante actúa instantáneamente al secar"
    ],
    correctIndex: 1,
    explanation: "ASTM E165 especifica típicamente de 5 a 10 minutos para discontinuidades como socavaciones, faltas de fusión o fisuras en soldaduras de acero al carbono a 10°C - 52°C."
  },
  {
    id: 3,
    norm: "ASME Sec. V Art. 7 (Partículas Magnéticas)",
    question: "¿Cuál es la fuerza de sustentación (lifting power) mínima requerida para un yugo electromagnético en corriente alterna (AC)?",
    options: [
      "2.3 kg (5 lb) al espaciamiento máximo de polos",
      "4.5 kg (10 lb) al espaciamiento máximo entre polos",
      "18.1 kg (40 lb) exclusivamente",
      "No requiere verificación de peso, solo galga de torta"
    ],
    correctIndex: 1,
    explanation: "ASME Sección V, Artículo 7 exige que un yugo de corriente alterna (AC) sea capaz de levantar una placa patrón de acero de 4.5 kg (10 libras) a la distancia máxima de uso."
  },
  {
    id: 4,
    norm: "ASME Sec. V Art. 9 (Inspección Visual)",
    question: "¿Cuál es el nivel mínimo de iluminación requerido en la superficie de inspección para un examen visual directo?",
    options: [
      "100 lux (10 foot-candles)",
      "500 lux (50 foot-candles)",
      "1000 lux (100 foot-candles)",
      "10.000 lux con proyector de cuarzo"
    ],
    correctIndex: 2,
    explanation: "ASME Sección V Artículo 9 (T-952) exige un mínimo de 1000 lux (100 fc) sobre la superficie a inspeccionar para examen visual directo o remoto."
  },
  {
    id: 5,
    norm: "ASNT SNT-TC-1A",
    question: "En la práctica recomendada SNT-TC-1A, ¿quién es el responsable final de la certificación del personal de ensayos no destructivos?",
    options: [
      "La ASNT directamente desde Estados Unidos",
      "El empleador / empresa contratante basada en su procedimiento escrito",
      "El inspector más antiguo de la faena",
      "El fabricante de los electrodos"
    ],
    correctIndex: 1,
    explanation: "Bajo la norma SNT-TC-1A, la certificación de personal END es responsabilidad del empleador mediante su 'Written Practice', avalada por un Nivel III."
  }
];

export const ROADMAP_STEPS: RoadMapStep[] = [
  {
    id: "step-1",
    level: "Nivel I Trainee",
    title: "Fundamentos Metalúrgicos y Seguridad en Soldadura",
    normRequirement: "Capacitación inicial 20 hrs",
    status: "completado",
    hoursRequired: 20,
    hoursCompleted: 20,
    modulesCount: 4,
    examType: "Examen Teórico General (100% OK)"
  },
  {
    id: "step-2",
    level: "Inspector Nivel I (Calificado)",
    title: "VT & PT Directo en Terreno",
    normRequirement: "SNT-TC-1A: 40 hrs VT + 24 hrs PT + 70 hrs Faena",
    status: "actual",
    hoursRequired: 70,
    hoursCompleted: 70,
    modulesCount: 6,
    examType: "Práctico sobre probetas con defectos reales"
  },
  {
    id: "step-3",
    level: "Inspector Nivel II (En Curso)",
    title: "Interpretación Normativa y Métodos Volumétricos MT/UT",
    normRequirement: "400 hrs registradas ante Supervisor + MT/UT",
    status: "actual",
    hoursRequired: 400,
    hoursCompleted: 240,
    modulesCount: 8,
    examType: "Específico AWS D1.1 + Redacción de Reportes Técnicos"
  },
  {
    id: "step-4",
    level: "Inspector Senior Nivel III / AWS CWI",
    title: "Auditoría de Procedimientos WPS / PQR y Calificación de Soldadores",
    normRequirement: "Experiencia verificable 5 años + Examen CWI",
    status: "bloqueado",
    hoursRequired: 2000,
    hoursCompleted: 240,
    modulesCount: 12,
    examType: "Certificación Internacional AWS / ASNT Level III"
  }
];
