import { ObjectId } from 'mongodb'

export interface AdminDocument {
  _id?: ObjectId
  email: string
  passwordHash: string
  name?: string
  role?: 'admin'
  createdAt: Date
}

