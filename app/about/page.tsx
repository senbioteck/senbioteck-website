'use client'

import { motion } from 'framer-motion'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import WhatsAppFAB from '../../components/WhatsAppFAB'

const roadmap = [
  { year: 'An 1', revenue: '$2M', products: '3', markets: '3' },
  { year: 'An 2', revenue: '$15M', products: '12', markets: '8' },
  { year: 'An 3', revenue: '$80M', products: '25', markets: '18' },
  { year: 'An 5', revenue: '$1B', products: '50+', markets: '20+' },
]

const values = [
  { icon: '🔬', title: 'Science d\'abord', description: 'Aucun produit sans validation scientifique rigoureuse.' },
  { icon: '🌍', title: 'Afrique d\'abord', description: 'Plantes africaines, pour corps africains, fabriqué en Afrique.' },
  { icon: '✨', title: 'Transparence', description: 'Sources citées, niveaux de preuve affichés publiquement.' },
  { icon: '💚', title: 'Accessibilité', description: 'Prix adaptés aux marchés africains.' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <WhatsAppFAB />

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-forest-dark mb-4">
              À propos de SENBIOTECK
            </h1>
            <p className="text-earth/70 max-w-3xl mx-auto text-lg">
              Notre mission : révolutionner la santé naturelle en Afrique par la phytothérapie validée par l'IA.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-forest-dark text-cream rounded-3xl p-12 mb-20"
          >
            <h2 className="font-heading text-3xl font-bold mb-8 text-center">Notre Vision</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <span className="text-4xl font-bold text-gold block mb-2">$1B</span>
                <span className="text-cream/80">CA en 5 ans</span>
              </div>
              <div>
                <span className="text-4xl font-bold text-gold block mb-2">20+</span>
                <span className="text-cream/80">Marchés</span>
              </div>
              <div>
                <span className="text-4xl font-bold text-gold block mb-2">25+</span>
                <span className="text-cream/80">Produits</span>
              </div>
              <div>
                <span className="text-4xl font-bold text-gold block mb-2">#1</span>
                <span className="text-cream/80">Leader Afrique</span>
              </div>
            </div>
          </motion.div>

          {/* Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h2 className="font-heading text-2xl font-bold text-forest-dark mb-8 text-center">
              Roadmap de croissance
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
                <thead className="bg-forest text-cream">
                  <tr>
                    <th className="px-6 py-4 text-left">Année</th>
                    <th className="px-6 py-4 text-left">Chiffre d'affaires</th>
                    <th className="px-6 py-4 text-left">Produits</th>
                    <th className="px-6 py-4 text-left">Marchés</th>
                  </tr>
                </thead>
                <tbody>
                  {roadmap.map((row, index) => (
                    <tr key={row.year} className={index % 2 === 0 ? 'bg-cream' : 'white'}>
                      <td className="px-6 py-4 font-semibold text-forest-dark">{row.year}</td>
                      <td className="px-6 py-4 text-earth/80">{row.revenue}</td>
                      <td className="px-6 py-4 text-earth/80">{row.products}</td>
                      <td className="px-6 py-4 text-earth/80">{row.markets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h2 className="font-heading text-2xl font-bold text-forest-dark mb-8 text-center">
              Nos valeurs
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md text-center"
                >
                  <span className="text-4xl block mb-4">{value.icon}</span>
                  <h3 className="font-heading font-bold text-lg text-forest-dark mb-2">
                    {value.title}
                  </h3>
                  <p className="text-earth/70 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Investors */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gold/10 rounded-2xl p-8 text-center"
          >
            <h2 className="font-heading text-2xl font-bold text-forest-dark mb-4">
              Rejoignez la révolution santé africaine
            </h2>
            <p className="text-earth/70 mb-6">
              SENBIOTECK lève actuellement sa Série A pour accélérer la expansion Phase 1.
            </p>
            <a
              href="mailto:investors@senbioteck.com"
              className="inline-block bg-gold hover:bg-gold/90 text-white px-8 py-4 rounded-full font-semibold transition-colors"
            >
              Contacter les investisseurs
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
