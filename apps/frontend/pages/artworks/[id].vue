<template>
  <div v-if="artwork" class="bg-memphis-pattern min-h-screen p-8">
    <div class="container mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-4xl font-bold text-memphis-black mb-4">{{ artwork.name }}</h1>
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/2 pr-4">
          <img 
            v-if="artwork.images && artwork.images && artwork.images.length > 0" 
            :src="getFullImageUrl(artwork.images[0].url)" 
            :alt="artwork.name"
            class="w-full h-auto rounded-lg shadow-md"
          >
        </div>
        <div class="w-full md:w-1/2 mt-4 md:mt-0">
          <p class="text-lg mb-2"><strong>Year:</strong> {{ artwork.year }}</p>
          <p class="text-lg mb-2"><strong>Medium:</strong> {{ artwork.medium }}</p>
          <p class="text-lg mb-2"><strong>Dimensions:</strong> {{ artwork.dimensions }}</p>
          <p class="text-lg mb-2"><strong>Availability:</strong> {{ artwork.availability }}</p>
          <p class="text-lg mb-2"><strong>Price:</strong> ${{ artwork.price }}</p>
          <p class="text-lg mt-4">{{ artwork.description }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="bg-memphis-pattern min-h-screen p-8 flex items-center justify-center">
    <p class="text-2xl font-bold text-memphis-black">Loading artwork...</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useFullImageUrl } from '~/composables/useFullImageUrl';
import { useServerStrapi } from '~/composables/useServerStrapi';

const route = useRoute()
const strapi = useServerStrapi()
const getFullImageUrl = useFullImageUrl()

const artwork = ref(null)

async function fetchArtwork() {
  try {
    const { id } = route.params
    const response = await strapi.find('artworks', {
      filters: { id: id },
      populate: '*'
    })
    artwork.value = response.data[0]
  } catch (error) {
    console.error('Error fetching artwork:', error)
  }
}

onMounted(fetchArtwork)
</script>