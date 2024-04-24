import mongoose from 'mongoose'

export const BackerSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      require: true
    },
    name: {
      type: String,
      required: true
    },
    website: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  {
    timestamps: true
  }
)

BackerSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.password
    delete ret.__v
  }
})
