import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import { Article } from '@/types'

// Mock data - в реальном приложении это будет из API/базы данных
const featuredArticle: Article = {
  id: '1',
  title: 'Подростковая депрессия',
  slug: 'podrostkovaya-depressiya',
  content: '',
  excerpt: 'Клиническая депрессия у подростков — это психическое расстройство, характеризующееся сниженным настроением, грустью, тоской, отчаянием и другими эмоциональными нарушениями.',
  author: {
    id: '1',
    name: 'А.Скибидиева',
  },
  tags: ['Подростковая депрессия', 'Депрессия', 'Здоровье подростков', 'Кризис'],
  readingTime: 12,
  publishedAt: '2024-01-15',
  featured: true,
}

const popularArticles: Article[] = [
  {
    id: '2',
    title: 'Буллинг в школе: как помочь подростку',
    slug: 'bulling-v-shkole',
    content: '',
    excerpt: 'Практические советы для родителей и педагогов по предотвращению и преодолению буллинга.',
    author: {
      id: '2',
      name: 'Ю.Пак',
    },
    tags: ['Буллинг', 'Школа', 'Подростки'],
    readingTime: 8,
    publishedAt: '2024-01-10',
    popular: true,
  },
  {
    id: '3',
    title: 'Профориентация подростков: современные подходы',
    slug: 'proforientatsiya',
    content: '',
    excerpt: 'Как помочь подростку выбрать профессию в современном мире.',
    author: {
      id: '3',
      name: 'Н.Постоева',
    },
    tags: ['Профориентация', 'Подростки'],
    readingTime: 10,
    publishedAt: '2024-01-05',
    popular: true,
  },
]

const recentArticles: Article[] = [
  {
    id: '4',
    title: 'Коммуникации подростков с родителями',
    slug: 'kommunikatsii-podrostkov',
    content: '',
    excerpt: 'Эффективные стратегии улучшения общения между подростками и родителями.',
    author: {
      id: '2',
      name: 'Ю.Пак',
    },
    tags: ['Подростки', 'Родители', 'Коммуникации'],
    readingTime: 7,
    publishedAt: '2024-01-20',
  },
  {
    id: '5',
    title: 'Возрастные кризисы подросткового периода',
    slug: 'vozrastnye-krizisy',
    content: '',
    excerpt: 'Понимание кризисов переходного возраста и способы их преодоления.',
    author: {
      id: '1',
      name: 'А.Скибидиева',
    },
    tags: ['Кризис', 'Переходный возраст'],
    readingTime: 9,
    publishedAt: '2024-01-18',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-800 to-accent-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Психологический журнал Қарлығаш
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Научные статьи, обзоры и отчеты о фундаментальных и прикладных исследованиях 
              в области психологии подростков и кризисной психологии
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/articles" className="btn-primary bg-white text-primary-700 hover:bg-primary-50">
                Читать статьи
              </Link>
              <Link href="/tools" className="btn-secondary bg-white/10 text-white hover:bg-white/20 border border-white/20">
                Инструменты самопомощи
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Статья недели</h2>
          <ArticleCard article={featuredArticle} featured />
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Популярные статьи</h2>
            <Link href="/articles?sort=popular" className="text-primary-600 hover:text-primary-700 font-medium">
              Все популярные →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Последние статьи</h2>
            <Link href="/articles?sort=recent" className="text-primary-600 hover:text-primary-700 font-medium">
              Все статьи →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary-500 to-primary-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Подпишитесь на рассылку</h2>
          <p className="text-lg mb-8 text-white/90">
            Получайте свежие статьи и материалы прямо на почту
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button type="submit" className="btn-primary bg-white text-primary-700 hover:bg-primary-50">
              Подписаться
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

