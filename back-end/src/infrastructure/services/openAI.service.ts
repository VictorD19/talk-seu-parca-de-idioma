import { Agent, handoff, run, RunContext, setDefaultOpenAIKey } from '@openai/agents';
import Agents from './agents/agents';
import Tools from './agents/tools';

import { User } from 'src/domain/entities/user';



class OpenAIService {
  private _agent;
  constructor() {
    setDefaultOpenAIKey(process.env.OPENAI_API_KEY)
    const friendAgent = new Agent({
      name: Agents.Friend.name,
      instructions: Agents.Friend.instructions,
      model: "gpt-4o-mini"
    })

    const SenseiAgent = new Agent({
      name: Agents.Sensei.name,
      instructions: Agents.Sensei.instructions,
      model: "gpt-4o-mini"
    })

    const MentorAgent = new Agent({
      name: Agents.Mentor.name,
      instructions: Agents.Mentor.instructions,
      model: "gpt-4o-mini"
    })


    this._agent = new Agent({
      name: Agents.Main.name,
      instructions: Agents.Main.instructions,
      model: "gpt-4o-mini",
      tools: [Tools.RetrievePreferences, Tools.SavePreferences, Tools.UpdatePreference],
      handoffs: [
        handoff(friendAgent),
        handoff(SenseiAgent),
        handoff(MentorAgent),
      ]
    });

  }

  async processMessage(message: string, user: User): Promise<string> {
    const result = await run(
      this._agent,
      message, {
      context: new RunContext(user)
    }
    );
    return result.finalOutput || "";
  }
}

export default OpenAIService;