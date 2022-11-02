module.exports = {
    mode: 'development',
    entry: {
        background: './src/background.ts',
        popup: './src/popup.ts',
        page: './src/page.ts',
    },
    output: {
        filename: '[name].js',
        path: `${__dirname}/build`,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: [
            '.ts', '.js',
        ],
    },
};