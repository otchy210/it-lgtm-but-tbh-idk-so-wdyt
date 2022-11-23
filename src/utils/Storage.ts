import { ConfigKey } from '../types';

class Storage {
    private storage: chrome.storage.StorageArea;
    constructor(storage: chrome.storage.StorageArea) {
        this.storage = storage;
    }
    private set<T>(items: { [key: string]: T }): Promise<void> {
        return this.storage.set(items);
    }
    private setOne<T>(key: string, value: T): Promise<void> {
        return this.set({ [key]: value });
    }
    public setConfig<T>(key: ConfigKey, value: T): Promise<void> {
        return this.setOne(key, value);
    }
    private get<T>(keys: string[]): Promise<{ [key: string]: T }> {
        return this.storage.get(keys);
    }
    private async getOne<T>(key: string, defaultValue?: T): Promise<T> {
        const items = await this.get([key]);
        return (items[key] ?? defaultValue) as T;
    }
    public async getConfig<T>(key: ConfigKey, defaultValue?: T): Promise<T> {
        return this.getOne(key, defaultValue);
    }
}

const syncStorage = new Storage(chrome.storage.sync);
const localStorage = new Storage(chrome.storage.local);

export const useSyncStorage = () => syncStorage;
export const useLocalStorage = () => localStorage;
