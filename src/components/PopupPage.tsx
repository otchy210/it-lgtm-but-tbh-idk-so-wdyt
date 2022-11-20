import React, { useState } from 'react';
import GlobalStyle from './GlobalStyle';
import { Toggle } from './Toggle';

export const PopupPage: React.FC = () => {
    const [enabledAll, setEnabledAll] = useState<boolean>(true);
    return (
        <>
            <GlobalStyle />
            <div style={{ display: 'flex', margin: '1rem' }}>
                <Toggle id="test" checked={enabledAll} onClick={setEnabledAll} />
            </div>
        </>
    );
};
