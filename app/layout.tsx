import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SENBIOTECK | La santé naturelle africaine, validée par la science',
  description: 'Des formules biologiques à base de plantes médicinales africaines pour votre santé sexuelle, votre fertilité et votre vitalité.',
  openGraph: {
    title: 'SENBIOTECK | La santé naturelle africaine, validée par la science',
    description: 'Des formules biologiques à base de plantes médicinales africaines pour votre santé sexuelle, votre fertilité et votre vitalité.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
