import mongoose from 'mongoose'
import { StageStatus } from './dto/general.dto'

export const SeedstageSchema = new mongoose.Schema(
  {
    project: {
      type: String,
      ref: 'Project',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    iouToken: {
      type: String,
      ref: 'IouToken',
      required: false
    },
    status: {
      type: String,
      enum: StageStatus,
      required: true
    },
    stageContractAddress: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
)

SeedstageSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.password
    delete ret.__v
  }
})
