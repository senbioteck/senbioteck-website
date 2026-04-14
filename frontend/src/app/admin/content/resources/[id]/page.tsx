import { notFound } from 'next/navigation'
import ResourceForm from '@/components/admin/ResourceForm'

interface Resource {
  id: string
  title: string
  slug: string
  description: string
  content: string
  category: 'PREVENTION' | 'TREATMENT' | 'REHABILITATION' | 'WELLNESS' | 'EMERGENCY'
  imageUrl?: string
  sourceUrl?: string
  isFeatured: boolean
}

async function getResource(id: string): Promise<Resource | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  
  try {
    const res = await fetch(`${baseUrl}/api/content/resources/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const resource = await getResource(id)

  if (!resource) {
    notFound()
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Éditer la ressource</h2>
      <ResourceForm resource={resource} mode="edit" />
    </div>
  )
}