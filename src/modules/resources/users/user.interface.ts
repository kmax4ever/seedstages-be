import { Document } from 'mongoose'

export interface User extends Document {
  id: string
  username: string
  password: string
  fullName: string
  role: string
  isActivated: boolean
  createdAt: string
  updatedAt: string
}
