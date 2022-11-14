import { MessageHandler, WordMap } from '../../types';
import { useWordMap } from '../../utils/useWordMap';

let wordMap = {} as WordMap;
const refreshWrodMap = async () => {
    wordMap = await useWordMap();
};

refreshWrodMap();

export const getWord: MessageHandler = {
    action: 'getWord',
    handle: async (payload) => {
        const word = payload['word'];
        return wordMap[word];
    },
};
