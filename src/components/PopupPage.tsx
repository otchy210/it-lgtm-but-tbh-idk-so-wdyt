import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../utils/colors';
import { useLocalStorage } from '../utils/Storage';
import GlobalStyle from './GlobalStyle';
import { Toggle } from './Toggle';

const ConfigGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin: 8px;
`;

const ConfigGroupTitle = styled.div`
    white-space: nowrap;
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 2px;
    border-bottom: solid 1px ${colors.lightGrey};
`;

const ConfigItem = styled.div`
    display: flex;
    align-items: center;
`;

const ConfigName = styled.div`
    white-space: nowrap;
    margin: 0 8px;
`;

export const PopupPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const localStorage = useLocalStorage();
    const [popupEnabled, setPopupEnabledState] = useState<boolean>();
    useEffect(() => {
        localStorage.getConfig<boolean>('popupEnabled', true).then((popupEnabled) => {
            setPopupEnabledState(popupEnabled);
            setLoading(false);
        });
    }, []);
    const setPopupEnabled = (popupEnabled: boolean) => {
        setPopupEnabledState(popupEnabled);
        localStorage.setConfig('popupEnabled', popupEnabled);
    };
    if (loading) {
        return;
    }
    return (
        <>
            <GlobalStyle />
            <ConfigGroup>
                <ConfigGroupTitle>Overall config</ConfigGroupTitle>
                <ConfigItem>
                    <ConfigName>Popup enabled</ConfigName>
                    <Toggle id="test" checked={popupEnabled} onClick={setPopupEnabled} />
                </ConfigItem>
            </ConfigGroup>
        </>
    );
};
