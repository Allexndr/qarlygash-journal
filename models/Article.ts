import { ObjectId } from 'mongodb'

export interface ArticleDocument {
  _id?: ObjectId
  title: string
  slug: string
  content: string
  excerpt: string
  authorId: ObjectId
  tags: string[]
  readingTime: number
  publishedAt: Date
  updatedAt?: Date
  heroImage?: string
  featured?: boolean
  popular?: boolean
  views?: number
  // SEO fields
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string[]
  ogImage?: string
  // Status
  status: 'draft' | 'published' | 'archived'
  createdAt: Date
}

export interface AuthorDocument {
  _id?: ObjectId
  name: string
  bio?: string
  credentials?: string
  photo?: string
  email?: string
  createdAt: Date
}

