<template>
  <div class="bg-background min-h-screen p-8">
    <h1 class="text-4xl font-bold text-text mb-6">Theme Settings</h1>
    <div class="bg-white rounded shadow p-6">
      <!-- Colors Section -->
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Colors</h2>
        <div v-for="(color, name) in theme.colors" :key="name" class="mb-4">
          <label :for="name" class="block text-sm font-medium mb-2">
            {{ formatLabel(name) }}:
          </label>
          <div class="flex items-center">
            <input 
              :id="name" 
              type="color" 
              v-model="theme.colors[name]" 
              class="w-12 h-12 rounded mr-4"
            >
            <input 
              type="text" 
              v-model="theme.colors[name]" 
              class="w-full p-2 border rounded"
            >
          </div>
        </div>
      </section>

      <!-- Fonts Section -->
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Fonts</h2>
        <div v-for="(font, type) in theme.fonts" :key="type" class="mb-4">
          <label :for="type" class="block text-sm font-medium mb-2">{{ formatLabel(type) }}:</label>
          <select 
            :id="type" 
            v-model="theme.fonts[type]" 
            class="w-full p-2 border rounded"
          >
            <option v-for="option in fontOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
      </section>

      <!-- Font Sizes Section -->
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Font Sizes</h2>
        <div v-for="(size, name) in theme.fontSizes" :key="name" class="mb-4">
          <label :for="name" class="block text-sm font-medium mb-2">{{ formatLabel(name) }}:</label>
          <input 
            :id="name" 
            type="text" 
            v-model="theme.fontSizes[name]" 
            class="w-full p-2 border rounded"
          >
        </div>
      </section>

      <!-- Spacing Section -->
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Spacing</h2>
        <div v-for="(space, name) in theme.spacing" :key="name" class="mb-4">
          <label :for="name" class="block text-sm font-medium mb-2">{{ formatLabel(name) }}:</label>
          <input 
            :id="name" 
            type="text" 
            v-model="theme.spacing[name]" 
            class="w-full p-2 border rounded"
          >
        </div>
      </section>

      <!-- Border Radius Section -->
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Border Radius</h2>
        <div v-for="(radius, name) in theme.borderRadius" :key="name" class="mb-4">
          <label :for="name" class="block text-sm font-medium mb-2">{{ formatLabel(name) }}:</label>
          <input 
            :id="name" 
            type="text" 
            v-model="theme.borderRadius[name]" 
            class="w-full p-2 border rounded"
          >
        </div>
      </section>

      <!-- Box Shadow Section -->
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Box Shadow</h2>
        <div v-for="(shadow, name) in theme.boxShadow" :key="name" class="mb-4">
          <label :for="name" class="block text-sm font-medium mb-2">{{ formatLabel(name) }}:</label>
          <input 
            :id="name" 
            type="text" 
            v-model="theme.boxShadow[name]" 
            class="w-full p-2 border rounded"
          >
        </div>
      </section>

      <div class="mt-6">
        <button 
          @click="resetTheme" 
          class="bg-accent text-white px-6 py-2 mr-4 rounded"
        >
          Reset to Defaults
        </button>
        <button 
          @click="saveTheme" 
          class="bg-accent text-white px-6 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const defaultTheme = {
  colors: {
    primary: '#E8DCB9',
    secondary: '#F2CEE6',
    accent: '#7798AB',
    background: '#f8fafc',
    black: '#0D1B1E',
  },
  fonts: {
    sans: 'Roboto, sans-serif',
    serif: 'Merriweather, serif',
    mono: 'Menlo, monospace',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    lg: '0.5rem',
  },
  boxShadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
};

const theme = ref({ ...defaultTheme });

const fontOptions = [
  'Roboto, sans-serif',
  'Open Sans, sans-serif',
  'Lato, sans-serif',
  'Merriweather, serif',
  'Playfair Display, serif',
  'Menlo, monospace',
  'Courier New, monospace',
];

function formatLabel(str) {
  return str.split(/(?=[A-Z])/).join(' ').replace(/^./, s => s.toUpperCase());
}

function updateTheme() {
  Object.entries(theme.value.colors).forEach(([name, value]) => {
    document.documentElement.style.setProperty(`--color-${name}`, value);
  });
  
  Object.entries(theme.value.fonts).forEach(([name, value]) => {
    document.documentElement.style.setProperty(`--font-family-${name}`, value);
  });

  Object.entries(theme.value.fontSizes).forEach(([name, value]) => {
    document.documentElement.style.setProperty(`--font-size-${name}`, value);
  });

  Object.entries(theme.value.spacing).forEach(([name, value]) => {
    document.documentElement.style.setProperty(`--spacing-${name}`, value);
  });

  Object.entries(theme.value.borderRadius).forEach(([name, value]) => {
    document.documentElement.style.setProperty(`--border-radius${name === 'DEFAULT' ? '' : `-${name}`}`, value);
  });

  Object.entries(theme.value.boxShadow).forEach(([name, value]) => {
    document.documentElement.style.setProperty(`--box-shadow${name === 'DEFAULT' ? '' : `-${name}`}`, value);
  });
}

function resetTheme() {
  theme.value = { ...defaultTheme };
  updateTheme();
}

function saveTheme() {
  localStorage.setItem('userTheme', JSON.stringify(theme.value));
  updateTheme();
  alert('Theme settings saved successfully!');
}

onMounted(() => {
  const savedTheme = localStorage.getItem('userTheme');
  if (savedTheme) {
    theme.value = JSON.parse(savedTheme);
  }
  updateTheme();
});
</script>