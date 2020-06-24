var path = require('path');

module.exports = {
    mode: 'production',
    entry: './dist/index.js',
    target: "node",
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: 'server.bundle.js'
    },
    optimization: {
        minimize: false
    },
};