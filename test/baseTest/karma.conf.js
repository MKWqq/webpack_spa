// Karma configuration
// Generated on Sun Mar 24 2019 14:57:00 GMT+0800 (CST)
/**
 * 无vue组件测试
 * 组件安装：
 * npm install karma-cli
 * cnpm install karma karma-chai karma-mocha karma-webpack webpack babel-loader babel-core mocha chai karma-chrome-launcher --save-dev
 * */

var TestWebpackConf=require('../../webpack/test.conf');
module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "./",

    client: {
      captureConsole: true // 设置由 terminal 捕捉 browser 的输出
    },

    browserConsoleLogOptions: {
      level: "log",
      format: "%b %T: %m",
      terminal: true
    },

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["mocha", "chai"],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'unit/*.js', included: true}  // test文件夹下任意层级的.js文件 将要被测试
    ],


    // list of files / patterns to exclude
    exclude: [
      "karma.conf.js"
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "unit/*.js": ["webpack",'coverage'],
    },
    // karma 插件
    plugins: [
      "karma-webpack",
      "karma-mocha",
      "karma-chrome-launcher",
      "karma-chai",
      'karma-coverage'
    ],

    webpack: TestWebpackConf,

    // test results reporter to use
    // possible values: "dots", "progress"
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress",'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
      /* 配置多个report */
      reporters:[
        {type: 'text-summary'}
      ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_LOG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["Chrome"],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    // Webpack中间件
    webpackMiddleware: {
      noInfo: true
    },
  })
}
