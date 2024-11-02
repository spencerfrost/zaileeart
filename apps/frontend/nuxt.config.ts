// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  devServer: {
    port: 3002,
    https: false,
  },
  ssr: true,
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxtjs/strapi"],
  strapi: {
    url: process.env.STRAPI_URL || "http://localhost:3022",
    prefix: "/api",
    admin: "/admin",
    version: "v5",
    cookie: {},
    cookieName: "strapi_jwt",
  },

  runtimeConfig: {
    public: {
      strapiURL:
        process.env.NUXT_PUBLIC_STRAPI_URL ?? "https://zailee.ca/server",
      environment: process.env.NODE_ENV ?? "production",
      strapi: {
        url: process.env.NUXT_PUBLIC_STRAPI_URL ?? "https://zailee.ca/server",
      },
    },
  },
  build: {
    transpile: ["@heroicons/vue", "@yeger/vue-masonry-wall"],
  },
  components: true,
  app: {
    head: {
      title: "Zai Lee Artist Portfolio",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Artist portfolio showcasing beautiful artworks and creations.", },
        { property: 'og:title', content: 'Zai Lee Artist Portfolio' },
        { property: 'og:description', content: 'Artist portfolio showcasing beautiful artworks and creations.' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Open+Sans:wght@400;700&family=Lato:wght@400;700&family=Montserrat:wght@400;700&family=Poppins:wght@400;700&display=swap", },
      ],
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.js",
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  routeRules: {
    "/": { swr: 3600 }, // Cache for 1 hour
    "/about": { swr: 3600 },
    "/gallery": { swr: 1800 }, // Cache for 30 minutes
    "/artwork/**": { swr: true }, // Use default SWR behavior
    "/blog-post/**": { swr: true }, // Use default SWR behavior
  },
  nitro: {
    routeRules: {
      "/**": { swr: 3600 }, // Global SWR fallback
    },
    compressPublicAssets: true,
  },
  vite: {
    server: {
      hmr: {
        protocol: "ws",
      },
    },
    build: {
      cssMinify: true,
      minify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'masonry': ['@yeger/vue-masonry-wall'],
          },
        },
      },
    },
  },
  experimental: {
    payloadExtraction: false,
  },
});
