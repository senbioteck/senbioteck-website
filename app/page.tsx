'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFAB from '../components/WhatsAppFAB'
import ProductCard from '../components/ProductCard'
import PlantCard from '../components/PlantCard'
import TestimonialCard from '../components/TestimonialCard'

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

const plants = [
  { name: 'Mondia whitei', latinName: 'Mondia whitei', benefit: 'Libido, fertilité masculine', country: 'Afrique de l\'Ouest' },
  { name: 'Yohimbe', latinName: 'Pausinystalia johimbe', benefit: 'Dysfonction érectile', country: 'Cameroun' },
  { name: 'Moringa', latinName: 'Moringa oleifera', benefit: 'Immunité, nutrition', country: 'Sénégal' },
  { name: 'Kinkéliba', latinName: 'Combretum micranthum', benefit: 'Métabolisme, énergie', country: 'Sénégal' },
  { name: 'Baobab', latinName: 'Adansonia digitata', benefit: 'Antioxydant, vitalité', country: 'Sénégal' },
  { name: 'Griffonia', latinName: 'Griffonia simplicifolia', benefit: 'Fertilité, humeur', country: 'Côte d\'Ivoire' },
]

const testimonials = [
  {
    name: 'Mamadou D.',
    city: 'Dakar',
    country: 'Sénégal',
    quote: 'Après 2 mois avec SENVIRIL-1, je me sens plus énergique et confiant. Un produit naturel qui fonctionne vraiment.',
  },
  {
    name: 'Koffi A.',
    city: 'Abidjan',
    country: 'Côte d\'Ivoire',
    quote: 'La livraison en 48h à Abidjan m\'a impressionné. Le produit est de qualité professionnelle.',
  },
  {
    name: 'Jean-Pierre M.',
    city: 'Douala',
    country: 'Cameroun',
    quote: 'J\'ai recommandé SENBIOTECK à plusieurs amis. Le service client sur WhatsApp est excellent.',
  },
]

const processSteps = [
  { number: '01', title: 'Recherche scientifique', description: 'PubMed + bases ethnobotaniques africaines', icon: '🔍' },
  { number: '02', title: 'Formulation IA', description: 'Optimisation des combinaisons et ratios', icon: '🔬' },
  { number: '03', title: 'Essais pilotes', description: '20–50 participants, biomarqueurs mesurés', icon: '🧬' },
  { number: '04', title: 'Production bio certifiée', description: 'BPF CEDEAO, Ecocert', icon: '🏭' },
]

const pillars = [
  { icon: '🌿', title: '100% Naturel & Bio', description: 'Plantes certifiées biologiques, sourcing Afrique de l\'Ouest' },
  { icon: '🔬', title: 'Validé par la Science', description: 'Formules optimisées par IA, études cliniques pilotes' },
  { icon: '🌍', title: 'Conçu pour l\'Afrique', description: 'Plantes ancestrales africaines, pour corps africains' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <WhatsAppFAB />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-light/30 via-cream to-cream" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-forest/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block bg-forest/10 text-forest px-4 py-2 rounded-full text-sm font-medium mb-6">
                🌿 Phytothérapie africaine validée par l'IA
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-forest-dark leading-tight mb-6">
                La santé naturelle africaine, enfin validée par la science
              </h1>
              <p className="text-earth/80 text-lg md:text-xl mb-8 max-w-lg">
                Des formules biologiques à base de plantes médicinales africaines pour votre santé sexuelle, votre fertilité et votre vitalité.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#produits"
                  className="bg-forest hover:bg-forest-dark text-white px-8 py-4 rounded-full font-semibold text-center transition-colors"
                >
                  Découvrir nos produits
                </a>
                <a
                  href="https://wa.me/22170000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold hover:bg-gold/90 text-white px-8 py-4 rounded-full font-semibold text-center transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Commander sur WhatsApp
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-forest to-forest-dark">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white/90">
                      <span className="text-8xl block mb-4">🌿</span>
                      <p className="font-heading text-2xl">Moringa · Baobab · Kinkéliba</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why SENBIOTECK */}
      <section className="py-20 px-4 bg-neutral">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-dark mb-4">
              Pourquoi SENBIOTECK ?
            </h2>
            <p className="text-earth/70 max-w-2xl mx-auto">
              Une approche unique qui combine la sagesse ancestrale africaine avec la science moderne et l'intelligence artificielle.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg card-hover text-center"
              >
                <span className="text-5xl block mb-4">{pillar.icon}</span>
                <h3 className="font-heading text-xl font-bold text-forest-dark mb-3">
                  {pillar.title}
                </h3>
                <p className="text-earth/70">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produits" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-dark mb-4">
              Nos formules biologiques Phase 1
            </h2>
            <p className="text-earth/70 max-w-2xl mx-auto">
              Des produits développés pour répondre aux besoins de santé des africains urbains.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Plants Section */}
      <section className="py-20 px-4 bg-forest-dark text-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Nos plantes clés validées
            </h2>
            <p className="text-cream/70 max-w-2xl mx-auto">
              Chaque plante est sélectionnée pour ses propriétés reconnues et sourcée en Afrique de l'Ouest.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {plants.map((plant, index) => (
              <PlantCard key={plant.name} plant={plant} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-dark mb-4">
              Notre processus
            </h2>
            <p className="text-earth/70 max-w-2xl mx-auto">
              De la recherche à la production, chaque étape est validée scientifiquement.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-forest/30" />
                )}
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-forest flex items-center justify-center text-2xl">
                  {step.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-forest-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-earth/70 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-neutral">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-dark mb-4">
              Ce que disent nos clients
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Order Section */}
      <section className="py-20 px-4 bg-forest text-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-4xl block mb-4">📱</span>
              <h3 className="font-heading text-xl font-bold mb-2">WhatsApp Business</h3>
              <p className="text-cream/80">Commande en 2 messages</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-4xl block mb-4">🚚</span>
              <h3 className="font-heading text-xl font-bold mb-2">Livraison rapide</h3>
              <p className="text-cream/80">48h à Dakar · 5 jours en Afrique de l'Ouest</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-4xl block mb-4">💊</span>
              <h3 className="font-heading text-xl font-bold mb-2">Pharmacies partenaires</h3>
              <p className="text-cream/80">Disponible au Sénégal, Côte d'Ivoire, Cameroun</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-2xl font-bold text-forest-dark mb-4">
              Certifications & Conformités
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['Certifié Bio Ecocert', 'Homologué DPM Sénégal', 'Plantes CITES conformes', 'BPF CEDEAO'].map((badge) => (
                <span key={badge} className="bg-forest-light text-forest-dark px-4 py-2 rounded-full text-sm font-medium">
                  ✓ {badge}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-earth/60 text-lg font-medium">
              3 produits · 6 plantes validées · 20 marchés en 5 ans
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
