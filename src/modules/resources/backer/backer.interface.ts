import { Document } from 'mongoose'

export interface Backer extends Document {
  projectId: string
  logo: string
  name: string
  description: string
  website: string
  createdAt: string
  updatedAt: string
}
