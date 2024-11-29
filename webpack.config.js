const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true, // Очищает папку dist перед новой сборкой
    },
    stats: {
        assets: true,
        assetsSort: 'field',
        colors: true,
        modules: false,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // Алиас для папки src
        },
        extensions: ['.js', '.vue', '.json', '.svg'], // Автоматическое разрешение этих расширений
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                          ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    },
                },
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i, // Добавляем loader для изображений
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext][query]', // Указывает, куда сохранять файлы
                },
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
};
