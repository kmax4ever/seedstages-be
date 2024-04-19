import mongoose from 'mongoose'

export const IouTokenSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    symbol: {
      type: String,
      required: true
    },
    tokenAddress: {
      type: String,
      required: true,
      lowercase: true
    },
    logo: {
      type: String,
      required: false
    },
    owner: {
      type: String,
      required: false,
      lowercase: true
    },
    description: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
)

IouTokenSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.password
    delete ret.__v
  }
})
