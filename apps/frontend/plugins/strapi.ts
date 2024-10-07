import { defineNuxtPlugin } from '#app'

declare module '#app' {
  interface NuxtSSRContext {
    strapi: ReturnType<typeof useStrapi>
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    if (import.meta.server) {
      const { ssrContext } = nuxtApp
      if (ssrContext) {
        ssrContext.strapi = useStrapi()
      }
    }
  })
})