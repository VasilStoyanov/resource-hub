const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/src/',
  output: {
    filename: 'app.js',
    path: `${__dirname}/client/dist`
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
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
    })
  ]
};
