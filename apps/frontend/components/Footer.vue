<template>
  <footer class="bg-accent p-8 mt-12">
    <div class="container mx-auto">
      <div class="flex flex-wrap justify-between items-center">
        <div class="mb-4 md:mb-0">
          <h2 class="text-3xl font-sans text-white">Zailee Art</h2>
        </div>

        <nav class="mb-4 md:mb-0">
          <ul class="flex flex-wrap gap-4">
            <li v-for="link in links" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-white hover:text-primary font-sans transition-colors duration-300"
              >
                {{ link.text }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="flex gap-4">
          <a
            v-if="artistProfile?.socials.length > 0"
            v-for="social in artistProfile.socials"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-primary text-accent p-2 rounded-full cursor-pointer"
          >
            <span class="sr-only">{{ social.name }}</span>
            <div class="w-6 h-6 flex items-center justify-center font-bold">
              <component :is="getIcon(social.link)" />
            </div>
          </a>
        </div>
      </div>

      <div
        class="mt-8 pt-4 border-t border-white/20 text-center text-white font-sans"
      >
        <p>
          &copy; {{ new Date().getFullYear() }} Zailee Art. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-vue-next";

const strapi = useStrapi();
const { data: artistProfile } = await strapi.find("artist-profile", {
  populate: "*",
});

const links = [
  { to: "/", text: "Home" },
  { to: "/gallery", text: "Gallery" },
  { to: "/about", text: "About" },
  { to: "/contact", text: "Contact" },
];

const getIcon = (link) => {
  const socialLinkSplit = link.split(".");
  if (socialLinkSplit.includes("instagram")) {
    return Instagram;
  } else if (socialLinkSplit.includes("facebook")) {
    return Facebook;
  } else if (socialLinkSplit.includes("twitter")) {
    return Twitter;
  } else if (socialLinkSplit.includes("linkedin")) {
    return Linkedin;
  }

  return "";
};
</script>
