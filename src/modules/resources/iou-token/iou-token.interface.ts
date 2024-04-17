import { Document } from 'mongoose'

export interface IouToken extends Document {
  id: string
  project: string
  name: string
  symbol: string
  tokenAddress: string
  logo: string
  ownerAddress: string
  description: string
}
