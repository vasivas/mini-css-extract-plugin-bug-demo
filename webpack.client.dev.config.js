const path = require('path');

const webpack = require('webpack');

const {
    HotModuleReplacementPlugin,
    NoEmitOnErrorsPlugin,

    DefinePlugin,
    DllReferencePlugin
} = webpack;

const MiniCssExtractPlugin = require('mini-css-extract-plugin');



module.exports = {
    name: 'client',
    mode: 'development',
    target: 'web',
    context: path.resolve(__dirname,'src'),
    entry: [
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
            'react-hot-loader/patch',
            path.join(__dirname, 'src','client','client.tsx')
        ],
    output: {
        publicPath: "/static/",
        path: path.join(__dirname,'dest'),
        filename: 'client.js',
        chunkFilename:"[name].js",
        libraryTarget: "umd2",
        globalObject: "this"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css", ".json"],
        modules: ["node_modules"],
        alias: {
        }
    },
    externals: {
    },
    devtool: 'cheap-inline-module-source-map',
    node:{
        fs:'empty'
    },
    module:{
        noParse:/\.json$/,
        rules:[
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
    plugins: [
        new HotModuleReplacementPlugin({
            multiStep:true
        }),
        new NoEmitOnErrorsPlugin(),

        new DllReferencePlugin({
            context: path.join(__dirname, 'dest'),
            manifest: require('./dest/root.dll.manifest.json'),
            sourceType: 'umd2',
        }),
        new DefinePlugin({
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
