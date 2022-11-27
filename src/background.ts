import { bgNotifyCardLoaded } from './message/handlers/bgNotifyCardLoaded';
import { getConfig } from './message/handlers/getConfig';
import { getWordItems } from './message/handlers/getWordItems';
import { MessageListener } from './message/MessageListener';
import { Json, Message } from './types';

const messageListener = new MessageListener([getWordItems, bgNotifyCardLoaded, getConfig]);

chrome.runtime.onMessage.addListener((message: Message, _: chrome.runtime.MessageSender, callback: (response?: Json) => void) => {
    messageListener.listen(message, callback);
    return true;
});
