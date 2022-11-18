import { bgNotifyCardLoaded } from './message/handlers/bgNotifyCardLoaded';
import { getPhrases } from './message/handlers/getPhrases';
import { MessageListener } from './message/MessageListener';
import { Json, Message } from './types';

const messageListener = new MessageListener([getPhrases, bgNotifyCardLoaded]);

chrome.runtime.onMessage.addListener((message: Message, _: chrome.runtime.MessageSender, callback: (response?: Json) => void) => {
    messageListener.listen(message, callback);
    return true;
});
