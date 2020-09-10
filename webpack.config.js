const path = require('path');

module.exports = {
    entry: './src/bts.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `bts.js`
    }
};