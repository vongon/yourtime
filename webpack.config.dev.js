var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    entry: ['webpack-hot-middleware/client',
        './client/index.js',
    ],

    output: {
        path: __dirname + '/dist/',
        filename: 'bundle.js',
        publicPath: '/dist/',
    },

    resolve: {
        extensions: ['', '.js', '.jsx'],
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css?modules',
            },
            {
                test: /\.jsx*$/,
                exclude: [/node_modules/, /.+\.config.js/],
                loader: 'babel',
                query: {
                    presets: ['react-hmre'],
                },
            },
            {
                test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
                loaders: [
                    'transform-loader/cacheable?brfs',
                    'transform-loader/cacheable?packageify'
                ]
            },
            {
                test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
                loader: 'transform-loader/cacheable?ejsify'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                CLIENT: JSON.stringify(true)
            }
        })
    ],
};
