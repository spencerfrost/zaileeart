<template>
  <div class="min-h-screen p-8">
    <h1 class="text-4xl font-memphis text-memphis-pink memphis-text-shadow mb-6">Gallery</h1>
    
    <!-- Filtering and Sorting Controls -->
    <ClientOnly>
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
          <option value="price:asc">Price: Low to High</option>
          <option value="price:desc">Price: High to Low</option>
          <option value="year:desc">Newest First</option>
          <option value="year:asc">Oldest First</option>
        </select>
      </div>
    </ClientOnly>

    <div class="mt-8">
      <!-- Loading State -->
      <div v-if="status === 'pending'" class="text-center">
        <p class="text-2xl font-memphis text-memphis-blue memphis-text-shadow">
          Loading artworks...
        </p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center text-red-500">
        <p>Failed to load artworks</p>
        <button 
          @click="refresh"
          class="mt-4 bg-memphis-yellow text-memphis-black px-4 py-2 rounded-full hover:bg-memphis-blue transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Content -->
      <template v-else>
        <ClientOnly>
          <masonry-wall 
            v-if="artworks?.length"
            :items="artworks" 
            :column-width="300"
            :gap="16"
          >
            <template #default="{ item }">
              <NuxtLink 
                :to="`/artwork/${item.documentId}`"
                class="block overflow-hidden rounded-memphis transition-transform duration-300 hover:scale-105"
              >
                <div class="relative">
                  <img 
                    v-if="item.images?.[0]?.url"
                    :src="getFullImageUrl(item.images[0].url)" 
                    :alt="item.name"
                    class="w-full h-auto object-cover"
                  >
                  <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <h2 class="text-white text-xl font-memphis text-center">{{ item.name }}</h2>
                  </div>
                </div>
              </NuxtLink>
            </template>
          </masonry-wall>

          <!-- No Results -->
          <div v-else class="text-center">
            <p class="text-2xl font-memphis text-memphis-blue memphis-text-shadow">
              No artworks available.
            </p>
          </div>
        </ClientOnly>

        <!-- Load More -->
        <div v-if="canLoadMore" class="text-center mt-8">
          <button 
            @click="loadMore" 
            :disabled="isLoadingMore"
            class="bg-memphis-yellow text-memphis-black px-6 py-2 rounded-full hover:bg-memphis-blue transition-colors disabled:opacity-50"
          >
            {{ isLoadingMore ? 'Loading...' : 'Load More' }}
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import MasonryWall from '@yeger/vue-masonry-wall';
import { computed, ref, watch } from 'vue';
import { useFullImageUrl } from '~/composables/useFullImageUrl';

const getFullImageUrl = useFullImageUrl()
const { find } = useStrapi()

// State
const page = ref(1)
const pageSize = 12
const filters = ref({
  year: '',
  medium: '',
  availability: ''
})
const sortBy = ref('')
const isLoadingMore = ref(false)
const canLoadMore = ref(true)

// Computed properties for unique values
const uniqueYears = computed(() => {
  if (!artworks.value?.length) return []
  const years = artworks.value.map(artwork => artwork.year).filter(Boolean)
  return [...new Set(years)].sort((a, b) => b - a)
})

const uniqueMediums = computed(() => {
  if (!artworks.value?.length) return []
  const mediums = artworks.value.map(artwork => artwork.medium).filter(Boolean)
  return [...new Set(mediums)]
})

// Build query parameters
const buildQuery = (currentPage = 1) => ({
  populate: '*',
  pagination: {
    page: currentPage,
    pageSize
  },
  filters: {
    ...(filters.value.year && { year: filters.value.year }),
    ...(filters.value.medium && { medium: filters.value.medium }),
    ...(filters.value.availability && { availability: filters.value.availability })
  },
  sort: sortBy.value ? [sortBy.value] : ['createdAt:desc']
})

// Main data fetching
const { data: artworks, error, status, refresh } = await useAsyncData(
  'gallery-artworks',
  () => find('artworks', buildQuery()).then(res => res.data),
  { 
    default: () => [] 
  }
)

// Watch for filter/sort changes
watch([filters, sortBy], () => {
  page.value = 1
  refresh()
}, { deep: true })

// Load more functionality
const loadMore = async () => {
  if (isLoadingMore.value) return

  isLoadingMore.value = true
  try {
    const nextPage = page.value + 1
    const { data: newArtworks } = await find('artworks', buildQuery(nextPage))
    
    if (newArtworks.length) {
      artworks.value = [...artworks.value, ...newArtworks]
      page.value = nextPage
      canLoadMore.value = newArtworks.length === pageSize
    } else {
      canLoadMore.value = false
    }
  } catch (e) {
    console.error('Error loading more artworks:', e)
  } finally {
    isLoadingMore.value = false
  }
}
</script>