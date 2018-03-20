const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const config = require('./config');

module.exports = {
  output: {
    pathinfo: true,
    publicPath: '/' + config.publicPath,
  },
  devtool: '#cheap-module-source-map',
  stats: false,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BrowserSyncPlugin({
      open: config.open,
      server: config.paths.distHtml,
      port: config.browserSync.port,
      ui: {
        port: config.browserSync.uiPort,
      },
      files: config.paths.src,
      logPrefix: "UOC Boilerplate",
    }),
  ],
};
