const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

function resolve(dir) {
    return path.resolve(__dirname, '..', dir)
}

module.exports = {
    // 入口
    entry: {
        app: './src/main.js'
    },
   
    // 出口
    output: {
        path: resolve('dist'),
        filename: '[name].js'
    },

    // 模块加载器
    module: {
        rules: [
            // eslint
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            // es6-->es5
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')]
            },
            // img
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path
                }
            },
            // iconfont
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    
    // 插件
    plugins: [
        new HtmlPlugin({
            template: 'index.html',
            filename: 'index.html'
        })
    ],
    
    // 解析
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'components': resolve('src/components'),
            'pages': resolve('src/pages')
        }
    }
}