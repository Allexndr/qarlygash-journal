import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createArticle, getArticles, mapArticle } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    console.log(`[API] Fetching articles with status: ${status}`);

    const articlesData = await getArticles(status ? { status } : undefined);
    console.log(`[API] Found ${articlesData.length} articles in DB/Mock`);

    // Map articles to frontend format
    const articles = await Promise.all(articlesData.map(async (doc) => {
      try {
        return await mapArticle(doc);
      } catch (e) {
        console.error(`[API] Failed to map article ${doc._id || 'unknown'}:`, e);
        return null;
      }
    }));

    const filteredArticles = articles.filter(a => a !== null);
    console.log(`[API] Returning ${filteredArticles.length} mapped articles`);

    return NextResponse.json(filteredArticles);
  } catch (error) {
    console.error("[API] GET Articles Error:", error);
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

    const result = await createArticle({
      ...body,
      title: body.title || "Untitled",
      slug: body.slug || `post-${Date.now()}`,
      content: body.content || "",
      authorId: session.user.id, // Assuming authorId is string or ObjectId compatible
      views: 0,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
