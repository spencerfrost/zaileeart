<template>
  <div class="flex flex-col min-h-screen">
    <Header class="mb-8" />
    <main class="flex-grow">
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
</script>