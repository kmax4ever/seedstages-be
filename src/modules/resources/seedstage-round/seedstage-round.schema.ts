import mongoose from 'mongoose'
import { RoundType } from './dto/general.dto'

export const SeedstageRoundSchema = new mongoose.Schema(
  {
    seedStageAddress: {
      type: String,
      required: true,
      lowercase: true
    },
    name: {
      type: String,
      required: false
    },
    roundType: {
      type: String,
      enum: RoundType,
      required: false
    },
    roundId: {
      type: String,
      required: false
    },
    isWhitelistRound: {
      type: Boolean,
      required: false
    },
    allowcation: {
      type: String,
      required: false
    },
    minAllocationPerAddress: {
      type: String,
      required: false
    },
    maxAllocationPerAddress: {
      type: String,
      required: false
    },
    startTime: {
      type: Date,
      required: false
    },
    endTime: {
      type: Date,
      required: false
    },
    raisedAmount: {
      type: String,
      required: false
    },
    merkleRoot: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
)

SeedstageRoundSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.password
    delete ret.__v
  }
})
