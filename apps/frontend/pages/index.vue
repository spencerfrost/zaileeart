<template>
  <div class="bg-memphis-pattern min-h-screen p-8">
    <main v-if="!error" class="container mx-auto px-4 py-8">
      <!-- Hero Section -->
      <section v-if="artistProfile" class="bg-memphis-yellow rounded-3xl p-8 mb-12 relative overflow-hidden">
        <div class="max-w-2xl">
          <h1 v-if="artistProfile.name" class="text-4xl font-bold text-memphis-black mb-4">Welcome to {{ artistProfile.name }}'s Artistic World</h1>
          <p v-if="artistProfile.title || artistProfile.pronouns" class="text-l text-memphis-black mb-6 italic">
            <span v-if="artistProfile.title">{{ artistProfile.title }}</span>
            <span v-if="artistProfile.title && artistProfile.pronouns"> | </span>
            <span v-if="artistProfile.pronouns">{{ artistProfile.pronouns }}</span>
          </p>
          <p v-if="artistProfile.short_bio" class="text-l text-memphis-black mb-6">{{ artistProfile.short_bio }}</p>
          <NuxtLink to="/gallery" class="bg-memphis-pink text-white px-6 py-2 rounded-full hover:bg-memphis-blue transition-colors">
            View Gallery
          </NuxtLink>
        </div>
        <div v-if="artistProfile.picture && artistProfile.picture.url" class="absolute right-8 top-0 bottom-0 my-auto aspect-square h-4/5">
          <div class="w-full h-full rounded-full bg-memphis-pink overflow-hidden">
            <img 
              :src="getFullImageUrl(artistProfile.picture.url)" 
              :alt="artistProfile.name" 
              class="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      <!-- Featured Works -->
      <section v-if="latestArtworks.length" class="mb-12">
        <h2 class="text-3xl font-bold text-memphis-black mb-6">Featured Works</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NuxtLink 
            v-for="artwork in latestArtworks" 
            :key="artwork.id" 
            :to="{ path: `/artworks/${artwork.id}` }"
            class="bg-memphis-blue rounded-2xl p-4 text-white hover:bg-memphis-pink transition-colors"
          >
            <img 
              v-if="artwork.images && artwork.images[0] && artwork.images[0].url" 
              :src="getFullImageUrl(artwork.images[0].url)" 
              :alt="artwork.name" 
              class="w-full h-48 object-cover rounded-xl mb-4" 
            />
            <h3 v-if="artwork.name" class="text-xl font-semibold mb-2">{{ artwork.name }}</h3>
            <p v-if="artwork.description" class="text-sm">{{ artwork.description }}</p>
          </NuxtLink>
        </div>
      </section>

      <!-- Latest News -->
      <section v-if="latestBlogPosts.length" class="bg-memphis-blue rounded-3xl p-6 text-white">
        <h2 class="text-2xl font-bold mb-2">Latest News</h2>
        <div v-for="post in latestBlogPosts" :key="post.id" class="mb-4">
          <h3 v-if="post.title" class="text-xl font-semibold">{{ post.title }}</h3>
          <p v-if="post.content">{{ post.content.substring(0, 100) }}...</p>
        </div>
      </section>
    </main>
    <div v-else class="container mx-auto px-4 py-8 text-center">
      <h1 class="text-4xl font-bold text-memphis-black mb-4">Oops! Something went wrong.</h1>
      <p class="text-l text-memphis-black mb-6">We're having trouble loading the content. Please try again later.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFullImageUrl } from '~/composables/useFullImageUrl';
import { useServerStrapi } from '~/composables/useServerStrapi';

const strapi = useServerStrapi()
const getFullImageUrl = useFullImageUrl()

const artistProfile = ref(null)
const latestArtworks = ref([])
const latestBlogPosts = ref([])
const error = ref(false)

async function fetchData() {
  try {
    const [profileData, artworksData, blogPostsData] = await Promise.all([
      strapi.find('artist-profile', { populate: '*' }),
      strapi.find('artworks', { 
        pagination: { limit: 3 },
        sort: ['createdAt:desc'],
        populate: '*'
      }),
      strapi.find('blog-posts', { 
        pagination: { limit: 3 },
        sort: ['createdAt:desc'],
        populate: '*'
      })
    ])

    artistProfile.value = profileData.data || null
    latestArtworks.value = artworksData.data || []
    latestBlogPosts.value = blogPostsData.data || []
  } catch (e) {
    console.error('Error fetching data:', e)
    error.value = true
  }
}

try {
  await fetchData()
} catch (e) {
  console.error('Error in setup function:', e)
  error.value = true
}
</script>