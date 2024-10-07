<template>
  <div class="bg-memphis-pattern min-h-screen p-8 relative overflow-hidden">
    <!-- Memphis style decorative elements -->
    <div class="absolute top-4 left-4 w-16 h-16 bg-memphis-yellow rounded-full"></div>
    <div class="absolute top-8 right-8 w-12 h-12 bg-memphis-pink transform rotate-45"></div>
    <div class="absolute bottom-8 right-12 w-0 h-0 border-l-[30px] border-l-transparent border-b-[52px] border-b-memphis-blue border-r-[30px] border-r-transparent"></div>

    <div class="relative z-10 max-w-6xl mx-auto">
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Portrait area -->
        <div class="md:w-1/3 bg-memphis-blue rounded-memphis p-4">
          <img 
            v-if="artistProfile.picture" 
            :src="getFullImageUrl(artistProfile.picture.url)" 
            :alt="artistProfile.Name"
            class="w-full h-auto object-cover rounded-memphis"
          >
        </div>

        <!-- Content area -->
        <div class="md:w-2/3">
          <h1 class="text-4xl font-memphis text-memphis-black bg-memphis-yellow inline-block px-4 py-2 rounded-memphis memphis-text-shadow mb-6">
            About {{ artistProfile.name }}
          </h1>
          <div class="bg-white rounded-memphis p-6 mb-8 memphis-border">
            <p class="text-memphis-black mb-4">
              {{ artistProfile.biography }}
            </p>
          </div>

          <!-- Social links -->
          <div class="bg-memphis-pink rounded-memphis p-6">
            <h2 class="text-2xl font-memphis text-white memphis-text-shadow mb-4">Connect with me:</h2>
            <div class="flex flex-wrap gap-4">
              <a 
                v-for="link in artistProfile.socials" 
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStrapi } from '#imports'
import { useFullImageUrl } from '~/composables/useFullImageUrl'

const { findOne } = useStrapi()
const artistProfile = ref({})
const getFullImageUrl = useFullImageUrl()

async function fetchArtistProfile() {
  try {
    const response = await findOne('artist-profile', { populate: '*' })
    artistProfile.value = response.data
  } catch (error) {
    console.error('Error fetching artist profile:', error)
  }
}

fetchArtistProfile()
</script>

<style scoped>
.bg-memphis-pattern {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%234ECDC4' fill-opacity='0.1'%3E%3Ccircle cx='10' cy='10' r='5'/%3E%3Crect x='30' y='30' width='20' height='20' transform='rotate(45 40 40)'/%3E%3Cpath d='M50 5 L55 15 L45 15 Z'/%3E%3C/g%3E%3C/svg%3E");
}

.memphis-text-shadow {
  text-shadow: 2px 2px 0 #FF6B6B, 4px 4px 0 #FFD300;
}

.memphis-border {
  border: 4px solid #2F2F2F;
  box-shadow: 4px 4px 0 #FF6B6B, 8px 8px 0 #FFD300;
}

.memphis-rotate:hover {
  transform: rotate(-5deg);
}
</style>