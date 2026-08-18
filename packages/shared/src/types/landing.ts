export interface Course {
  id: string;
  title: string;
  category: string;
  level: "Básico" | "Intermedio" | "Avanzado";
  instructor: string;
  durationHours: number;
  priceUsd: number;
  image: string;
  featured: boolean;
}

export interface Service {
  id: string;
  icon: "lms" | "cms" | "consultoria";
  title: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readingMinutes: number;
  publishDate: string;
}
