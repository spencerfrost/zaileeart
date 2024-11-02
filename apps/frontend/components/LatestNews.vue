<template>
  <section class="bg-secondary rounded-3xl p-6 text-black">
    <h2 class="text-2xl font-bold mb-2">Latest News</h2>
    <div v-if="status === 'pending'">
      <!-- Loading skeleton here -->
    </div>
    <div v-else-if="error">
      <p class="text-red-500">Error loading blog posts: {{ error.message }}</p>
    </div>
    <div v-else-if="blogPosts && blogPosts.length">
      <div v-for="post in blogPosts" :key="post.id" class="mb-4">
        <h3 v-if="post.title" class="text-xl font-semibold">{{ post.title }}</h3>
        <p v-if="post.content">{{ post.content.substring(0, 100) }}...</p>
      </div>
    </div>
    <div v-else>
      <p>No blog posts available at the moment.</p>
    </div>
  </section>
</template>

<script setup>
const strapi = useStrapi();

const { data: blogPosts, status, error } = await strapi.find('blog-posts', {
  populate: '*',
  pagination: { limit: 3 },
  sort: ['createdAt:desc']
});

</script>