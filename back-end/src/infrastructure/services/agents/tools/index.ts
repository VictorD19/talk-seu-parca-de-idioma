import { RunContext, tool } from '@openai/agents';
import { User } from 'src/domain/entities/user';
import UserRepository from 'src/infrastructure/repository/user.repository';
import { z } from 'zod';
// SavePreferences: tool({
//     name: "SavePreferences",
//     description: "once all preferences have been obtained.",
//     parameters: z.object({
//         name: z.string(),
//         objectiveLearnLanguage: z.string(),
//         nameAgent: z.string(),
//         languageLearn: z.string(),
//         user_level: z.enum(['iniciante', 'intermediario', 'avancado']),
//         typeAgent: z.enum(['friend', 'mentor', 'sensei']),
//     }),
//     execute: async ({ name, nameAgent, languageLearn, typeAgent, user_level,objectiveLearnLanguage}, context: RunContext<User>) => {
//         var _userRepository = new UserRepository()
//         _userRepository.update(context.context.id, { name, nameAgent, languageLearn, typeAgent, user_level,objectiveLearnLanguage })
//         return "Preferencias salvas com sucesso";
//     }
// }),
export default {

    GetKeys: tool({
        name: "GetKeysUser",
        description: "get all key user",
        parameters: z.object({}),
        execute: (_, context: RunContext<unknown>) => {
            let listKey: string[] = []

            Object.keys(context?.context).forEach(key => {
                listKey.push(key)
            })
            console.log("The all keys: " + listKey.join(","))
            return "The all keys: " + listKey.join(",")
        }
    }),
    UpdatePreference: tool({
        name: "UpdatePreference",
        description: "whenever the user mentions a new preference or makes a change.",
        parameters: z.object({
            key: z.string().describe('The preference key to update'),
            value: z.union([
                z.string(),
                z.number(),
                z.boolean(),
                z.enum(['iniciante', 'intermediario', 'avancado']),
                z.enum(['friend', 'mentor', 'sensei']),
                z.enum(['text', 'audioMessage']),
            ]).describe('The new value for the preference'),
        }),
        execute: async ({ key, value }, context: RunContext<User>) => {
            var _userRepository = new UserRepository()
            let dataSalvar = { [key]: value }
            console.log('Updating preference:', dataSalvar)
            await _userRepository.update(context.context.id, dataSalvar)

            return "Preferencias atualizadas com sucesso";
        }
    }),
    RetrievePreferences: tool({
        name: "RetrievePreferences",
        description: "if you're in a previously started conversation.",
        parameters: z.object({}),
        execute: async (_, context: RunContext<User>) => {
            var _userRepository = new UserRepository();
            return JSON.stringify(_userRepository.findByID(context.context.id));
        }
    })
}