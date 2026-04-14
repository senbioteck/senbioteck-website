export interface Slot {
  id: string;
  professionalId: string;
  startTime: string;
  endTime: string;
  status: 'AVAILABLE' | 'BOOKED' | 'BLOCKED';
  notes?: string;
}

export interface Appointment {
  id: string;
  slotId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  reason?: string;
  notes?: string;
  status: 'SCHEDULED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';
  createdAt: string;
  updatedAt: string;
}

export interface SlotQuery {
  professionalId?: string;
  date?: string;
  page?: number;
  limit?: number;
}

export interface CreateAppointmentData {
  slotId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  reason?: string;
  notes?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function getAvailableSlots(query: SlotQuery = {}): Promise<{ data: Slot[]; total: number }> {
  const params = new URLSearchParams();
  if (query.professionalId) params.set('professionalId', query.professionalId);
  if (query.date) params.set('date', query.date);
  if (query.page) params.set('page', String(query.page));
  if (query.limit) params.set('limit', String(query.limit));

  const res = await fetch(`${API_URL}/api/appointments/slots?${params.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch slots');
  return res.json();
}

export async function createAppointment(data: CreateAppointmentData): Promise<Appointment> {
  const res = await fetch(`${API_URL}/api/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Failed to create appointment' }));
    throw new Error(error.message || 'Failed to create appointment');
  }
  return res.json();
}

export function formatSlotTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatSlotDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function isSlotInPast(slot: Slot): boolean {
  return new Date(slot.startTime) < new Date();
}
