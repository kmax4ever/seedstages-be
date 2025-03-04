import { Document } from 'mongoose'

export interface SeedstageRound extends Document {
  id: string
  seedstage: string
  name: string
  roundType: string
  allowcation: string
  minAllowcation: string
  maxAllowcation: string
  startTime: string
  endTime: string
  whitelistAddress: string
}
