import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Découvrez nos services en biotechnologie et recherche médicale. ' +
    'Diagnostic avancé, recherche biomédicale et développement pharmaceutique.',
}

const services = [
  {
    category: 'Recherche',
    items: [
      {
        title: 'Recherche Biomédicale',
        description: 'Études précliniques et cliniques pour le développement de nouvelles therapies.',
      },
      {
        title: 'Génomique',
        description: 'Analyses génomiques avancées pour la médecine personalisée.',
      },
      {
        title: 'Biologie Moléculaire',
        description: 'Caractérisation et développement de cibles thérapeutiques.',
      },
    ],
  },
  {
    category: 'Diagnostic',
    items: [
      {
        title: 'Diagnostic Moléculaire',
        description: 'Tests diagnostiques de nouvelle génération pour une detection précoce.',
      },
      {
        title: 'Biomarqueurs',
        description: 'Identification et validation de biomarqueurs pour le diagnostic.',
      },
      {
        title: 'Imagerie Médicale',
        description: 'Technologies d&apos;imagerie de pointe pour le diagnostic.',
      },
    ],
  },
  {
    category: 'Développement',
    items: [
      {
        title: 'Développement Pharmaceutique',
        description: 'Formulation et optimisation de médicaments.',
      },
      {
        title: 'Essais Cliniques',
        description: 'Conduite d&apos;essais cliniques conformes aux BPF.',
      },
      {
        title: 'Production de Protéines',
        description: 'Synthèse et purification de protéines recombinantes.',
      },
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 section-padding">
        <div className="container-page">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nos Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Une gamme complète de services en biotechnologie et recherche médicale, 
            soutenus par une expertise scientifique de pointe.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          {services.map((section) => (
            <div key={section.category} className="mb-16 last:mb-0">
              <h2 className="text-2xl font-bold mb-8 pb-4 border-b">
                {section.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {section.items.map((service) => (
                  <div
                    key={service.title}
                    className="p-6 rounded-xl border hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-page">
          <div className="bg-primary text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Besoin d&apos;un service spécifique ?</h2>
            <p className="text-xl mb-8 opacity-90">
              Notre équipe est là pour répondre à vos besoins en recherche et développement.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Nous contacter →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}