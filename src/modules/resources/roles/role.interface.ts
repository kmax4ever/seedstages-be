import { Document } from 'mongoose'

export interface Role extends Document {
  id: string
  name: string
  key: string
  description: string
  permissions: Array<any>
}
