const path = require('path');
const webpack = require('webpack');

const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    name: 'server',
    mode: 'development',
    target: 'node',
    context: path.resolve(__dirname, 'src', 'server'),
    entry: path.join(__dirname, 'src', 'server', 'server.tsx'),
    output: {
        publicPath: "/",
        path: path.join(__dirname, 'dest'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css", ".json"],
        modules: ["node_modules"],
        alias: {
        }
    },
    externals: [
        nodeExternals(),
    ],
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /(\.ts|\.tsx)$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: path.join(__dirname, 'tsconfig.dev.ssr.server.json')
                        }
                    }
                ],
                include: [path.join(__dirname)],
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
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
    ]
};
