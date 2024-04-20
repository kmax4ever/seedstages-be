import { Document } from 'mongoose'

export interface DepositHistory extends Document {
  id: string
  seedStageAddress: string
  roundId: string
  user: string
  amount: string
}
