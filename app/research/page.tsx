import ArticleCard from '@/components/ArticleCard'
import { Article } from '@/types'

// Mock data - в реальном приложении будет из API с фильтром по типу "исследование"
const researchArticles: Article[] = [
  {
    id: '6',
    title: 'Исследование буллинга в казахстанских школах',
    slug: 'issledovanie-bullinga',
    content: '',
    excerpt: 'Результаты масштабного исследования распространенности буллинга среди подростков в школах Казахстана.',
    author: { id: '2', name: 'Ю.Пак' },
    tags: ['Исследование', 'Буллинг', 'Школа'],
    readingTime: 15,
    publishedAt: '2024-01-12',
  },
  {
    id: '7',
    title: 'Влияние социальных сетей на психическое здоровье подростков',
    slug: 'sotsialnye-seti',
    content: '',
    excerpt: 'Анализ влияния социальных сетей на эмоциональное состояние и самооценку подростков.',
    author: { id: '1', name: 'А.Скибидиева' },
    tags: ['Исследование', 'Социальные сети', 'Психическое здоровье'],
    readingTime: 18,
    publishedAt: '2024-01-08',
  },
]

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Исследования</h1>
          <p className="text-gray-600 text-lg">
            Фундаментальные и прикладные исследования в области подростковой психологии
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}

