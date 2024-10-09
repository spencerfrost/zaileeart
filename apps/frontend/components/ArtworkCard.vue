<template>
  <div
    v-if="artwork"
    class="overflow-hidden bg-white rounded p-4 "
  >
    <div
      v-if="artwork.images && artwork.images.length > 0"
      class="relative mb-4"
    >
      <img
        v-if="currentImage"
        :src="fullImageUrl(currentImage.url)"
        :alt="artwork.name"
        class="w-full h-48 object-cover rounded"
      />
      <button
        v-if="artwork.images.length > 1"
        @click="prevImage"
        class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary text-black rounded-full p-2 opacity-75 hover:opacity-100"
      >
        ←
      </button>
      <button
        v-if="artwork.images.length > 1"
        @click="nextImage"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-black rounded-full p-2 opacity-75 hover:opacity-100"
      >
        →
      </button>
    </div>
    <h2
      v-if="artwork.name"
      class="text-2xl font-sans text-accent mb-2"
    >
      {{ artwork.name }}
    </h2>
    <p v-if="artwork.description" class="text-black mb-2 line-clamp-2">
      {{ artwork.description }}
    </p>
    <div
      v-if="
        artwork.year ||
        artwork.medium ||
        artwork.dimensions ||
        artwork.availability
      "
      class="grid grid-cols-2 gap-2 text-sm"
    >
      <p v-if="artwork.year">
        <span class="font-bold">Year:</span> {{ artwork.year }}
      </p>
      <p v-if="artwork.medium">
        <span class="font-bold">Medium:</span> {{ artwork.medium }}
      </p>
      <p v-if="artwork.dimensions">
        <span class="font-bold">Dimensions:</span> {{ artwork.dimensions }}
      </p>
      <p v-if="artwork.availability">
        <span class="font-bold">Availability:</span> {{ artwork.availability }}
      </p>
    </div>
    <p v-if="artwork.price" class="text-secondary font-bold mt-2">
      Price: {{ formatPrice(artwork.price) }}
    </p>
  </div>
  <div
    v-else
    class="text-black bg-white rounded p-4 "
  >
    <p>Artwork not found.</p>
  </div>
</template>

<script setup>
import { useFullImageUrl } from "#imports";
import { computed, defineProps, ref } from "vue";

const props = defineProps({
  artwork: {
    type: Object,
    required: true,
  },
});

const fullImageUrl = useFullImageUrl();

const currentImageIndex = ref(0);

const currentImage = computed(() => {
  return props.artwork.images && props.artwork.images.length > 0
    ? props.artwork.images[currentImageIndex.value]
    : null;
});

function nextImage() {
  if (props.artwork.images && props.artwork.images.length > 1) {
    currentImageIndex.value =
      (currentImageIndex.value + 1) % props.artwork.images.length;
  }
}

function prevImage() {
  if (props.artwork.images && props.artwork.images.length > 1) {
    currentImageIndex.value =
      (currentImageIndex.value - 1 + props.artwork.images.length) %
      props.artwork.images.length;
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
</script>
