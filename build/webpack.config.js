const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyGlobsPlugin = require('copy-globs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const config = require('./config');

const assetsFilenames = '[name]';

const generateHtmlPlugins = (templateDir) => {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir)).filter( item => 'html' === item.split('.')[1] );
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HTMLWebpackPlugin({
      filename: `../${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      minify: config.enabled.optimize ? { removeComments: true, collapseWhitespace: true } : false,
    });
  });
};

// Call our function on our views directory.
const htmlPlugins = generateHtmlPlugins(config.paths.src);

let webpackConfig = {
  context: config.paths.assets,
  entry: config.entry,
  devtool: (config.enabled.sourceMaps ? '#source-map' : undefined),
  output: {
    path: config.paths.dist,
    publicPath: config.publicPath,
    filename: `scripts/${assetsFilenames}.js`,
  },
  stats: {
    hash: false,
    version: false,
    timings: false,
    children: false,
    errors: false,
    errorDetails: false,
    warnings: true,
    chunks: false,
    modules: false,
    reasons: false,
    source: false,
    publicPath: false,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|s?[ca]ss)$/,
        include: config.paths.assets,
        loader: 'import-glob',
      },
      {
        test: /\.js$/,
        exclude: [/node_modules(?![/|\\](bootstrap|foundation-sites))/],
        use: [
          { loader: 'cache' },
          { loader: 'buble', options: { objectAssign: 'Object.assign' } },
        ],
      },
      {
        test: /\.css$/,
        include: config.paths.assets,
        use: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            { loader: 'cache' },
            { loader: 'css', options: { sourceMap: config.enabled.sourceMaps } },
            {
              loader: 'postcss', options: {
                config: { path: __dirname, ctx: config },
                sourceMap: config.enabled.sourceMaps,
              },
            },
          ],
        }),
      },
      {
        test: /\.scss$/,
        include: config.paths.assets,
        use: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            { loader: 'cache' },
            { loader: 'css', options: { sourceMap: config.enabled.sourceMaps } },
            {
              loader: 'postcss', options: {
                config: { path: __dirname, ctx: config },
                sourceMap: config.enabled.sourceMaps,
              },
            },
            { loader: 'resolve-url', options: { sourceMap: config.enabled.sourceMaps } },
            { loader: 'sass', options: { sourceMap: config.enabled.sourceMaps } },
          ],
        }),
      },
      {
        test: /\.(ttf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
        include: config.paths.assets,
        loader: 'url',
        options: {
          limit: 4096,
          name: `[path]${assetsFilenames}.[ext]`,
        },
      },
      {
        test: /\.(ttf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
        include: /node_modules/,
        loader: 'url',
        options: {
          limit: 4096,
          outputPath: 'vendor/',
          name: `[path]${assetsFilenames}.[ext]`,
        },
      },
    ],
  },
  resolve: {
    modules: [
      config.paths.assets,
      'node_modules',
    ],
    enforceExtension: false,
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  plugins: [
    new CleanPlugin([config.paths.distHtml], {
      root: config.paths.root,
      verbose: false,
    }),
    new CopyGlobsPlugin({
      pattern: config.copy,
      output: `[path]${assetsFilenames}.[ext]`,
      manifest: config.manifest,
    }),
    new ExtractTextPlugin({
      filename: `styles/${assetsFilenames}.css`,
      allChunks: true,
      disable: (config.enabled.watcher),
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: config.enabled.optimize,
      debug: config.enabled.watcher,
      stats: { colors: true },
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.s?css$/,
      options: {
        output: { path: config.paths.dist },
        context: config.paths.assets,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.js$/,
      options: {
        eslint: { failOnWarning: false, failOnError: true },
      },
    }),
    new FriendlyErrorsWebpackPlugin(),
  ].concat(htmlPlugins),
};

/* Load other dependencies if needed */

if (config.enabled.optimize) {
  webpackConfig = merge(webpackConfig, require('./webpack.config.optimize'));
}

if (config.env.production) {
  webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
}

if (config.enabled.watcher) {
  //webpackConfig.entry = require('./util/addHotMiddleware')(webpackConfig.entry);
  webpackConfig = merge(webpackConfig, require('./webpack.config.watch'));
}

module.exports = webpackConfig;
