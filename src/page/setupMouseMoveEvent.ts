import { WordMap } from '../types';
import { TextNodeRange } from '../utils/TextNodeRange';
import { useConfig } from '../utils/useConfig';
import { useWordMap } from '../utils/useWordMap';
import { useCard } from './Card';
import { useHighlighter } from './Highlighter';

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

const tryShowingCard = async (e: MouseEvent, wordMap: WordMap) => {
    const config = await useConfig();
    if (!config.popupEnabled) {
        return;
    }
    const { target, x, y } = e;
    const highlighter = useHighlighter();
    const card = useCard();
    const elem = target as Element;
    const range = getTextNodeFromPoint(elem, x, y);
    if (!range) {
        highlighter.hide();
        card.hide();
        lastFoundWord = WORD_NOT_FOUND;
        return;
    }
    const wordIndexes = range.findwordUnder(x, y);
    if (!wordIndexes) {
        highlighter.hide();
        card.hide();
        lastFoundWord = WORD_NOT_FOUND;
        return;
    }
    if (wordIndexes[0] === lastFoundWord[0] && wordIndexes[1] === lastFoundWord[1] && wordIndexes[2] === lastFoundWord[2]) {
        // skipping because pointing to the same word as before
        return;
    }
    lastFoundWord = wordIndexes;
    if (!wordMap[wordIndexes[2]]) {
        return;
    }

    range.start(wordIndexes[0]).end(wordIndexes[1]).hightlight();
    card.set(wordIndexes[2]);
};

export const setupMouseMoveEvent = async () => {
    const wordMap = await useWordMap();

    let timeoutId;
    const onMouseMove = (e: MouseEvent) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            tryShowingCard(e, wordMap);
        }, 200);
    };

    document.body.addEventListener('mousemove', onMouseMove);
};
