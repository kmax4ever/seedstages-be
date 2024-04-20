import { Document } from 'mongoose'

export interface DepositToken extends Document {
  id: string
  name: string
  symbol: string
  decimals: string
  tokenAddress: string
  logo: string
  description: string
}
