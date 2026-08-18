import type { Course } from "../types/landing";

export interface CourseModule {
  id: string;
  title: string;
  lessons: number;
  duration: string;
  description: string;
}

export interface CourseDetail extends Course {
  slug: string;
  description: string;
  outcomes: string[];
  modules: CourseModule[];
}

export interface DashboardCourse {
  course: Course;
  progress: number;
  nextLesson: string;
  completedLessons: number;
}

export const courseDetails: CourseDetail[] = coursesWithDetails();

function coursesWithDetails(): CourseDetail[] {
  return [
    {
      id: "data-analytics",
      slug: "data-analytics",
      title: "Data Analytics para decisiones de negocio",
      category: "Datos & Analítica",
      level: "Intermedio",
      instructor: "María Fernanda Ríos",
      durationHours: 24,
      priceUsd: 129,
      image: "/images/courses/curso-data-analytics.png",
      featured: true,
      description:
        "Convierte datos dispersos en conversaciones estratégicas, decisiones más rápidas y resultados que tu organización puede medir.",
      outcomes: [
        "Construir indicadores accionables",
        "Leer patrones de negocio",
        "Presentar insights con claridad",
      ],
      modules: [
        {
          id: "fundamentos",
          title: "Fundamentos para pensar con datos",
          lessons: 5,
          duration: "2 h 40 min",
          description: "Define preguntas que convierten información en decisiones.",
        },
        {
          id: "herramientas",
          title: "Herramientas y modelos de análisis",
          lessons: 7,
          duration: "4 h 20 min",
          description: "Trabaja con métricas, segmentos y modelos de priorización.",
        },
        {
          id: "storytelling",
          title: "Storytelling para el negocio",
          lessons: 4,
          duration: "3 h 10 min",
          description: "Presenta hallazgos para movilizar a los equipos.",
        },
      ],
    },
    {
      id: "liderazgo",
      slug: "liderazgo",
      title: "Liderazgo de equipos en entornos digitales",
      category: "Gestión & Liderazgo",
      level: "Básico",
      instructor: "Andrés Camargo",
      durationHours: 16,
      priceUsd: 99,
      image: "/images/courses/curso-liderazgo.png",
      featured: true,
      description:
        "Desarrolla un liderazgo claro, humano y adaptable para equipos que colaboran en entornos híbridos y digitales.",
      outcomes: [
        "Crear acuerdos de colaboración",
        "Dar feedback útil",
        "Acompañar el cambio con confianza",
      ],
      modules: [
        {
          id: "liderazgo-humano",
          title: "Liderazgo humano y claridad",
          lessons: 4,
          duration: "2 h 10 min",
          description: "Alinea expectativas y crea seguridad psicológica.",
        },
        {
          id: "equipos-hibridos",
          title: "Equipos híbridos que avanzan",
          lessons: 6,
          duration: "3 h 30 min",
          description: "Diseña rituales para conectar, decidir y ejecutar.",
        },
        {
          id: "conversaciones",
          title: "Conversaciones que transforman",
          lessons: 5,
          duration: "2 h 45 min",
          description: "Usa preguntas y feedback para elevar el desempeño.",
        },
      ],
    },
    {
      id: "ciberseguridad",
      slug: "ciberseguridad",
      title: "Fundamentos de Ciberseguridad empresarial",
      category: "Tecnología",
      level: "Avanzado",
      instructor: "Lucía Paredes",
      durationHours: 32,
      priceUsd: 159,
      image: "/images/courses/curso-ciberseguridad.png",
      featured: true,
      description:
        "Construye una cultura de prevención y respuesta para proteger la información crítica de tu operación.",
      outcomes: [
        "Identificar riesgos frecuentes",
        "Prevenir incidentes cotidianos",
        "Responder con protocolos claros",
      ],
      modules: [
        {
          id: "superficie",
          title: "Entender la superficie de ataque",
          lessons: 6,
          duration: "4 h 10 min",
          description: "Reconoce activos, vulnerabilidades y vectores de riesgo.",
        },
        {
          id: "prevencion",
          title: "Prevención y hábitos seguros",
          lessons: 8,
          duration: "5 h 20 min",
          description: "Aplica controles prácticos para reducir exposición.",
        },
        {
          id: "respuesta",
          title: "Respuesta y continuidad",
          lessons: 7,
          duration: "4 h 50 min",
          description: "Actúa de manera coordinada ante un incidente.",
        },
      ],
    },
    {
      id: "gestion-agil",
      slug: "gestion-agil",
      title: "Gestión ágil de proyectos",
      category: "Productividad",
      level: "Intermedio",
      instructor: "Santiago Molina",
      durationHours: 12,
      priceUsd: 89,
      image: "/images/courses/curso-gestion-agil.webp",
      featured: true,
      description:
        "Lleva tus proyectos de la idea al resultado con foco, cadencia y herramientas que el equipo puede adoptar desde el primer día.",
      outcomes: [
        "Priorizar el trabajo de mayor valor",
        "Facilitar ciclos de entrega",
        "Gestionar riesgos visibles",
      ],
      modules: [
        {
          id: "fundamentos-agiles",
          title: "Principios para entregar valor",
          lessons: 4,
          duration: "2 h 20 min",
          description: "Ordena el trabajo alrededor de resultados.",
        },
        {
          id: "planificacion",
          title: "Planificación y cadencia",
          lessons: 5,
          duration: "3 h 05 min",
          description: "Convierte objetivos en ciclos de ejecución.",
        },
        {
          id: "mejora",
          title: "Medición y mejora continua",
          lessons: 4,
          duration: "2 h 35 min",
          description: "Aprende del sistema y ajusta con evidencia.",
        },
      ],
    },
  ];
}

export const dashboardCourses: DashboardCourse[] = [
  {
    course: courseDetails[0],
    progress: 68,
    nextLesson: "Storytelling para el negocio · Lección 2",
    completedLessons: 11,
  },
  {
    course: courseDetails[1],
    progress: 34,
    nextLesson: "Equipos híbridos que avanzan · Lección 1",
    completedLessons: 4,
  },
  { course: courseDetails[3], progress: 100, nextLesson: "Curso completado", completedLessons: 13 },
];

export const adminCourseRows = courseDetails.map((course) => ({
  name: course.title,
  meta: `${course.category} · ${course.durationHours} horas · ${course.instructor}`,
  status: course.id === "ciberseguridad" ? "Borrador" : "Publicado",
  tone: course.id === "ciberseguridad" ? ("orange" as const) : ("green" as const),
}));

export const adminPostRows = [
  {
    name: "Upskilling 2026: las habilidades que tu equipo necesita",
    meta: "Tendencias · Actualizado hace 2 días",
    status: "Publicado",
    tone: "green" as const,
  },
  {
    name: "Cómo diseñar un onboarding digital que enganche",
    meta: "Experiencia de usuario · Actualizado hace 5 días",
    status: "Publicado",
    tone: "green" as const,
  },
  {
    name: "Métricas de formación que sí importan al negocio",
    meta: "Analítica · En revisión editorial",
    status: "En revisión",
    tone: "orange" as const,
  },
];

export const adminUserRows = [
  {
    name: "María González",
    meta: "maria@empresa.co · 3 cursos activos",
    status: "Activo",
    tone: "green" as const,
  },
  {
    name: "Carlos Ramírez",
    meta: "carlos@empresa.co · 1 curso activo",
    status: "Activo",
    tone: "green" as const,
  },
  {
    name: "Laura Sánchez",
    meta: "laura@empresa.co · Invitación pendiente",
    status: "Pendiente",
    tone: "orange" as const,
  },
];
