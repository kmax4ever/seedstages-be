import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

export const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    key: {
      type: String
    },
    description: {
      type: String
    },
    permissions: {
      type: [ObjectId],
      ref: 'Permission'
    }
  },
  {
    timestamps: true
  }
)

RoleSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.isDeleted
    delete ret.__v
  }
})
