import ArticleCard from '@/components/ArticleCard'
import { Article } from '@/types'
import { getArticles, mapArticle } from '@/lib/db'

export default async function ResearchPage() {
  const articlesData = await getArticles({ status: 'published' });
  const allArticles: Article[] = await Promise.all(articlesData.map(mapArticle));

  // Filter for research articles (those having 'Исследование' tag)
  const researchArticles = allArticles.filter(a =>
    a.tags.some(tag => tag === 'Исследование' || tag === 'Research') || a.slug.includes('issledovanie')
  );

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

