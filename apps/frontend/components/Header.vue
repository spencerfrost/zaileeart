<template>
  <header class="bg-memphis-blue p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold text-white">
        <NuxtLink to="/">Zailee Art</NuxtLink>
      </h1>
      <nav>
        <ul class="flex space-x-4">
          <li v-for="item in navItems" :key="item.path">
            <NuxtLink :to="item.path" class="text-white hover:text-memphis-yellow transition-colors">
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]
</script>