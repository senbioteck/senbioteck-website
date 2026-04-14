import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recherche',
  description: 'Explorez nos projets de recherche en biotechnologie et les publications scientifiques Senbioteck.',
}

const projects = [
  {
    title: 'Thérapie Génique pour Maladies Rares',
    description: 'Développement de vecteurs AAV pour le traitement de maladies génétiques rares.',
    status: 'En cours',
    year: '2024',
  },
  {
    title: 'Immunothérapie CAR-T de Nouvelle Génération',
    description: 'Conception de cellules CAR-T avec sécurité améliorée et efficacité accrue.',
    status: 'En cours',
    year: '2024',
  },
  {
    title: 'Biomarqueurs pour le Diagnostic Précose',
    description: 'Identification de signatures moléculaires pour la détection précoce du cancer.',
    status: 'Terminé',
    year: '2023',
  },
  {
    title: 'Vaccins à ARN Messager',
    description: 'Optimisation de la stabilité et de l\'immunogénicité des vaccins mRNA.',
    status: 'En cours',
    year: '2024',
  },
]

const publications = [
  {
    title: 'Novel AAV vectors for CNS gene therapy',
    journal: 'Nature Biotechnology',
    year: '2024',
    authors: 'Dubois M., Martin J-P., et al.',
  },
  {
    title: 'Enhanced CAR-T cell safety through inducible caspase-9',
    journal: 'Cell Stem Cell',
    year: '2024',
    authors: 'Robert T., et al.',
  },
  {
    title: 'Circulating tumor DNA as early biomarker in solid tumors',
    journal: 'Journal of Clinical Oncology',
    year: '2023',
    authors: 'Moreau L., Bernard S., et al.',
  },
]

export default function ResearchPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 section-padding">
        <div className="container-page">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Recherche & Publications
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Nos équipes travaillent sur des projets de recherche innovants 
            pour développer les treatments de demain.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <h2 className="text-3xl font-bold mb-8">Projets de Recherche</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.title}
                className="p-6 rounded-xl border hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    project.status === 'En cours'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {project.status}
                  </span>
                  <span className="text-gray-500">{project.year}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-page">
          <h2 className="text-3xl font-bold mb-8">Publications Récentes</h2>
          <div className="space-y-6">
            {publications.map((pub) => (
              <div
                key={pub.title}
                className="p-6 bg-white rounded-xl border hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">{pub.title}</h3>
                <p className="text-primary font-medium">{pub.journal}</p>
                <p className="text-gray-500 text-sm mt-1">
                  {pub.authors} • {pub.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-white">
        <div className="container-page text-center">
          <h2 className="text-3xl font-bold mb-4">Collaborer avec nous</h2>
          <p className="text-xl mb-8 opacity-90">
            Nous accueillons les partenariats académiques et industriels.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Proposer un partenariat →
          </a>
        </div>
      </section>
    </>
  )
}