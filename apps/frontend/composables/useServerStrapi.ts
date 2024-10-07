import { useNuxtApp } from '#app'

export const useServerStrapi = () => {
  if (import.meta.server) {
    const nuxtApp = useNuxtApp()
    if (nuxtApp.ssrContext && 'strapi' in nuxtApp.ssrContext) {
      return nuxtApp.ssrContext.strapi
    }
  }

  return useStrapi()
}
