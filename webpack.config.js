const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: `${__dirname}/src`,

  entry: "./root.jsx",

  output: {
    filename: "app.js",
    path: `${__dirname}/dist`,
    publicPath: "/",
  },

  resolve: {
    extensions: [ '.js', '.jsx' ],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [ "babel-loader" ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
    })
  ],
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },
};
