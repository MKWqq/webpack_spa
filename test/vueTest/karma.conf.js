// Karma configuration
// Generated on Thu Mar 21 2019 14:13:36 GMT+0800 (CST)
/**
 * vue组件测试
 * 组件安装：
 * npm install karma-cli
 * cnpm install karma karma-chai karma-mocha karma-webpack webpack babel-loader babel-core mocha chai karma-chrome-launcher --save-dev
 * */
var TestWebpackConf=require('../../webpack/test.conf');
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha','chai'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'unit/index.js', included: true}
    ],


    // list of files / patterns to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'unit/index.js': ['webpack','coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 8080,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    plugins:[
      'karma-coverage',
      'karma-webpack',
      'karma-chai',
      'karma-chrome-launcher',
      'karma-mocha',
    ],
    webpack: TestWebpackConf,
    // Webpack中间件
    webpackMiddleware: {
      noInfo: true
    },
    // 测试覆盖率报告
    // https://github.com/karma-runner/karma-coverage/blob/master/docs/configuration.md
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'text-summary'}
      ]
    }
  })
}
