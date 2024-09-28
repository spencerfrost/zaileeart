<template>
  <div class="bg-memphis-pattern min-h-screen p-8">
    <h1 class="text-4xl font-memphis text-memphis-yellow memphis-text-shadow mb-6">
      About {{ artistProfile.name }}
    </h1>
    <div class="memphis-border bg-white rounded-memphis p-6 mb-8">
      <img 
        v-if="artistProfile.photo" 
        :src="artistProfile.photo.url" 
        :alt="artistProfile.name"
        class="w-full h-64 object-cover rounded-memphis mb-4"
      >
      <div v-html="artistProfile.bio" class="text-memphis-black mb-4"></div>
    </div>
    <div class="memphis-border bg-memphis-blue rounded-memphis p-6">
      <h2 class="text-2xl font-memphis text-white memphis-text-shadow mb-4">Connect with me:</h2>
      <div class="flex flex-wrap gap-4">
        <a 
          v-for="link in artistProfile.socialMediaLinks" 
          :key="link.id" 
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-memphis-yellow text-memphis-black px-4 py-2 rounded-memphis font-memphis hover:memphis-rotate transition-transform duration-300"
        >
          {{ link.platform }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStrapi } from '~/composables/useStrapi'

const strapi = useStrapi()
const artistProfile = ref({})

onMounted(async () => {
  artistProfile.value = await strapi.getSingleType('artist-profile')
})
</script>