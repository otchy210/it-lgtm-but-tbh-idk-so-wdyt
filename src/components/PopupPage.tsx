import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { WordMap } from '../types';
import { colors } from '../utils/colors';
import { useLocalStorage, useSyncStorage } from '../utils/Storage';
import { sendMessage } from '../utils/Tabs';
import { useWordMap } from '../utils/useWordMap';
import { ConfigGroup } from './config/ConfigGroup';
import { ConfigGroupTitle } from './config/ConfigGroupTitle';
import { ConfigItem } from './config/ConfigItem';
import { ConfigItemContainer } from './config/ConfigItemContainer';
import { ConfigName } from './config/ConfigName';
import { ConfigValue } from './config/ConfigValue';
import { ConfigWord } from './config/ConfigWord';
import GlobalStyle from './GlobalStyle';
import { Link } from './Link';
import { Toggle } from './Toggle';

const searchSvg = chrome.runtime.getURL('images/icon-search.svg');
const QueryField = styled.input`
    border: solid 1px ${colors.lightGrey};
    border-radius: 24px;
    width: 100%;
    height: 24px;
    padding: 2px 12px 2px 24px;
    outline: none;
    background-image: url(${searchSvg});
    background-repeat: no-repeat;
    background-position: 4px center;
    &:focus-visible {
        border-color: ${colors.blue};
    }
`;

type DisabledWordsConfigProps = {
    loading: boolean;
    disabledWords: Set<string>;
    wordMap: WordMap;
    onClick: (word: string, checked: boolean) => void;
};

const DisabledWordsConfig: React.FC<DisabledWordsConfigProps> = ({ loading, disabledWords, wordMap, onClick }) => {
    const [query, setQueryStatus] = useState<string>('');
    const queryRef = useRef<HTMLInputElement>();

    useEffect(() => {
        if (!loading && queryRef.current) {
            queryRef.current.focus();
        }
    }, [loading]);

    const setQuery = (query) => {
        setQueryStatus(query.trim());
    };
    return (
        <ConfigGroup>
            <ConfigGroupTitle>Word config</ConfigGroupTitle>
            <ConfigItem>
                <QueryField value={query} ref={queryRef} onChange={(e) => setQuery(e.target.value)} />
            </ConfigItem>
            <ConfigItemContainer>
                {Object.entries(wordMap)
                    .filter(([word]) => {
                        if (query.length === 0) {
                            return true;
                        }
                        return word.includes(query.toUpperCase());
                    })
                    .sort()
                    .map(([word, items]) => {
                        const checked = !disabledWords.has(word);
                        return <ConfigWord {...{ word, items, checked, onClick }} />;
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
        sendMessage({ action: 'notifyConfigChanged' });
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
        sendMessage({ action: 'notifyConfigChanged' });
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
                <ConfigItem>
                    <ConfigName>
                        <Link href="https://chrome.google.com/webstore/detail/it-lgtm-but-tbh-idk-so-wd/djgmnhkpcfhhmnkajphahjanfebedfeo">Open Web Store</Link>
                    </ConfigName>
                </ConfigItem>
            </ConfigGroup>
            {popupEnabled && <DisabledWordsConfig {...{ loading, disabledWords, wordMap, onClick: onClickEnabledWord }} />}
        </>
    );
};
