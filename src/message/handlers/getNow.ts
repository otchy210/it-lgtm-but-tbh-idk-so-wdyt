import { MessageHandler } from '../../types';

export const getNow: MessageHandler = {
    action: 'getNow',
    handle: async () => {
        return Date.now();
    },
};
