export default ({ env }) => ({
  host: env('STRAPI_HOST', '0.0.0.0'),
  port: env.int('STRAPI_PORT', 3222),
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('STRAPI_PUBLIC_URL', 'https://zailee.ca/server'),
});
