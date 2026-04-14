import { notFound } from 'next/navigation'
import PageForm from '@/components/admin/PageForm'

interface Page {
  id: string
  title: string
  slug: string
  body: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  version: number
  metaTitle?: string
  metaDescription?: string
}

async function getPage(id: string): Promise<Page | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  
  try {
    const res = await fetch(`${baseUrl}/api/content/pages/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const page = await getPage(id)

  if (!page) {
    notFound()
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Éditer la page</h2>
      <PageForm page={page} mode="edit" />
    </div>
  )
}