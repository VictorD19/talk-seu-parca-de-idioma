import { User } from '../../domain/entities/user';

interface IUserRepository {
    create(user: User): Promise<User>;
    findByPhone(telefone: string): Promise<User | null>;
    update(id: string, data: Partial<User>): Promise<User>;
    updateMessageLimited(idUser: string, qte: number): Promise<void>;
}

export default IUserRepository