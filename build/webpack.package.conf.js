var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.base.conf');

process.env.NODE_ENV = 'production';

const conf = merge(webpackBaseConfig, {
    output: {
        path: path.resolve(__dirname, '../lib'),
        publicPath: '/dist/',
        filename: 'index.js',
        library: 'platform-ui',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    plugins: [
        // @todo
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
});

conf.entry = {
    index: './src/components/index.js'
};

module.exports = conf;