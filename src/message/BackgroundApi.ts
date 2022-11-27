import { Config, Json, Message, MessageAction, WordItem } from '../types';

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
    getWordItems(word: string): Promise<WordItem[]> {
        return this.send('getWordItems', { word }) as Promise<WordItem[]>;
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
