import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  return {
    title: slug.replace(/-/g, ' '),
    description: `Article Senbioteck sur ${slug.replace(/-/g, ' ')}`,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 section-padding">
        <div className="container-page">
          <a href="/blog" className="text-primary hover:underline mb-4 inline-block">
            ← Retour au blog
          </a>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {slug.replace(/-/g, ' ')}
          </h1>
          <p className="text-gray-600">
            Article détaillé sur {slug.replace(/-/g, ' ')}
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <article className="max-w-3xl">
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-8" />
            <div className="prose prose-lg max-w-none">
              <p>
                Cet article présente les dernières avancées en matière de {slug.replace(/-/g, ' ')}. 
                Notre équipe de chercheurs travaille continuellement pour pushes les frontières 
                de la science et développer des solutions innovantes.
              </p>
              <h2>Contexte</h2>
              <p>
                Dans le domaine de la biotechnologie, les avancées sont constantes. 
                Notre institut s&apos;engage à rester à la pointe de la recherche pour 
                offrir les meilleures solutions aux patients.
              </p>
              <h2>Résultats</h2>
              <p>
                Les résultats de nos études démontrent l&apos;efficacité de nos approches 
                et ouvrent de nouvelles perspectives pour le traitement de diverses pathologies.
              </p>
              <h2>Conclusion</h2>
              <p>
                Ces avancées représentent un pas significatif vers l&apos;amélioration des soins 
                et la mise en place de traitements toujours plus efficaces.
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}