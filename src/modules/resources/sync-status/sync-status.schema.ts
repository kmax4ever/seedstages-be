import mongoose from 'mongoose'

export const SyncStatus = new mongoose.Schema({
  version: {
    type: String,
  },
  lastBlockSynced: {
    type: Number,
  },
  currentBackBlock: {
    type: Number,
  },
  initBlock: {
    type: Number,
  }
})
SyncStatus.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.__v
  }
})

export const Block = new mongoose.Schema({
  blockNumber: {
    type: Number,
  },

  hash: {
    type: String,
  }
})

Block.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.__v
  }
})
