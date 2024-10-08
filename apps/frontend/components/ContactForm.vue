<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div>
      <label for="name" class="block text-air-blue font-memphis mb-2">Name:</label>
      <input 
        id="name" 
        v-model="form.name" 
        required
        class="w-full p-2 border-2 border-rich-black rounded-memphis focus:outline-none focus:border-mimi-pink"
      >
    </div>
    <div>
      <label for="email" class="block text-air-blue font-memphis mb-2">Email:</label>
      <input 
        id="email" 
        v-model="form.email" 
        type="email" 
        required
        class="w-full p-2 border-2 border-rich-black rounded-memphis focus:outline-none focus:border-mimi-pink"
      >
    </div>
    <div>
      <label for="message" class="block text-air-blue font-memphis mb-2">Message:</label>
      <textarea 
        id="message" 
        v-model="form.message" 
        required
        class="w-full p-2 border-2 border-rich-black rounded-memphis focus:outline-none focus:border-mimi-pink h-32"
      ></textarea>
    </div>
    <button 
      type="submit"
      class="bg-dutch-white text-rich-black px-6 py-2 rounded-memphis font-memphis memphis-border hover:memphis-rotate transition-transform duration-300"
    >
      Send Message
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useStrapi } from '~/composables/useStrapi';

const strapi = useStrapi()
const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitForm = async () => {
  try {
    await strapi.create('contact-submissions', { data: form.value })
    alert('Message sent successfully!')
    form.value = { name: '', email: '', message: '' }
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('There was an error sending your message. Please try again.')
  }
}
</script>