import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    role: {
      type: ObjectId,
      ref: 'Role'
    },
    isActivated: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.password
    delete ret.__v
  }
})
