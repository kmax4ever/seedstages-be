import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

export const PermissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    key: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: false
    },
    roles: {
      type: [ObjectId],
      ref: 'Role'
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

PermissionSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.isDeleted
    delete ret.__v
  }
})
