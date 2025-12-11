import Link from 'next/link'

export default function ArticleNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Статья не найдена</h1>
        <p className="text-gray-600 mb-8">Извините, запрашиваемая статья не существует или была удалена.</p>
        <Link href="/articles" className="btn-primary">
          Вернуться к статьям
        </Link>
      </div>
    </div>
  )
}

