<template>
  <div class="min-h-screen p-8">
    <h1 class="text-4xl font-sans text-secondary mb-6">Blog</h1>

    <ClientOnly>
      <select v-model="sortBy" @change="refresh" class="p-2 rounded">
        <option value="">Sort By</option>
        <option value="createdAt:desc">Newest First</option>
        <option value="createdAt:asc">Oldest First</option>
      </select>
    </ClientOnly>

    <div class="mt-8">
      <div v-if="status === 'pending'" class="text-center">
        <p class="text-2xl font-sans text-accent">Loading blog...</p>
      </div>

      <div v-else-if="error" class="text-center text-red-500">
        <p>Failed to load blog posts</p>
        <button 
          @click="refresh"
          class="mt-4 bg-primary text-black px-4 py-2 rounded-full hover:bg-accent transition-colors"
        >
          Try Again
        </button>
      </div>

      <div v-else-if="posts?.length" class="space-y-6">
        <NuxtLink 
          v-for="post in posts" 
          :key="post.id" 
          :to="`/blog/${post.documentId}`"
          class="block hover:bg-secondary rounded-2xl p-4 text-black bg-primary transition-colors"
        >
          <img 
            v-if="post.images?.[0]?.url"
            :src="getFullImageUrl(post.images[0].url)" 
            :alt="post.title || ''" 
            class="w-full h-48 object-cover rounded-xl mb-4" 
          />
          <h3 v-if="post.title" class="text-xl font-semibold mb-2">
            {{ post.title }}
          </h3>
          <p v-if="post.content" class="text-sm">
            {{ post.content }}
          </p>
        </NuxtLink>
      </div>

      <div v-else class="text-center">
        <p class="text-2xl font-sans text-accent">No posts available.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const getFullImageUrl = useFullImageUrl()
const { find } = useStrapi() 
const sortBy = ref('')

const { 
  data: posts, 
  error, 
  status,
  refresh 
} = await useAsyncData('blog-posts', () => find('blog-posts', {
    populate: '*',
    sort: [sortBy.value || 'createdAt:desc']
  }).then(res => res.data)
)
</script>