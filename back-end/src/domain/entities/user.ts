export class User {
  constructor(
    public id: string,
    public name?: string,
    public telefone?: string,
    public languageLearn?: string,
    public objectiveLearnLanguage?: string,
    public type_message_preference?: 'text' | 'audioMessage',
    public nameAgent?: string,
    public user_level?: 'iniciante' | 'intermediario' | 'avancado',
    public typeAgent?: 'friend' | 'mentor' | 'sensei',
    public isPremium?: boolean,
    public limitedMessage?: number,
    public thread_id?: string | null,
    public created_at?: Date,
    public updated_at?: Date
  ) { }
}

export interface UserCreation extends Omit<User, "id"> { }
