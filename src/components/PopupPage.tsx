import React, { useEffect, useState } from 'react';
import { useBackgroundApi } from '../message/BackgroundApi';

export const PopupPage: React.FC = () => {
    const [now, setNow] = useState<number>(0);
    const api = useBackgroundApi();
    useEffect(() => {
        api.getNow().then(setNow);
    });
    return <div>now: {now}</div>;
};
