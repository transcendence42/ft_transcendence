const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: `${process.env.REACT_APP_SERVER_URL}`,
      changeOrigin: true,
    }),
  );
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: `${process.env.REACT_APP_SERVER_URL}/graphql`,
      changeOrigin: true,
    }),
  );
};
