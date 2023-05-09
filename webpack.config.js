// webpack.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const slsw = require('serverless-webpack');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodeExternals = require('webpack-node-externals');

module.exports = {
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: slsw.lib.webpack.isLocal ? 'eval-cheap-module-source-map' : 'source-map',
  resolve: {
    extensions: ['.mjs', '.json', '.ts'],
    symlinks: false,
    cacheWithContext: false
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: slsw.lib.webpack.isLocal ? '[name].js' : 'lambda-handler.js'
  },
  optimization: {
    minimize: false
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack')
          ]
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true
        }
      }
    ]
  },
  plugins: []
};