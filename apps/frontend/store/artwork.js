import { defineStore } from 'pinia'
import { useStrapi } from '~/composables/useStrapi'

export const useArtworkStore = defineStore('artwork', {
  state: () => ({
    artworks: [],
    currentArtwork: null
  }),
  actions: {
    async fetchArtworks() {
      const strapi = useStrapi()
      this.artworks = await strapi.getEntries('artworks')
    },
    async fetchArtwork(id) {
      const strapi = useStrapi()
      this.currentArtwork = await strapi.getEntry('artworks', id)
    }
  }
})