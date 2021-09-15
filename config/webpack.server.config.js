const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const base = require('./webpack.base.config')
const NodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(base, {
    target: 'node',
    devtool: '#source-map',
    externals: [NodeExternals()],
    entry: {
        server: path.resolve(__dirname, '../src/entry-server.js')
    },
    output: {
        libraryTarget: 'commonjs2',
        publicPath: '/'
    },
    plugins: [
        new VueSSRServerPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../static/index.ssr.html'),
            filename: 'index.ssr.html',
            files: {
                js: 'client.bundle.js'
            },
            excludeChunks: ['server']
        })
    ]
})
