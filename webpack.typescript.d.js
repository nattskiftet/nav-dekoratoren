const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const resolve = require('resolve');
const prefixer = require('postcss-prefix-selector');
const autoprefixer = require('autoprefixer');

const browserConfig = {
    mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
    target: 'web',
    entry: { index: './src/npm-package/index.ts' },
    output: {
        path: path.resolve(__dirname, 'npmpackage/'),
        filename: '[name].js',
        publicPath: '/person/nav-dekoratoren/',
        libraryTarget: 'commonjs2',
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
    },
    stats: 'errors-only',
    module: {
        rules: [
            {
                test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.ico$/],
                loader: 'file-loader',
                options: {
                    name: './media/[name].[ext]',
                    emit: false,
                },
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: {} },
                    {
                        loader: 'postcss-loader',
                        options: {
                            emit: false,
                            ident: 'postcss',
                            plugins: [
                                prefixer({
                                    prefix: '.navno-dekorator',
                                    exclude: [
                                        /\b(\w*(M|m)odal\w*)\b/,
                                        'body',
                                        '.siteheader',
                                        '.sitefooter',
                                        '.hodefot',
                                        /\b(\w*lukk-container\w*)\b/,
                                        /\b(\w*close\w*)\b/,
                                        '.ReactModal__Overlay.ReactModal__Overlay--after-open.modal__overlay',
                                    ],
                                }),
                                autoprefixer({}),
                            ],
                        },
                    },
                    { loader: 'less-loader', options: {} },
                ],
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    reportFiles: ['src/**/*.{ts,tsx}', '!src/skip.ts'],
                    configFile: path.join(__dirname, './tsconfig.typegen.json'),
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.BROWSER': JSON.stringify(true),
        }),

        new SpriteLoaderPlugin({
            plainSprite: true,
        }),
    ],
};

module.exports = browserConfig;
