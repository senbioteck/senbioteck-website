import Link from 'next/link'

interface TeamMember {
  id: string
  firstName: string
  lastName: string
  role: string
  department?: string
  bio?: string
  photoUrl?: string
  email?: string
  phone?: string
  displayOrder: number
  isActive: boolean
}

async function getTeamMembers(): Promise<TeamMember[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  
  try {
    const res = await fetch(`${baseUrl}/api/team`, { cache: 'no-store' })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export default async function TeamListPage() {
  const members = await getTeamMembers()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Équipe</h1>
          <p className="text-gray-600 mt-1">
            {members.length} membre(s)
          </p>
        </div>
        <Link
          href="/admin/team/new"
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Membre
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            Aucun membre de l'équipe
          </div>
        ) : (
          members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={`${member.firstName} ${member.lastName}`}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-primary">
                        {member.firstName[0]}
                        {member.lastName[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {member.firstName} {member.lastName}
                    </h3>
                    <p className="text-sm text-primary">{member.role}</p>
                    {member.department && (
                      <p className="text-xs text-gray-500">{member.department}</p>
                    )}
                  </div>
                </div>

                {member.bio && (
                  <p className="mt-4 text-sm text-gray-600 line-clamp-3">{member.bio}</p>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="text-gray-400 hover:text-primary"
                        title={member.email}
                      >
                        ✉️
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="text-gray-400 hover:text-primary"
                        title={member.phone}
                      >
                        📞
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {member.isActive ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-3 bg-gray-50 flex justify-end gap-3">
                <Link
                  href={`/admin/team/${member.id}`}
                  className="text-sm text-primary hover:underline"
                >
                  Éditer
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}