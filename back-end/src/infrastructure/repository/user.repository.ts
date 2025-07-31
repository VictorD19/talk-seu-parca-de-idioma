import { User, UserCreation } from '../../domain/entities/user';
import IUserRepository from '../../application/interface/user.interface';
import { UserModel } from '../models/user.model';

export  default class UserRepository implements IUserRepository {
    async create(user: UserCreation): Promise<User> {
        const created = await UserModel.create(user);
        return this.mapToEntity(created);
    }

    async findByPhone(telefone: string): Promise<User | null> {
        const user = await UserModel.findOne({ telefone });
        return user ? this.mapToEntity(user) : null;
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        const updated = await UserModel.findOneAndUpdate(
            { id },
            { ...data, updated_at: new Date() },
            { new: true }
        );
        if (!updated) throw new Error('User not found');
        return this.mapToEntity(updated);
    }

    async updateThreadId(id: string, threadId: string): Promise<User> {
        const updated = await UserModel.findOneAndUpdate(
            { id },
            { thread_id: threadId },
            { new: true }
        );
        if (!updated) throw new Error('User not found');
        return this.mapToEntity(updated);
    }

    private mapToEntity(doc: any): User {
        return new User(
            doc.id,
            doc.nome,
            doc.telefone,
            doc.linguagem_preferida,
            doc.tipo_mensagem_preferida,
            doc.genero_agente,
            doc.nome_agente,
            doc.thread_id,
            doc.created_at,
            doc.updated_at
        );
    }
}