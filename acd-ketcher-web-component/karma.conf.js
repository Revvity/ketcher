const webpack = require('webpack');

// Karma configuration
// Generated on Wed Feb 01 2023 14:07:50 GMT+0300 (Moscow Standard Time)

module.exports = function (config) {
  config.set({
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-webpack'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['jasmine', 'webpack'],

    // list of files / patterns to load in the browser
    files: [
      { pattern: 'src/**/*.spec.ts', watched: false },
      { pattern: 'src/test.ts', watched: false },
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
      'src/test.ts': ['webpack'],
      'src/**/*.spec.ts': ['webpack'],
    },
    webpack: {
      devtool: 'eval-source-map',
      output: {
        clean: true,
      },
      resolve: {
        extensions: ['.js', '.ts', '.tsx'],
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            // exclude: /node_modules/,
            options: {
              configFile: 'tsconfig.spec.json',
            },
          },
          {
            test: /\.s?css$/i,
            use: [
              // Translates CSS into CommonJS
              'css-loader',
              // Compiles Sass to CSS
              'sass-loader',
            ],
          },
          {
            test: /src\/tests\/examples\/.*\.svg/,
            type: 'asset/source',
          },
        ],
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development'),
          'process.env.NODE_DEBUG': JSON.stringify(process.env.NODE_DEBUG),
        }),
      ],
      stats: 'minimal',
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress', 'kjhtml'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    // tested with chrome 110.0.5481.77
    browsers: ['Chrome', 'ChromeDocker'],
    customLaunchers: {
      ChromeDocker: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--remote-debugging-port=9222'],
      },
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity,
  });
};
