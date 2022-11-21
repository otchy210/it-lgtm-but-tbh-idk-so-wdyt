import { MessageHandler } from '../../types';
import { updateConfig } from '../../utils/useConfig';

export const notifyConfigChanged: MessageHandler = {
    action: 'notifyConfigChanged',
    handle: async () => {
        updateConfig();
        return true;
    },
};
