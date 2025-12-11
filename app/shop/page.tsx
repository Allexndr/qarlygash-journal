'use client'

import { useState } from 'react'
import { ShoppingCart, Package } from 'lucide-react'
import { Product } from '@/types'
import Image from 'next/image'

const products: Product[] = [
  {
    id: '1',
    title: 'Журнал "Қарлығаш" - Выпуск 1',
    description: 'Первый выпуск психологического журнала с актуальными статьями',
    price: 2500,
    type: 'single',
    available: true,
  },
  {
    id: '2',
    title: 'Подписка на ежемесячник',
    description: 'Ежемесячная подписка на журнал (дешевле единоразовой покупки)',
    price: 2000,
    type: 'monthly',
    available: true,
  },
  {
    id: '3',
    title: 'Подписка на ежегодник',
    description: 'Годовая подписка на все выпуски журнала',
    price: 20000,
    type: 'yearly',
    available: true,
  },
]

export default function ShopPage() {
  const [cart, setCart] = useState<Product[]>([])
  const [showCheckout, setShowCheckout] = useState(false)

  const addToCart = (product: Product) => {
    setCart([...cart, product])
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Магазин</h1>
          <p className="text-gray-600 text-lg">
            Закажите физические копии журнала или оформите подписку
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <div key={product.id} className="card">
              {product.image && (
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex items-center space-x-2 mb-2">
                <Package size={20} className="text-primary-600" />
                <span className="text-sm text-gray-500 capitalize">
                  {product.type === 'single' && 'Единоразовая покупка'}
                  {product.type === 'monthly' && 'Ежемесячная подписка'}
                  {product.type === 'yearly' && 'Годовая подписка'}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary-600">
                  {product.price.toLocaleString('ru-RU')} ₸
                </span>
                <button
                  onClick={() => addToCart(product)}
                  disabled={!product.available}
                  className="btn-primary flex items-center space-x-2"
                >
                  <ShoppingCart size={20} />
                  <span>В корзину</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart */}
        {cart.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky bottom-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Корзина ({cart.length})</h3>
              <span className="text-2xl font-bold text-primary-600">
                {total.toLocaleString('ru-RU')} ₸
              </span>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="btn-primary w-full"
            >
              Оформить заказ
            </button>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckout && (
          <CheckoutModal
            cart={cart}
            total={total}
            onClose={() => setShowCheckout(false)}
            onSuccess={() => {
              setCart([])
              setShowCheckout(false)
            }}
          />
        )}
      </div>
    </div>
  )
}

function CheckoutModal({
  cart,
  total,
  onClose,
  onSuccess,
}: {
  cart: Product[]
  total: number
  onClose: () => void
  onSuccess: () => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    deliveryMethod: 'almaty' as 'almaty' | 'kazakhpost',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь будет интеграция с платежной системой (Kaspi/банковские карты)
    // и создание заказа в базе данных
    alert('Заказ оформлен! В ближайшее время с вами свяжутся.')
    onSuccess()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Оформление заказа</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Имя</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Телефон</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Адрес доставки</label>
            <textarea
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Способ доставки</label>
            <select
              value={formData.deliveryMethod}
              onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value as 'almaty' | 'kazakhpost' })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="almaty">Доставка по Алматы</option>
              <option value="kazakhpost">KazakhPost</option>
            </select>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium">Итого:</span>
              <span className="text-2xl font-bold text-primary-600">
                {total.toLocaleString('ru-RU')} ₸
              </span>
            </div>
            <div className="flex space-x-4">
              <button type="button" onClick={onClose} className="btn-secondary flex-1">
                Отмена
              </button>
              <button type="submit" className="btn-primary flex-1">
                Оплатить
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Оплата через Kaspi или банковскую карту
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

