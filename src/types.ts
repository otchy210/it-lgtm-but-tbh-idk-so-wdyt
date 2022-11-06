type JsonPrimitive = string | number | boolean | null;

type JsonArray = JsonPrimitive[] | JsonArray[] | JsonObject[];

type JsonObject = {
    [key: string]: JsonPrimitive | JsonArray | JsonObject;
};

export type Json = JsonPrimitive | JsonArray | JsonObject;

export type MessageAction = 'getNow';

export type Message = {
    action: MessageAction;
    payload?: Json;
};

export type MessageHandler = {
    action: MessageAction;
    handle: (payload?: Json) => Promise<Json>;
};
