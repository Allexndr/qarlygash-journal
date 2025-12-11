'use client'

import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    siteName: 'Қарлығаш',
    siteDescription: '',
    defaultMetaTitle: '',
    defaultMetaDescription: '',
    defaultOgImage: '',
    featuredArticleId: '',
    popularArticleIds: [] as string[],
    recentArticleIds: [] as string[],
  })

  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setSettings((prev) => ({
            ...prev,
            ...data,
            featuredArticleId: data.featuredArticleId?.toString() || '',
            popularArticleIds: data.popularArticleIds?.map((id: any) => id.toString()) || [],
            recentArticleIds: data.recentArticleIds?.map((id: any) => id.toString()) || [],
          }))
        }
      })
      .catch(console.error)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/site-settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        alert('Настройки сохранены!')
      } else {
        alert('Ошибка при сохранении настроек')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Ошибка при сохранении настроек')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Настройки сайта</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          {/* General Settings */}
          <div>
            <h2 className="text-xl font-bold mb-4">Общие настройки</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Название сайта</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Описание сайта</label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* SEO Defaults */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold mb-4">SEO по умолчанию</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Default Meta Title</label>
                <input
                  type="text"
                  value={settings.defaultMetaTitle}
                  onChange={(e) => setSettings({ ...settings, defaultMetaTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Default Meta Description</label>
                <textarea
                  value={settings.defaultMetaDescription}
                  onChange={(e) => setSettings({ ...settings, defaultMetaDescription: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Default OG Image URL</label>
                <input
                  type="url"
                  value={settings.defaultOgImage}
                  onChange={(e) => setSettings({ ...settings, defaultOgImage: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Homepage Settings */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold mb-4">Настройки главной страницы</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Статья недели (ID)</label>
                <input
                  type="text"
                  value={settings.featuredArticleId}
                  onChange={(e) => setSettings({ ...settings, featuredArticleId: e.target.value })}
                  placeholder="ID статьи"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Популярные статьи (ID через запятую)</label>
                <input
                  type="text"
                  value={settings.popularArticleIds.join(', ')}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    popularArticleIds: e.target.value.split(',').map(id => id.trim()).filter(Boolean)
                  })}
                  placeholder="ID1, ID2, ID3"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Последние статьи (ID через запятую)</label>
                <input
                  type="text"
                  value={settings.recentArticleIds.join(', ')}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    recentArticleIds: e.target.value.split(',').map(id => id.trim()).filter(Boolean)
                  })}
                  placeholder="ID1, ID2, ID3"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center space-x-2"
            >
              <Save size={20} />
              <span>{loading ? 'Сохранение...' : 'Сохранить настройки'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

