export class User {
  constructor(
    public id: string,
    public nome: string,
    public telefone: string,
    public linguagem_preferida: 'formal' | 'informal',
    public tipo_mensagem_preferida: 'text' | 'audioMessage',
    public genero_agente?: 'masculino' | 'feminino' | null,
    public nome_agente?: string,
    public isPremium?: boolean,
    public limitedMessage?: number,
    public thread_id?: string | null,
    public created_at?: Date,
    public updated_at?: Date
  ) { }
}

export interface UserCreation extends Omit<User, "id"> { }
