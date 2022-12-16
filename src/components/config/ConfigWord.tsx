import React, { useState } from 'react';
import styled from 'styled-components';
import { WordItem } from '../../types';
import { Link } from '../Link';
import { Toggle } from '../Toggle';
import { ConfigDesc } from './ConfigDesc';
import { ConfigItem } from './ConfigItem';
import { ConfigName } from './ConfigName';
import { ConfigValue } from './ConfigValue';

type IconTriangleProps = {
    opened: boolean;
};
const triangleSvg = chrome.runtime.getURL('images/icon-triangle.svg');
const IconTriangle = styled.span<IconTriangleProps>`
    display: inline-block;
    width: 12px;
    height: 12px;
    background-image: url(${triangleSvg});
    background-repeat: no-repeat;
    background-size: 12px;
    transform: rotateZ(${(props) => (props.opened ? '180deg' : '90deg')});
    cursor: pointer;
`;

const WordLabel = styled(ConfigName)`
    cursor: pointer;
`;

type Props = {
    word: string;
    items: WordItem[];
    checked: boolean;
    onClick: (word: string, checked: boolean) => void;
};

export const ConfigWord: React.FC<Props> = ({ word, items, checked, onClick }) => {
    const [showDesc, setShowDesc] = useState<boolean>(false);
    const toggleShowDesc = () => {
        setShowDesc(!showDesc);
    };
    return (
        <>
            <ConfigItem key={word}>
                <IconTriangle opened={showDesc} onClick={toggleShowDesc} />
                <WordLabel onClick={toggleShowDesc}>{word}</WordLabel>
                <ConfigValue>
                    <Toggle
                        id={word}
                        checked={checked}
                        onClick={(checked) => {
                            onClick(word, checked);
                        }}
                    />
                </ConfigValue>
            </ConfigItem>
            {showDesc &&
                items.map(([desc, url]) => {
                    return <ConfigDesc>{url ? <Link href={url}>{desc}</Link> : desc}</ConfigDesc>;
                })}
        </>
    );
};
