import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    nome: { type: String, required: true },
    telefone: { type: String, required: true, unique: true },
    linguagem_preferida: { type: String, default: 'informal' },
    tipo_mensagem_preferida: { type: String, default: 'texto' },
    genero_agente: { type: String, default: null },
    nome_agente: { type: String, default: null },
    limitedMessage: { type: Number, default: 20 },
    isPremium: { type: Boolean, default: false },
    thread_id: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const UserModel = mongoose.model('User', UserSchema);