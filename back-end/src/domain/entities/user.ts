export class User {
  constructor(
    public id: string,
    public nome: string,
    public telefone: string,
    public linguagem_preferida: 'formal' | 'informal',
    public tipo_mensagem_preferida: 'texto' | 'audio',
    public genero_agente: 'masculino' | 'feminino',
    public nome_agente: string,
    public thread_id?: string,
    public created_at?: Date,
    public updated_at?: Date
  ) { }
}

export interface UserCreation extends Omit<User, "id"> {}
