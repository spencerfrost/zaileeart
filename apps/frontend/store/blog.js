import { defineStore } from 'pinia'
import { useStrapiApi } from '~/composables/useStrapi'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [],
    currentPost: null
  }),
  actions: {
    async fetchPosts() {
      const strapi = useStrapiApi()
      this.posts = await strapi.getEntries('blog-posts')
    },
    async fetchPost(id) {
      const strapi = useStrapiApi()
      this.currentPost = await strapi.getEntry('blog-posts', id)
    }
  }
})