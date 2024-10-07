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
    url: process.env.NUXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1338',
    version: 'v4',
    cookie: {},
    cookieName: 'strapi_jwt'
  },
  runtimeConfig: {
    public: {
      strapiURL: process.env.NUXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1338',
      environment: process.env.NODE_ENV ?? 'development',
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
  routeRules: {
    '/': { swr: 3600 }, // Cache for 1 hour
    '/about': { swr: 3600 },
    '/gallery': { swr: 1800 }, // Cache for 30 minutes
    '/artworks/**': { swr: true }, // Use default SWR behavior
  },
  nitro: {
    routeRules: {
      '/**': { swr: 3600 } // Global SWR fallback
    }
  },
})