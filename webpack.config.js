module.exports = {
    mode: 'development',
    entry: {
        background: './src/background.ts',
        popup: './src/popup.tsx',
        page: './src/page.ts',
        card: './src/card.tsx',
    },
    output: {
        filename: '[name].js',
        path: `${__dirname}/build`,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: [
            '.ts', '.tsx', '.js',
        ],
    },
};