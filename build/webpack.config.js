const fs = require('fs')
const path = require('path')
const StringReplacePlugin = require("string-replace-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, '../src/index'),
  target: 'web',
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: 'p5js.adapter.js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            "@babel/preset-env",
          ],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      }
    ]
  },
  plugins: [
      new StringReplacePlugin()
  ],
  optimization:{
    minimize: true,
  }
}
