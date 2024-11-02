<template>
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else-if="blogPost" class="min-h-screen p-8">
    <div class="container mx-auto bg-white rounded p-6">
      <h1 class="text-4xl font-bold mb-4">{{ blogPost.title }}</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            v-if="blogPost.images && blogPost.images[0]"
            :src="getFullImageUrl(blogPost.images[0].url)" 
            :alt="blogPost.name"
            class="w-full h-auto rounded"
          >
        </div>
        <div>
          <p class="mb-4">{{ blogPost.content }}</p>
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

const { data: blogPost, status, error } = await findOne('blog-posts', route.params.id, {
  populate: '*'
});
</script>