import { useStrapiApi } from '~/composables/useStrapi'

declare module '#app' {
  interface NuxtSSRContext {
    strapi: ReturnType<typeof useStrapiApi>
  }
}