const lowerA = 'a'.codePointAt(0);
const lowerZ = 'z'.codePointAt(0);
const upperA = 'A'.codePointAt(0);
const upperZ = 'Z'.codePointAt(0);
const digit0 = '0'.codePointAt(0);
const digit9 = '9'.codePointAt(0);
const availableSigns = ['/', '.', ';'].map((c) => c.codePointAt(0));

const isAlphabet = (code: number): boolean => {
    return (lowerA <= code && code <= lowerZ) || (upperA <= code && code <= upperZ);
};

const isDigit = (code: number): boolean => {
    return digit0 <= code && code <= digit9;
};

const isAvailableSign = (code: number): boolean => {
    return availableSigns.includes(code);
};

const isAvaiableChar = (code: number): boolean => {
    return isAlphabet(code) || isDigit(code) || isAvailableSign(code);
};

export type PossibleWordsIndexes = [index: number, end: number][];

export const getPossiblehWords = (text: string): PossibleWordsIndexes => {
    const results: [index: number, length: number][] = [];
    let inWord = false;
    let start = -1;
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);
        if (isAvaiableChar(code)) {
            if (!inWord) {
                start = i;
            }
            inWord = true;
        } else {
            if (inWord) {
                results.push([start, i]);
                start = -1;
            }
            inWord = false;
        }
    }
    if (inWord) {
        results.push([start, text.length]);
    }
    return results;
};
