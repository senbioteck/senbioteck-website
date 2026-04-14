import MessagesClient from '@/components/admin/MessagesClient'

interface Message {
  id: string
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  isRead: boolean
  isReplied: boolean
  createdAt: string
}

async function getMessages(): Promise<Message[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  
  try {
    const res = await fetch(`${baseUrl}/api/contact-messages`, { cache: 'no-store' })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export default async function MessagesPage() {
  const messages = await getMessages()

  return <MessagesClient initialMessages={messages} />
}