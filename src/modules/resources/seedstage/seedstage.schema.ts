import mongoose from 'mongoose'
import { StageStatus } from './dto/general.dto'
import { ProjectSchema } from '../projects/projects.schema'
export const SeedstageSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: false
    },
    iouToken: {
      type: String,
      required: false,
      lowercase: true
    },
    depositToken: {
      type: String,
      required: false,
      lowercase: true
    },
    status: {
      type: String,
      enum: StageStatus,
      required: false
    },
    seedStageAddress: {
      type: String,
      required: false,
      lowercase: true
    },
    multiSigAddress: {
      type: String,
      required: false,
      lowercase: true
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

SeedstageSchema.virtual('project', {
  ref: `Project`,
  localField: 'projectId',
  foreignField: 'projectId',
  options: {},
  justOne: true
})
