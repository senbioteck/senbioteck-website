'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import WhatsAppFAB from '../../components/WhatsAppFAB'

const subjectOptions = [
  'Client',
  'Partenaire distributeur',
  'Investisseur',
  'Presse',
  'Autre',
]

const countries = ['Sénégal', 'Côte d\'Ivoire', 'Cameroun', 'Autre']

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
  }

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
              Contact
            </h1>
            <p className="text-earth/70 max-w-2xl mx-auto text-lg">
              Une question ? Un partenariat ? Contactez-nous via WhatsApp ou le formulaire ci-dessous.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              {submitted ? (
                <div className="text-center py-12">
                  <span className="text-5xl block mb-4">✓</span>
                  <h3 className="font-heading text-2xl font-bold text-forest-dark mb-2">
                    Message envoyé !
                  </h3>
                  <p className="text-earth/70">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-earth mb-2">
                        Nom / Prénom
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-neutral focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all"
                        placeholder="Votre nom complet"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-earth mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-neutral focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-earth mb-2">
                        Pays
                      </label>
                      <select
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-neutral focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all bg-white"
                      >
                        <option value="">Sélectionnez votre pays</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-earth mb-2">
                        Objet
                      </label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-neutral focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all bg-white"
                      >
                        <option value="">Sélectionnez un objet</option>
                        {subjectOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-neutral focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all resize-none"
                      placeholder="Comment pouvons-nous vous aider ?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-forest hover:bg-forest-dark text-white px-8 py-4 rounded-full font-semibold transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* WhatsApp */}
              <div className="bg-forest rounded-2xl p-8 text-cream">
                <h3 className="font-heading text-xl font-bold mb-4">
                  WhatsApp Business
                </h3>
                <p className="text-cream/80 mb-6">
                  Le moyen le plus rapide pour nous contacter. Response sous 24h.
                </p>
                <a
                  href="https://wa.me/22170000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-forest px-6 py-3 rounded-full font-semibold hover:bg-cream transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Ouvrir WhatsApp
                </a>
              </div>

              {/* Email */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="font-heading text-xl font-bold text-forest-dark mb-4">
                  Email
                </h3>
                <p className="text-earth/70 mb-2">contact@senbioteck.com</p>
                <p className="text-earth/70 mb-2">investors@senbioteck.com</p>
                <p className="text-earth/70">presse@senbioteck.com</p>
              </div>

              {/* Address */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="font-heading text-xl font-bold text-forest-dark mb-4">
                  Adresse
                </h3>
                <p className="text-earth/70">
                  Dakar, Sénégal<br />
                  Zone commerciale
                </p>
              </div>

              {/* Distributors */}
              <div className="bg-forest-light rounded-2xl p-8">
                <h3 className="font-heading text-xl font-bold text-forest-dark mb-4">
                  Vous êtes pharmacien ou distributeur ?
                </h3>
                <p className="text-earth/70 mb-4">
                  Intéressé par un partenariat de distribution ? Contactez-nous pour discuter des opportunités.
                </p>
                <a
                  href="mailto:partenaires@senbioteck.com"
                  className="text-forest font-semibold hover:text-forest-dark transition-colors"
                >
                  contactez nos équipes →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
