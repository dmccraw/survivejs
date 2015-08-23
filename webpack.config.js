var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
// var webpack = require('webpack');
var merge = require('webpack-merge');

var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);

var common = {
  entry: path.resolve(ROOT_PATH, 'app/main'),
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        // defin an include so we checkjust th files we need
        include: path.resolve(ROOT_PATH, 'app'),
        loader: 'jshint'
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: path.resolve(ROOT_PATH, 'app')
      }
    ]
  },
  // Getting an error when using this in the webpack.config.js
  // devServer: {
  //   colors: true,
  //   historyApiFallback: true,
  //   hot: true,
  //   inline: true,
  //   progress: true
  // },
  // resolve: {
  //   alias: {
  //     teamsnap: "vendor/teamsnap"
  //   }
  // },
  // resolve: {
  //     alias: {
  //         teamsnap: path.resolve(__dirname, 'vendor', 'teamsnap.js')
  //     }
  // },

  plugins: [
    new HtmlwebpackPlugin({
      title: 'Kanban app'
    })
    // new webpack.ProvidePlugin({
    //   teamsnap: path.resolve(ROOT_PATH, 'vendor/teamsnap')
    // })
  ]
};

if(TARGET === 'dev') {
  module.exports = merge(common, {
    module: {
      preLoaders: [
        {
          test: /\.css$/,
          loader: 'csslint'
        },
        {
          test: /\.jsx?$/,
          // we are using `eslint-loader` explicitly since
          // we have ESLint module installed. This way we
          // can be certain that it uses the right loader
          loader: 'eslint-loader',
          include: path.resolve(ROOT_PATH, 'app')
        }
      ],
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['react-hot', 'babel?stage=1'],
          include: path.resolve(ROOT_PATH, 'app')
        }
      ]
    }
  });
}
