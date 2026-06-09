<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from './components/Footer.vue';
import { useAnimals } from './composables/useAnimals.ts';
import ErrorMessage from './components/ErrorMessage.vue';
import { watch } from 'vue'
import { router, isLoading } from './router'

const { errorMessage } = useAnimals()

watch(errorMessage, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      errorMessage.value = null
    }, 3000)
  }
})

</script>

<template>
   <ErrorMessage :errorMessage="errorMessage" v-if="errorMessage" />

    <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
    <div class="flex flex-col items-center gap-4">
      <span class="loading loading-spinner loading-lg text-primary"></span>
      <p class="text-gray-600 animate-pulse">Ładowanie...</p>
    </div>
  </div>

  <template v-else >
    <RouterView />
    <Footer/>
  </template>
</template>
