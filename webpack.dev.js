const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
    mode: 'development',
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, 'public'),
        hot: true
    },
    devtool: 'eval-source-map'
});