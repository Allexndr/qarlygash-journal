import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDatabase, isMongoConfigured } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

// Import mock data directly to avoid circular dependencies if possible, 
// or just define them here for seeding
const mockAuthors = [
    {
        _id: new ObjectId('65b0e1a2f1a2b3c4d5e6f001'),
        name: 'А.Скибидиева',
        credentials: 'Психолог, специалист по подростковой психологии',
        bio: 'Опытный психолог с многолетним стажем работы с подростками',
        createdAt: new Date('2024-01-01'),
    },
    {
        _id: new ObjectId('65b0e1a2f1a2b3c4d5e6f002'),
        name: 'Ю.Пак',
        credentials: 'Психолог, преподаватель психологии',
        bio: 'Специалист по монтессори-педагогике и работе с подростками',
        createdAt: new Date('2024-01-01'),
    },
    {
        _id: new ObjectId('65b0e1a2f1a2b3c4d5e6f003'),
        name: 'Н.Постоева',
        credentials: 'Информационная поддержка, психолог',
        bio: 'Специалист по перинатальной психологии и педагогике',
        createdAt: new Date('2024-01-01'),
    },
];

const mockArticles = [
    {
        _id: new ObjectId('65b0e1a2f1a2b3c4d5e6f011'),
        title: 'Подростковая депрессия',
        slug: 'podrostkovaya-depressiya',
        content: `<h2>Определение болезни – подростковая депрессия</h2>
      <p>Клиническая депрессия у подростков — это психическое расстройство, характеризующееся сниженным настроением, грустью, тоской, отчаянием и другими эмоциональными нарушениями. Это серьезное состояние, которое требует внимания и профессиональной помощи.</p>
      <h3>Распространенность</h3>
      <p>По статистике, депрессия встречается у 10-20% подростков.</p>`,
        excerpt: 'Клиническая депрессия у подростков — это психическое расстройство, характеризующееся сниженным настроением, грустью, тоской, отчаянием и другими эмоциональными нарушениями.',
        authorId: new ObjectId('65b0e1a2f1a2b3c4d5e6f001'),
        tags: ['Подростковая депрессия', 'Депрессия', 'Здоровье подростков', 'Кризис'],
        readingTime: 12,
        publishedAt: new Date('2024-01-15'),
        status: 'published',
        featured: true,
        popular: true,
        createdAt: new Date('2024-01-10'),
    },
    {
        _id: new ObjectId('65b0e1a2f1a2b3c4d5e6f012'),
        title: 'Буллинг в школе: как помочь подростку',
        slug: 'bulling-v-shkole',
        content: `<p>Практические советы для родителей и педагогов по предотвращению и преодолению буллинга.</p>`,
        excerpt: 'Практические советы для родителей и педагогов по предотвращению и преодолению буллинга.',
        authorId: new ObjectId('65b0e1a2f1a2b3c4d5e6f002'),
        tags: ['Буллинг', 'Школа', 'Подростки'],
        readingTime: 8,
        publishedAt: new Date('2024-01-10'),
        status: 'published',
        popular: true,
        createdAt: new Date('2024-01-08'),
    },
    {
        _id: new ObjectId('65b0e1a2f1a2b3c4d5e6f013'),
        title: 'Профориентация подростков: современные подходы',
        slug: 'proforientatsiya',
        content: `<p>Как помочь подростку выбрать профессию в современном мире.</p>`,
        excerpt: 'Как помочь подростку выбрать профессию в современном мире.',
        authorId: new ObjectId('65b0e1a2f1a2b3c4d5e6f003'),
        tags: ['Профориентация', 'Подростки'],
        readingTime: 10,
        publishedAt: new Date('2024-01-05'),
        status: 'published',
        popular: true,
        createdAt: new Date('2024-01-05'),
    },
    {
        _id: new ObjectId('65b0e1a2f1a2b3c4d5e6f014'),
        title: 'Коммуникации подростков с родителями',
        slug: 'kommunikatsii-podrostkov',
        content: `<p>Эффективные стратегии улучшения общения между подростками и родителями.</p>`,
        excerpt: 'Эффективные стратегии улучшения общения между подростками и родителями.',
        authorId: new ObjectId('65b0e1a2f1a2b3c4d5e6f002'),
        tags: ['Подростки', 'Родители', 'Коммуникации'],
        readingTime: 7,
        publishedAt: new Date('2024-01-20'),
        status: 'published',
        createdAt: new Date('2024-01-20'),
    },
    {
        _id: new ObjectId('65b0e1a2f1a2b3c4d5e6f015'),
        title: 'Возрастные кризисы подросткового периода',
        slug: 'vozrastnye-krizisy',
        content: `<p>Понимание кризисов переходного возраста и способы их преодоления.</p>`,
        excerpt: 'Понимание кризисов переходного возраста и способы их преодоления.',
        authorId: new ObjectId('65b0e1a2f1a2b3c4d5e6f001'),
        tags: ['Кризис', 'Переходный возраст'],
        readingTime: 9,
        publishedAt: new Date('2024-01-18'),
        status: 'published',
        createdAt: new Date('2024-01-18'),
    },
    {
        _id: new ObjectId('65b0e1a2f1a2b3c4d5e6f016'),
        title: 'Исследование буллинга в казахстанских школах',
        slug: 'issledovanie-bullinga',
        content: `<p>Результаты масштабного исследования распространенности буллинга среди подростков в школах Казахстана.</p>`,
        excerpt: 'Результаты масштабного исследования распространенности буллинга среди подростков в школах Казахстана.',
        authorId: new ObjectId('65b0e1a2f1a2b3c4d5e6f002'),
        tags: ['Исследование', 'Буллинг', 'Школа'],
        readingTime: 15,
        publishedAt: new Date('2024-01-12'),
        status: 'published',
        createdAt: new Date('2024-01-12'),
    },
    {
        _id: new ObjectId('65b0e1a2f1a2b3c4d5e6f017'),
        title: 'Влияние социальных сетей на психическое здоровье подростков',
        slug: 'sotsialnye-seti',
        content: `<p>Анализ влияния социальных сетей на эмоциональное состояние и самооценку подростков.</p>`,
        excerpt: 'Анализ влияния социальных сетей на эмоциональное состояние и самооценку подростков.',
        authorId: new ObjectId('65b0e1a2f1a2b3c4d5e6f001'),
        tags: ['Исследование', 'Социальные сети', 'Психическое здоровье'],
        readingTime: 18,
        publishedAt: new Date('2024-01-08'),
        status: 'published',
        createdAt: new Date('2024-01-08'),
    },
];

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!isMongoConfigured) {
            return NextResponse.json({ error: "MongoDB not configured" }, { status: 400 });
        }

        const db = await getDatabase();

        // 1. Seed Authors
        await db.collection("authors").deleteMany({});
        await db.collection("authors").insertMany(mockAuthors);

        // 2. Seed Articles
        await db.collection("articles").deleteMany({});
        await db.collection("articles").insertMany(mockArticles);

        return NextResponse.json({ success: true, message: "Database seeded successfully" });
    } catch (error) {
        console.error("Seed Error:", error);
        return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
    }
}
