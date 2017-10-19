const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    watch: true,
    entry: './src/bootstrap.jsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/bundle.js',
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html',
            inject: 'body',
        }),
    ],
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.styl', '.jsx'],
        enforceExtension: false,
        alias: {
            libs: path.resolve(__dirname, './src/libs/'),
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/, /public/],
                use: ['babel-loader'],
            },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
}
