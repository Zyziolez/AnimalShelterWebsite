<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnimals } from '@/composables/useAnimals'
import SearchBar from '@/components/adminpanel/SearchBar.vue';
import AnimalListCommponent from '@/components/AnimalListCommponent.vue';
import AddAnimalModal from '@/components/adminpanel/AddAnimalModal.vue';
import {Animal} from '@/types/index.ts'

const { animalsList, fetchAnimals, deleteAnimalEndpoint, loading, deleteCardEndpoint } = useAnimals()
const animals = ref<Animal[]>([])

onMounted(async () => {
  await fetchAnimals()
  animals.value = [...animalsList.value]
})

const selectedAnimal = ref<Animal | undefined>(undefined)

function openAddAnimalModal(show: boolean, addCard: boolean, animal?: Animal){
  const modal = document.getElementById('add-animal') as HTMLDialogElement
  if (animal) {
    if(addCard){
      animal.card = {
        id: 0,
        date: Date.now(),
        status: '',
        animalId: animal.animalId!,
      }
    }
    selectedAnimal.value = animal
  }
  if(show){
    modal.showModal()
  }else{
    modal.close()
    selectedAnimal.value = undefined
  }
}

async function deleteAnimal(animalId: number, hasPhotos: boolean){
  await deleteAnimalEndpoint(animalId, hasPhotos)
  animals.value = animals.value.filter(animal => animal.animalId !== animalId)
}

async function deleteCard(cardId: number){
  await deleteCardEndpoint(cardId)
  animals.value = animals.value.map(animal => {
    if(animal.card && animal.card.id === cardId){
      return {...animal, card: null}
    }
    return animal
  })
}

function serachAnimalByName(searchValue: string, sex: string, species: string){
  animals.value = [...animalsList.value].filter(animal => {
    const matchesName = animal.name.toLowerCase().includes(searchValue.toLowerCase())
    const matchesSex = sex ? animal.sex === sex : true
    const matchesSpecies = species ? animal.species === species : true
    return matchesName && matchesSex && matchesSpecies
  })
}

function addAnimalToList(newAnimal: Animal){
 if(newAnimal){
   const index = animals.value.findIndex(a => a.animalId === newAnimal.animalId)
  
  if(index !== -1){
    animals.value[index] = {
      ...animals.value[index],
      species: newAnimal.species,
      name: newAnimal.name,
      age: newAnimal.age,
      sex: newAnimal.sex,
      description: newAnimal.description,
      card: newAnimal.card
    }
  } else {
    // console.log(newAnimal)
    animals.value.push(newAnimal)
  }
 }
}
</script>

<template>
  <div class="min-h-screen white-back">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div class="max-w-7xl mx-auto">
        <div class="mb-6 sm:mb-8">
          <SearchBar 
            @add-animal-modal="openAddAnimalModal" 
            @fetch-animal-name-emit="serachAnimalByName" 
          />
        </div>

        <div class="white-back overflow-hidden">
          <ul class="divide-y divide-gray-100">
            <div v-if="loading" class="flex justify-center items-center py-16">
              <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>
            
            <ul v-else class="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <AnimalListCommponent 
                v-for="animal in animals" 
                :key="animal.animalId"
                :animal="animal" 
                @add-animal-modal="openAddAnimalModal" 
                @delete-animal="deleteAnimal"
                @delete-card="deleteCard"
              />
              <li v-if="animals.length === 0" class="text-center py-12 text-gray-500">
                Brak zwierząt do wyświetlenia
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
    
    <AddAnimalModal 
      @add-animal-modal="openAddAnimalModal" 
      :animal="selectedAnimal" 
      @add-animal-to-list="addAnimalToList"  
      
    />
  </div>
</template>

<style scoped>
.container {
  max-width: 100%;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}
</style>