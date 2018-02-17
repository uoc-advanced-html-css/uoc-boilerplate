const path = require('path');
const { argv } = require('yargs');
const merge = require('webpack-merge');

const isProduction = !!((argv.env && argv.env.production) || argv.p);

const rootPath = process.cwd();

const config = {
  open: true,
  copy: 'images/**/*',
  entry: {
    "main": [
      "./scripts/main.js",
      "./styles/main.scss"
    ],
  },
  paths: {
    root: rootPath,
    src: path.join(rootPath, 'src'),
    assets: path.join(rootPath, 'src/assets'),
    dist: path.join(rootPath, 'dist/assets'),
    distHtml: path.join(rootPath, 'dist'),
  },
  enabled: {
    sourceMaps: !isProduction,
    optimize: isProduction,
    watcher: !!argv.watch,
  },
  watch: [
    'src/**/*'
  ],
  browserSync: {
    port: 8123,
    uiPort: 8124,
  },
};

module.exports = merge(config, {
  env: Object.assign({ production: isProduction, development: !isProduction }, argv.env),
  publicPath: path.basename(config.paths.dist),
  manifest: {},
});
