import { useCard } from '../../page/Card';
import { useHighlighter } from '../../page/Highlighter';
import { MessageHandler } from '../../types';

export const notifyCardLoaded: MessageHandler = {
    action: 'notifyCardLoaded',
    handle: (payload: { width: number; height: number }) => {
        const { width, height } = payload;
        const card = useCard();
        card.size(width, height);

        const highlighter = useHighlighter();
        const rect = highlighter.rect();
        const x = Math.max(0, Math.min(document.body.clientWidth - width + window.scrollX, rect.left - width / 2 + rect.width / 2 + window.scrollX));

        const prefferedY = rect.top - height + window.scrollY;
        const y = prefferedY >= 0 ? prefferedY : rect.bottom;

        card.show(x, y);
        return Promise.resolve(true);
    },
};
