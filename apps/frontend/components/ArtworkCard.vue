<template>
  <div v-if="artwork" class="overflow-hidden">
    <h2 class="text-2xl font-memphis text-memphis-blue memphis-text-shadow mb-2">{{ artwork.title }}</h2>
    <img 
      :src="artwork.image.url" 
      :alt="artwork.title"
      class="w-full h-48 object-cover mb-4 rounded-memphis"
    >
    <p class="text-memphis-black mb-2">{{ artwork.description }}</p>
    <p class="text-memphis-pink font-bold">
      Created: {{ new Date(artwork.createdAt).toLocaleDateString() }}
    </p>
  </div>
  <div v-else class="text-memphis-black">
    <p>Artwork not found.</p>
  </div>
</template>

<script setup>
defineProps({
  artwork: {
    type: Object,
    required: true
  }
})
</script>