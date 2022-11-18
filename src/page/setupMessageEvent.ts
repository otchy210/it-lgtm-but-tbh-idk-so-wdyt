import { notifyCardLoaded } from '../message/handlers/notifyCardLoaded';
import { MessageListener } from '../message/MessageListener';
import { Json, Message } from '../types';

const messageListener = new MessageListener([notifyCardLoaded]);

export const setupMessageEvent = () => {
    chrome.runtime.onMessage.addListener((message: Message, _: chrome.runtime.MessageSender, callback: (response?: Json) => void) => {
        messageListener.listen(message, callback);
        return true;
    });
};
