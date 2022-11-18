import { Message, MessageHandler } from '../../types';
import { sendMessage } from '../../utils/Tabs';

export const bgNotifyCardLoaded: MessageHandler = {
    action: 'bgNotifyCardLoaded',
    handle: (payload: { width: number; height: number }) => {
        return new Promise((resolve) => {
            const message: Message = {
                action: 'notifyCardLoaded',
                payload,
            };
            sendMessage(message)
                .then(resolve)
                .catch((e) => console.error(e));
        });
    },
};
