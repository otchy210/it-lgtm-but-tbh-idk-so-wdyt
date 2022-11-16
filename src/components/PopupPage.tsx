import React, { useEffect, useState } from 'react';
import { useBackgroundApi } from '../message/BackgroundApi';

export const PopupPage: React.FC = () => {
    const [phrases, setPhrases] = useState<[string]>();
    const api = useBackgroundApi();
    useEffect(() => {
        api.getPhrases('LGTM').then(setPhrases);
    }, []);
    return (
        <>
            <div>phrase: {phrases && phrases.join(', ')}</div>
        </>
    );
};
