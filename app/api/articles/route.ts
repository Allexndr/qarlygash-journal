import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createArticle, getArticles } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const articles = await getArticles(); // Add filtering if needed
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is admin
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Validate body
    if (!body.title || !body.content || !body.slug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await createArticle({
      ...body,
      authorId: session.user.id, // Assuming authorId is string or ObjectId compatible
      views: 0,
      publishedAt: new Date(), // Or use body.publishedAt if scheduled
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
