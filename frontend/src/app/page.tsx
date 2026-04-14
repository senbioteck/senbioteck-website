import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accueil',
  description: 'Senbioteck - Institut de biotechnologie et de recherche en santé. ' +
    'Innovations médicales, recherche biomédicale et services de santé de pointe.',
}

const services = [
  {
    title: 'Recherche Biomédicale',
    description: 'Développement de therapies innovantes pour le traitement des maladies rares.',
    icon: '🔬',
  },
  {
    title: 'Diagnostic Avancé',
    description: 'Technologies de diagnostic de pointe pour une detection précoce.',
    icon: '⚕️',
  },
  {
    title: 'Développement Pharmaceutique',
    description: 'Formulation et développement de nouveaux médicaments.',
    icon: '💊',
  },
]

const stats = [
  { value: '15+', label: 'Années d\'expérience' },
  { value: '50+', label: 'Chercheurs experts' },
  { value: '100+', label: 'Publications scientifiques' },
  { value: '20+', label: 'Partenariats internationaux' },
]

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 section-padding">
        <div className="container-page">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              L&apos;innovation biotech au service de votre santé
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Senbioteck est un institut de recherche en biotechnologie dédié au 
              développement de solutions médicales innovantes et accessibles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/contact" className="btn-primary">
                Prendre rendez-vous
              </a>
              <a href="/services" className="btn-secondary">
                Découvrir nos services
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <h2 className="text-3xl font-bold text-center mb-12">Nos services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-6 rounded-xl border hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-white">
        <div className="container-page text-center">
          <h2 className="text-3xl font-bold mb-4">
            Besoin d&apos;une consultation ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Prenez rendez-vous avec nos experts pour discuter de vos besoins.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Prendre rendez-vous →
          </a>
        </div>
      </section>
    </>
  )
}