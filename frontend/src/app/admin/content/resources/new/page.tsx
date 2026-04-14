import ResourceForm from '@/components/admin/ResourceForm'

export default function NewResourcePage() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Nouvelle ressource</h2>
      <ResourceForm mode="new" />
    </div>
  )
}