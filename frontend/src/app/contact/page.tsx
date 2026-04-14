import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Senbioteck pour vos questions sur nos services, ' +
    'prendre rendez-vous ou proposer un partenariat.',
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 section-padding">
        <div className="container-page">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Notre équipe est à votre disposition pour répondre à vos questions 
            et vous accompagner dans vos projets.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="votre@email.fr"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+33 1 23 45 67 89"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="rd">Demande R&D</option>
                    <option value="diagnostic">Diagnostic</option>
                    <option value="partnership">Partenariat</option>
                    <option value="careers">Carrières</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Décrivez votre demande..."
                  />
                </div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    required
                    className="mt-1"
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600">
                    J&apos;accepte que mes données soient traitées conformément à la{' '}
                    <a href="/privacy" className="text-primary hover:underline">
                      politique de confidentialité
                    </a>{' '}
                    de Senbioteck. *
                  </label>
                </div>
                <button type="submit" className="btn-primary w-full">
                  Envoyer le message
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold mb-2">Adresse</h3>
                  <p className="text-gray-600">
                    Senbioteck<br />
                    123 Avenue de la Biotechnologie<br />
                    75015 Paris, France
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:contact@senbioteck.fr" className="text-primary hover:underline">
                      contact@senbioteck.fr
                    </a>
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold mb-2">Téléphone</h3>
                  <p className="text-gray-600">
                    <a href="tel:+33123456789" className="text-primary hover:underline">
                      +33 1 23 45 67 89
                    </a>
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold mb-2">Horaires</h3>
                  <p className="text-gray-600">
                    Lun - Ven: 9h00 - 18h00<br />
                    Sam: 9h00 - 12h00<br />
                    Dim: Fermé
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}