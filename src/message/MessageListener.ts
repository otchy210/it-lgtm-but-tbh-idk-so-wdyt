import { Json, Message, MessageHandler } from '../types';

export class MessageListener {
    private handlers: Map<string, MessageHandler> = new Map();

    constructor(messageHandlers: MessageHandler[]) {
        messageHandlers.forEach((handler) => {
            this.handlers.set(handler.action, handler);
        });
    }
    listen(message: Message, callback: (response?: Json) => void) {
        const { action, payload } = message;
        const handler = this.handlers.get(action);
        if (!handler) {
            console.warn(`No handler found: ${action}`);
            return;
        }
        handler
            .handle(payload)
            .then((response) => {
                callback(response);
            })
            .catch((e) => {
                console.error(e);
            });
    }
}
