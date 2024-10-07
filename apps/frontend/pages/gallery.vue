<template>
  <div class="bg-memphis-pattern min-h-screen p-8">
    <h1 class="text-4xl font-memphis text-memphis-pink memphis-text-shadow mb-6">Gallery</h1>
    
    <!-- Filtering and Sorting Controls -->
    <div class="mb-6 flex flex-wrap gap-4">
      <select v-model="filters.year" class="p-2 rounded-memphis">
        <option value="">All Years</option>
        <option v-for="year in uniqueYears" :key="year" :value="year">{{ year }}</option>
      </select>
      <select v-model="filters.medium" class="p-2 rounded-memphis">
        <option value="">All Mediums</option>
        <option v-for="medium in uniqueMediums" :key="medium" :value="medium">{{ medium }}</option>
      </select>
      <select v-model="filters.availability" class="p-2 rounded-memphis">
        <option value="">All Availabilities</option>
        <option value="Available">Available</option>
        <option value="Sold">Sold</option>
        <option value="On Exhibition">On Exhibition</option>
      </select>
      <select v-model="sortBy" class="p-2 rounded-memphis">
        <option value="">Sort By</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="yearDesc">Newest First</option>
        <option value="yearAsc">Oldest First</option>
      </select>
    </div>

    <!-- Masonry Layout for Artworks -->
    <ClientOnly>
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
      >
        <masonry-wall 
          :items="filteredAndSortedArtworks" 
          :column-width="300"
          :gap="16"
        >
          <template #default="{ item: artwork }">
            <NuxtLink 
              :to="`/artwork/${artwork.id}`"
              class="block overflow-hidden rounded-memphis transition-transform duration-300 hover:scale-105"
            >
              <div class="relative">
                <img 
                  :src="getFullImageUrl(artwork.images[0].url)" 
                  :alt="artwork.name"
                  class="w-full h-auto object-cover"
                >
                <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <h2 class="text-white text-xl font-memphis text-center">{{ artwork.name }}</h2>
                </div>
              </div>
            </NuxtLink>
          </template>
        </masonry-wall>
      </div>
    </ClientOnly>

    <div v-if="busy" class="text-center mt-4">
      <p class="text-2xl font-memphis text-memphis-blue memphis-text-shadow">Loading more artworks...</p>
    </div>
    <div v-if="noMoreArtworks" class="text-center mt-4">
      <p class="text-2xl font-memphis text-memphis-blue memphis-text-shadow">No more artworks to load.</p>
    </div>
  </div>
</template>

<script setup>
import { useStrapi } from '#imports'
import MasonryWall from '@yeger/vue-masonry-wall'
import { computed, onMounted, ref } from 'vue'
import infiniteScroll from 'vue-infinite-scroll'
import { useFullImageUrl } from '~/composables/useFullImageUrl'
import { useServerStrapi } from '~/composables/useServerStrapi'

const strapi = useServerStrapi()
const { find } = useStrapi()
const getFullImageUrl = useFullImageUrl()

const artworks = ref([])
const page = ref(1)
const pageSize = 12
const busy = ref(false)
const noMoreArtworks = ref(false)

const filters = ref({
  year: '',
  medium: '',
  availability: ''
})
const sortBy = ref('')

const uniqueYears = computed(() => [...new Set(artworks.value.map(a => a.year).filter(Boolean))].sort((a, b) => b - a))
const uniqueMediums = computed(() => [...new Set(artworks.value.map(a => a.medium).filter(Boolean))])

const filteredAndSortedArtworks = computed(() => {
  let filtered = artworks.value

  if (filters.value.year) {
    filtered = filtered.filter(a => a.year == filters.value.year)
  }
  if (filters.value.medium) {
    filtered = filtered.filter(a => a.medium === filters.value.medium)
  }
  if (filters.value.availability) {
    filtered = filtered.filter(a => a.availability === filters.value.availability)
  }

  if (sortBy.value === 'priceAsc') {
    filtered.sort((a, b) => (a.price || 0) - (b.price || 0))
  } else if (sortBy.value === 'priceDesc') {
    filtered.sort((a, b) => (b.price || 0) - (a.price || 0))
  } else if (sortBy.value === 'yearDesc') {
    filtered.sort((a, b) => (b.year || 0) - (a.year || 0))
  } else if (sortBy.value === 'yearAsc') {
    filtered.sort((a, b) => (a.year || 0) - (b.year || 0))
  }

  return filtered
})

async function fetchInitialArtworks() {
  try {
    const response = await strapi.find('artworks', { 
      populate: '*',
      pagination: {
        page: 1,
        pageSize: pageSize
      }
    })
    
    artworks.value = response.data
    page.value = 2

    if (response.data.length < pageSize) {
      noMoreArtworks.value = true
    }
  } catch (error) {
    console.error('Error fetching initial artworks:', error)
  }
}

async function loadMore() {
  if (busy.value || noMoreArtworks.value) return

  busy.value = true
  try {
    const response = await find('artworks', { 
      populate: '*',
      pagination: {
        page: page.value,
        pageSize: pageSize
      }
    })
    
    if (response.data.length < pageSize) {
      noMoreArtworks.value = true
    }
    
    artworks.value = [...artworks.value, ...response.data]
    page.value++
  } catch (error) {
    console.error('Error fetching more artworks:', error)
  } finally {
    busy.value = false
  }
}

// Use useAsyncData for initial data fetch
useAsyncData('initialArtworks', () => fetchInitialArtworks())

// Register the infinite-scroll directive
onMounted(() => {
  const app = getCurrentInstance().appContext.app
  app.directive('infinite-scroll', infiniteScroll)
})
</script>