import { String } from 'aws-sdk/clients/apigateway'
import { Document } from 'mongoose'

export interface SyncStatus extends Document {
  version: string
  lastBlockSynced: number
  initBlock: number
  currentBackBlock: number
}
export interface Block extends Document {
  blockNumber: number
  hash: number
}
