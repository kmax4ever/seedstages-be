import { Document } from 'mongoose'

export interface Project extends Document {
  projectId: string
  projectName: string
  projectCode: string
  shortDescription: string
  fullDescription: string
  website: string
  telegram: string
  twitter: string
  discord: string
  logo: string
  banner: string
  createdAt: string
  updatedAt: string
}
