import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog & Actualités',
  description: 'Suivez les dernières actualités et publications de Senbioteck en biotechnologie et santé.',
}

const categories = [
  { name: 'Tous', slug: 'all' },
  { name: 'Recherche', slug: 'research' },
  { name: 'Innovation', slug: 'innovation' },
  { name: 'Santé', slug: 'health' },
  { name: 'Événements', slug: 'events' },
]

const blogPosts = [
  {
    slug: 'nouvelle-therapie-genique',
    title: 'Avancées dans la thérapie génique pour les maladies rares',
    excerpt: 'Notre équipe a réalisé des progrés significatifs dans le développement de nouvelles therapies géniques.',
    category: 'Recherche',
    tags: ['thérapie génique', 'maladies rares', 'AAV'],
    date: '2024-04-10',
    author: 'Marie Dubois',
  },
  {
    slug: 'partenariat-universite',
    title: 'Nouveau partenariat avec l\'Université Paris-Saclay',
    excerpt: 'Senbioteck signe un accord de collaboration stratégique avec l\'Université Paris-Saclay.',
    category: 'Innovation',
    tags: ['partenariat', 'collaboration', 'universités'],
    date: '2024-04-05',
    author: 'Jean-Pierre Martin',
  },
  {
    slug: 'conference-biotech-2024',
    title: 'Retour sur la conférence Biotech 2024',
    excerpt: 'Notre équipe était présente à la conférence annuelle Biotech pour présenter nos dernières recherches.',
    category: 'Événements',
    tags: ['conférence', 'biotechnologie', 'événement'],
    date: '2024-03-28',
    author: 'Sophie Bernard',
  },
  {
    slug: 'diagnostic-precoce-cancer',
    title: 'Les biomarqueurs revolutionnaires pour le diagnostic précoce',
    excerpt: 'Une nouvelle approche pour detecter le cancer à un stade très précoce grâce à des biomarqueurs innovants.',
    category: 'Santé',
    tags: ['cancer', 'diagnostic', 'biomarqueurs'],
    date: '2024-03-20',
    author: 'Lucas Moreau',
  },
  {
    slug: 'vaccins-mrna-ameliores',
    title: 'Nouvelle génération de vaccins à ARN messager',
    excerpt: 'Amélioration de la stabilité et de l\'efficacité des vaccines à ARN messager.',
    category: 'Recherche',
    tags: ['vaccins', 'ARN messager', 'immunologie'],
    date: '2024-03-15',
    author: 'Thomas Robert',
  },
  {
    slug: 'prix-excellence-recherche',
    title: 'Senbioteck récompensé pour l\'excellence en recherche',
    excerpt: 'Notre équipe a reçu le prix de l\'excellence en recherche biomédicale 2024.',
    category: 'Innovation',
    tags: ['prix', 'reconnaissance', 'excellence'],
    date: '2024-03-10',
    author: 'Marie Dubois',
  },
]

export default function BlogPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 section-padding">
        <div className="container-page">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Blog & Actualités
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Suivez nos dernières avancées en recherche, nos actualités 
            et les événements Senbioteck.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  cat.slug === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-6 rounded-xl border hover:shadow-lg transition-shadow"
              >
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4" />
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(post.date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-12">
            <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
              Précédent
            </button>
            <button className="px-4 py-2 rounded-lg bg-primary text-white">1</button>
            <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">2</button>
            <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">3</button>
            <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
              Suivant
            </button>
          </div>
        </div>
      </section>
    </>
  )
}