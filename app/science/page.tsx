'use client'

import { motion } from 'framer-motion'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import WhatsAppFAB from '../../components/WhatsAppFAB'

const plants = [
  { name: 'Mondia whitei', latinName: 'Mondia whitei', indication: 'Libido, fertilité masculine', actif: 'Mondioside', proof: 'B' },
  { name: 'Yohimbe', latinName: 'Pausinystalia johimbe', indication: 'Dysfonction érectile', actif: 'Yohimbine', proof: 'A' },
  { name: 'Griffonia', latinName: 'Griffonia simplicifolia', indication: 'Fertilité, humeur', actif: '5-HTP', proof: 'A' },
  { name: 'Moringa', latinName: 'Moringa oleifera', indication: 'Immunité, nutrition', actif: 'Isothiocyanates', proof: 'B' },
  { name: 'Kinkéliba', latinName: 'Combretum micranthum', indication: 'Métabolisme', actif: 'Flavonoïdes', proof: 'B' },
  { name: 'Baobab', latinName: 'Adansonia digitata', indication: 'Antioxydant', actif: 'Vit C + polyphénols', proof: 'B' },
]

const processSteps = [
  {
    number: '01',
    title: 'Recherche scientifique',
    description: 'Nous analysons les études cliniques publiées sur PubMed et les bases ethnobotaniques africaines pour identifier les composés actifs des plantes médicinales.',
    details: ['Revue systématique de la littérature', 'Validation des sources traditionnelles', 'Analyse des composés actifs'],
  },
  {
    number: '02',
    title: 'Formulation IA',
    description: 'Notre intelligence artificielle optimise les combinaisons et ratios de plantes pour maximiser l\'efficacité tout en garantissant la sécurité.',
    details: ['Optimisation des doses', 'Analyse des interactions', 'Modélisation de la biodisponibilité'],
  },
  {
    number: '03',
    title: 'Essais pilotes',
    description: 'Nous menons des études pilotes avec 20 à 50 participants, mesurant les biomarqueurs pertinents pour valider nos formules.',
    details: ['Protocoles éthique approuvés', 'Mesure de biomarqueurs', 'Suivi longitudinal'],
  },
  {
    number: '04',
    title: 'Production bio certifiée',
    description: 'Nos produits sont fabriqués selon les Bonnes Pratiques de Fabrication (BPF) CEDEAO et certifiés Bio Ecocert.',
    details: ['Certification Ecocert', 'Conformité BPF CEDEAO', 'Contrôle qualité strict'],
  },
]

export default function SciencePage() {
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
              La phytothérapie africaine validée par l'IA
            </h1>
            <p className="text-earth/70 max-w-2xl mx-auto text-lg">
              Une approche scientifique rigoureuse qui combine la tradition africaine et l'intelligence artificielle.
            </p>
          </motion.div>

          {/* Process */}
          <div className="mb-20">
            <h2 className="font-heading text-2xl font-bold text-forest-dark mb-8 text-center">
              Notre processus de recherche
            </h2>
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-16 h-16 rounded-full bg-forest flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-heading font-bold text-lg">{step.number}</span>
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-6 shadow-md">
                    <h3 className="font-heading text-xl font-bold text-forest-dark mb-2">
                      {step.title}
                    </h3>
                    <p className="text-earth/70 mb-4">{step.description}</p>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {step.details.map((detail) => (
                        <li key={detail} className="text-sm text-earth/60 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-forest" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Plants Database */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h2 className="font-heading text-2xl font-bold text-forest-dark mb-8 text-center">
              Base de données plantes
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
                <thead className="bg-forest-dark text-cream">
                  <tr>
                    <th className="px-4 py-3 text-left">Plante</th>
                    <th className="px-4 py-3 text-left">Indication</th>
                    <th className="px-4 py-3 text-left">Composé actif</th>
                    <th className="px-4 py-3 text-center">Niveau de preuve</th>
                  </tr>
                </thead>
                <tbody>
                  {plants.map((plant, index) => (
                    <tr key={plant.name} className={index % 2 === 0 ? 'bg-cream' : 'white'}>
                      <td className="px-4 py-3">
                        <span className="font-medium text-forest-dark">{plant.name}</span>
                        <span className="block text-sm text-forest/70 italic">{plant.latinName}</span>
                      </td>
                      <td className="px-4 py-3 text-earth/80">{plant.indication}</td>
                      <td className="px-4 py-3 text-earth/80">{plant.actif}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          plant.proof === 'A' ? 'bg-forest/20 text-forest' : 'bg-gold/20 text-gold'
                        }`}>
                          {plant.proof}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex gap-6 text-sm text-earth/60 justify-center">
              <span>● A = Essais cliniques randomisés (RCT) publiés chez l'humain</span>
              <span>● B = Études observationnelles humaines publiées</span>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-forest-light rounded-2xl p-8"
          >
            <h2 className="font-heading text-2xl font-bold text-forest-dark mb-6 text-center">
              Certifications & Conformités
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['BPF CEDEAO', 'Bio Ecocert', 'Conformité CITES', 'Homologation DPM Sénégal'].map((cert) => (
                <div key={cert} className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <span className="text-2xl block mb-2">✓</span>
                  <span className="text-forest-dark font-medium text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* IA Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <h2 className="font-heading text-2xl font-bold text-forest-dark mb-4">
              Intelligence artificielle & formulation
            </h2>
            <p className="text-earth/70 max-w-3xl mx-auto">
              Notre plateforme d'IA analyse des milliers de combinaisons de plantes pour optimiser les ratios et doses, 
              garantissant une efficacité maximale tout en minimisant les effets indésirables. L'IA permet également 
              de prédire la biodisponibilité et les interactions entre composés actifs.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
