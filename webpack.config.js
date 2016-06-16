/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');
var path = require('path');
module.exports = {

    entry: [
        "webpack-dev-server/client?http://localhost:8080/",
        'webpack/hot/only-dev-server',
        './src/components/app.js'
    ],
    output: {
        filename: 'main.js',
        publicPath: '/assets/',
        //这个路径配置 真TM的坑啊
        path: __dirname + '/dist/assets/'
    },
    cache: true,
    debug: true,
    devtool: 'sourcemap',
    stats: {
        colors: true,
        reasons: true
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            /*'styles': __dirname + '/src/styles',
            'mixins': __dirname + '/src/mixins',
            'components': __dirname + '/src/components/'*/
        }
    },
    module: {
        /*preLoaders: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint'
        }],*/
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel', // transpiling compiling
            // include: path.join(__dirname, 'src')
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.scss/,
            loader: 'style!css!postcss!sass?outputStyle=expanded'
        }, {
            test: /\.css$/,
            loader: 'style!css!postcss'
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
            loader: 'url?limit=8192'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
