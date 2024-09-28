<template>
  <div class="bg-memphis-pattern min-h-screen p-8">
    <h1 class="text-4xl font-memphis text-memphis-pink memphis-text-shadow mb-6">
      Welcome to {{ artistProfile.name }}'s Portfolio
    </h1>
    <p class="text-memphis-black mb-8">{{ artistProfile.bio }}</p>
    
    <section class="mb-12">
      <h2 class="text-3xl font-memphis text-memphis-blue memphis-text-shadow mb-4">Latest Artworks</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ArtworkCard 
          v-for="artwork in latestArtworks" 
          :key="artwork.id" 
          :artwork="artwork" 
          class="memphis-border bg-white rounded-memphis p-4 hover:memphis-rotate transition-transform duration-300"
        />
      </div>
    </section>
    
    <section>
      <h2 class="text-3xl font-memphis text-memphis-yellow memphis-text-shadow mb-4">Latest Blog Posts</h2>
      <div v-if="latestBlogPosts.length" class="space-y-6">
        <div 
          v-for="post in latestBlogPosts" 
          :key="post.id"
          class="memphis-border bg-white rounded-memphis p-4 hover:memphis-rotate transition-transform duration-300"
        >
          <h3 class="text-2xl font-memphis text-memphis-pink mb-2">{{ post.title }}</h3>
          <p class="text-memphis-black">{{ post.excerpt }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStrapi } from '~/composables/useStrapi'

const strapi = useStrapi()

const artistProfile = ref({})
const latestArtworks = ref([])
const latestBlogPosts = ref([])

onMounted(async () => {
  artistProfile.value = await strapi.getSingleType('artist-profile')
  latestArtworks.value = await strapi.getEntries('artworks', { limit: 3 })
  latestBlogPosts.value = await strapi.getEntries('blog-posts', { limit: 3 })
})
</script>