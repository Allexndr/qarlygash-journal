import { ObjectId } from 'mongodb'

export interface SelfHelpToolDocument {
  _id?: ObjectId
  title: string
  description: string
  type: 'breathing' | 'meditation' | 'exercise' | 'other'
  content: string
  icon?: string
  // SEO fields
  metaTitle?: string
  metaDescription?: string
  // Status
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

