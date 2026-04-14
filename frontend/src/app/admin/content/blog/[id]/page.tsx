import { notFound } from 'next/navigation'
import BlogPostForm from '@/components/admin/BlogPostForm'

interface Category {
  id: string
  name: string
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  body: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  categoryId?: string
  tags: string[]
  featuredImageUrl?: string
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

async function getBlogPost(id: string): Promise<BlogPost | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  
  try {
    const res = await fetch(`${baseUrl}/api/content/blog/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [post, categories] = await Promise.all([
    getBlogPost(id),
    getCategories(),
  ])

  if (!post) {
    notFound()
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Éditer l&apos;article</h2>
      <BlogPostForm post={post} categories={categories} mode="edit" />
    </div>
  )
}