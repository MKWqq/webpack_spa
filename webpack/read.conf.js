const webpack = require("webpack");
const path = require("path");
const outputDir = path.resolve("dist");

module.exports = {
    mode: "production",
    entry: {
        readMe: ["./readme/index.js"],
    },
    output: {
        path: outputDir,
        filename: "./js/[name].[chunkhash:8].js",
        chunkFilename: "./js/[name].[id].[chunkhash:8].js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ],
    },
}
