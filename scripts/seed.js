const { MongoClient } = require('mongodb');
const { put } = require('@vercel/blob');
require('dotenv').config({ path: '.env.local' });

// Mock data generator
const articles = [
  {
    title: 'Как справиться с экзаменационным стрессом',
    slug: 'kak-spravitsya-s-stressom',
    excerpt: 'Практические советы для школьников и студентов по подготовке к экзаменам без лишних нервов.',
    content: '<p>Экзамены — это всегда стресс, но есть способы его минимизировать...</p><h2>1. Планируйте</h2><p>Составьте график подготовки.</p><h2>2. Отдыхайте</h2><p>Не забывайте про сон и прогулки.</p>',
    tags: ['Стресс', 'Учеба', 'Экзамены'],
    status: 'published',
    metaTitle: 'Борьба со стрессом перед экзаменами',
    metaDescription: 'Советы психолога по подготовке к экзаменам.',
    readingTime: 5,
  },
  {
    title: 'Влияние социальных сетей на самооценку подростка',
    slug: 'vliyanie-soc-setey',
    excerpt: 'Анализ того, как Instagram и TikTok формируют восприятие себя у современной молодежи.',
    content: '<p>Социальные сети создают иллюзию идеальной жизни...</p>',
    tags: ['Соцсети', 'Самооценка', 'Подростки'],
    status: 'published',
    metaTitle: 'Соцсети и самооценка',
    readingTime: 7,
  },
  {
    title: 'Первая любовь: инструкция для родителей',
    slug: 'pervaya-lyubov-roditeli',
    excerpt: 'Как поддержать ребенка в период первых чувств и не испортить отношения.',
    content: '<p>Первая любовь — это важное событие в жизни подростка...</p>',
    tags: ['Родители', 'Отношения'],
    status: 'draft',
    readingTime: 6,
  }
];

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI missing');
    process.exit(1);
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('articles');

    // Add dates
    const articlesWithDates = articles.map(a => ({
      ...a,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      views: Math.floor(Math.random() * 100),
      featured: Math.random() > 0.8,
      popular: Math.random() > 0.7,
      authorId: 'seed-admin' // Placeholder
    }));

    await collection.insertMany(articlesWithDates);
    console.log(`Inserted ${articles.length} articles`);

  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await client.close();
  }
}

seed();
