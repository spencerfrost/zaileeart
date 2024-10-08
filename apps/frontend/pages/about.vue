<template>
  <div class="bg-memphis-pattern min-h-screen p-8">
    <template v-if="status === 'pending'">
      <div class="animate-pulse">
        <div class="h-12 bg-gray-300 rounded w-3/4 mb-6"></div>
        <div class="memphis-border bg-white rounded-memphis p-6 mb-8">
          <div class="h-64 bg-gray-300 rounded-memphis mb-4"></div>
          <div class="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div class="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
          <div class="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
      </div>
    </template>

    <template v-else-if="error">
      <div class="text-red-500 text-center p-8">
        <h2 class="text-2xl font-bold mb-4">Oops! Something went wrong.</h2>
        <p>{{ error.message }}</p>
      </div>
    </template>

    <template v-else-if="artistProfile">
      <h1 class="text-4xl font-memphis text-dutch-white memphis-text-shadow mb-6 text-center">
        About {{ artistProfile.name }}
      </h1>

      <!-- Artist Info Section -->
      <div class="max-w-4xl mx-auto">
        <!-- Artist Image -->
        <div class="relative w-full mb-6 rounded-memphis overflow-hidden">
          <img
            v-if="artistProfile.picture"
            :src="getFullImageUrl(artistProfile.picture.url)"
            :alt="artistProfile.name"
            class="object-cover w-full h-full"
            :style="{ aspectRatio: '1/1' }"
          />
        </div>

        <!-- Biography -->
        <div
          class="bg-white p-6 rounded-lg shadow-lg mb-8 text-rich-black leading-relaxed"
        >
          <p
            v-if="artistProfile.biography"
            v-html="artistProfile.biography"
          ></p>
        </div>

        <!-- Connect with Me Section -->
        <div class="bg-air-blue p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-memphis text-white memphis-text-shadow mb-4">
            Connect with me:
          </h2>
          <div class="flex flex-wrap gap-4 justify-center">
            <a
              v-for="link in artistProfile.socials"
              :key="link.id"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-dutch-white text-rich-black px-4 py-2 rounded-full font-memphis hover:bg-memphis-orange hover:scale-105 transition-transform duration-300"
            >
              {{ link.platform }}
            </a>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useFullImageUrl } from "~/composables/useFullImageUrl";
import { useStrapi } from "~/composables/useStrapi";

const getFullImageUrl = useFullImageUrl();
const { find } = useStrapi();

const { data: artistProfile, status, error } = await find("artist-profile", { populate: "*" });
</script>
