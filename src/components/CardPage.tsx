import { useEffect, useState } from 'react';
import { useBackgroundApi } from '../message/BackgroundApi';

const CardPage: React.FC = () => {
    const url = new URL(location.href);
    const word = url.searchParams.get('word');
    const [phrases, setPhrases] = useState<[string]>();
    const api = useBackgroundApi();

    useEffect(() => {
        api.getPhrases(word).then(setPhrases);
    }, [word]);
    useEffect(() => {
        if (!phrases) {
            return;
        }
        // notify the card loaded
    }, [phrases]);

    if (!phrases) {
        return null;
    }

    return (
        <div>
            <div>{word}</div>
            {phrases.map((phrase) => {
                return <div>{phrase}</div>;
            })}
        </div>
    );
};

export default CardPage;
