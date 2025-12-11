import { NextRequest, NextResponse } from 'next/server'
import { getArticles, createArticle } from '@/lib/db'
import { ArticleDocument } from '@/models/Article'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const featured = searchParams.get('featured') === 'true'
    const popular = searchParams.get('popular') === 'true'

    const filter: any = {}
    if (status) filter.status = status
    if (featured) filter.featured = true
    if (popular) filter.popular = true

    const articles = await getArticles(filter)
    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const article = await createArticle({
      ...body,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
    } as ArticleDocument)
    
    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }
}

