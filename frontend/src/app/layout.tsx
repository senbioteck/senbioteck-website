import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Senbioteck - Biotechnologie & Santé',
    template: '%s | Senbioteck',
  },
  description: 'Senbioteck - Institut de biotechnologie et de recherche en santé. ' +
    'Innovations médicales, recherche biomédicale et services de santé de pointe.',
  keywords: ['biotechnologie', 'santé', 'recherche', 'médecine', 'innovation'],
  authors: [{ name: 'Senbioteck' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Senbioteck',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <header className="border-b">
          <div className="container-page">
            <nav className="flex items-center justify-between h-16">
              <a href="/" className="text-xl font-bold text-primary">
                Senbioteck
              </a>
              <div className="hidden md:flex items-center gap-8">
                <a href="/a-propos" className="hover:text-primary transition-colors">À propos</a>
                <a href="/services" className="hover:text-primary transition-colors">Services</a>
                <a href="/equipe" className="hover:text-primary transition-colors">Équipe</a>
                <a href="/recherche" className="hover:text-primary transition-colors">Recherche</a>
                <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
                <a href="/contact" className="btn-primary text-sm">Contact</a>
              </div>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-gray-900 text-white py-12">
          <div className="container-page">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Senbioteck</h3>
                <p className="text-gray-400">
                  Institut de biotechnologie et de recherche en santé.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Navigation</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/a-propos" className="hover:text-white">À propos</a></li>
                  <li><a href="/services" className="hover:text-white">Services</a></li>
                  <li><a href="/equipe" className="hover:text-white">Équipe</a></li>
                  <li><a href="/recherche" className="hover:text-white">Recherche</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Ressources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/blog" className="hover:text-white">Blog</a></li>
                  <li><a href="/contact" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>contact@senbioteck.fr</li>
                  <li>+33 1 23 45 67 89</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Senbioteck. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}