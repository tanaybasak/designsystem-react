const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SRC_DIR = path.resolve('./src');
const HTML_TEMPLATE = path.resolve('./index.html');
const FAVICON_PATH = path.resolve(SRC_DIR + '/assets/images/favicon.ico');
const NODE_MODULES_DIR = path.resolve('./node_modules');
const DIST_DIR = path.resolve('./dist');

module.exports.DIRS = {
    HTML_TEMPLATE,
    FAVICON_PATH,
    NODE_MODULES_DIR,
    SRC_DIR,
    DIST_DIR
};

module.exports.commonConfig = {
    context: SRC_DIR,
    entry: [
        'core-js/stable',
        'regenerator-runtime/runtime',
        `${SRC_DIR}/index.js`
    ],
    output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js',
        path: DIST_DIR,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                modules: false,
                                useBuiltIns: 'entry',
                                corejs: {
                                    version: 3,
                                    proposals: true
                                }
                            }
                        ],
                        '@babel/preset-react'
                    ]
                }
            },
            {
                test: /\.(le|sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-preset-env')({ browsers: 'last 2 versions' })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif|woff2?|eot|[ot]tf)$/,
                use: ['file-loader']
            },
            {
                test: /\.(csv|tsv)$/,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: HTML_TEMPLATE,
            filename: 'index.html',
            favicon: FAVICON_PATH
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash:8].css',
            chunkFilename: 'css/[name].[chunkhash:8].css'
        })
    ],
    resolve: {
        alias: {
            'patron-css': path.resolve(`${NODE_MODULES_DIR}/@patron/patron-css/patron/index.css`)
        },
        extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json'],
        modules: [SRC_DIR, NODE_MODULES_DIR]
    },
    performance: {
        hints: 'warning'
    },
    stats: {
        warnings: false
    },
    bail: true
};