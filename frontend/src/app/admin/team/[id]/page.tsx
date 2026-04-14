import { notFound } from 'next/navigation'
import TeamMemberForm from '@/components/admin/TeamMemberForm'

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
  socialLinks?: {
    linkedin?: string
    twitter?: string
  }
}

async function getTeamMember(id: string): Promise<TeamMember | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  
  try {
    const res = await fetch(`${baseUrl}/api/team/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const member = await getTeamMember(id)

  if (!member) {
    notFound()
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Éditer {member.firstName} {member.lastName}
      </h2>
      <TeamMemberForm member={member} mode="edit" />
    </div>
  )
}