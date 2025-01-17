import mongoose, { Schema, Document } from 'mongoose'

export interface IComment extends Document {
  userId: mongoose.Types.ObjectId
  content: string
  createdAt: Date
}

const CommentSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export interface IPost extends Document {
  userId: mongoose.Types.ObjectId
  content: string
  imageUrl?: string
  likes: mongoose.Types.ObjectId[]
  comments: IComment[]
  shares: number
  createdAt: Date
  updatedAt: Date
}

const PostSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [CommentSchema],
  shares: { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema)

