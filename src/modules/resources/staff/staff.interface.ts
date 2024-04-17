import { Document } from 'mongoose'

export interface Staff extends Document {
  id: string
  name: string
  username: string
  password: string
  role: string
  isActivated: string
}
