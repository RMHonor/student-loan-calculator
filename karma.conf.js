/* eslint-disable import/no-extraneous-dependencies */
const mocha = require('karma-mocha');
const mochaReporter = require('karma-mocha-reporter');
const chai = require('karma-chai');
const webpack = require('karma-webpack');
const chromeLauncher = require('karma-chrome-launcher');

const webpackConf = require('./webpack.config');

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
      chai,
      webpack,
      chromeLauncher,
    ],

    preprocessors: { '**/*.spec.js': ['webpack'] },

    reporters: ['mocha'],

    webpack: webpackConf,

    webpackServer: {
      noInfo: true,
    },

    browsers: ['Chrome'],
  });
};