import { MessageHandler } from '../../types';
import { useLocalStorage, useSyncStorage } from '../../utils/Storage';

export const getConfig: MessageHandler = {
    action: 'getConfig',
    handle: async () => {
        const localStorage = useLocalStorage();
        const syncStorage = useSyncStorage();
        const popupEnabled = await localStorage.getConfig<boolean>('popupEnabled', true);
        const disabledWords = await syncStorage.getConfig<string[]>('disabledWords', []);
        return {
            popupEnabled,
            disabledWords,
        };
    },
};
