const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://127.0.0.1:5500',
      changeOrigin: true,
    }),
  );
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: 'http://127.0.0.1:5500/graphql',
      changeOrigin: true,
    }),
  );
};
