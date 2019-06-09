const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',

    entry: ['@babel/polyfill', './src/main.js'],

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },

    devServer: {
        overlay: true
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader']
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    },

    plugins: [
        new htmlWebpackPlugin({
            template: './index.html'
        }),
        new VueLoaderPlugin()
    ]
}