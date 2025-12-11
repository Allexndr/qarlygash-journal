/* Seed mock data into MongoDB for demo */
const { MongoClient, ObjectId } = require('mongodb')
const bcrypt = require('bcryptjs')

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('MONGODB_URI not set. Provide it via env.')
  process.exit(1)
}

const client = new MongoClient(uri)

async function ensureAuthor(db, author) {
  const existing = await db.collection('authors').findOne({ name: author.name })
  if (existing) return existing._id
  const { insertedId } = await db.collection('authors').insertOne({ ...author, createdAt: new Date() })
  return insertedId
}

async function upsertArticle(db, article) {
  await db.collection('articles').updateOne(
    { slug: article.slug },
    { $set: article, $setOnInsert: { createdAt: new Date() } },
    { upsert: true }
  )
  const found = await db.collection('articles').findOne({ slug: article.slug })
  return found?._id
}

async function main() {
  await client.connect()
  const db = client.db()

  // Admin user
  const adminEmail = 'admin@example.com'
  const adminPass = 'admin1234'
  const adminHash = bcrypt.hashSync(adminPass, 10)
  await db.collection('admins').updateOne(
    { email: adminEmail },
    {
      $set: {
        email: adminEmail,
        passwordHash: adminHash,
        name: 'Администратор',
        role: 'admin',
        createdAt: new Date(),
      },
    },
    { upsert: true }
  )
  console.log('Admin created/updated:', adminEmail, 'пароль:', adminPass)

  const authors = {
    skib: await ensureAuthor(db, {
      name: 'А.Скибидиева',
      bio: 'Психолог, специалист по подростковой психологии',
      credentials: 'Психолог, специалист по подростковой психологии',
      photo: '',
      email: 'aski@example.com',
    }),
    pak: await ensureAuthor(db, {
      name: 'Ю.Пак',
      bio: 'Психолог, преподаватель психологии, монтессори-педагог',
      credentials: 'Психолог, педагог',
      photo: '',
      email: 'ypak@example.com',
    }),
    posto: await ensureAuthor(db, {
      name: 'Н.Постоева',
      bio: 'Информационная поддержка, перинатальный психолог',
      credentials: 'Психолог',
      photo: '',
      email: 'nposto@example.com',
    }),
  }

  const articles = [
    {
      title: 'Подростковая депрессия',
      slug: 'podrostkovaya-depressiya',
      content:
        '<h2>Определение болезни – подростковая депрессия</h2><p>Клиническая депрессия у подростков — это психическое расстройство, характеризующееся сниженным настроением, чувством грусти, тоски, отчаяния и другими расстройствами эмоциональной сферы.</p>',
      excerpt:
        'Клиническая депрессия у подростков — это психическое расстройство, характеризующееся сниженным настроением, чувством грусти, тоски, отчаяния и другими расстройствами эмоциональной сферы.',
      authorId: authors.skib,
      tags: ['Подростковая депрессия', 'Депрессия', 'Здоровье подростков', 'Кризис'],
      readingTime: 12,
      publishedAt: new Date('2024-01-15'),
      status: 'published',
      featured: true,
      popular: true,
      metaTitle: 'Подростковая депрессия',
      metaDescription: 'Статья о признаках и проявлениях подростковой депрессии',
    },
    {
      title: 'Буллинг в школе: как помочь подростку',
      slug: 'bulling-v-shkole',
      content: '<p>Практические советы для родителей и педагогов по предотвращению и преодолению буллинга.</p>',
      excerpt: 'Практические советы для родителей и педагогов по предотвращению и преодолению буллинга.',
      authorId: authors.pak,
      tags: ['Буллинг', 'Школа', 'Подростки'],
      readingTime: 8,
      publishedAt: new Date('2024-01-10'),
      status: 'published',
      popular: true,
      metaTitle: 'Буллинг в школе',
      metaDescription: 'Как помочь подростку при буллинге в школе',
    },
    {
      title: 'Профориентация подростков: современные подходы',
      slug: 'proforientatsiya',
      content: '<p>Как помочь подростку выбрать профессию в современном мире.</p>',
      excerpt: 'Как помочь подростку выбрать профессию в современном мире.',
      authorId: authors.posto,
      tags: ['Профориентация', 'Подростки'],
      readingTime: 10,
      publishedAt: new Date('2024-01-05'),
      status: 'published',
      popular: true,
      metaTitle: 'Профориентация подростков',
      metaDescription: 'Современные подходы к профориентации подростков',
    },
  ]

  const articleIds = []
  for (const a of articles) {
    const id = await upsertArticle(db, a)
    if (id) articleIds.push(id)
  }

  const featuredId = articleIds[0]
  const popularIds = articleIds.slice(0, 3)

  await db.collection('siteSettings').updateOne(
    {},
    {
      $set: {
        siteName: 'Қарлығаш',
        siteDescription: 'Психологический журнал',
        featuredArticleId: featuredId,
        popularArticleIds: popularIds,
        updatedAt: new Date(),
      },
    },
    { upsert: true }
  )

  console.log('Seed completed. Inserted/updated articles:', articleIds.map(String))
}

main()
  .catch((err) => {
    console.error('Seed error', err)
    process.exit(1)
  })
  .finally(() => client.close())
