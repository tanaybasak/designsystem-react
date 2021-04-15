const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackCommon = require('./config.common');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i.e. node_modules) and splits the chunks.
 *******************************************************************************
 */

const { DIRS, commonConfig } = webpackCommon;
const { DIST_DIR } = DIRS;
const PORT = 8020;

module.exports = merge.smart(commonConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(le|sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true
            }
          },

          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-preset-env')({ browsers: 'last 2 versions' })
              ],
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'eval-source-map',
  devServer: {
    contentBase: DIST_DIR,
    clientLogLevel: 'none',
    compress: true,
    historyApiFallback: true,
    hot: true,
    index: 'index.html',
    inline: true,
    open: true,
    host: '0.0.0.0',
    public: `localhost:${PORT}`,
    port: PORT
  }
});
