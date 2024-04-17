import mongoose from 'mongoose'
import { RoundType } from './dto/general.dto'

export const SeedstageRoundSchema = new mongoose.Schema(
  {
    seedstage: {
      type: String,
      ref: 'Seedstage',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    roundType: {
      type: String,
      enum: RoundType,
      required: true
    },
    allowcation: {
      type: Number,
      required: true
    },
    minAllowcation: {
      type: Number,
      required: true
    },
    maxAllowcation: {
      type: Number,
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
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
