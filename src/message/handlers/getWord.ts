import { MessageHandler, WordMap } from '../../types';

const loadWordMap = async (): Promise<WordMap> => {
    const wordJsonUrl = chrome.runtime.getURL('./words.json');
    const wordMap = await (await fetch(wordJsonUrl)).json();
    return wordMap;
};

let wordMap = {} as WordMap;
const refreshWrodMap = async () => {
    wordMap = await loadWordMap();
};

refreshWrodMap();

export const getWord: MessageHandler = {
    action: 'getWord',
    handle: async (payload) => {
        const word = payload['word'];
        return wordMap[word];
    },
};
