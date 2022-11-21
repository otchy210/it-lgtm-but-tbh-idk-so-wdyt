import { useBackgroundApi } from '../message/BackgroundApi';
import { Config } from '../types';

let config;

export const useConfig = async (): Promise<Config> => {
    await updateConfig();
    return config;
};

export const updateConfig = async () => {
    const api = useBackgroundApi();
    config = await api.getConfig();
};
