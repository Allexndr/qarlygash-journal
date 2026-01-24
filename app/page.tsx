import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import { Article, Author } from '@/types'
import { MotionSection, MotionDiv } from '@/components/MotionDiv'
import { getArticles, mapArticle } from '@/lib/db'

export default async function Home() {
  const articlesData = await getArticles({ status: 'published' });
  const articles = await Promise.all(articlesData.map(mapArticle));

  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const popularArticles = articles.filter(a => a.popular).slice(0, 3);
  const recentArticles = articles.slice(0, 3);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <MotionSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-primary-700 via-primary-800 to-accent-800 text-white py-10 sm:py-14 md:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Психологический журнал Қарлығаш
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-primary-100 mt-6">
                Научные статьи, обзоры и отчеты о фундаментальных и прикладных исследованиях
                в области психологии подростков и кризисной психологии
              </p>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3"
            >
              <Link href="/articles" className="btn-primary bg-white text-primary-700 hover:bg-primary-50 text-center">
                Читать статьи
              </Link>
              <Link href="/tools" className="btn-secondary bg-white/10 text-white hover:bg-white/20 border border-white/20 text-center">
                Инструменты самопомощи
              </Link>
            </MotionDiv>
          </div>
        </div>
      </MotionSection>

      {/* Featured Article */}
      <MotionSection
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Статья недели</h2>
          <ArticleCard article={featuredArticle} featured />
        </div>
      </MotionSection>

      {/* Popular Articles */}
      <MotionSection
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 bg-gray-50"
      >
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
      </MotionSection>

      {/* Recent Articles */}
      <MotionSection
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 bg-white"
      >
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
      </MotionSection>

      {/* CTA Section */}
      <MotionSection
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="py-16 bg-gradient-to-r from-secondary-500 to-primary-500 text-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Подпишитесь на рассылку</h2>
          <p className="text-lg mb-8 text-white/90">
            Получайте свежие статьи и материалы прямо на почту
          </p>
          <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white text-base"
            />
            <button type="submit" className="btn-primary bg-white text-primary-700 hover:bg-primary-50 py-3 px-6 text-base font-medium">
              Подписаться
            </button>
          </form>
        </div>
      </MotionSection>
    </div>
  )
}

