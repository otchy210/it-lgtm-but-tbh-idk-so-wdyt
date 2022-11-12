import React, { useEffect, useState } from 'react';
import { useBackgroundApi } from '../message/BackgroundApi';

export const PopupPage: React.FC = () => {
    const [now, setNow] = useState<number>(0);
    const [word, setWord] = useState<[string]>();
    const api = useBackgroundApi();
    useEffect(() => {
        api.getNow().then(setNow);
        api.getWord('LGTM').then(setWord);
    }, []);
    return (
        <>
            <div>now: {now}</div>
            <div>word: {word && word.join(', ')}</div>
        </>
    );
};
