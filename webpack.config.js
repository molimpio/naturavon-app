const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const configuration = {

    context: path.join(__dirname, 'src'),

    entry: {
        app: './index.jsx'
    },

    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'build')
    },

    // plugins trabalha sobre o resultado final dos arquivos
    plugins: [
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({ template: 'index.html' }),
        new ExtractTextWebpackPlugin({ filename: './bundle.css' })
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: /src/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['env', 'react'],
                        plugins: ['transform-class-properties']
                    }
                }
            },
            {
                test: /\.html$/,
                include: /source/,
                exclude: /node_modules/,
                use: ['html-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.woff|.woff2|.ttf|.eot|.svg*.*$/,
                use: ['file-loader']
            },            
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, './src'),
        stats: 'errors-only', //ou verbose (ajuda no debug)
        open: true,
        port: 12000,
        compress: true // aplicasao comprimida em gzip
    },
    devtool: 'inline-source-map' // debug na sintaxe es6 no browser
}

module.exports = configuration;