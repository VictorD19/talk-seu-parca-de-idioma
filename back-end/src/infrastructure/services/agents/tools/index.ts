import { RunContext, tool } from '@openai/agents';
import { User } from 'src/domain/entities/user';
import UserRepository from 'src/infrastructure/repository/user.repository';
import { z } from 'zod';

export default {
    SavePreferences: tool({
        name: "SavePreferences",
        description: "once all preferences have been obtained.",
        parameters: z.object({
            name: z.string(),
            nameAgent: z.string(),
            languageLearn: z.string(),
            user_level: z.enum(['iniciante', 'intermediario', 'avancado']),
            typeAgent: z.enum(['friend', 'mentor', 'sensei']),
        }),
        execute: async ({ name, nameAgent, languageLearn, typeAgent, user_level }, context: RunContext<User>) => {
            var _userRepository = new UserRepository()
            _userRepository.update(context.context.id, { name, nameAgent, languageLearn, typeAgent, user_level })
            return "Preferencias salvas com sucesso";
        }
    }),
    UpdatePreference: tool({
        name: "UpdatePreference",
        description: "whenever the user mentions a new preference or makes a change.",
        parameters: z.object({
            key: z.string(),
            value: z.any(),
        }),
        execute: async ({ key, value }, context: RunContext<User>) => {
            var _userRepository = new UserRepository()
            _userRepository.update(context.context.id, { [key]: value })

            return "Preferencias atualizadas com sucesso";
        }
    }),
    RetrievePreferences: tool({
        name: "RetrievePreferences",
        description: "if you're in a previously started conversation.",
        parameters: z.object({}),
        execute: async (_, context: RunContext<User>) => {
            return JSON.stringify(context.context);
        }
    })
}