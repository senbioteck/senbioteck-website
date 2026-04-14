import TeamMemberForm from '@/components/admin/TeamMemberForm'

export default function NewTeamMemberPage() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Nouveau membre</h2>
      <TeamMemberForm mode="new" />
    </div>
  )
}