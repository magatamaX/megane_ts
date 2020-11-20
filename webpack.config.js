/** *************************************
** Root path name
************************************** */
const ROOT_PATH_NAME = 'public';

const path = require('path');

/** *************************************
** ENTRIES Setting
************************************** */
const ENTRIES = {
  // JS
  'assets/js/main': './src/js/main.ts',
  // CSS
  'assets/css/style.css': './src/scss/style.scss',
};
const SOURCE_MAP_STYLE = 'inline-source-map'; // 'inline-source-map', 'source-map', etc.


/** *************************************
** devServer Setting
************************************** */
const DEV_SERVER = {
  contentBase: ROOT_PATH_NAME,
  publicPath: '/',
  // open: true,
  port: 3000,
  host: '0.0.0.0',
  watchContentBase: true,
};

/** *************************************
** Webpack Config
************************************** */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

let mode = process.argv.indexOf('production') !== -1 ? 'production' : 'development';
if (process.argv.indexOf('--watch') !== -1) { mode = 'development'; }
const isDev = (mode === 'development');

module.exports = {
  entry: ENTRIES,
  output: {
    path: `${__dirname}/${ROOT_PATH_NAME}`,
    filename: '[name].js',
  },

  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]',
    }),
  ],

  devtool: (isDev ? SOURCE_MAP_STYLE : ''),
  performance: { hints: false },
  devServer: DEV_SERVER,

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
        exclude: [
          /node_modules/,
        ],
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { // CSSをバンドルするための機能
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
              importLoaders: 2,
              // minimize: scssMinimize,
              url: false,
            },
          },
          { // autoprefixer を利用するために postcss を利用
            loader: 'postcss-loader',
            options: {
              sourceMap: isDev,
            },
          },
          { // Sassをバンドルするための機能
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
    ],
  },
};

console.log('-------------------------------------------------------');
console.log(`mode: ${mode}`);
console.log('-------------------------------------------------------');
