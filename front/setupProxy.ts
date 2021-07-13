import { createProxyMiddleware } from 'http-proxy-middleware';

import { BASE_URL } from './src/utils/constants';

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: BASE_URL,
      changeOrigin: true,
    }),
  );
};
