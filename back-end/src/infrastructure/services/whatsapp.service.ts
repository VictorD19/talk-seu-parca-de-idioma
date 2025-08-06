import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

class WhatsappService {
    private _axios;
    constructor() {
        let url: string = `${process.env.URL_POST_MESSAGE}` || "http://localhost:8081/"
        console.log(url, "url")
        this._axios = axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json',
                "apikey": `${process.env.APY_KEY_EVOLUTION}`
            }
        })
    }

    async sendMessage(number: string, content: string) {
        let dataEnviar = { number: number, text: content }
        await this._axios.post("message/sendText/" + process.env.INSTANCIA_ID_EVOLUTION, dataEnviar)
    }
}

export default WhatsappService;