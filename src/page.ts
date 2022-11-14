import { WordMap } from './types';
import { TextNodeRange } from './utils/TextNodeRange';
import { useWordMap } from './utils/useWordMap';

const isTextNode = (elem: Element | Text): elem is Text => {
    return elem.nodeType == Node.TEXT_NODE;
};

const getTextNodeFromPoint = (elem: Element | Text, x: number, y: number): TextNodeRange | undefined => {
    if (isTextNode(elem)) {
        const range = TextNodeRange.of(elem);
        if (range.contains(x, y)) {
            return range;
        }
    } else {
        for (const child of elem.childNodes) {
            const range = getTextNodeFromPoint(child as Element, x, y);
            if (range) {
                return range;
            }
        }
    }
};

const WORD_NOT_FOUND = [-1, -1, ''];
let lastFoundWord = WORD_NOT_FOUND;

const tryShowingCard = (e: MouseEvent, wordMap: WordMap) => {
    const { target, x, y } = e;
    const elem = target as Element;
    const range = getTextNodeFromPoint(elem, x, y);
    if (!range) {
        // hide highlight
        // hide card
        lastFoundWord = WORD_NOT_FOUND;
        return;
    }
    const wordIndexes = range.findwordUnder(x, y);
    if (!wordIndexes) {
        // hide highlight
        // hide card
        lastFoundWord = WORD_NOT_FOUND;
        return;
    }
    if (wordIndexes[0] === lastFoundWord[0] && wordIndexes[1] === lastFoundWord[1] && wordIndexes[2] === lastFoundWord[2]) {
        // pointing to the same word as before
        return;
    }
    lastFoundWord = wordIndexes;
    if (!wordMap[wordIndexes[2]]) {
        return;
    }

    console.log(wordIndexes);
};

(async () => {
    const wordMap = await useWordMap();

    let timeoutId;
    const onMouseMove = (e: MouseEvent) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            tryShowingCard(e, wordMap);
        }, 200);
    };

    document.body.addEventListener('mousemove', onMouseMove);
})();
