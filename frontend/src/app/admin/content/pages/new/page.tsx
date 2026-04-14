import PageForm from '@/components/admin/PageForm'

export default function NewPagePage() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Nouvelle page</h2>
      <PageForm mode="new" />
    </div>
  )
}