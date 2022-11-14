const CardPage: React.FC = () => {
    const url = new URL(location.href);
    const word = url.searchParams.get('word');

    return <>word: {word}</>;
};

export default CardPage;
