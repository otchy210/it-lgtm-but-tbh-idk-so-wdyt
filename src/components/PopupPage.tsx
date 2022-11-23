import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { WordMap } from '../types';
import { colors } from '../utils/colors';
import { useLocalStorage, useSyncStorage } from '../utils/Storage';
import { useWordMap } from '../utils/useWordMap';
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

const ConfigItemContainer = styled.div`
    max-height: 200px;
    overflow: auto;
`;

const ConfigItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;
`;

const ConfigName = styled.div`
    white-space: nowrap;
    padding: 0 4px;
`;

const ConfigValue = styled.div`
    padding: 0 4px;
`;

type DisabledWordsConfigProps = {
    disabledWords: Set<string>;
    wordMap: WordMap;
    onClick: (word: string, checked: boolean) => void;
};

const DisabledWordsConfig: React.FC<DisabledWordsConfigProps> = ({ disabledWords, wordMap, onClick }) => {
    return (
        <ConfigGroup>
            <ConfigGroupTitle>Word config</ConfigGroupTitle>
            <ConfigItemContainer>
                {Object.keys(wordMap)
                    .sort()
                    .map((word) => {
                        const chedked = !disabledWords.has(word);
                        return (
                            <ConfigItem>
                                <ConfigName>{word}</ConfigName>
                                <ConfigValue>
                                    <Toggle
                                        id={word}
                                        checked={chedked}
                                        onClick={(checked) => {
                                            onClick(word, checked);
                                        }}
                                    />
                                </ConfigValue>
                            </ConfigItem>
                        );
                    })}
            </ConfigItemContainer>
        </ConfigGroup>
    );
};

export const PopupPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const localStorage = useLocalStorage();
    const syncStorage = useSyncStorage();
    const [popupEnabled, setPopupEnabledState] = useState<boolean>();
    const [disabledWords, setDisabledWordsState] = useState<Set<string>>();
    const [wordMap, setWordMap] = useState<WordMap>();
    useEffect(() => {
        Promise.all([localStorage.getConfig<boolean>('popupEnabled', true), syncStorage.getConfig<string[]>('disabledWords', []), useWordMap()]).then(
            ([popupEnabled, disabledWords, wordMap]) => {
                setPopupEnabledState(popupEnabled);
                setDisabledWordsState(new Set<string>(disabledWords));
                setWordMap(wordMap);
                setLoading(false);
            }
        );
    }, []);
    if (loading) {
        return;
    }
    const setPopupEnabled = (popupEnabled: boolean) => {
        setPopupEnabledState(popupEnabled);
        localStorage.setConfig('popupEnabled', popupEnabled);
    };
    const onClickEnabledWord = (word: string, checked: boolean) => {
        const newState = new Set(disabledWords);
        if (checked) {
            newState.delete(word);
        } else {
            newState.add(word);
        }
        syncStorage.setConfig('disabledWords', Array.from(newState));
        setDisabledWordsState(newState);
    };
    return (
        <>
            <GlobalStyle />
            <ConfigGroup>
                <ConfigGroupTitle>Overall config</ConfigGroupTitle>
                <ConfigItem>
                    <ConfigName>Popup enabled</ConfigName>
                    <ConfigValue>
                        <Toggle id="popupEnabled" checked={popupEnabled} onClick={setPopupEnabled} />
                    </ConfigValue>
                </ConfigItem>
            </ConfigGroup>
            {popupEnabled && <DisabledWordsConfig {...{ disabledWords, wordMap, onClick: onClickEnabledWord }} />}
        </>
    );
};
