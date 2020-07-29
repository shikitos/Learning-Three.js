const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDevMode = process.env.NODE_ENV === 'development';
const isProdMode = !isDevMode;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProdMode) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserWebpackPlugin(),
        ]
    }
    return config
}

// noinspection WebpackConfigHighlighting
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: [
        '@babel/polyfill',
        './index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    devtool: isDevMode ? 'source-map' : '',
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProdMode,
            }
        }),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hrm: isDevMode,
                            reloadAll: true
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            }
        ]
    }
}