import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDatabase, isMongoConfigured } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

// Import mock data directly to avoid circular dependencies if possible, 
// or just define them here for seeding
const mockAuthors: any[] = [
    {
        _id: new ObjectId('65b0e1a2f1a2b3c4d5e6f001'),
        name: 'Редакция Қарлығаш',
        credentials: 'Психологическая помощь подросткам',
        bio: 'Команда специалистов проекта Қарлығаш',
        createdAt: new Date('2026-01-24'),
    },
];

const mockArticles: any[] = [
    {
        _id: new ObjectId('69b0e1a2f1a2b3c4d5e6f011'),
        title: 'Депрессия у школьников: как распознать и чем помочь',
        slug: 'depressiya-u-shkolnikov-priznaki',
        content: `<h2>Как понять, что у ребенка депрессия?</h2>
      <p>Многие родители ошибочно принимают депрессию за лень или временную хандру. Однако клиническая депрессия у подростков — это серьезное состояние, которое мешает учебе и социальной жизни.</p>
      <h3>Основные признаки:</h3>
      <ul>
        <li>Потеря интереса к хобби, которые раньше радовали</li>
        <li>Постоянное чувство усталости и нарушения сна</li>
        <li>Резкая смена аппетита (отказ от еды или переедание)</li>
        <li>Высказывания о собственной ненужности</li>
      </ul>
      <p>Если вы заметили эти симптомы дольше двух недель, это повод обратиться к психологу.</p>`,
        excerpt: 'Многие родители принимают депрессию за лень. Узнайте основные признаки и способы поддержки подростков в этот период.',
        authorId: new ObjectId('65b0e1a2f1a2b3c4d5e6f001'),
        tags: ['Школа', 'Депрессия', 'Подростки', 'Психология'],
        readingTime: 5,
        publishedAt: new Date('2026-01-24T10:00:00Z'),
        status: 'published',
        featured: true,
        popular: true,
        createdAt: new Date('2026-01-24'),
    },
    {
        _id: new ObjectId('69b0e1a2f1a2b3c4d5e6f012'),
        title: 'Школьный стресс и его влияние на ментальное здоровье',
        slug: 'shkolnyj-stress-vliyanie',
        content: `<h2>Почему школа становится источником стресса?</h2>
      <p>Экзамены, конфликты со сверстниками и завышенные ожидания учителей могут спровоцировать развитие депрессивных состояний.</p>
      <h3>Факторы риска:</h3>
      <ol>
        <li>Буллинг (травля) в коллективе</li>
        <li>Страх не оправдать ожидания родителей</li>
        <li>Отсутствие качественного отдыха и перегрузки</li>
      </ol>
      <p>Важно создать для ребенка безопасную среду дома, где он сможет поделиться своими переживаниями без страха осуждения.</p>`,
        excerpt: 'Разбираем, как учебная нагрузка и атмосфера в классе могут повлиять на психологическое состояние подростка.',
        authorId: new ObjectId('65b0e1a2f1a2b3c4d5e6f001'),
        tags: ['Школа', 'Стресс', 'Ментальное здоровье'],
        readingTime: 6,
        publishedAt: new Date('2026-01-24T12:00:00Z'),
        status: 'published',
        popular: true,
        createdAt: new Date('2026-01-24'),
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

        // 1. Clear Authors
        await db.collection("authors").deleteMany({});
        if (mockAuthors.length > 0) {
            await db.collection("authors").insertMany(mockAuthors);
        }

        // 2. Clear Articles
        await db.collection("articles").deleteMany({});
        if (mockArticles.length > 0) {
            await db.collection("articles").insertMany(mockArticles);
        }

        return NextResponse.json({ success: true, message: "Database cleared successfully" });
    } catch (error) {
        console.error("Seed Error:", error);
        return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
    }
}
