/**
 * vue组件测试
 * */
import Vue from 'vue'
Vue.config.productionTip = false;

// require all test files (files that ends with .specs.js)
var testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext);

// require all src files except home.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.


// const clientContext = require.context('../client', true, /^\.\/(?!main(\.js)?$)/)
// clientContext.keys().forEach(clientContext)
// const serverContext = require.context('../server', true, /^\.js$/)
// serverContext.keys().forEach(serverContext)
