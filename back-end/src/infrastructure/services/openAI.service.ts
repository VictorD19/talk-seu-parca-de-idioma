import { Agent, handoff, run, RunContext, user, assistant, setDefaultOpenAIKey } from '@openai/agents';
import Agents from './agents/agents';
import Tools from './agents/tools';

import { User } from 'src/domain/entities/user';
import IMessageRepository from 'src/application/interface/message.interface';



class OpenAIService {
  private _agent;
  private _agentFriend;
  private _agentSensei;
  private _agentMentor;

  constructor(public _repositoryMessage: IMessageRepository) {
    let key = process.env.OPENAI_API_KEY;
    setDefaultOpenAIKey(key)
    this._agentFriend = new Agent({
      name: Agents.Friend.name,
      modelSettings: {
        temperature: 1.00,
        topP: 1.00
      },
      instructions: Agents.Friend.instructions,
      model: "o4-mini"
    })

    this._agentMentor = new Agent({
      name: Agents.Sensei.name,

      instructions: Agents.Sensei.instructions,
      model: "o4-mini"
    })

    this._agentSensei = new Agent({
      name: Agents.Mentor.name,
      instructions: Agents.Mentor.instructions,
      model: "o4-mini"
    })


    this._agent = new Agent({
      name: Agents.Main.name,
      instructions: Agents.Main.instructions,
      model: "o4-mini",
      tools: [Tools.RetrievePreferences,Tools.GetKeys, Tools.UpdatePreference],
      handoffs: [
        handoff(this._agentFriend),
        handoff(this._agentMentor),
        handoff(this._agentSensei),
      ]
    });

  }

  async processMessage(userData: User): Promise<string> {
    console.log(userData.typeAgent)
    let agentUse = this.getAgentByType(userData.typeAgent)
    
    let history = await this._repositoryMessage.findByUserId(userData.id);
    const messages = history.map(entry =>
      entry.sender === 'user' ? user(entry.content) : assistant(entry.content)
    );
    const result = await run(agentUse,
      messages, {
      context: userData
    }
    );
    return result.finalOutput || "";
  }

   getAgentByType(type?: 'friend' | 'mentor' | 'sensei') {
    switch (type) {
      case 'friend':
        return this._agentFriend;
      case 'mentor':
        return this._agentMentor;
      case 'sensei':
        return this._agentSensei;
      default:
        return this._agent;
    }
  }
}

export default OpenAIService;