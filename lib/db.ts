import { getDatabase, isMongoConfigured } from './mongodb'
import { ObjectId } from 'mongodb'
import type { ArticleDocument } from '@/models/Article'
import type { AuthorDocument } from '@/models/Article'
import type { PageDocument, SiteSettingsDocument } from '@/models/Page'
import type { TeamMemberDocument } from '@/models/Team'
import type { SelfHelpToolDocument } from '@/models/Tool'
import type { AdminDocument } from '@/models/Admin'
import bcrypt from 'bcryptjs'

const COLLECTIONS = {
  articles: 'articles',
  authors: 'authors',
  pages: 'pages',
  siteSettings: 'siteSettings',
  teamMembers: 'teamMembers',
  tools: 'tools',
  admins: 'admins',
} as const

// -------- Mock data for development when MongoDB is not configured --------
const mockAuthors: AuthorDocument[] = []

const mockArticles: ArticleDocument[] = []

const mockTools: SelfHelpToolDocument[] = [
  {
    _id: undefined,
    title: 'Дыхательный тренажер',
    description: 'Техника глубокого дыхания для снижения стресса и тревоги',
    type: 'breathing',
    content: 'Инструкция по использованию дыхательного тренажера...',
    status: 'published',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
]

const mockTeam: TeamMemberDocument[] = [
  {
    _id: undefined,
    name: 'Постоева Кира',
    role: 'Идейный вдохновитель',
    bio: 'Идея родилась в кризисный период — нужен был источник информации и поддержки.',
    age: 16,
    order: 1,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
]

const mockAdmins: AdminDocument[] = [
  {
    _id: undefined,
    email: 'admin@example.com',
    // пароль: admin1234 (захэширован)
    passwordHash: bcrypt.hashSync('admin1234', 10),
    name: 'Администратор',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
  },
]

function mockFilterArticles(filter?: { status?: string; featured?: boolean; popular?: boolean }) {
  return mockArticles.filter((a) => {
    if (filter?.status && a.status !== filter.status) return false
    if (filter?.featured !== undefined && a.featured !== filter.featured) return false
    if (filter?.popular !== undefined && a.popular !== filter.popular) return false
    return true
  })
}

export async function mapArticle(doc: any): Promise<any> {
  let author: any = { id: '', name: 'Аноним', bio: '', credentials: '', photo: '' };

  if (doc.authorId) {
    const authorDoc = await getAuthorById(doc.authorId.toString())
    if (authorDoc) {
      author = {
        id: authorDoc._id?.toString() || '',
        name: authorDoc.name || '',
        bio: authorDoc.bio,
        credentials: authorDoc.credentials,
        photo: authorDoc.photo,
      }
    }
  }

  return {
    id: doc._id?.toString() || '',
    title: doc.title,
    slug: doc.slug,
    content: doc.content,
    excerpt: doc.excerpt,
    author: author,
    tags: doc.tags,
    readingTime: doc.readingTime,
    publishedAt: doc.publishedAt.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
    heroImage: doc.heroImage,
    featured: doc.featured,
    popular: doc.popular,
    views: doc.views,
  }
}

// Articles
export async function getArticles(filter?: { status?: string; featured?: boolean; popular?: boolean }) {
  if (!isMongoConfigured) {
    return mockFilterArticles(filter).sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
    )
  }

  const db = await getDatabase()
  const query: any = {}

  if (filter?.status) query.status = filter.status
  if (filter?.featured !== undefined) query.featured = filter.featured
  if (filter?.popular !== undefined) query.popular = filter.popular

  return db.collection<ArticleDocument>(COLLECTIONS.articles)
    .find(query)
    .sort({ publishedAt: -1 })
    .toArray()
}

export async function getArticleBySlug(slug: string) {
  if (!isMongoConfigured) {
    return mockArticles.find((a) => a.slug === slug && a.status === 'published') || null
  }
  const db = await getDatabase()
  return db.collection<ArticleDocument>(COLLECTIONS.articles)
    .findOne({ slug, status: 'published' })
}

export async function getArticleById(id: string) {
  if (!isMongoConfigured) {
    return mockArticles.find((a) => (a._id as any)?.toString?.() === id) || null
  }
  const db = await getDatabase()
  const { ObjectId } = await import('mongodb')
  return db.collection<ArticleDocument>(COLLECTIONS.articles)
    .findOne({ _id: new ObjectId(id) })
}

export async function createArticle(article: Omit<ArticleDocument, '_id' | 'createdAt'>) {
  if (!isMongoConfigured) {
    throw new Error('MongoDB is not configured. Add MONGODB_URI to .env.local')
  }
  const db = await getDatabase()
  return db.collection<ArticleDocument>(COLLECTIONS.articles)
    .insertOne({
      ...article,
      createdAt: new Date(),
    } as ArticleDocument)
}

export async function updateArticle(id: string, updates: Partial<ArticleDocument>) {
  if (!isMongoConfigured) {
    throw new Error('MongoDB is not configured. Add MONGODB_URI to .env.local')
  }
  const db = await getDatabase()
  const { ObjectId } = await import('mongodb')
  return db.collection<ArticleDocument>(COLLECTIONS.articles)
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    )
}

