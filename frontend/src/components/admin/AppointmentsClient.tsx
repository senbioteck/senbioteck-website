'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Appointment {
  id: string
  scheduledAt: string
  status: 'SCHEDULED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW'
  reason?: string
  notes?: string
  patient: {
    firstName: string
    lastName: string
    email: string
    phone?: string
  }
  user: {
    firstName: string
    lastName: string
  }
  slot: {
    startTime: string
    endTime: string
  }
}

interface AppointmentsClientProps {
  initialAppointments: Appointment[]
}

const statusColors = {
  SCHEDULED: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  COMPLETED: 'bg-blue-100 text-blue-800',
  NO_SHOW: 'bg-gray-100 text-gray-800',
}

const statusLabels = {
  SCHEDULED: 'Programmé',
  CONFIRMED: 'Confirmé',
  CANCELLED: 'Annulé',
  COMPLETED: 'Terminé',
  NO_SHOW: 'Absent',
}

export default function AppointmentsClient({ initialAppointments }: AppointmentsClientProps) {
  const router = useRouter()
  const [appointments] = useState(initialAppointments)
  const [filter, setFilter] = useState<'all' | 'SCHEDULED' | 'CONFIRMED' | 'CANCELLED'>('all')

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === 'all') return true
    return apt.status === filter
  })

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const res = await fetch(`${baseUrl}/api/appointments/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rendez-vous</h1>
          <p className="text-gray-600 mt-1">
            {appointments.length} rendez-vous trouvé(s)
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        {(['all', 'SCHEDULED', 'CONFIRMED', 'CANCELLED'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {status === 'all' ? 'Tous' : statusLabels[status]}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Heure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Professionnel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Motif
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Aucun rendez-vous
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {new Date(apt.scheduledAt).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(apt.slot.startTime).toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {apt.patient.firstName} {apt.patient.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{apt.patient.email}</div>
                      {apt.patient.phone && (
                        <div className="text-sm text-gray-500">{apt.patient.phone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {apt.user.firstName} {apt.user.lastName}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {apt.reason || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[apt.status]}`}>
                        {statusLabels[apt.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {apt.status === 'SCHEDULED' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(apt.id, 'CONFIRMED')}
                            className="text-green-600 hover:underline mr-4"
                          >
                            Confirmer
                          </button>
                          <button
                            onClick={() => handleStatusChange(apt.id, 'CANCELLED')}
                            className="text-red-600 hover:underline"
                          >
                            Annuler
                          </button>
                        </>
                      )}
                      {apt.status === 'CONFIRMED' && (
                        <button
                          onClick={() => handleStatusChange(apt.id, 'COMPLETED')}
                          className="text-primary hover:underline"
                        >
                          Terminer
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}