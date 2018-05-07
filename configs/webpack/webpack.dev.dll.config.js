const path = require('path');

const webpack = require('webpack');

const {DllPlugin} = webpack;

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const create = (root)=>({
    name: 'dll',
    mode: 'development',
    target:'web',
    context:path.join(root,'dest'),
    entry: {
        ['root']: [
            'react',
            'react-dom',
            'react-router',
            // '@7rulnik/react-loadable',
            'react-router-dom',
            'redux',
            'react-redux',
            'redux-thunk',
            'redux-form',
            'prop-types',

        ],
    },
    devtool: 'none',
    output: {
        publicPath: "/static/",
        path: path.resolve(root, 'dest'),
        filename: "[name].dll.js",
        library:'[name]',
        libraryTarget: 'umd2',
        globalObject: "this"
    },
    resolve:{
        alias:{
        }
    },
    externals:{
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: path.resolve(root, 'node_modules'),
                include: path.resolve(root, 'src'),
            },
            {
                test: /(\.ts|\.tsx)$/,
                use: [
                    {
                        loader:'awesome-typescript-loader',
                        options: {
                            configFileName:path.join(__dirname,'tsconfig.dev.ssr.client.json')
                        }
                    }
                ],
                include: [path.join(__dirname,'src')],
                exclude: [/node_modules/, /\*\.spec.(ts|tsx)$/]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // {loader: 'style-loader', options: {sourceMap: true}},
                    {loader: 'css-loader', options: {sourceMap: true}},
                ]
            },
            {
                test: /\.json$/,
                use: 'json-loader',
                exclude:[/node_modules/]
            },
        ]
    },
    devtool: 'cheap-inline-module-source-map',
    plugins: [
        new DllPlugin({
            context: path.join(root,'dest'),
            name: "[name]",
            path: path.join(root, 'dest', '[name].dll.manifest.json'),
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
});


module.exports = {create};