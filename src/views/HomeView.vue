<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAnimals } from '@/composables/useAnimals'
import type { AnimalCard } from '@/assets/AnimalCard'

const router = useRouter()
const { animals, fetchCards } = useAnimals()

onMounted(async () => {
  await fetchCards()
  searchAnimal()
})
const filteredAnimals = ref<AnimalCard[]>([])
const selectedSpecies = ref('')
const selectedSex = ref('')
const searchText = ref('')

const searchAnimal = () => {
  //computed tutaj nie bo jest szukanie dopiero po kliknieciu buttona wiec tak zostawilam
  if (!searchText.value.trim() && !selectedSex.value.trim() && !selectedSpecies.value.trim()) {
    filteredAnimals.value = animals.value.slice(0, 6)
    return
  }
  filteredAnimals.value = animals.value.filter((card) => {
    const words = searchText.value.toLowerCase().split(' ').filter(Boolean)
    const matchesSpecies = !selectedSpecies.value || card.animal.species === selectedSpecies.value
    const matchesSex = !selectedSex.value || card.animal.sex === selectedSex.value
    const searchContent =
      `${card.animal.name} ${card.animal.species} ${card.animal.description}`.toLowerCase()
    const matchesText = words.every((word) => searchContent.includes(word))
    return matchesSpecies && matchesSex && matchesText
  })
}
const goToDetails = (id: number) => {
  router.push(`/animal/${id}`)
}
</script>
<template>
  <div class="card bg-base-100 w-full max-w-3xl mx-auto shadow-md">
    <div class="card-body">
      <h2 class="card-title text-2xl mb-4">Jakiego zwierzaka szukasz?</h2>
      <div class="flex gap-2 mb-4">
        <input
          type="radio"
          v-model="selectedSpecies"
          value="P"
          class="btn btn-soft btn-accent"
          aria-label="Pies"
        />
        <input
          class="btn btn-soft btn-accent"
          type="radio"
          v-model="selectedSpecies"
          value="K"
          aria-label="Kot"
        />
        <input
          type="radio"
          v-model="selectedSpecies"
          value=""
          class="btn btn-soft"
          aria-label="Wszystkie"
        />
      </div>
      <div class="flex flex-col gap-2 mb-4">
        <span class="text-sm font-bold">Płeć:</span>
        <div class="flex gap-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" v-model="selectedSex" value="M" class="radio radio-primary" />
            <span>Samiec</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" v-model="selectedSex" value="F" class="radio radio-secondary" />
            <span>Samica</span>
          </label>
        </div>
      </div>
      <div class="card-actions justify-end">
        <input
          type="text"
          v-model="searchText"
          class="input input-bordered w-full mb-4"
          placeholder="Szukaj zwierzaka po imieniu"
        />
        <div class="card-actions justify-end">
          <button class="btn btn-primary" @click="searchAnimal">Szukaj</button>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-wrap gap-6 justify-center">
    <div
      v-for="card in filteredAnimals"
      :key="card.id"
      class="animal-card"
      @click="goToDetails(card.animal.animalId)"
    >
      <!--filtrujemy po filteredAnimals a nie po searchAnimal bo nie uzywamy computed-->
      <div class="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            :src="card.animal.photo[0]?.apiLink || 'https://via.placeholder.com/150'"
            alt="animal"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ card.animal.name }}</h2>
          <p>{{ card.animal.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
