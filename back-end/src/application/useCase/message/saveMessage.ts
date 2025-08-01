import IMessageRepository from "src/application/interface/message.interface";

class SaveMessage {
    constructor(
        public _messageRepository: IMessageRepository,
    ) { }

    async store(role: "user" | "agent", idUser: string, content: string, typeMessage:"audioMessage" | "conversation") {
        await this._messageRepository.create({
            content: content,
            sender: role,
            user_id: idUser,
            type: typeMessage
        })
    }
}

export default SaveMessage;