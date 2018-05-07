const fs = require('fs');
const path = require('path');

const webpack = require('webpack');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const clientConfig = require('../webpack.client.dev.config');
const serverConfig = require('../webpack.server.dev.config');

const express = require('express');

const logger = require('morgan');
const favicon = require('serve-favicon');

const app = express();

const compiler = webpack([clientConfig,serverConfig]);


let isListen = false;

compiler.hooks.done.tap('WebpackDevMiddleware', () => {
    if (!isListen) {
        isListen = true;

        app.listen(3000, ()=>{
            console.info(`[server started] http://localhost:${3000}/`)
        });
    }
});



app.use(logger('dev'));

app.use('/assets/', (req, res, next) => {
    let url = req.originalUrl.replace(/^\/assets\//, '/dest/');
    res.sendFile(path.join(process.env.PWD, url));

});
// app.get('/assets/',express.static(path.join(__dirname, 'dest')));
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    serverSideRender:true,
    publicPath:clientConfig.output.publicPath
}));


app.use(webpackHotMiddleware(compiler.compilers[0],{
    reload:true,
    autoConnect:false
}));
app.use(webpackHotServerMiddleware(compiler, {
    serverRendererOptions: {
    }
}));




