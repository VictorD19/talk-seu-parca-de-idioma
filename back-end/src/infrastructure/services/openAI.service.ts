import OpenAI from 'openai';

 class OpenAIService {
  private openai: OpenAI;

  constructor() {
    
    // this.openai = new OpenAI({
    //   apiKey: process.env["OPENAI_API_KEY"]
    // });
  }

  async processMessage(threadId: string | null, message: string): Promise<string> {
    if (!threadId) {
      const thread = await this.openai.beta.threads.create();
      threadId = thread.id;
    }

    await this.openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: message
    });

    const run = await this.openai.beta.threads.runs.create(threadId, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID!
    });

    const response = await this.openai.beta.threads.messages.list(threadId);
    
    return response.data[0].content[0].text.value;
  }
}

export default OpenAIService;