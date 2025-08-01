import { Message, MessageCreation } from '../../domain/entities/message';
import IMessageRepository from '../../application/interface/message.interface';
import { MessageModel } from '../models/message.model';

export default class MongoMessageRepository implements IMessageRepository {
  async create(message: MessageCreation): Promise<Message> {
    const created = await MessageModel.create(message);
    return this.mapToEntity(created);
  }

  async findByUserId(userId: string): Promise<Message[]> {
    const messages = await MessageModel.find({ user_id: userId })
      .sort({ created_at: 'asc' });
    return messages.map(msg => this.mapToEntity(msg));
  }

  async findLatestByUserId(userId: string, limit: number): Promise<Message[]> {
    const messages = await MessageModel.find({ user_id: userId })
      .sort({ created_at: -1 })
      .limit(limit);
    return messages.map(msg => this.mapToEntity(msg));
  }

  async deleteByUserId(userId: string): Promise<void> {
    await MessageModel.deleteMany({ user_id: userId });
  }

  async findById(id: string): Promise<Message | null> {
    const message = await MessageModel.findOne({ id });
    return message ? this.mapToEntity(message) : null;
  }
  async updateMessageLimited(userId: string, qte: number): Promise<void> {
    await MessageModel.findOneAndUpdate({ _id: userId }, { limitedMessage: qte })
  }

  private mapToEntity(doc: any): Message {
    return new Message(
      doc.id,
      doc.user_id,
      doc.sender,
      doc.content,
      doc.type,
      doc.created_at
    );
  }
}