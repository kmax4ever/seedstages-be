import { Document } from 'mongoose'

export interface Seedstage extends Document {
  id: string
  project: string
  name: string
  iouToken: string
  depositToken: string
  status: string
  seedStageAddress: string
}
