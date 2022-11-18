import { Highlighter, useHighlighter } from '../page/Highlighter';
import { getPossiblehWords, PossibleWordsIndexes } from './Texts';

export class TextNodeRange {
    private node: Text;
    readonly text: string;
    private range: Range;
    private highlighter: Highlighter;

    private constructor(node: Text) {
        const range = node.ownerDocument.createRange();
        range.selectNodeContents(node);
        this.node = node;
        this.text = this.node.textContent;
        this.range = range;
        this.highlighter = useHighlighter();
    }
    contains(x: number, y: number): boolean {
        const rect = this.range.getBoundingClientRect();
        return rect.left <= x && x <= rect.right && rect.top <= y && y <= rect.bottom;
    }
    hightlight(): TextNodeRange {
        this.highlighter.highlight(this.range);
        return this;
    }
    start(start: number): TextNodeRange {
        this.range.setStart(this.node, start);
        return this;
    }

    end(end: number): TextNodeRange {
        this.range.setEnd(this.node, end);
        return this;
    }

    private wordsContains(text: string, words: PossibleWordsIndexes, x: number, y: number): [start: number, end: number, word: string] | undefined {
        for (const word of words) {
            const [start, end] = word;
            if (this.start(start).end(end).contains(x, y)) {
                return [start, end, text.slice(start, end).toUpperCase()];
            }
        }
    }

    findwordUnder(x: number, y: number): [start: number, end: number, word: string] | undefined {
        const possibleWords = getPossiblehWords(this.text);
        return this.wordsContains(this.text, possibleWords, x, y);
    }

    static of(node: Text) {
        return new TextNodeRange(node);
    }
}
