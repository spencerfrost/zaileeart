<template>
  <section class="mb-12">
    <h2 class="text-3xl font-bold text-black mb-6">Featured Works</h2>
    <div v-if="status === 'pending'" class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Loading skeleton here -->
    </div>
    <div v-else-if="error">
      <p class="text-red-500">Error loading artworks: {{ error.message }}</p>
    </div>
    <div v-else-if="artworks && artworks.length" class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <NuxtLink 
        v-for="artwork in artworks" 
        :key="artwork.id" 
        :to="{ path: `/artwork/${artwork.documentId}` }"
        class="hover:bg-secondary rounded-2xl p-4 text-black bg-primary transition-colors"
      >
        <img 
          v-if="artwork.images[0].url"
          :src="getFullImageUrl(artwork.images[0].url)" 
          :alt="artwork.name" 
          class="w-full h-48 object-cover rounded-xl mb-4" 
        />
        <h3 v-if="artwork.name" class="text-xl font-semibold mb-2">{{ artwork.name }}</h3>
        <p v-if="artwork.description" class="text-sm">{{ artwork.description }}</p>
      </NuxtLink>
    </div>
    <div v-else>
      <p>No artworks available at the moment.</p>
    </div>
  </section>
</template>

<script setup>
import { useFullImageUrl } from '~/composables/useFullImageUrl';
import { useStrapi } from '~/composables/useStrapi';

const strapi = useStrapi();
const getFullImageUrl = useFullImageUrl();

const { data: artworks, status, error } = await strapi.find('artworks', {
  populate: '*',
  pagination: { limit: 3 },
  sort: ['createdAt:desc']
})
</script>