// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/strapi',
    '@nuxtjs/tailwindcss',
  ],
  strapi: {
    url: process.env.STRAPI_URL ?? 'http://localhost:1338',
    prefix: '/api',
    version: 'v4',
    cookie: {},
  },
  runtimeConfig: {
    public: {
      strapiURL: process.env.STRAPI_URL ?? 'http://localhost:1338',
    },
  },
  build: {
    transpile: ['@heroicons/vue'],
  },
  components: true,
  vite: {
    // Add any Vite-specific configurations here
  },
  app: {
    head: {
      title: 'Artist Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Artist portfolio showcasing beautiful artworks and creations.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
})