export const corsConfig = {
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : 'http://localhost:4000',
  allowedHeaders: [
    'X-Access-Token',
    'Content-Type',
    'Authorization',
    'Access-Control-Request-Headers',
  ],
  credentials: process.env.CORS_CREDENTIALS === 'true',
  enablePreflight: process.env.CORS_ENABLE_PREFLIGHT === 'true',
};
