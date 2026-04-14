import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Équipe',
  description: 'Découvrez l\'équipe Senbioteck - chercheurs, médecins et experts en biotechnologie.',
}

const team = [
  {
    firstName: 'Marie',
    lastName: 'Dubois',
    role: 'Directrice Générale',
    department: 'Direction',
    bio: 'Plus de 20 ans d\'expérience dans la recherche biomédicale. Ancienne directrice de recherche à l\'Institut Pasteur.',
  },
  {
    firstName: 'Jean-Pierre',
    lastName: 'Martin',
    role: 'Directeur Scientifique',
    department: 'Recherche',
    bio: 'Spécialiste en génomique et médecine personnalisée. Auteur de plus de 100 publications scientifiques.',
  },
  {
    firstName: 'Sophie',
    lastName: 'Bernard',
    role: 'Cheffe de Projet Clinique',
    department: 'Développement',
    bio: 'Expertise en conduite d\'essais cliniques internationaux. PhD en pharmacology de l\'Université Paris-Saclay.',
  },
  {
    firstName: 'Lucas',
    lastName: 'Moreau',
    role: 'Responsable Diagnostic',
    department: 'Diagnostic',
    bio: 'Spécialiste en diagnostic moléculaire et développement de tests compagnons.',
  },
  {
    firstName: 'Claire',
    lastName: 'Petit',
    role: 'Responsable Qualité',
    department: 'Qualité',
    bio: 'Experte en systèmes qualité pharma et certifications BPF/BPL.',
  },
  {
    firstName: 'Thomas',
    lastName: 'Robert',
    role: 'Chercheur Principal',
    department: 'Recherche',
    bio: 'Expert en immunothérapie et développement de CAR-T cells.',
  },
]

export default function TeamPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 section-padding">
        <div className="container-page">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Notre Équipe
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Des chercheurs passionnés et des experts médicaux dédiés à 
            l&apos;avancement de la biotechnologie et à l&apos;amélioration des soins.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={`${member.firstName}-${member.lastName}`}
                className="p-6 rounded-xl border hover:shadow-lg transition-shadow"
              >
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4" />
                <h3 className="text-xl font-semibold">
                  {member.firstName} {member.lastName}
                </h3>
                <p className="text-primary font-medium">{member.role}</p>
                <p className="text-gray-500 text-sm mb-3">{member.department}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-page text-center">
          <h2 className="text-3xl font-bold mb-4">Rejoignez-nous</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Nous sommes toujours à la recherche de talents passionnés pour 
            renforcer notre équipe de recherche.
          </p>
          <a
            href="/contact"
            className="btn-primary"
          >
            Voir les opportunités →
          </a>
        </div>
      </section>
    </>
  )
}