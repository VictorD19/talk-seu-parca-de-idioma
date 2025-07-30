export class Message {
  constructor(
    public id: string,
    public user_id: string,
    public sender: 'user' | 'agent',
    public content: string,
    public type: 'text' | 'audio',
    public created_at?: Date
  ) {}
}

export interface MessageCreation extends Omit<Message, "id"> {}
