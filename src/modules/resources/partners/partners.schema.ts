import mongoose from 'mongoose'

export const PartnerSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    username: {
      type: String,
      unique: true,
      required: false
    },
    role: {
      ref: 'Role',
      type: String
    },
    password: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    avatar: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: false
    },
    phoneNumber: {
      type: String,
      required: false
    },
    twitter: {
      type: String,
      required: false
    },
    telegram: {
      type: String,
      required: false
    },
    isActivated: {
      type: Boolean,
      require: true,
      default: true
    }
  },
  {
    timestamps: true
  }
)

PartnerSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.password
    delete ret.__v
  }
})
