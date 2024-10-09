<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from 'vue';

function applyTheme(theme) {
  Object.entries(theme.colors).forEach(([name, value]) => {
    document.documentElement.style.setProperty(`--color-${name}`, value);
  });
  
  Object.entries(theme.fonts).forEach(([name, value]) => {
    document.documentElement.style.setProperty(`--font-family-${name}`, value);
  });

  Object.entries(theme.fontSizes).forEach(([name, value]) => {
    document.documentElement.style.setProperty(`--font-size-${name}`, value);
  });

  Object.entries(theme.spacing).forEach(([name, value]) => {
    document.documentElement.style.setProperty(`--spacing-${name}`, value);
  });

  Object.entries(theme.borderRadius).forEach(([name, value]) => {
    document.documentElement.style.setProperty(`--border-radius${name === 'DEFAULT' ? '' : `-${name}`}`, value);
  });

  Object.entries(theme.boxShadow).forEach(([name, value]) => {
    document.documentElement.style.setProperty(`--box-shadow${name === 'DEFAULT' ? '' : `-${name}`}`, value);
  });
}

onMounted(() => {
  const savedTheme = localStorage.getItem('userTheme');
  if (savedTheme) {
    applyTheme(JSON.parse(savedTheme));
  }
});
</script>