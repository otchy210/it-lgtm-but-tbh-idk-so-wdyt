import { useBackgroundApi } from '../message/BackgroundApi';
import { Config } from '../types';

let config: Config;

export const useConfig = async (): Promise<Config> => {
    if (config === undefined) {
        await updateConfig();
    }
    return config;
};

export const updateConfig = async () => {
    const api = useBackgroundApi();
    config = await api.getConfig();
};
