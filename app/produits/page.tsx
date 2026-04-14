'use client'

import { motion } from 'framer-motion'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import WhatsAppFAB from '../../components/WhatsAppFAB'
import ProductCard from '../../components/ProductCard'

const products = [
  {
    id: 'senviril',
    name: 'SENVIRIL-1',
    slug: 'senviril',
    indication: 'Santé sexuelle masculine, libido, vitalité',
    format: 'Gélules · Cure 30 jours',
    price: '15 000 FCFA / $25',
    priceNumber: 15000,
    plants: ['Mondia whitei', 'Yohimbe', 'Kinkéliba'],
    badge: 'Bestseller Phase 1',
    description: 'Formule améliorée pour soutenir la santé sexuelle masculine et la vitalité générale.',
  },
  {
    id: 'senfertil',
    name: 'SENFERTIL-M',
    slug: 'senfertil',
    indication: 'Fertilité masculine, spermatogenèse',
    format: 'Gélules · Cure 30 jours',
    price: '18 000 FCFA / $30',
    priceNumber: 18000,
    plants: ['Griffonia', 'Moringa', 'Baobab'],
    description: 'Combinaison synergique pour soutenir la fertilité masculine et la spermatogenèse.',
  },
  {
    id: 'senimmu',
    name: 'SENIMMU-1',
    slug: 'senimmu',
    indication: 'Immunité, vitalité générale, énergie',
    format: 'Poudre soluble · Cure 30 jours',
    price: '12 000 FCFA / $20',
    priceNumber: 12000,
    plants: ['Moringa', 'Kinkéliba', 'Baobab'],
    description: 'Soutient le système immunitaire et favorise la vitalité générale.',
  },
]

const faqs = [
  {
    q: 'Ces produits sont-ils des médicaments ?',
    a: 'Non, ces produits sont des compléments alimentaires à base de plantes. Ils ne sont pas des médicaments et ne se substituent pas à un traitement médical.',
  },
  {
    q: 'Peut-on les prendre avec d\'autres traitements ?',
    a: 'Nous recommandons de consulter un professionnel de santé avant de combiner nos produits avec d\'autres traitements.',
  },
  {
    q: 'Y a-t-il des contre-indications ?',
    a: 'Chaque produit indique les contre-indications possibles. En cas de doute, consultez votre médecin.',
  },
  {
    q: 'Comment commander ?',
    a: 'Vous pouvez commander directement sur WhatsApp en envoyant un message, ou via notre formulaire de contact.',
  },
  {
    q: 'Livraison disponible dans quels pays ?',
    a: 'Phase 1 : Sénégal, Côte d\'Ivoire, Cameroun. Livraison en 48h à Dakar, 5 jours pour les autres pays.',
  },
]

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <WhatsAppFAB />

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-forest-dark mb-4">
              Nos formules biologiques
            </h1>
            <p className="text-earth/70 max-w-2xl mx-auto text-lg">
              Des produits développés avec l'IA pour répondre aux besoins de santé spécifiques des africains.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-forest-light rounded-2xl p-8"
          >
            <h2 className="font-heading text-2xl font-bold text-forest-dark mb-6 text-center">
              Foire Aux Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-forest/20 pb-4"
                >
                  <h3 className="font-semibold text-forest-dark mb-2">{faq.q}</h3>
                  <p className="text-earth/70">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 bg-gold/10 rounded-lg text-center"
          >
            <p className="text-earth/60 text-sm">
              ⚠️ Ces produits sont des compléments alimentaires à base de plantes. Ils ne sont pas des médicaments et ne se substituent pas à un traitement médical. Consultez un professionnel de santé avant utilisation.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
