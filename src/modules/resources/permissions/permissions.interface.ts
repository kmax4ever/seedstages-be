import { Document } from 'mongoose'

export interface Permission extends Document {
  name: string
  key: string
  description: string
  roles: Array<string>
}
