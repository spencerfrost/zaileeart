<template>
  <div class="bg-memphis-pattern min-h-screen p-8">
    <h1 class="text-4xl font-memphis text-memphis-pink memphis-text-shadow mb-6">Gallery</h1>
    <div v-if="artworks.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ArtworkCard 
        v-for="artwork in artworks" 
        :key="artwork.id" 
        :artwork="artwork" 
        class="memphis-border bg-white rounded-memphis p-4 hover:memphis-rotate transition-transform duration-300"
      />
    </div>
    <div v-else class="text-2xl font-memphis text-memphis-blue memphis-text-shadow">
      <p>No artworks found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStrapi } from '~/composables/useStrapi'

const strapi = useStrapi()
const artworks = ref([])

onMounted(async () => {
  artworks.value = await strapi.getEntries('artworks')
})
</script>