export async function deleteArticle(id: string) {
  if (!isMongoConfigured) {
    throw new Error('MongoDB is not configured. Add MONGODB_URI to .env.local')
  }
  const db = await getDatabase()
  const { ObjectId } = await import('mongodb')
  return db.collection<ArticleDocument>(COLLECTIONS.articles)
    .deleteOne({ _id: new ObjectId(id) })
}

// Authors
export async function getAuthors() {
  if (!isMongoConfigured) {
    return mockAuthors
  }
  const db = await getDatabase()
  return db.collection<AuthorDocument>(COLLECTIONS.authors)
    .find({})
    .sort({ name: 1 })
    .toArray()
}

export async function getAuthorById(id: string) {
  if (!isMongoConfigured) {
    return mockAuthors.find((a) => (a._id as any)?.toString?.() === id) || mockAuthors[0] || null
  }
  const db = await getDatabase()
  const { ObjectId } = await import('mongodb')
  return db.collection<AuthorDocument>(COLLECTIONS.authors)
    .findOne({ _id: new ObjectId(id) })
}

export async function createAuthor(author: Omit<AuthorDocument, '_id' | 'createdAt'>) {
  if (!isMongoConfigured) {
    throw new Error('MongoDB is not configured. Add MONGODB_URI to .env.local')
  }
  const db = await getDatabase()
  return db.collection<AuthorDocument>(COLLECTIONS.authors)
    .insertOne({
      ...author,
      createdAt: new Date(),
    } as AuthorDocument)
}

// Pages
export async function getPageBySlug(slug: string) {
  if (!isMongoConfigured) {
    return null
  }
  const db = await getDatabase()
  return db.collection<PageDocument>(COLLECTIONS.pages)
    .findOne({ slug, status: 'published' })
}

export async function getPages() {
  if (!isMongoConfigured) {
    return []
  }
  const db = await getDatabase()
  return db.collection<PageDocument>(COLLECTIONS.pages)
    .find({ status: 'published' })
    .sort({ createdAt: -1 })
    .toArray()
}

export async function createPage(page: Omit<PageDocument, '_id' | 'createdAt' | 'updatedAt'>) {
  if (!isMongoConfigured) {
    throw new Error('MongoDB is not configured. Add MONGODB_URI to .env.local')
  }
  const db = await getDatabase()
  const now = new Date()
  return db.collection<PageDocument>(COLLECTIONS.pages)
    .insertOne({
      ...page,
      createdAt: now,
      updatedAt: now,
    } as PageDocument)
}

export async function updatePage(id: string, updates: Partial<PageDocument>) {
  if (!isMongoConfigured) {
    throw new Error('MongoDB is not configured. Add MONGODB_URI to .env.local')
  }
  const db = await getDatabase()
  const { ObjectId } = await import('mongodb')
  return db.collection<PageDocument>(COLLECTIONS.pages)
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    )
}

// Site Settings
export async function getSiteSettings() {
  if (!isMongoConfigured) {
    return {
      siteName: 'Қарлығаш',
      siteDescription: 'Психологический журнал',
      updatedAt: new Date(),
    } as SiteSettingsDocument
  }
  const db = await getDatabase()
  let settings = await db.collection<SiteSettingsDocument>(COLLECTIONS.siteSettings)
    .findOne({})

  if (!settings) {
    // Create default settings
    const defaultSettings: SiteSettingsDocument & { _id: ObjectId } = {
      _id: new ObjectId(),
      siteName: 'Қарлығаш',
      siteDescription: 'Психологический журнал',
      updatedAt: new Date(),
    }
    await db.collection<SiteSettingsDocument>(COLLECTIONS.siteSettings)
      .insertOne(defaultSettings)
    settings = await db.collection<SiteSettingsDocument>(COLLECTIONS.siteSettings)
      .findOne({ _id: defaultSettings._id })
  }

  return settings
}

