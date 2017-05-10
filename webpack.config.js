var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
// var JSDocPlugin = require('jsdoc-webpack-plugin');

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./src/js/entry.js",
    output: {
      path: __dirname + "/src/js",
      filename: "konig.js"
    },
    
    plugins: debug ? [

    ] : [
    // new JSDocPlugin({conf: './jsdoc.config.json'}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ]
}

// Just run `webpack` to produce unminified output
// Run `NODE_ENV=production webpack` to minify the output and de-dupe.
