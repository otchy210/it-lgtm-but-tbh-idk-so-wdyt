type JsonPrimitive = string | number | boolean | null;

type JsonArray = JsonPrimitive[] | JsonArray[] | JsonObject[];

type JsonObject = {
    [key: string]: JsonPrimitive | JsonArray | JsonObject;
};

export type Json = JsonPrimitive | JsonArray | JsonObject;

export type MessageAction = 'getWordItems' | 'notifyCardLoaded' | 'bgNotifyCardLoaded' | 'getConfig' | 'notifyConfigChanged';

export type Message = {
    action: MessageAction;
    payload?: Json;
};

export type MessageHandler = {
    action: MessageAction;
    handle: (payload?: Json) => Promise<Json>;
};

export type WordItem = [desc: string, url?: string];

export type WordMap = {
    [key: string]: WordItem[];
};

export type ConfigKey = 'popupEnabled' | 'disabledWords';

export type Config = {
    popupEnabled: true;
    disabledWords: Set<string>;
};
