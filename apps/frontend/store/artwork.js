import { defineStore } from 'pinia'
import { useStrapiApi } from '~/composables/useStrapi'

export const useArtworkStore = defineStore('artwork', {
  state: () => ({
    artworks: [],
    currentArtwork: null
  }),
  actions: {
    async fetchArtworks() {
      const strapi = useStrapiApi()
      this.artworks = await strapi.getEntries('artworks')
    },
    async fetchArtwork(id) {
      const strapi = useStrapiApi()
      this.currentArtwork = await strapi.getEntry('artworks', id)
    }
  }
})