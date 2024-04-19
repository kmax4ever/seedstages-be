import mongoose from 'mongoose'

export const ProjectSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      require: true
    },
    projectName: {
      type: String,
      required: true
    },
    projectCode: {
      type: String,
      required: true
    },
    shortDescription: {
      type: String,
      required: false
    },
    fullDescription: {
      type: String,
      required: false
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
      required: false
    },
    banner: {
      type: String,
      required: false
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
