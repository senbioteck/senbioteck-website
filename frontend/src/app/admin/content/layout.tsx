'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const contentNav = [
  { href: '/admin/content/pages', label: 'Pages' },
  { href: '/admin/content/blog', label: 'Articles' },
  { href: '/admin/content/resources', label: 'Ressources' },
]

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestion de contenu</h1>
        <p className="text-gray-600 mt-1">
          Gérez les pages, articles et ressources de votre site
        </p>
      </div>

      <div className="flex gap-4 border-b border-gray-200 pb-4">
        {contentNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              pathname === item.href || pathname.startsWith(item.href + '/')
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {children}
    </div>
  )
}