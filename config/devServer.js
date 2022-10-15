'use strict';

const path = require('path');
const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

module.exports = assetsPublicPath => ({
    clientLogLevel: 'warning',
    hot: true,
    contentBase: assetsPublicPath, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || '0.0.0.0',
    port: PORT || 3000,
    open: true,
    historyApiFallback: {
        rewrites: [{ from: /.*/, to: path.posix.join(assetsPublicPath, 'index.html') }]
    },
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    proxy: {
        '/post': {
            // target: 'http://api.annajunen.top',
            target: 'http://koa2.901web.com',
            // target: 'http://localhost:4560',
            changeOrigin: true,
            // pathRewrite: {
            //     "^/papi": ""
            // }
        }
    },
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchContentBase: true,
    watchOptions: {
        ignored: /node_modules/
    }
});
