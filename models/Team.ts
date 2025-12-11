import { ObjectId } from 'mongodb'

export interface TeamMemberDocument {
  _id?: ObjectId
  name: string
  role: string
  bio: string
  age?: number
  photo?: string
  email?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

