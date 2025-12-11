import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getAdminByEmail } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email и пароль обязательны' }, { status: 400 })
    }

    const admin = await getAdminByEmail(email)
    if (!admin || !admin.passwordHash) {
      return NextResponse.json({ error: 'Неверные данные' }, { status: 401 })
    }

    const ok = await bcrypt.compare(password, admin.passwordHash)
    if (!ok) {
      return NextResponse.json({ error: 'Неверные данные' }, { status: 401 })
    }

    return NextResponse.json({ success: true, name: admin.name || 'Администратор' })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Auth failed' }, { status: 500 })
  }
}

