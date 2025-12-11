export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: Author
  tags: string[]
  readingTime: number
  publishedAt: string
  updatedAt?: string
  heroImage?: string
  featured?: boolean
  popular?: boolean
  views?: number
}

export interface Author {
  id: string
  name: string
  bio?: string
  credentials?: string
  photo?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  age?: number
  photo?: string
}

export interface SelfHelpTool {
  id: string
  title: string
  description: string
  type: 'breathing' | 'meditation' | 'exercise' | 'other'
  content: string
  icon?: string
}

export interface Product {
  id: string
  title: string
  description: string
  price: number
  image?: string
  type: 'single' | 'monthly' | 'yearly' | 'weekly'
  available: boolean
}

export interface Order {
  id: string
  products: Product[]
  total: number
  customerName: string
  email: string
  phone: string
  address: string
  deliveryMethod: 'almaty' | 'kazakhpost'
  status: 'pending' | 'paid' | 'shipped' | 'delivered'
  createdAt: string
}

