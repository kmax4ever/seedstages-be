import { Document } from 'mongoose'

export interface Partner extends Document {
  id: string
  walletAddress: string
  username: string
  password: string
  name: string
  avatar: string
  email: string
  phoneNumber: string
  twitter: string
  telegram: string
  isActivated: boolean
  createdAt: string
  updatedAt: string
}
