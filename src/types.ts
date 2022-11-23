type JsonPrimitive = string | number | boolean | null;

type JsonArray = JsonPrimitive[] | JsonArray[] | JsonObject[];

type JsonObject = {
    [key: string]: JsonPrimitive | JsonArray | JsonObject;
};

export type Json = JsonPrimitive | JsonArray | JsonObject;

export type MessageAction = 'getPhrases' | 'notifyCardLoaded' | 'bgNotifyCardLoaded' | 'getConfig' | 'notifyConfigChanged';

export type Message = {
    action: MessageAction;
    payload?: Json;
};

export type MessageHandler = {
    action: MessageAction;
    handle: (payload?: Json) => Promise<Json>;
};

export type WordMap = {
    [key: string]: string[];
};

export type ConfigKey = 'popupEnabled' | 'disabledWords';

export type Config = {
    popupEnabled: true;
    disabledWords: string[];
};
