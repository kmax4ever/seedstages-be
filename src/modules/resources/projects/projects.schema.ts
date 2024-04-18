import mongoose from 'mongoose'

export const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    shortDescription: {
      type: String,
      required: false
    },
    fullDescription: {
      type: String,
      required: true
    },
    website: {
      type: String,
      required: false
    },
    telegram: {
      type: String,
      required: false
    },
    twitter: {
      type: String,
      required: false
    },
    discord: {
      type: String,
      required: false
    },
    logo: {
      type: String,
      required: true
    },
    banner: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

ProjectSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.password
    delete ret.__v
  }
})
