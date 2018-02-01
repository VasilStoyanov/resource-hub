const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common.js');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = merge(webpackCommonConfig, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './client/dist/',
    hot: true
  },
  plugins: [
    new NodemonPlugin({
      script: './server/server.js',
      watch: './server/'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
});
