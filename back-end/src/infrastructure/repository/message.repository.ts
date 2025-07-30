import { PrismaClient } from '@prisma/client';
import { IMessageRepository } from '../../application/interface/message.interface';
import { Message, MessageCreation } from '../../domain/entities/message';

export class PrismaMessageRepository implements IMessageRepository {
  constructor(private prisma: PrismaClient) { }

  async create(message: MessageCreation): Promise<Message> {
    let newMessage = await this.prisma.message.create({
      data: {
        user_id: message.user_id,
        sender: message.sender,
        content: message.content,
        type: message.type,
        created_at: message.created_at || new Date()
      }
    });

    return newMessage;
  }

  async findByUserId(userId: string): Promise<Message[]> {
    const messages = await this.prisma.message.findMany({
      where: {
        user_id: userId
      },
      orderBy: {
        created_at: 'asc'
      }
    });

    return messages.map(message => new Message(
      message.id,
      message.user_id,
      message.sender as 'user' | 'agent',
      message.content,
      message.type as 'text' | 'audio',
      message.created_at
    ));
  }

  async findLatestByUserId(userId: string, limit: number): Promise<Message[]> {
    const messages = await this.prisma.message.findMany({
      where: {
        user_id: userId
      },
      orderBy: {
        created_at: 'desc'
      },
      take: limit
    });

    return messages.map(message => new Message(
      message.id,
      message.user_id,
      message.sender as 'user' | 'agent',
      message.content,
      message.type as 'text' | 'audio',
      message.created_at
    ));
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.prisma.message.deleteMany({
      where: {
        user_id: userId
      }
    });
  }

  async findById(id: string): Promise<Message | null> {
    const message = await this.prisma.message.findUnique({
      where: { id }
    });

    if (!message) return null;

    return new Message(
      message.id,
      message.user_id,
      message.sender as 'user' | 'agent',
      message.content,
      message.type as 'text' | 'audio',
      message.created_at
    );
  }
}