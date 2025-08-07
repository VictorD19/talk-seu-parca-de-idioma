import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    name: { type: String, required: true },
    telefone: { type: String, required: true, unique: true },
    languageLearn: { type: String },
    objectiveLearnLanguage: { type: String },
    type_message_preference: { type: String, default: 'texto' },
    nameAgent: { type: String, default: null },
    user_level: { type: String, default: null },
    typeAgent: { type: String, default: null },
    isPremium: { type: Boolean, default: false },
    limitedMessage: { type: Number, default: 20 },
    thread_id: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const UserModel = mongoose.model('User', UserSchema);