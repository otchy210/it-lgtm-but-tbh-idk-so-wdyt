import { Json, Message, MessageAction } from '../types';

class BackgroundApi {
    private send(action: MessageAction, payload?: Json): Promise<Json> {
        const message: Message = {
            action,
            payload,
        };
        return new Promise((resolve) => {
            chrome.runtime.sendMessage(message, resolve);
        });
    }
    getNow(): Promise<number> {
        return this.send('getNow') as Promise<number>;
    }
}

const instance = new BackgroundApi();

export const useBackgroundApi = () => instance;