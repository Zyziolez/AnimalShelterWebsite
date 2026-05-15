<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {useAnimals} from '@/composables/useAnimals'

const router = useRouter()
const {animals, fetchCards} = useAnimals()

onMounted(()=>{
  fetchCards()
})

const goToDetails = (id: number) => {
  router.push(`/animal/${id}`)
}
const searchText = ref('')
const searchAnimal = computed(() => {
  if (!searchText.value.trim()) {
    return animals.value.slice(0, 6);
  }
  const words = searchText.value.toLowerCase().split(' ').filter(Boolean);
  return animals.value.filter(f => {
    const searchContent =`${f.animal.name} ${f.animal.species} ${f.animal.description}`.toLowerCase()
      return words.every(word => searchContent.includes(word));
  })
})
</script>
<template>
  <input type="text" v-model="searchText" class="input input-bordered w-full mb-4" placeholder="Szukaj zwierzaka"/>
  <div v-for="card in searchAnimal" :key="card.id" class="animal-card" @click="goToDetails(card.animal.animalId)">
    <h3>{{ card.animal.name }}</h3>
    <p>Gatunek: {{ card.animal.species }}</p>
    <p>Status: {{ card.status }}</p>
  </div>
</template>
