module.exports = {
    entry: './app/App.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        contentBase: './public',
        compress: true,
        port: 3333
    }
}