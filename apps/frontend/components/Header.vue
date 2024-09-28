<template>
  <header class="bg-memphis-yellow p-6 memphis-border rounded-memphis">
    <nav class="flex justify-around items-center">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="font-memphis text-memphis-black text-xl memphis-text-shadow hover:memphis-rotate transition-transform duration-300"
      >
        {{ link.text }}
      </NuxtLink>
    </nav>
  </header>
</template>

<script setup>
const links = [
  { to: "/", text: "Home" },
  { to: "/gallery", text: "Gallery" },
  { to: "/about", text: "About" },
  { to: "/contact", text: "Contact" },
];
</script>
