import * as Prisma from '@prisma/client';
import { User, UserCreation } from '../../domain/entities/user';
import { UserRepository } from '../../application/interface/user.interface';

class PrismaUserRepository implements UserRepository {
    constructor(private prisma: Prisma.PrismaClient) { }

    async create(user: UserCreation): Promise<User> {
        return this.prisma.user.create({
            data: user
        });
    }

    async findByPhone(telefone: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { telefone }
        });
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data
        });
    }

    async updateThreadId(id: string, threadId: string): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data: { thread_id: threadId }
        });
    }
}
export default PrismaUserRepository;