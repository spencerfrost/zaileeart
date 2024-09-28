import { defineStore } from 'pinia'
import { useStrapi } from '~/composables/useStrapi'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [],
    currentPost: null
  }),
  actions: {
    async fetchPosts() {
      const strapi = useStrapi()
      this.posts = await strapi.getEntries('blog-posts')
    },
    async fetchPost(id) {
      const strapi = useStrapi()
      this.currentPost = await strapi.getEntry('blog-posts', id)
    }
  }
})