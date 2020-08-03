const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  devServer: {
    host: 'localhost',
    hot: true,
    port: 8080,
    inline: true,
    disableHostCheck: true,
    historyApiFallback: {
      disableDotRule: true,
      index: 'index.html',
    },
  },
  devtool: 'inline-source-map',
  entry: ['@babel/polyfill', path.join(__dirname, '/src')],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        exclude: /node_modules|lib/,
        test: /\.(ts|js)x?$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].bundle.js?v=1',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
    path: path.join(__dirname, '/dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.html'),
    }),
    new Dotenv({ systemvars: true }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};