export async function updateSiteSettings(updates: Partial<SiteSettingsDocument>) {
  if (!isMongoConfigured) {
    throw new Error('MongoDB is not configured. Add MONGODB_URI to .env.local')
  }
  const db = await getDatabase()
  return db.collection<SiteSettingsDocument>(COLLECTIONS.siteSettings)
    .updateOne(
      {},
      { $set: { ...updates, updatedAt: new Date() } },
      { upsert: true }
    )
}

// Team Members
export async function getTeamMembers() {
  if (!isMongoConfigured) {
    return mockTeam
  }
  const db = await getDatabase()
  return db.collection<TeamMemberDocument>(COLLECTIONS.teamMembers)
    .find({})
    .sort({ order: 1 })
    .toArray()
}

export async function createTeamMember(member: Omit<TeamMemberDocument, '_id' | 'createdAt' | 'updatedAt'>) {
  if (!isMongoConfigured) {
    throw new Error('MongoDB is not configured. Add MONGODB_URI to .env.local')
  }
  const db = await getDatabase()
  const now = new Date()
  return db.collection<TeamMemberDocument>(COLLECTIONS.teamMembers)
    .insertOne({
      ...member,
      createdAt: now,
      updatedAt: now,
    } as TeamMemberDocument)
}

export async function updateTeamMember(id: string, updates: Partial<TeamMemberDocument>) {
  if (!isMongoConfigured) {
    throw new Error('MongoDB is not configured. Add MONGODB_URI to .env.local')
  }
  const db = await getDatabase()
  const { ObjectId } = await import('mongodb')
  return db.collection<TeamMemberDocument>(COLLECTIONS.teamMembers)
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    )
}

export async function deleteTeamMember(id: string) {
  if (!isMongoConfigured) {
    throw new Error('MongoDB is not configured. Add MONGODB_URI to .env.local')
  }
  const db = await getDatabase()
  const { ObjectId } = await import('mongodb')
  return db.collection<TeamMemberDocument>(COLLECTIONS.teamMembers)
    .deleteOne({ _id: new ObjectId(id) })
}

// Tools
export async function getTools(filter?: { status?: string }) {
  if (!isMongoConfigured) {
    if (filter?.status) {
      return mockTools.filter((t) => t.status === filter.status)
    }
    return mockTools
  }
  const db = await getDatabase()
  const query: any = {}
  if (filter?.status) query.status = filter.status

  return db.collection<SelfHelpToolDocument>(COLLECTIONS.tools)
    .find(query)
    .sort({ createdAt: -1 })
    .toArray()
}

export async function createTool(tool: Omit<SelfHelpToolDocument, '_id' | 'createdAt' | 'updatedAt'>) {
  const db = await getDatabase()
  const now = new Date()
  return db.collection<SelfHelpToolDocument>(COLLECTIONS.tools)
    .insertOne({
      ...tool,
      createdAt: now,
      updatedAt: now,
    } as SelfHelpToolDocument)
}

export async function updateTool(id: string, updates: Partial<SelfHelpToolDocument>) {
  const db = await getDatabase()
  const { ObjectId } = await import('mongodb')
  return db.collection<SelfHelpToolDocument>(COLLECTIONS.tools)
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    )
}

export async function deleteTool(id: string) {
  const db = await getDatabase()
  const { ObjectId } = await import('mongodb')
  return db.collection<SelfHelpToolDocument>(COLLECTIONS.tools)
    .deleteOne({ _id: new ObjectId(id) })
}

// Admins
export async function getAdminByEmail(email: string) {
  if (!isMongoConfigured) {
    return mockAdmins.find((a) => a.email === email) || null
  }
  const db = await getDatabase()
  return db.collection<AdminDocument>(COLLECTIONS.admins).findOne({ email })
}

export async function createAdmin(admin: Omit<AdminDocument, '_id' | 'createdAt'>) {
  if (!isMongoConfigured) {
    throw new Error('MongoDB is not configured. Add MONGODB_URI to .env.local')
  }
  const db = await getDatabase()
  return db.collection<AdminDocument>(COLLECTIONS.admins).insertOne({
    ...admin,
    createdAt: new Date(),
  })
}

