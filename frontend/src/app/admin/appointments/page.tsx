import AppointmentsClient from '@/components/admin/AppointmentsClient'

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

async function getAppointments(): Promise<Appointment[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  
  try {
    const res = await fetch(`${baseUrl}/api/appointments`, { cache: 'no-store' })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export default async function AppointmentsPage() {
  const appointments = await getAppointments()

  return <AppointmentsClient initialAppointments={appointments} />
}