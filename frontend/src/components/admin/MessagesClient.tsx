'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

interface MessagesClientProps {
  initialMessages: Message[]
}

export default function MessagesClient({ initialMessages }: MessagesClientProps) {
  const router = useRouter()
  const [messages, setMessages] = useState(initialMessages)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'all') return true
    if (filter === 'unread') return !msg.isRead
    return msg.isRead
  })

  const handleMarkAsRead = async (id: string) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const res = await fetch(`${baseUrl}/api/contact-messages/${id}/read`, {
        method: 'PATCH',
      })

      if (res.ok) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg))
        )
        if (selectedMessage?.id === id) {
          setSelectedMessage((prev) => (prev ? { ...prev, isRead: true } : null))
        }
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to mark as read:', error)
    }
  }

  const unreadCount = messages.filter((m) => !m.isRead).length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount} message(s) non lu(s)
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        {(['all', 'unread', 'read'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {status === 'all' ? 'Tous' : status === 'unread' ? 'Non lus' : 'Lus'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                Aucun message
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg)
                    if (!msg.isRead) {
                      handleMarkAsRead(msg.id)
                    }
                  }}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage?.id === msg.id ? 'bg-primary/5' : ''
                  } ${!msg.isRead ? 'bg-blue-50/50' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-medium truncate ${!msg.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                          {msg.name}
                        </h3>
                        {!msg.isRead && (
                          <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">{msg.email}</p>
                      {msg.subject && (
                        <p className="text-sm font-medium text-gray-700 truncate mt-1">
                          {msg.subject}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {msg.message}
                      </p>
                    </div>
                    <div className="text-xs text-gray-400 ml-4 flex-shrink-0">
                      {new Date(msg.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {selectedMessage ? (
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedMessage.name}
                  </h2>
                  <p className="text-sm text-gray-500">{selectedMessage.email}</p>
                  {selectedMessage.phone && (
                    <p className="text-sm text-gray-500">{selectedMessage.phone}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {selectedMessage.isReplied && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Répondu
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedMessage.isRead
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedMessage.isRead ? 'Lu' : 'Non lu'}
                  </span>
                </div>
              </div>

              {selectedMessage.subject && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700">Sujet</h3>
                  <p className="text-gray-900">{selectedMessage.subject}</p>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Message</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Message'}`}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
                >
                  Répondre par email
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedMessage.message)
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Copier
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-4">
                Reçu le {new Date(selectedMessage.createdAt).toLocaleString('fr-FR')}
              </p>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500">
              <span className="text-4xl">📧</span>
              <p className="mt-2">Sélectionnez un message</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}