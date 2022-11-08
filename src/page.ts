import { TextNodeRange } from './utils/TextNodeRange';

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
const tryShowingCard = (e: MouseEvent) => {
    const { target, x, y } = e;
    const elem = target as Element;
    const range = getTextNodeFromPoint(elem, x, y);
    console.log(range);
};

let timeoutId;
const onMouseMove = (e: MouseEvent) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        tryShowingCard(e);
    }, 200);
};

document.body.addEventListener('mousemove', onMouseMove);
