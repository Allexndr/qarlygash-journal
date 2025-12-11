import { ObjectId } from 'mongodb'

export interface PageDocument {
  _id?: ObjectId
  title: string
  slug: string
  content: string
  // SEO fields
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string[]
  ogImage?: string
  // Status
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

export interface SiteSettingsDocument {
  _id?: ObjectId
  siteName: string
  siteDescription: string
  defaultMetaTitle?: string
  defaultMetaDescription?: string
  defaultOgImage?: string
  // Homepage settings
  featuredArticleId?: ObjectId
  popularArticleIds?: ObjectId[]
  recentArticleIds?: ObjectId[]
  updatedAt: Date
}

