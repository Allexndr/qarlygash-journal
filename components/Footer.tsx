import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 relative flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Қарлығаш"
                  width={40}
                  height={40}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span className="text-xl font-bold text-gray-900">Қарлығаш</span>
            </Link>
            <p className="text-gray-600 text-sm">
              о вашем психологическом благополучии
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/cooperation" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                  Сотрудничество с ЮНСИ
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                  Магазин
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                  Наша команда
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                  Библиотека статей
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Placeholder */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Социальные сети</h3>
            <p className="text-gray-500 text-sm">тут будут соц.сети</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Қарлығаш. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

