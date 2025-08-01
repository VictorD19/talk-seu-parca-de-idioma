import { Axios } from "axios";

class WhatsappService {
    constructor(
        private _axios = new Axios({
            baseURL: process.env.URL_POST_MESSAGE | "",
            headers: {
                "Authorization": `Bearer ${process.env.APY_KEY_EVOLUTION}`
            }
        })
    ) {

    }

    async sendMessage(number: string, content: string) {
        await this._axios.post("send", { number, content })
    }
}

export default WhatsappService;