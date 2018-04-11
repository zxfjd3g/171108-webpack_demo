const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.conf')

function resolve(dir) {
    return path.resolve(__dirname, '..', dir)
}

// 将 Hol-reload 相对路径添加到 webpack.base.conf 的 对应 entry 前
Object.keys(baseConfig.entry).forEach(function (name) {
    baseConfig.entry[name] = ['./build/dev-client'].concat(baseConfig.entry[name])
})
// require('./dev.client')
module.exports = merge(baseConfig, {
    module: {
        rules: [
            // css
            {
                test: /.css$/,
                use: ['vue-style-loader', 'css-loader'],
            },
            // styl
            {
                test: /.styl$/,
                use: ['vue-style-loader', 'css-loader', "stylus-loader"],
            },
            // vue
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ['vue-style-loader', 'css-loader'],
                        styl: ['vue-style-loader', 'css-loader', "stylus-loader"],
                    },
                    // 声明在解析到指定标签的特定属性时转换为require引入相关模块
                    transformToRequire: {
                        video: 'src',
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    }
                }
            }
        ]
    },

    devtool: '#cheap-module-eval-source-map',

    plugins: [
        // 为开发环境定义全局标识
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        // hmr插件
        new webpack.HotModuleReplacementPlugin()
    ]
})