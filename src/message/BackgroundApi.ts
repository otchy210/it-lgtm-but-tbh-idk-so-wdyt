import { Config, Json, Message, MessageAction } from '../types';

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
    getPhrases(word: string): Promise<[string]> {
        return this.send('getPhrases', { word }) as Promise<[string]>;
    }
    notifyCardLoaded(width: number, height: number): Promise<boolean> {
        return this.send('bgNotifyCardLoaded', { width, height }) as Promise<boolean>;
    }
    async getConfig(): Promise<Config> {
        const jsonConfig = await this.send('getConfig');
        return {
            popupEnabled: jsonConfig['popupEnabled'],
            disabledWords: new Set<string>(jsonConfig['disabledWords']),
        } as Config;
    }
}

const instance = new BackgroundApi();

export const useBackgroundApi = () => instance;
