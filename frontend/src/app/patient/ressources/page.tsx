'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  HealthResource,
  ResourceCategory,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from '@/lib/content';

const ITEMS_PER_PAGE = 10;

export default function HealthResourcesPage() {
  const [resources, setResources] = useState<HealthResource[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<ResourceCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResources = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { getHealthResources } = await import('@/lib/content');
      const result = await getHealthResources({
        category: category || undefined,
        page,
        limit: ITEMS_PER_PAGE,
      });
      setResources(result.data);
      setTotal(result.total);
    } catch {
      setError('Impossible de charger les ressources. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  }, [category, page]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const handleCategoryChange = (newCategory: ResourceCategory | null) => {
    setCategory(newCategory);
    setPage(1);
  };

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const categories = Object.keys(CATEGORY_LABELS) as ResourceCategory[];

  return (
    <div className="container-page section-padding">
      <h1 className="text-3xl font-bold mb-8 text-center">Ressources Santé</h1>

      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === null
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Toutes les catégories
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === cat
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-600">Chargement des ressources...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={fetchResources} className="btn-primary">
              Réessayer
            </button>
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-600">Aucune ressource trouvée pour cette catégorie.</p>
            <button
              onClick={() => handleCategoryChange(null)}
              className="mt-4 text-primary hover:underline"
            >
              Voir toutes les catégories
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map(resource => (
                <Link
                  key={resource.id}
                  href={`/patient/ressources/${resource.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-primary transition-all"
                >
                  {resource.imageUrl && (
                    <div className="aspect-video w-full mb-4 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={resource.imageUrl}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full mb-3 ${CATEGORY_COLORS[resource.category]}`}
                  >
                    {CATEGORY_LABELS[resource.category]}
                  </span>
                  <h2 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h2>
                  {resource.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {resource.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                aria-label="Pagination"
                className="flex items-center justify-center gap-2 mt-8"
              >
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ← Précédent
                </button>
                <span className="text-sm text-gray-600">
                  Page {page} sur {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Suivant →
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}
