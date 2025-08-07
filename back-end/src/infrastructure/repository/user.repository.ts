import { User, UserCreation } from '../../domain/entities/user';
import IUserRepository from '../../application/interface/user.interface';
import { UserModel } from '../models/user.model';

export default class UserRepository implements IUserRepository {
    async create(user: UserCreation): Promise<User> {
        console.log(user,"criação")
        const created = await UserModel.create(user);
        console.log(created,"criado")
        return this.mapToEntity(created);
    }

    async findByPhone(telefone: string): Promise<User | null> {
        const user = await UserModel.findOne({ telefone });
        return user ? this.mapToEntity(user) : null;
    }
    async findByID(id: string): Promise<User | null> {
        const user = await UserModel.findOne({ id: id });
        return user ? this.mapToEntity(user) : null;
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        console.log(id, data, "update")
        const updated = await UserModel.findOneAndUpdate(
            { _id: id },
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
    async updateMessageLimited(idUser: string, qte: number): Promise<void> {
        await UserModel.findOneAndUpdate({ _id: idUser }, { $set: { limitedMessage: qte } })
    }

    private mapToEntity(doc: any): User {
        return new User(
            doc.id,
            doc.name,
            doc.telefone,
            doc.languageLearn,
            doc.type_message_preference,
            doc.nameAgent,
            doc.user_level,
            doc.typeAgent,
            doc.isPremium,
            doc.limitedMessage,
            doc.thread_id,
            doc.created_at,
            doc.updated_at,
        );
    }
}