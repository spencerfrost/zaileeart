<template>
  <section class="bg-primary rounded-3xl p-8 mb-12 relative overflow-hidden">
    <div v-if="status === 'pending'" class="animate-pulse">
      <div class="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div class="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div class="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
      <div class="h-10 bg-gray-300 rounded w-40"></div>
    </div>
    <div v-else-if="error">
      <p class="text-red-500">Error loading artist profile. Please try again later.</p>
    </div>
    <div v-else-if="artistProfile" class="max-w-2xl">
      <h1 v-if="artistProfile.name" class="text-4xl font-bold text-black mb-4">Welcome to {{ artistProfile.name }}'s Artistic World</h1>
      <p v-if="artistProfile.title || artistProfile.pronouns" class="text-l text-black mb-6 italic">
        <span v-if="artistProfile.title">{{ artistProfile.title }}</span>
        <span v-if="artistProfile.title && artistProfile.pronouns"> | </span>
        <span v-if="artistProfile.pronouns">{{ artistProfile.pronouns }}</span>
      </p>
      <p v-if="artistProfile.short_bio" class="text-l text-black mb-6">{{ artistProfile.short_bio }}</p>
      <NuxtLink to="/gallery" class="bg-accent text-white px-6 py-2 rounded-full hover:bg-accent transition-colors">
        View Gallery
      </NuxtLink>
    </div>
    <div v-if="artistProfile && artistProfile.picture && artistProfile.picture.url" class="absolute right-8 top-0 bottom-0 my-auto aspect-square h-4/5">
      <div class="w-full h-full rounded-full bg-secondary overflow-hidden">
        <img 
          :src="getFullImageUrl(artistProfile.picture.url)" 
          :alt="artistProfile.name" 
          class="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useFullImageUrl } from '~/composables/useFullImageUrl';
import { useStrapi } from '~/composables/useStrapi';

const getFullImageUrl = useFullImageUrl();
const strapi = useStrapi();

const { data: artistProfile, status, error } = await strapi.find('artist-profile', { populate: '*' });
</script>