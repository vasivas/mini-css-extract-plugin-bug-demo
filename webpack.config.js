// const webpackDevConfig = require('../react-ssr/configs/webpack/webpack.dev.config');
// const webpackProdConfig = require('../react-ssr/configs/webpack/webpack.prod.config');
// const webpackUnitConfig = require('./webpack.unit.config');
// const webpackDevClientConfig = require('./configs/webpack/webpack.dev.ssr.client.config.js');
// const webpackDevServerConfig = require('./configs/webpack/webpack.dev.ssr.server.config.js');

const webpackDevDllConfig = require('./configs/webpack/webpack.dev.dll.config.js');
const webpackProdDllConfig = require('./configs/webpack/webpack.prod.dll.config.js');

const createEnvironment = require( '../react-ssr/environment/environment.js' );

const EnvironmentType = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
    UNIT: 'unit',
    DEVELOPMENT_SSR: 'development:ssr',
    DEVELOPMENT_CLIENT_SSR: 'development:client:ssr',
    DEVELOPMENT_SERVER_SSR: 'development:server:ssr',

    DEVELOPMENT_DLL: "development:dll",
    PRODUCTION_DLL: "production:dll",
};
const isEnvironmentTypeValid = environment => Object
    .values(EnvironmentType)
    .some(value => value === environment);

const map = {
    // [EnvironmentType.DEVELOPMENT]: webpackDevConfig,
    // [EnvironmentType.PRODUCTION]: webpackProdConfig,
    // [EnvironmentType.UNIT]: webpackUnitConfig,
    // [EnvironmentType.DEVELOPMENT_CLIENT_SSR]: webpackDevClientConfig,
    // [EnvironmentType.DEVELOPMENT_SERVER_SSR]: webpackDevServerConfig,

    [EnvironmentType.DEVELOPMENT_DLL]: webpackDevDllConfig,
    [EnvironmentType.PRODUCTION_DLL]: webpackProdDllConfig,
};

const stringify = object => {
    return Object.keys(object)
        .reduce((result, key) => {
            let value = object[key];

            if (typeof value === 'object') {
                result[key] = stringify(value);
            } else {
                result[key] = JSON.stringify(value);
            }


            return result;
        }, {});
};

const environment = {
    MODE: process.env.MODE,
    ...stringify(createEnvironment.create(__dirname))
};



if (!isEnvironmentTypeValid(environment.MODE)) {
    throw new Error(`unknown environment "${environment.MODE}".`);
}

const webpackCurrentConfig = map[environment.MODE];


if (!webpackCurrentConfig) {
    throw new Error('webpack config is not be undefined');
}


const wrapper = (root, environment) =>
    (...rest) => webpackCurrentConfig.create(root, environment, ...rest);


module.exports = wrapper(__dirname, environment);