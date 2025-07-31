import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  user_id: { type: String, required: true },
  sender: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export const MessageModel = mongoose.model('Message', MessageSchema);