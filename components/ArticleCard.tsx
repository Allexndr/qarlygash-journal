import Link from 'next/link'
import { Clock, User } from 'lucide-react'
import { Article } from '@/types'
import Image from 'next/image'

interface ArticleCardProps {
  article: Article
  featured?: boolean
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`} className="group">
      <article className={`card h-full ${featured ? 'md:col-span-2' : ''}`}>
        {article.heroImage && (
          <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={article.heroImage}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-3">
          {Array.isArray(article.tags) && article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag text-xs">
              {tag}
            </span>
          ))}
        </div>

        <h2 className={`font-bold mb-2 group-hover:text-primary-600 transition-colors leading-tight ${featured ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
          }`}>
          {article.title || 'Без названия'}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-sm sm:text-base">
          {article.excerpt}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 text-sm text-gray-500">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center space-x-1">
              <User size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">{article.author?.name || 'Аноним'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">{article.readingTime || 5} мин</span>
            </div>
          </div>
          <span className="text-gray-400 text-xs sm:text-sm">
            {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'short',
              year: article.publishedAt.includes(new Date().getFullYear().toString()) ? undefined : 'numeric'
            }) : ''}
          </span>
        </div>
      </article>
    </Link>
  )
}

