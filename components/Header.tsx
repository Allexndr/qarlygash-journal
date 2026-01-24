'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 relative flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Қарлығаш"
                width={32}
                height={32}
                className="object-contain sm:w-[40px] sm:h-[40px]"
                unoptimized
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
              Қарлығаш
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/articles" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Статьи
            </Link>
            <Link href="/research" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Исследования
            </Link>
            <Link href="/tools" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Инструменты
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Магазин
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              О нас
            </Link>
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm"
            >
              Войти
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden pb-3 space-y-1">
            <Link
              href="/articles"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Статьи
            </Link>
            <Link
              href="/research"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Исследования
            </Link>
            <Link
              href="/tools"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Инструменты
            </Link>
            <Link
              href="/shop"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Магазин
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              О нас
            </Link>
            <Link
              href="/auth/login"
              className="block px-3 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Войти
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

