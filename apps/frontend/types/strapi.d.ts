import '@nuxt/types'
import { Strapi } from '@nuxtjs/strapi'

declare module '#app' {
  interface NuxtSSRContext {
    strapi: Strapi
  }
}