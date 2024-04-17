import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

export const compareObjectId = (
  objectId1: typeof ObjectId | string,
  objectId2: typeof ObjectId | string
) => {
  return String(objectId1) === String(objectId2)
}
