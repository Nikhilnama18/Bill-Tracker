module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:3001/v1',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: { '^/api': '/' },
            },
        },
    },
}