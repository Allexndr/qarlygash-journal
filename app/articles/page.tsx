'use client'

import { useState, useMemo } from 'react'
import ArticleCard from '@/components/ArticleCard'
import { Search, Filter } from 'lucide-react'
import { Article } from '@/types'

// Mock data - в реальном приложении будет из API
const allArticles: Article[] = [
  {
    id: '1',
    title: 'Подростковая депрессия',
    slug: 'podrostkovaya-depressiya',
    content: '',
    excerpt: 'Клиническая депрессия у подростков — это психическое расстройство...',
    author: { id: '1', name: 'А.Скибидиева' },
    tags: ['Подростковая депрессия', 'Депрессия', 'Здоровье подростков'],
    readingTime: 12,
    publishedAt: '2024-01-15',
    popular: true,
  },
  {
    id: '2',
    title: 'Буллинг в школе: как помочь подростку',
    slug: 'bulling-v-shkole',
    content: '',
    excerpt: 'Практические советы для родителей и педагогов...',
    author: { id: '2', name: 'Ю.Пак' },
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
    excerpt: 'Как помочь подростку выбрать профессию...',
    author: { id: '3', name: 'Н.Постоева' },
    tags: ['Профориентация', 'Подростки'],
    readingTime: 10,
    publishedAt: '2024-01-05',
  },
]

const allTags = Array.from(new Set(allArticles.flatMap(a => a.tags)))

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'alphabetical'>('recent')

  const filteredArticles = useMemo(() => {
    let filtered = [...allArticles]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        article =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(article =>
        selectedTags.some(tag => article.tags.includes(tag))
      )
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b.popular ? 1 : 0) - (a.popular ? 1 : 0)
        case 'alphabetical':
          return a.title.localeCompare(b.title)
        case 'recent':
        default:
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      }
    })

    return filtered
  }, [searchQuery, selectedTags, sortBy])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Библиотека статей</h1>
          <p className="text-gray-600 text-lg">
            Научные статьи, обзоры и исследования в области подростковой психологии
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Поиск статей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-4 mb-6">
            <Filter size={20} className="text-gray-400" />
            <span className="text-gray-600 font-medium">Сортировка:</span>
            <div className="flex space-x-2">
              {(['recent', 'popular', 'alphabetical'] as const).map((sort) => (
                <button
                  key={sort}
                  onClick={() => setSortBy(sort)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sortBy === sort
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {sort === 'recent' && 'По дате'}
                  {sort === 'popular' && 'Популярные'}
                  {sort === 'alphabetical' && 'А-Я'}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <span className="text-gray-600 font-medium mb-2 block">Фильтр по темам:</span>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`tag ${selectedTags.includes(tag) ? 'tag-active' : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <p className="text-gray-600 mb-6">
            Найдено статей: {filteredArticles.length}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Статьи не найдены</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

