const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: "styles.css",
  disable: false,
  allChunks: true
});

const config = {
  
  context: path.resolve(__dirname, 'src'),

  entry: './scripts/main.js',

  devServer: {
    contentBase: path.resolve(__dirname, "./dist/media"),
    compress: true,
    port:8080,
    stats: 'errors-only',
    open: true
  },
  
  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    //publicPath: '/dist/'
  },
  resolve : {
    modules: [path.resolve(__dirname, 'node_modules')],
    alias : {
      'modaal': path.resolve(__dirname, 'node_modules/modaal/dist/js/modaal.js'),
      'ScrollReveal' : path.resolve(__dirname, 'node_modules/scrollreveal/dist/scrollreveal.js')
    }
  },
  module: {
    rules: [
      { 
        test: /\.html$/, 
        use: ['html-loader']
      },

      {
        test : /\.scss$/,
        use : ExtractTextPlugin.extract({
          use : ['css-loader','sass-loader'],
          fallback : "style-loader"
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: { 
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        } 
      },
      
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './media/images/'
            }
          }
        ]
      }
   ]
  },

  plugins : [
    new HtmlWebpackPlugin({
      template: 'index.html',
      hash: true
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    extractPlugin
  ]

};

module.exports = config;