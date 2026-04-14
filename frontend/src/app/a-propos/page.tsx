import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvrez la mission, vision et valeurs de Senbioteck. ' +
    'Un institut dédié à l\'innovation biotech et à la recherche médicale.',
}

const values = [
  {
    title: 'Excellence scientifique',
    description: 'Nous maintenons les plus hauts standards de qualité dans nos recherches.',
  },
  {
    title: 'Innovation continue',
    description: 'Nous repoussons les frontières de la science pour créer des solutions nouvelles.',
  },
  {
    title: 'Accessibilité',
    description: 'Nous travaillons pour rendre les avancées médicales accessibles à tous.',
  },
  {
    title: 'Éthique',
    description: 'Nous respectons les plus strictes normes éthiques dans notre travail.',
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 section-padding">
        <div className="container-page">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            À propos de Senbioteck
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Depuis plus de 15 ans, Senbioteck est à l&apos;avant-garde de la recherche 
            en biotechnologie et en santé.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Notre mission</h2>
              <p className="text-gray-600 mb-4">
                Notre mission est de développer des solutions médicales innovantes 
                qui améliorent la qualité de vie des patients. Nous combinons 
                recherche fondamentale et appliquée pour accélérer le transfert 
                des découvertes vers la clinique.
              </p>
              <p className="text-gray-600">
                À travers nos partenariats avec les meilleurs hôpitaux et 
                universités, nous nous engageons à faire avancer la science 
                médicale tout en maintenant les plus hauts standards éthiques.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Notre vision</h2>
              <p className="text-gray-600 mb-4">
                Nous envisionons un avenir où chaque patient peut bénéficier 
                des dernières avancées en biotechnologie. Notre ambition est 
                de devenir un leader européen de l&apos;innovation médicale.
              </p>
              <p className="text-gray-600">
                Pour y parvenir, nous investissons continuellement dans la 
                recherche, formons les prochaine génération de chercheurs, 
                et maintenons des collaborations internationales stratégiques.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-page">
          <h2 className="text-3xl font-bold text-center mb-12">Nos valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-white">
        <div className="container-page text-center">
          <h2 className="text-3xl font-bold mb-4">Découvrez notre équipe</h2>
          <p className="text-xl mb-8 opacity-90">
            Des chercheurs passionnés et des experts médicaux à votre service.
          </p>
          <a
            href="/equipe"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Découvrir l&apos;équipe →
          </a>
        </div>
      </section>
    </>
  )
}