<template>
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else-if="artwork" class="min-h-screen p-8">
    <div class="container mx-auto bg-white rounded p-6">
      <h1 class="text-4xl font-bold mb-4">{{ artwork.name }}</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            v-if="artwork.images && artwork.images[0]"
            :src="getFullImageUrl(artwork.images[0].url)" 
            :alt="artwork.name"
            class="w-full h-auto rounded"
          >
        </div>
        <div>
          <p class="mb-4"><strong>Year:</strong> {{ artwork.year }}</p>
          <p class="mb-4"><strong>Medium:</strong> {{ artwork.medium }}</p>
          <p class="mb-4"><strong>Dimensions:</strong> {{ artwork.dimensions }}</p>
          <p class="mb-4"><strong>Availability:</strong> {{ artwork.availability }}</p>
          <p class="mb-4"><strong>Price:</strong> ${{ artwork.price }}</p>
          <p class="mb-4">{{ artwork.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useFullImageUrl } from '~/composables/useFullImageUrl';

const route = useRoute();
const getFullImageUrl = useFullImageUrl();
const { findOne } = useStrapi();

const { data: artwork, status, error } = await findOne('artworks', route.params.id, {
  populate: '*'
});
</script>