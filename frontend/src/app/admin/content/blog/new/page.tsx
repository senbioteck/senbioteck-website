import BlogPostForm from '@/components/admin/BlogPostForm'

interface Category {
  id: string
  name: string
}

async function getCategories(): Promise<Category[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  
  try {
    const res = await fetch(`${baseUrl}/api/content/categories`, { cache: 'no-store' })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export default async function NewBlogPostPage() {
  const categories = await getCategories()

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Nouvel article</h2>
      <BlogPostForm categories={categories} mode="new" />
    </div>
  )
}