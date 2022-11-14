import { WordMap } from '../types';

export const useWordMap = async (): Promise<WordMap> => {
    const wordJsonUrl = chrome.runtime.getURL('./words.json');
    const wordMap = await (await fetch(wordJsonUrl)).json();
    return wordMap;
};
