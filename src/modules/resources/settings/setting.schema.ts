import * as mongoose from 'mongoose'

export const SettingSchema = new mongoose.Schema({
  isMaintanance: {
    type: Boolean,
    required: false
  }
})

SettingSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.__v
  }
})
