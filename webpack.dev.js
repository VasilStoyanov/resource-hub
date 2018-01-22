const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = merge(common, {
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
