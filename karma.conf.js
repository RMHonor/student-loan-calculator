/* eslint-disable import/no-extraneous-dependencies */
const mocha = require('karma-mocha');
const mochaReporter = require('karma-mocha-reporter');
const coverageReporter = require('karma-coverage');
const chai = require('karma-chai');
const webpack = require('karma-webpack');
const chromeLauncher = require('karma-chrome-launcher');

module.exports = (config) => {
  config.set({
    basePath: './src',
    frameworks: ['mocha', 'chai'],
    files: [
      '**/*.spec.js',
    ],

    plugins: [
      mocha,
      mochaReporter,
      coverageReporter,
      chai,
      webpack,
      chromeLauncher,
    ],

    preprocessors: {
      '**/*.js': ['webpack'],
      '**/*.jsx': ['webpack'],
    },

    reporters: ['mocha', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: '../coverage/',
    },

    mochaReporter: {
      showDiff: true,
    },

    webpack: { //kind of a copy of your webpack config
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
          {
            test: /.jsx?$/,
            exclude: /(node_modules|\.spec\.js)/,
            loader: 'istanbul-instrumenter-loader',
            enforce: 'post',
          },
        ],
      },
    },

    webpackServer: {
      noInfo: true,
    },

    browsers: ['Chrome'],
  });
};
