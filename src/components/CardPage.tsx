import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useBackgroundApi } from '../message/BackgroundApi';
import { WordItem } from '../types';
import { colors } from '../utils/colors';
import GlobalStyle from './GlobalStyle';
import { Link } from './Link';

const FlexBox = styled.div`
    display: flex;
`;

const CardOuter = styled.div`
    background-color: ${colors.white};
    padding: 1px;
    border-radius: 6px;
`;

const Card = styled.div`
    border: solid 3px ${colors.blue};
    border-radius: 6px;
    background-color: ${colors.white};
`;

const Title = styled.div`
    color: ${colors.white};
    font-weight: bold;
    background-color: ${colors.blue};
    padding: 4px 8px 6px 6px;
    line-height: 1;
    border-radius: 0 0 6px 0;
`;

const Phrase = styled.div`
    padding: 4px 6px;
    line-height: 1;
    border-bottom: solid 1px ${colors.lightGrey};
    white-space: nowrap;
    &:last-child {
        border-bottom: none;
    }
`;

const CardPage: React.FC = () => {
    const url = new URL(location.href);
    const word = url.searchParams.get('word');
    const outerRef = useRef<HTMLDivElement>();
    const [wordItems, setWordItems] = useState<WordItem[]>();
    const api = useBackgroundApi();

    useEffect(() => {
        api.getWordItems(word).then(setWordItems);
    }, [word]);
    useEffect(() => {
        if (!wordItems || !outerRef.current) {
            return;
        }
        const rect = outerRef.current.getBoundingClientRect();
        api.notifyCardLoaded(rect.width, rect.height);
    }, [wordItems]);

    if (!wordItems) {
        return null;
    }

    return (
        <>
            <GlobalStyle />
            <FlexBox>
                <CardOuter ref={outerRef}>
                    <Card>
                        <FlexBox>
                            <Title>{word}</Title>
                        </FlexBox>
                        {wordItems.map(([desc, url]) => {
                            if (url) {
                                return (
                                    <Phrase>
                                        <Link href={url}>{desc}</Link>
                                    </Phrase>
                                );
                            } else {
                                return <Phrase>{desc}</Phrase>;
                            }
                        })}
                    </Card>
                </CardOuter>
            </FlexBox>
        </>
    );
};

export default CardPage;
