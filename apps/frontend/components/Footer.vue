<template>
  <footer class="bg-memphis-blue p-8 mt-12">
    <div class="container mx-auto">
      <div class="flex flex-wrap justify-between items-center">
        <!-- Logo or Site Name -->
        <div class="mb-4 md:mb-0">
          <h2 class="text-3xl font-memphis text-memphis-yellow memphis-text-shadow">
            Zailee Art
          </h2>
        </div>

        <!-- Navigation Links -->
        <nav class="mb-4 md:mb-0">
          <ul class="flex flex-wrap gap-4">
            <li v-for="link in links" :key="link.to">
              <NuxtLink 
                :to="link.to" 
                class="text-white hover:text-memphis-yellow font-memphis transition-colors duration-300"
              >
                {{ link.text }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Social Media Links -->
        <div class="flex gap-4">
          <a 
            v-for="social in socialLinks" 
            :key="social.name"
            :href="social.url" 
            target="_blank" 
            rel="noopener noreferrer"
            class="bg-memphis-yellow text-memphis-blue p-2 rounded-full hover:memphis-rotate transition-transform duration-300"
          >
            <!-- You can replace these with actual icons -->
            <span class="sr-only">{{ social.name }}</span>
            <div class="w-6 h-6 flex items-center justify-center font-bold">
              {{ social.icon }}
            </div>
          </a>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-8 pt-4 border-t border-white/20 text-center text-white font-memphis">
        <p>&copy; {{ new Date().getFullYear() }} Zailee Art. All rights reserved.</p>
      </div>

      <!-- Memphis Design Element -->
      <div class="mt-4 flex justify-center">
        <div class="w-16 h-16 bg-memphis-pink rounded-full memphis-border transform -rotate-12"></div>
        <div class="w-16 h-16 bg-memphis-yellow rounded-memphis memphis-border transform rotate-12 -ml-4"></div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const links = [
  { to: '/', text: 'Home' },
  { to: '/gallery', text: 'Gallery' },
  { to: '/about', text: 'About' },
  { to: '/contact', text: 'Contact' },
];

const socialLinks = [
  { name: 'Facebook', url: '#', icon: 'f' },
  { name: 'Twitter', url: '#', icon: 't' },
  { name: 'Instagram', url: '#', icon: 'i' },
];
</script>