import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

interface StatCard {
  label: string
  value: string | number
  icon: string
  trend?: string
}

async function getDashboardStats() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  
  try {
    const [appointmentsRes, messagesRes, articlesRes] = await Promise.all([
      fetch(`${baseUrl}/api/appointments/today/count`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/contact-messages/unread/count`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/content/blog/published/count`, { cache: 'no-store' }),
    ])

    const todayAppointments = appointmentsRes.ok ? await appointmentsRes.json() : 0
    const unreadMessages = messagesRes.ok ? await messagesRes.json() : 0
    const publishedArticles = articlesRes.ok ? await articlesRes.json() : 0

    return {
      todayAppointments,
      unreadMessages,
      publishedArticles,
    }
  } catch {
    return {
      todayAppointments: 0,
      unreadMessages: 0,
      publishedArticles: 0,
    }
  }
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  const stats = await getDashboardStats()

  const statCards: StatCard[] = [
    {
      label: 'Rendez-vous du jour',
      value: stats.todayAppointments,
      icon: '📅',
    },
    {
      label: 'Messages non lus',
      value: stats.unreadMessages,
      icon: '✉️',
    },
    {
      label: 'Articles publiés',
      value: stats.publishedArticles,
      icon: '📝',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Bonjour, {session?.user?.firstName}
        </h1>
        <p className="text-gray-600 mt-1">
          Voici un aperçu de votre tableau de bord
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <span className="text-4xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Actions rapides
          </h2>
          <div className="space-y-3">
            <a
              href="/admin/content/blog/new"
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <span className="text-xl">📝</span>
              <span className="font-medium">Nouvel article</span>
            </a>
            <a
              href="/admin/content/pages/new"
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <span className="text-xl">📄</span>
              <span className="font-medium">Nouvelle page</span>
            </a>
            <a
              href="/admin/appointments"
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <span className="text-xl">✓</span>
              <span className="font-medium">Valider les rendez-vous</span>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Messages récents
          </h2>
          <div className="text-center py-8 text-gray-500">
            <span className="text-4xl">📭</span>
            <p className="mt-2">Aucun message non lu</p>
          </div>
        </div>
      </div>
    </div>
  )
}