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
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
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
            <span className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
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
          <nav className="md:hidden pb-4 space-y-2">
            <Link
              href="/articles"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Статьи
            </Link>
            <Link
              href="/research"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Исследования
            </Link>
            <Link
              href="/tools"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Инструменты
            </Link>
            <Link
              href="/shop"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Магазин
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              О нас
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

