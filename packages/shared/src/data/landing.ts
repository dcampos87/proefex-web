import type { BlogPost, Course, Service } from "../types/landing";

export const navLinks = [
  { label: "Servicios", href: "/servicios" },
  { label: "Cursos", href: "/cursos" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const heroCopy = {
  eyebrow: "Plataforma corporativa de aprendizaje",
  title: ["Impulsa el talento", "de tu organización"],
  subtitle:
    "PROEFEX unifica cursos online, contenido de marca y analítica de progreso en una sola experiencia fluida, elegante y fácil de usar.",
  primaryCta: "Explorar cursos",
  secondaryCta: "Solicitar demo",
} as const;

export const services: Service[] = [
  {
    id: "lms",
    icon: "lms",
    title: "LMS Corporativo",
    description:
      "Cursos con reproductor propio, tracking de progreso por heartbeats y retoma exacta donde el estudiante se quedó.",
  },
  {
    id: "cms",
    icon: "cms",
    title: "CMS de Contenido",
    description:
      "Publica artículos, servicios y páginas de marca con flujo editorial controlado y cacheo inteligente en CDN.",
  },
  {
    id: "consultoria",
    icon: "consultoria",
    title: "Consultoría de Aprendizaje",
    description:
      "Diseñamos rutas de formación a medida, medimos resultados y escalamos la cultura de aprendizaje en tu empresa.",
  },
];

export const courses: Course[] = [
  {
    id: "data-analytics",
    title: "Data Analytics para decisiones de negocio",
    category: "Datos & Analítica",
    level: "Intermedio",
    instructor: "María Fernanda Ríos",
    durationHours: 24,
    priceUsd: 129,
    image: "/images/courses/curso-data-analytics.png",
    featured: true,
  },
  {
    id: "liderazgo",
    title: "Liderazgo de equipos en entornos digitales",
    category: "Gestión & Liderazgo",
    level: "Básico",
    instructor: "Andrés Camargo",
    durationHours: 16,
    priceUsd: 99,
    image: "/images/courses/curso-liderazgo.png",
    featured: true,
  },
  {
    id: "ciberseguridad",
    title: "Fundamentos de Ciberseguridad empresarial",
    category: "Tecnología",
    level: "Avanzado",
    instructor: "Lucía Paredes",
    durationHours: 32,
    priceUsd: 159,
    image: "/images/courses/curso-ciberseguridad.png",
    featured: true,
  },
  {
    id: "gestion-agil",
    title: "Gestión ágil de proyectos",
    category: "Productividad",
    level: "Intermedio",
    instructor: "Santiago Molina",
    durationHours: 12,
    priceUsd: 89,
    image: "/images/courses/curso-gestion-agil.webp",
    featured: true,
  },
];

export const posts: BlogPost[] = [
  {
    id: "upskilling-2026",
    title: "Upskilling 2026: las habilidades que tu equipo necesita",
    excerpt:
      "El panorama del talento cambió. Estas son las competencias que separarán a las organizaciones que crecen de las que se estancan.",
    category: "Tendencias",
    readingMinutes: 6,
    publishDate: "12 Ago 2026",
  },
  {
    id: "onboarding-digital",
    title: "Cómo diseñar un onboarding digital que enganche",
    excerpt:
      "Los primeros días definen la permanencia. Una guía práctica para construir experiencias de inducción memorables.",
    category: "Experiencia de usuario",
    readingMinutes: 8,
    publishDate: "05 Ago 2026",
  },
  {
    id: "metricas-formacion",
    title: "Métricas de formación que sí importan al negocio",
    excerpt:
      "Deja de medir horas de video. Estas son las métricas de aprendizaje que tu CFO querrá ver en el próximo board.",
    category: "Analítica",
    readingMinutes: 5,
    publishDate: "28 Jul 2026",
  },
];

export const contactCopy = {
  title: "Lleva el aprendizaje de tu empresa al siguiente nivel",
  subtitle:
    "Agenda una demo de 30 minutos y descubre cómo PROEFEX puede transformar la formación en tu organización.",
  cta: "Solicitar demo",
} as const;
