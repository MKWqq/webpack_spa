# webpack_spa
> Use spa webpack configuration.

## Build Setup

``` bash
# install client dependencies
npm install

# install node dependencies
cd server
npm install

# serve with hot reload at localhost:8080
npm run dev/npm run start

# build for production with minification
npm run build

# run node
npm run server

# base.conf.js文件：
alias:{'vue': 'vue/dist/vue.js'}
rules:[
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
]
