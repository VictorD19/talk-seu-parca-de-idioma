
import { Message, MessageCreation } from "../../domain/entities/message";

export interface IMessageRepository {
  create(message: MessageCreation): Promise<Message>;
  findByUserId(userId: string): Promise<Message[]>;
  findLatestByUserId(userId: string, limit: number): Promise<Message[]>;
  deleteByUserId(userId: string): Promise<void>;
  findById(id: string): Promise<Message | null>;
}