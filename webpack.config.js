const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './client/src/index.js'
  ],
  output: {
    publicPath: '/',
    filename: 'app.js',
    path: `${__dirname}/client/dist`
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './client/dist/',
    hot: true
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: ['babel-loader']
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    }],
  },
  plugins: [
    new HtmlPlugin({
      template: './client/public/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
