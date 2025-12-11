import { NextRequest, NextResponse } from 'next/server'
import { getAuthors, createAuthor } from '@/lib/db'

export async function GET() {
  try {
    const authors = await getAuthors()
    return NextResponse.json(authors)
  } catch (error) {
    console.error('Error fetching authors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch authors' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const author = await createAuthor(body)
    return NextResponse.json(author, { status: 201 })
  } catch (error) {
    console.error('Error creating author:', error)
    return NextResponse.json(
      { error: 'Failed to create author' },
      { status: 500 }
    )
  }
}

