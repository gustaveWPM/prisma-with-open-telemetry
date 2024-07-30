const WebpackBar = require('webpackbar');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const resolve = require('path').resolve;

/** @type {import('webpack').Configuration} */
module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            unused: true
          },
          mangle: false
        },
        minify: TerserPlugin.swcMinify
      })
    ],
    minimize: true
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        mode: 'write-references'
      }
    }),
    new EslintWebpackPlugin({ extensions: ['ts', 'js'], failOnError: true }),
    new WebpackBar()
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: 'swc-loader',
        test: /\.ts$/
      }
    ]
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.ts', '.js']
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  watchOptions: {
    ignored: /node_modules/
  },
  entry: './src/main.ts',
  mode: 'production'
};
