import { Agent, run } from '@openai/agents';
import Agents from './agents/agents';
class OpenAIService {
  _agent;
  constructor() {

    const friendAgent = new Agent({
      name: Agents.Friend.name,
      instructions: Agents.Friend.instructions,
    })
    
    const SenseiAgent = new Agent({
      name: Agents.Sensei.name,
      instructions: Agents.Sensei.instructions,
    })
    
    const MentorAgent = new Agent({
      name: Agents.Mentor.name,
      instructions: Agents.Mentor.instructions,
    })


    this._agent =new Agent({
      name: Agents.Main.name,
      instructions: Agents.Main.instructions,
      tools:[
        
      ]
    });
  }

  async processMessage(threadId: string | null, message: string): Promise<string> {
    const result = await run(
      this._agent,

      message,
    );
    return result.finalOutput || "";
  }
}

export default OpenAIService;