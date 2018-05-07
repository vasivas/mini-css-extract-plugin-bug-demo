const path = require('path');

const webpack = require('webpack');

const {
    HotModuleReplacementPlugin,
    NoEmitOnErrorsPlugin,

    DefinePlugin,
    DllReferencePlugin
} = webpack;

const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactLoadablePlugin = require('@7rulnik/react-loadable/webpack').ReactLoadablePlugin;



module.exports = {
    name: 'client',
    mode: 'development',
    target: 'web',
    // entry: {
    //     client:path.join(__dirname,'src','client','client.tsx')
    // },
    context: path.resolve(__dirname),
    entry: {
        loadable:'./node_modules/@7rulnik/react-loadable/lib/index.js'
    },
    output: {
        publicPath: "/",
        path: path.join(__dirname,'dest'),
        filename: '[name].js',
        // chunkFilename:"[name].js",
        libraryTarget: "umd2",
        globalObject: "this",
        library: "Loadable"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css", ".json"],
        modules: ["node_modules"],
        alias: {
        }
    },
    externals: [
        // nodeExternals()
    ],
    optimization: {
        // splitChunks: { // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
        //     cacheGroups: {
        //         common: {
        //             chunks: 'initial',
        //             enforce: true,
                    // filename: '[name].bundle.js?v=' + pkg.version,
                    // name: 'common',
                    // test: /[\\/]js[\\/]/
                    // reuseExistingChunk: true
                // }
            // }
        // }
        // sp
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
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new DllReferencePlugin({
            context: path.join(__dirname, 'dest'),
            // manifest: require(path.join(__dirname,'dest','root.dll.manifest.json')),
            manifest: require('./dest/root.dll.manifest.json'),
            sourceType: 'umd2',
        }),
    ]
};
