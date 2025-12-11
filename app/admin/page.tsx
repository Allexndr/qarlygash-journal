'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, Settings, FileText, Users, Package } from 'lucide-react'

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'articles' | 'team' | 'tools' | 'settings'>('articles')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authed = localStorage.getItem('adminAuth') === 'true'
    setIsAuthenticated(authed)
  }, [])

  // В реальном приложении здесь будет проверка авторизации
  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => {
      localStorage.setItem('adminAuth', 'true')
      setIsAuthenticated(true)
    }} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold mb-4">Админ-панель</h1>
          <div className="flex space-x-2 border-b border-gray-200">
            {[
              { id: 'articles', label: 'Статьи', icon: FileText },
              { id: 'team', label: 'Команда', icon: Users },
              { id: 'tools', label: 'Инструменты', icon: Settings },
              { id: 'settings', label: 'Настройки', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === 'settings') {
                      router.push('/admin/settings')
                    } else {
                      setActiveTab(tab.id as any)
                    }
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'articles' && <ArticlesManagement />}
        {activeTab === 'team' && <TeamManagement />}
        {activeTab === 'tools' && <ToolsManagement />}
        {activeTab === 'settings' && <SettingsManagement />}
      </div>
    </div>
  )
}

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data?.error || 'Ошибка авторизации')
        return
      }
      onLogin()
    } catch (err) {
      setError('Ошибка сети')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Вход в админ-панель</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Пароль</label>
            <input
              type="password"
              required
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            {loading ? 'Вход...' : 'Войти'}
          </button>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        </form>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Доступ только для администраторов (Кира П.)
        </p>
      </div>
    </div>
  )
}

function ArticlesManagement() {
  const router = useRouter()
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту статью?')) return

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setArticles(articles.filter(a => a._id !== id))
      } else {
        alert('Ошибка при удалении статьи')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Ошибка при удалении статьи')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Управление статьями</h2>
        <button 
          onClick={() => router.push('/admin/articles/new')}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Добавить статью</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Название</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Автор</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Загрузка...
                </td>
              </tr>
            ) : articles.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Статьи не найдены. Добавьте первую статью.
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr key={article._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{article.title}</td>
                  <td className="px-6 py-4">{article.authorId}</td>
                  <td className="px-6 py-4">
                    {new Date(article.publishedAt).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => router.push(`/admin/articles/${article._id}/edit`)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <Edit size={16} className="text-primary-600" />
                      </button>
                      <button 
                        onClick={() => handleDelete(article._id)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 card">
        <h3 className="font-bold mb-4">Редактирование главной страницы</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Статья недели</label>
            <select className="w-full px-4 py-2 border border-gray-200 rounded-xl">
              <option>Выберите статью</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Популярные статьи</label>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <select key={i} className="w-full px-4 py-2 border border-gray-200 rounded-xl">
                  <option>Выберите статью {i}</option>
                </select>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TeamManagement() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Управление командой</h2>
        <button className="btn-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>Добавить участника</span>
        </button>
      </div>
      <div className="card">
        <p className="text-gray-600">Здесь можно добавлять, редактировать и удалять участников команды.</p>
      </div>
    </div>
  )
}

function ToolsManagement() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Управление инструментами</h2>
        <button className="btn-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>Добавить инструмент</span>
        </button>
      </div>
      <div className="card">
        <p className="text-gray-600">Здесь можно добавлять дыхательные тренажеры и другие инструменты самопомощи.</p>
      </div>
    </div>
  )
}

function SettingsManagement() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Настройки</h2>
      <div className="card">
        <h3 className="font-bold mb-4">Управление администраторами</h3>
        <p className="text-gray-600 mb-4">
          Контроль доступа к админ-панели осуществляется через систему ролей. 
          Только пользователи с ролью «Администратор» могут получить доступ к этой панели.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email администратора</label>
            <input
              type="email"
              placeholder="kira@example.com"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl"
            />
          </div>
          <button className="btn-primary">Добавить администратора</button>
        </div>
      </div>
    </div>
  )
}

