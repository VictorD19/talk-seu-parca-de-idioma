import { User } from '../../domain/entities/user';

export interface UserRepository {
    create(user: User): Promise<User>;
    findByPhone(telefone: string): Promise<User | null>;
    update(id: string, data: Partial<User>): Promise<User>;
    updateThreadId(id: string, threadId: string): Promise<User>;
}