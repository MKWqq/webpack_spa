/**
 * utils
 * */
var path = require('path')
var config = require('./index')
var MiniCssExtractPlugin = require("mini-css-extract-plugin")
var autoprefixer = require("autoprefixer");
var flexbugs = require("postcss-flexbugs-fixes");

exports.assetsPath = function (_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.prod.assetsSubDirectory
        : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
    options = options || {}

    var cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap,
            minimize: true
        }
    }
    var postcssLoader={
        loader: "postcss-loader",
        options: {
            plugins: [
                flexbugs,
                autoprefixer({
                    browsers: ["last 6 versions", "android >= 4.0", "ios >= 5.0", ">1%", "Firefox ESR", "not ie < 9"]
                })
            ]
        }
    }
    var extractLoader={
        loader:MiniCssExtractPlugin.loader
        // options:{
        //     // publicPath: ''
        // }
    }

    function generateLoaders(loader, loaderOptions) {
        var loaders = [cssLoader,postcssLoader]

        // new loader
        if (loader) {
            var otherLoader = {
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            }

            loaders.push(otherLoader)
        }
        if (options.extract) {
            // return ExtractTextPlugin.extract({
            //     use: loaders,//指需要什么样的loader去编译文件
            //     fallback: 'style-loader'//编译后用什么loader来提取css文件
            //     // publicfile:''//用来覆盖项目路径,生成该css文件的文件路径
            // })
            return [extractLoader].concat(loaders)
        }else{
            return ['style-loader'].concat(loaders)
        }
    }

    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        // sass: generateLoaders('sass', {indentedSyntax: true}),
        // scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

exports.styleLoaders = function (options) {
    var output=[]
    var loaders=exports.cssLoaders(options)
    for(var extension in loaders){
        var loader=loaders[extension]
        output.push({
            test:new RegExp('\\.' + extension + '$'),
            use:loader
        })
    }
    return output
}
