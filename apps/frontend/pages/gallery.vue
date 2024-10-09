<template>
  <div class="min-h-screen p-8">
    <h1 class="text-4xl font-sans text-secondary mb-6">Gallery</h1>
    
    <!-- Filtering and Sorting Controls -->
    <div class="mb-6 flex flex-wrap gap-4">
      <select v-model="filters.year" @change="resetAndFetch" class="p-2 rounded">
        <option value="">All Years</option>
        <option v-for="year in uniqueYears" :key="year" :value="year">{{ year }}</option>
      </select>
      <select v-model="filters.medium" @change="resetAndFetch" class="p-2 rounded">
        <option value="">All Mediums</option>
        <option v-for="medium in uniqueMediums" :key="medium" :value="medium">{{ medium }}</option>
      </select>
      <select v-model="filters.availability" @change="resetAndFetch" class="p-2 rounded">
        <option value="">All Availabilities</option>
        <option value="Available">Available</option>
        <option value="Sold">Sold</option>
        <option value="On Exhibition">On Exhibition</option>
      </select>
      <select v-model="sortBy" @change="resetAndFetch" class="p-2 rounded">
        <option value="">Sort By</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="yearDesc">Newest First</option>
        <option value="yearAsc">Oldest First</option>
      </select>
    </div>

    <ClientOnly>
      <div v-if="!pending">
        <masonry-wall 
          :items="artworks.value" 
          :column-width="300"
          :gap="16"
        >
          <template #default="{ item }">
            <NuxtLink 
              :to="`/artworks/${item.id}`"
              class="block overflow-hidden rounded transition-transform duration-300 hover:scale-105"
            >
              <div class="relative">
                <img 
                  :src="getFullImageUrl(item.images[0].url)" 
                  :alt="item.name"
                  class="w-full h-auto object-cover"
                >
                <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <h2 class="text-white text-xl font-sans text-center">{{ item.name }}</h2>
                </div>
              </div>
            </NuxtLink>
          </template>
        </masonry-wall>
      </div>
    </ClientOnly>

    <div v-if="pending" class="text-center mt-4">
      <p class="text-2xl font-sans text-accent">Loading artworks...</p>
    </div>
    <div v-if="!pending && !canLoadMore" class="text-center mt-4">
      <p class="text-2xl font-sans text-accent">No more artworks to load.</p>
    </div>
    <div v-if="!pending && canLoadMore" class="text-center mt-4">
      <button @click="loadMore" class="bg-primary text-black px-6 py-2 rounded-full hover:bg-accent transition-colors">
        Load More
      </button>
    </div>
  </div>
</template>

<script setup>
import MasonryWall from '@yeger/vue-masonry-wall';
import { computed, ref } from 'vue';
import { useFullImageUrl } from '~/composables/useFullImageUrl';
import { useStrapi } from '~/composables/useStrapi';

const getFullImageUrl = useFullImageUrl();
const strapi = useStrapi();

const page = ref(1);
const pageSize = 12;
const filters = ref({
  year: '',
  medium: '',
  availability: ''
});
const sortBy = ref('');

const artworks = ref([]);
const canLoadMore = ref(true);
const pending = ref(false);

const uniqueYears = computed(() => {
  if (!artworks.length) return [];
  const years = artworks.flatMap(artwork => artwork.year).filter(Boolean);
  return [...new Set(years)].sort((a, b) => b - a);
});

const uniqueMediums = computed(() => {
  if (!artworks.length) return [];
  const mediums = artworks.flatMap(artwork => artwork.medium).filter(Boolean);
  return [...new Set(mediums)];
});

const filteredAndSortedArtworks = computed(() => {
  let filtered = artworks;

  if (filters.year) {
    filtered = filtered.filter(a => a.year == filters.year);
  }
  if (filters.medium) {
    filtered = filtered.filter(a => a.medium === filters.medium);
  }
  if (filters.availability) {
    filtered = filtered.filter(a => a.availability === filters.availability);
  }

  if (sortBy === 'priceAsc') {
    filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortBy === 'priceDesc') {
    filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
  } else if (sortBy === 'yearDesc') {
    filtered.sort((a, b) => (b.year || 0) - (a.year || 0));
  } else if (sortBy === 'yearAsc') {
    filtered.sort((a, b) => (a.year || 0) - (b.year || 0));
  }

  return filtered;
});

async function fetchArtworks() {
  pending.value = true;
  try {
    const { data: newArtworks } = await strapi.find('artworks', {
      populate: '*',
      pagination: {
        page: page.value,
        pageSize: pageSize
      },
      filter: {
        ...(filters.value.year && { year: filters.value.year }),
        ...(filters.value.medium && { medium: filters.value.medium }),
        ...(filters.value.availability && { availability: filters.value.availability })
      },
      sort: sortBy.value ? [sortBy.value] : undefined,
    });

    if (page.value === 1) {
      artworks.value = newArtworks;
    } else {
      artworks.value = [...artworks.value, ...newArtworks];
    }

    canLoadMore.value = newArtworks.length === pageSize;
  } catch (error) {
    console.error('Error fetching artworks:', error);
  } finally {
    pending.value = false;
  }
}

function resetAndFetch() {
  page.value = 1;
  artworks.value = [];
  fetchArtworks();
}

function loadMore() {
  if (pending.value || !canLoadMore.value) return;
  page.value++;
  fetchArtworks();
}

// Initial fetch
fetchArtworks();
</script>