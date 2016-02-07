var vue = require('vue-loader');
var webpack = require('webpack');
var jquery = require('jquery');

module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname,
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }, {
                test: /\.scss$/,
                loader: 'style!css!autoprefixer?{browsers:["ios >= 7", "android >= 4.1"]}!pxtorem?root=75&threshold=1!sass?outputStyle=expanded'
            }, {
                test: /\.vue$/,
                loader: 'vue'
            }, {
                test: /\.(ttf|eot|svg|woff?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }, {
                test: /\.(jpg|png)$/,
                loader: "url?limit=8192"
            }
        ]
    },
    vue: {
        loaders: {
            sass: 'style!css!autoprefixer?{browsers:["ios >= 7", "android >= 4.1"]}!pxtorem?root=75&threshold=1!sass?outputStyle=expanded'
        }
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    }
};

