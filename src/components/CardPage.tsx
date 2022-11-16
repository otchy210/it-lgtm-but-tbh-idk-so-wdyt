import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useBackgroundApi } from '../message/BackgroundApi';
import GlobalStyle from './GlobalStyle';

const blue = '#0a6670';
const white = '#fff';
const lightGrey = '#ccc';

const FlexBox = styled.div`
    display: flex;
`;

const CardOuter = styled.div`
    background-color: ${white};
    padding: 1px;
    border-radius: 6px;
`;

const Card = styled.div`
    border: solid 3px ${blue};
    border-radius: 6px;
    background-color: ${white};
`;

const Title = styled.div`
    color: ${white};
    font-weight: bold;
    background-color: ${blue};
    padding: 4px 8px 6px 6px;
    line-height: 1;
    border-radius: 0 0 6px 0;
`;

const Phrase = styled.div`
    padding: 4px 6px;
    line-height: 1;
    border-bottom: solid 1px ${lightGrey};
    &:last-child {
        border-bottom: none;
    }
`;

const CardPage: React.FC = () => {
    const url = new URL(location.href);
    const word = url.searchParams.get('word');
    const outerRef = useRef<HTMLDivElement>();
    const [phrases, setPhrases] = useState<[string]>();
    const api = useBackgroundApi();

    useEffect(() => {
        api.getPhrases(word).then(setPhrases);
    }, [word]);
    useEffect(() => {
        if (!phrases || !outerRef.current) {
            return;
        }
        const rect = outerRef.current.getBoundingClientRect();
        console.log(rect);
        // notify rect.width and rect.height
    }, [phrases]);

    if (!phrases) {
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
                        {phrases.map((phrase) => {
                            return <Phrase>{phrase}</Phrase>;
                        })}
                    </Card>
                </CardOuter>
            </FlexBox>
        </>
    );
};

export default CardPage;
