import Link from 'next/link'

interface Resource {
  id: string
  title: string
  slug: string
  category: 'PREVENTION' | 'TREATMENT' | 'REHABILITATION' | 'WELLNESS' | 'EMERGENCY'
  isFeatured: boolean
  publishedAt?: string
  updatedAt: string
}

async function getResources(): Promise<Resource[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  
  try {
    const res = await fetch(`${baseUrl}/api/content/resources`, { cache: 'no-store' })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export default async function ResourcesListPage() {
  const resources = await getResources()

  const categoryLabels = {
    PREVENTION: 'Prévention',
    TREATMENT: 'Traitement',
    REHABILITATION: 'Réhabilitation',
    WELLNESS: 'Bien-être',
    EMERGENCY: 'Urgence',
  }

  const categoryColors = {
    PREVENTION: 'bg-blue-100 text-blue-800',
    TREATMENT: 'bg-purple-100 text-purple-800',
    REHABILITATION: 'bg-green-100 text-green-800',
    WELLNESS: 'bg-yellow-100 text-yellow-800',
    EMERGENCY: 'bg-red-100 text-red-800',
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-gray-600">{resources.length} ressource(s)</p>
        <Link
          href="/admin/content/resources/new"
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Nouvelle ressource
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Titre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Catégorie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mise en avant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Publié le
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {resources.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  Aucune ressource créée
                </td>
              </tr>
            ) : (
              resources.map((resource) => (
                <tr key={resource.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {resource.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[resource.category]}`}>
                      {categoryLabels[resource.category]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {resource.isFeatured ? (
                      <span className="text-yellow-500">★</span>
                    ) : (
                      <span className="text-gray-300">○</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {resource.publishedAt
                      ? new Date(resource.publishedAt).toLocaleDateString('fr-FR')
                      : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/content/resources/${resource.id}`}
                      className="text-primary hover:underline mr-4"
                    >
                      Éditer
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}