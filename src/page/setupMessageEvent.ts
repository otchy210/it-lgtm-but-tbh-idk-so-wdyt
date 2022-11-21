import { notifyCardLoaded } from '../message/handlers/notifyCardLoaded';
import { notifyConfigChanged } from '../message/handlers/notifyConfigChanged';
import { MessageListener } from '../message/MessageListener';
import { Json, Message } from '../types';

const messageListener = new MessageListener([notifyCardLoaded, notifyConfigChanged]);

export const setupMessageEvent = () => {
    chrome.runtime.onMessage.addListener((message: Message, _: chrome.runtime.MessageSender, callback: (response?: Json) => void) => {
        messageListener.listen(message, callback);
        return true;
    });
};
