const path = require('path');

const webpack = require('webpack');

const {DllPlugin} = webpack;

module.exports = {
    name: 'dll',
    mode: 'development',
    context:path.join(__dirname,'dest'),
    entry: {
        ['main']: [
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
            'redux',
            'react-redux',
            'redux-thunk',
            'redux-form',
        ],
    },
    devtool: 'none',
    output: {
        publicPath: "/",
        path: path.join(__dirname, 'dest'),
        filename: "[name].dll.js",
        library:'[name]',
        libraryTarget: 'umd2',
        globalObject: "this"
    },
    plugins: [
        new DllPlugin({
            context: path.join(__dirname),
            name: "[name]",
            path: path.join(__dirname, 'dest', '[name].dll.manifest.json'),
        })
    ],
};