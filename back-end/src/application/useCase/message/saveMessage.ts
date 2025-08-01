import IMessageRepository from "src/application/interface/message.interface";
import IUserRepository from "src/application/interface/user.interface";
import { User } from "src/domain/entities/user";

class SaveMessage {
    constructor(
        public _messageRepository: IMessageRepository,
        public _userRepository: IUserRepository,
    ) { }

    async store(role: "user" | "agent", user: User, content: string, typeMessage: "audioMessage" | "conversation") {
        await this._messageRepository.create({
            content: content,
            sender: role,
            user_id: user.id,
            type: typeMessage
        })

        if (role == "agent") {
            let qte: number = user?.limitedMessage == 0 ? 0 : (user.limitedMessage ?? 0 - 1)
            await this._userRepository.updateMessageLimited(user.id, qte);
        }
    }
}

export default SaveMessage;