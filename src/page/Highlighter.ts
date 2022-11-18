import { colors } from '../utils/colors';

export class Highlighter {
    private outer: HTMLDivElement;
    private line: HTMLDivElement;
    private inner: HTMLDivElement;
    constructor() {
        this.outer = document.createElement('div');
        this.outer.style.position = 'absolute';
        this.outer.style.margin = '0';
        this.outer.style.padding = '0';
        this.outer.style.border = `solid 1px ${colors.white}`;
        this.outer.style.zIndex = '99999';
        this.outer.style.pointerEvents = 'none';

        this.line = document.createElement('div');
        this.line.style.margin = '0';
        this.line.style.padding = '0';
        this.line.style.border = `solid 3px ${colors.blue}`;

        this.inner = document.createElement('div');
        this.inner.style.margin = '0';
        this.inner.style.padding = '1px';
        this.inner.style.border = `solid 1px ${colors.white}`;
        this.inner.style.boxSizing = 'content-box';

        this.outer.appendChild(this.line);
        this.line.appendChild(this.inner);
        document.body.appendChild(this.outer);

        this.hide();
    }
    hide(): Highlighter {
        this.outer.style.display = 'none';
        return this;
    }
    show(): Highlighter {
        this.outer.style.display = 'block';
        return this;
    }
    move(x: number, y: number): Highlighter {
        this.outer.style.left = `${x - 5 + window.scrollX}px`;
        this.outer.style.top = `${y - 5 + window.scrollY}px`;
        return this;
    }
    resize(width: number, height: number): Highlighter {
        this.inner.style.width = `${width}px`;
        this.inner.style.height = `${height}px`;
        return this;
    }
    highlight(range: Range): Highlighter {
        const rect = range.getBoundingClientRect();
        this.resize(rect.width, rect.height).move(rect.x, rect.y).show();
        return this;
    }
    rect(): DOMRect {
        return this.outer.getBoundingClientRect();
    }
}

const instance = new Highlighter();

export const useHighlighter = () => instance;
