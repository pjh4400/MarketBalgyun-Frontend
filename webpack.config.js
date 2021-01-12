const path = require('path'); 
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const port = process.env.PORT || 8080;

module.exports = {
    name: 'market-balgyun',
    mode: 'development', // 실서비스 할 때: production
    devtool: 'eval', 
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    entry:{	
        app : ['./src/index.js'],
    },
    module: { 
        rules : [
            { 
            test: /\.(js|jsx)?$/,
            loader: 'babel-loader',
            options: { 
                presets: ['@babel/preset-env','@babel/preset-react'] ,
                plugins: [
                    '@babel/plugin-syntax-class-properties',
                    'react-hot-loader/babel'
                ],
            },
            exclude: path.join(__dirname, 'node_modules'),
        },
        {
            test: /\.css?$/,
            use: ['style-loader', 'css-loader']
        },
    ]
    }, 
    output:{ // 출력
        path: path.join(__dirname, './dist/'), 
        publicPath: '/',
        filename: 'app.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        // 정적 파일 경로 설정
        contentBase: path.join(__dirname, '/public/'),
        port: port,
        // 번들된 코드가 실제로 어디 있는지 서버에게 알려준다.
        publicPath: 'http://localhost:'+port+'/dist/',
        // devserver 에서만 핫로딩 가능하게
        hotOnly: true,
        proxy: {
            '/api':{
                //target : 'http://localhost:3000/',
                target : 'https://marketback.herokuapp.com/',
                pathRewrite: {'^/api' : ''},
                changeOrigin: true,
            },
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
        // 번들링된 JS를 주입하고 결과물을 옮길 대상이 되는 파일을 지정 
            template: './public/index.html',
        }),
        new CleanWebpackPlugin(),
    ]
}