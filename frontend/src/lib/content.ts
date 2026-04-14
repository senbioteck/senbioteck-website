export type ResourceCategory = 
  | 'GENERAL_HEALTH'
  | 'NUTRITION'
  | 'EXERCISE'
  | 'MENTAL_HEALTH'
  | 'PREVENTION'
  | 'TREATMENTS';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface HealthResource {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content: Record<string, unknown>;
  category: ResourceCategory;
  imageUrl?: string;
  sourceUrl?: string;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HealthResourceQuery {
  category?: ResourceCategory;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

export interface FAQQuery {
  category?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function getHealthResources(query: HealthResourceQuery = {}): Promise<{ data: HealthResource[]; total: number }> {
  const params = new URLSearchParams();
  if (query.category) params.set('category', query.category);
  if (query.isFeatured !== undefined) params.set('isFeatured', String(query.isFeatured));
  if (query.page) params.set('page', String(query.page));
  if (query.limit) params.set('limit', String(query.limit));

  const res = await fetch(`${API_URL}/api/content/health-resources?${params.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch health resources');
  return res.json();
}

export async function getHealthResourceBySlug(slug: string): Promise<HealthResource | null> {
  const res = await fetch(`${API_URL}/api/content/health-resources/${slug}`, {
    cache: 'no-store',
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch health resource');
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/api/content/categories`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export const CATEGORY_LABELS: Record<ResourceCategory, string> = {
  GENERAL_HEALTH: 'Santé générale',
  NUTRITION: 'Nutrition',
  EXERCISE: 'Exercice physique',
  MENTAL_HEALTH: 'Santé mentale',
  PREVENTION: 'Prévention',
  TREATMENTS: 'Traitements',
};

export const CATEGORY_COLORS: Record<ResourceCategory, string> = {
  GENERAL_HEALTH: 'bg-blue-100 text-blue-800',
  NUTRITION: 'bg-green-100 text-green-800',
  EXERCISE: 'bg-orange-100 text-orange-800',
  MENTAL_HEALTH: 'bg-purple-100 text-purple-800',
  PREVENTION: 'bg-teal-100 text-teal-800',
  TREATMENTS: 'bg-red-100 text-red-800',
};

export async function getFAQs(): Promise<FAQ[]> {
  const res = await fetch(`${API_URL}/api/content/faqs`, {
    cache: 'no-store',
  });

  if (res.status === 404) return [];
  if (!res.ok) throw new Error('Failed to fetch FAQs');
  return res.json();
}
