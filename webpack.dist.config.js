'use strict';

var webpack = require('webpack');

module.exports = {

    output: {
        publicPath: '/assets/',
        path: __dirname + '/dist/assets/',
        filename: 'main.js'
    },

    debug: false,
    devtool: false,
    entry: './src/app.js',

    stats: {
        colors: true,
        reasons: false
    },

    plugins: [
        //http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'styles': __dirname + '/src/styles',
            'mixins': __dirname + '/src/mixins',
            'components': __dirname + '/src/components/'
        }
    },

    module: {
        /*preLoaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
        }],*/
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "firefox 15"]}'
        }, {
            test: /\.scss/,
            loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "firefox 15"]}!sass-loader?outputStyle=expanded'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=8192'
        }]
    }
};
