import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDatabase, isMongoConfigured } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

// Import mock data directly to avoid circular dependencies if possible, 
// or just define them here for seeding
const mockAuthors: any[] = [];

const mockArticles: any[] = [];

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
