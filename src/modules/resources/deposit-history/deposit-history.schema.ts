import mongoose from 'mongoose'

export const DepositHistorySchema = new mongoose.Schema(
  {
    seedStageAddress: {
      type: String,
      required: true,
      lowercase: true
    },

    roundId: {
      type: String,
      required: false
    },

    user: {
      type: String,
      required: false,
      lowercase: true
    },
    amount: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
)

DepositHistorySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.password
    delete ret.__v
  }
})
