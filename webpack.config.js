var webpack = require('webpack');
var AutoIndexPlugin = require("./auto-index-plugin");

var entries = {
  'ss-topchart': './src/ss/ss-topchart.js',
  'matrix': './src/ss/matrix.js',
  'rank-history': './src/ss/rank-history.js',
  'comparator': './src/int/comparator.js',
  'int-topchart': './src/int/int-topchart.js',
  // TODO: better not to generate index for this entry
  'vendor': ['lodash'],
}

var webpackConfig = {
  entry: entries,
  output: {
    path: 'dist',
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin("store-stats.js", ["ss-topchart", "matrix"]),
    new webpack.optimize.CommonsChunkPlugin("int.js", ["comparator", "int-topchart"]),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
    new AutoIndexPlugin()
  ],
};

module.exports = webpackConfig;