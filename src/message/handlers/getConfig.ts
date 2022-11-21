import { MessageHandler } from '../../types';
import { useLocalStorage } from '../../utils/Storage';

export const getConfig: MessageHandler = {
    action: 'getConfig',
    handle: async () => {
        const localStorage = useLocalStorage();
        const popupEnabled = await localStorage.getConfig<boolean>('popupEnabled', true);
        return {
            popupEnabled,
        };
    },
};
