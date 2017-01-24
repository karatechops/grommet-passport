import webpackConfig from './webpack.config.babel.js';

export default {
  compress: true,
  clientLogLevel: 'none',
  contentBase: webpackConfig.output.path,
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
  hot: true,
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react-hmre']
        }
      }
    ]
  },
  historyApiFallback: true,
  proxy: {
    '/api/*': 'http://localhost:8102'
  }
};
