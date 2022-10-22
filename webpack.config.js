module.exports = {
    mode: 'development',
    entry: {
        page: './src/page.ts',
        background: './src/background.ts'
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