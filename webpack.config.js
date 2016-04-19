var path = require('path')
var webpack = require('webpack')

module.exports = {
  target: 'web',
  debug: true,
  devtool: 'source-map',
  entry: './app.js',
  output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/assets/',
      filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      webworkify: 'webworkify-webpack'
    }
  },
  node: {
    console: true,
    fs: 'empty'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: { presets: ['es2015', 'react', 'stage-0'] }
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.svg$/,
        loader: 'svg-loader'
      }, {
        test: /\.(eot|ttf|wav|mp3|woff2)$/,
        loader: 'file-loader',
      }, {
        test: /\.(png|jpg|jpeg|gif|woff)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  postLoaders: [
    {
      include: path.resolve(__dirname, 'node_modules/mapbox-gl'),
      loader: 'transform?brfs'
    }
  ],
  externals: {
    fs: '{}',
    tls: '{}',
    net: '{}',
    console: '{}'
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, comments: false}),
    // new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      __DEV__: true
    })
  ]
}
