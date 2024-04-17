import mongoose from 'mongoose'

export const StaffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      required: true,
      ref: 'Role',
      type: String
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

StaffSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.password
    delete ret.__v
  }
})
