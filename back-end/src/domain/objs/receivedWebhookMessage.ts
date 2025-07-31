export interface IReceivedWebhookMessage {
    key: Key;
    pushName: string;
    message: Message;
    contextInfo?: any;
    messageType: "audioMessage" | "conversation";
    messageTimestamp: number;
    instanceId: string;
    source: string;
}
interface Message {
    audioMessage?: AudioMessage;
    conversation?: string;
    messageContextInfo: MessageContextInfo;
    base64: string;
}
interface MessageContextInfo {
    deviceListMetadata: string[];
    deviceListMetadataVersion: number;
    messageSecret: string;
}
interface AudioMessage {
    url: string;
    mimetype: string;
    fileSha256: string;
    fileLength: string;
    seconds: number;
    ptt: boolean;
    mediaKey: string;
    fileEncSha256: string;
    directPath: string;
    mediaKeyTimestamp: string;
    waveform: string;
}
interface Key {
    remoteJid: string;
    fromMe: boolean;
    id: string;
    participant?:string
}