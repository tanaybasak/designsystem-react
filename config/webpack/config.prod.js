const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const webpackCommon = require('./config.common');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i.e. node_modules) and splits the chunks.
 *
 * UglifyJSPlugin is enabled to minify your app
 * in order to load faster and run less javascript.
 *******************************************************************************
 */

const { commonConfig } = webpackCommon;

module.exports = merge.smart(commonConfig, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ],
  optimization: {
    minimizer: [new TerserJSPlugin()]
  }
});
