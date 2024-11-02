<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div>
      <label for="name" class="block text-accent font-sans mb-2">Name:</label>
      <input 
        id="name" 
        v-model="form.name" 
        required
        class="w-full p-2 border-2 border-black rounded focus:outline-none focus:border-secondary"
      >
    </div>
    <div>
      <label for="email" class="block text-accent font-sans mb-2">Email:</label>
      <input 
        id="email" 
        v-model="form.email" 
        type="email" 
        required
        class="w-full p-2 border-2 border-black rounded focus:outline-none focus:border-secondary"
      >
    </div>
    <div>
      <label for="message" class="block text-accent font-sans mb-2">Message:</label>
      <textarea 
        id="message" 
        v-model="form.message" 
        required
        class="w-full p-2 border-2 border-black rounded focus:outline-none focus:border-secondary h-32"
      ></textarea>
    </div>
    <button 
      type="submit"
      class="bg-accent text-white px-6 py-2 rounded font-sans"
    >
      Send Message
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

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