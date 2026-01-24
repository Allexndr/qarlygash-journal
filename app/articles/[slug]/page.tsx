import { notFound } from 'next/navigation'
import { getArticleBySlug, getAuthorById } from '@/lib/db'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Clock, User, Share2 } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import { Metadata } from 'next'
import Image from 'next/image'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    return {}
  }

  const author = article.authorId ? await getAuthorById(article.authorId.toString()) : null

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    keywords: article.metaKeywords || article.tags,
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      images: article.ogImage ? [article.ogImage] : [],
      type: 'article',
      publishedTime: article.publishedAt.toISOString(),
      modifiedTime: article.updatedAt?.toISOString(),
      authors: author ? [author.name] : [],
      tags: article.tags,
    },
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const author = article.authorId ? await getAuthorById(article.authorId.toString()) : null

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        type="Article"
        data={{
          title: article.title,
          description: article.excerpt,
          excerpt: article.excerpt,
          image: article.ogImage || article.heroImage,
          publishedAt: article.publishedAt.toISOString(),
          updatedAt: article.updatedAt?.toISOString() || article.publishedAt.toISOString(),
          slug: article.slug,
          author: author ? { name: author.name } : undefined,
        }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[
            { label: 'Главная', href: '/' },
            { label: 'Статьи', href: '/articles' },
            { label: article.title },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-900 to-accent-900 text-white py-12 sm:py-16 md:py-20 mb-6 sm:mb-8">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-primary-100">
              {author && (
                <div className="flex items-center space-x-2">
                  <User size={18} className="sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">{author.name}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Clock size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">{article.readingTime} минут</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tags */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Reading Time Badge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="inline-flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-full">
          <Clock size={16} />
          <span className="text-sm font-medium">Время чтения: {article.readingTime} минут</span>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Author Info */}
        {author && author.bio && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-start space-x-4">
              {author.photo && (
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src={author.photo}
                    alt={author.name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="font-bold text-lg mb-1">{author.name}</h3>
                {author.credentials && (
                  <p className="text-gray-600 text-sm mb-2">{author.credentials}</p>
                )}
                {author.bio && (
                  <p className="text-gray-700">{author.bio}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Share Buttons */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium">Поделиться:</span>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Share2 size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}
