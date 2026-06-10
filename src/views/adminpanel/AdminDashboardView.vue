<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnimals } from '@/composables/useAnimals'
import SearchBar from '@/components/adminpanel/SearchBar.vue';
import AnimalListCommponent from '@/components/AnimalListCommponent.vue';
import AddAnimalModal from '@/components/adminpanel/AddAnimalModal.vue';
import {Animal} from '@/types/index.ts'

const { animalsList, fetchAnimals, deleteAnimalEndpoint, loading, deleteCardEndpoint } = useAnimals()
const animals = ref<Animal[]>([])
const searchParams = ref({ searchValue: '', sex: '', species: '' })

onMounted(async () => {
 await fetchAnimals()
  filterAnimals()
})

function filterAnimals() {
  animals.value = [...animalsList.value].filter(animal => {
    const matchesName = animal.name.toLowerCase().includes(searchParams.value.searchValue.toLowerCase())
    const matchesSex = searchParams.value.sex ? animal.sex === searchParams.value.sex : true
    const matchesSpecies = searchParams.value.species ? animal.species === searchParams.value.species : true
    return matchesName && matchesSex && matchesSpecies
  })
}

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
  const indexInList = animalsList.value.findIndex(a => a.animalId === animalId)
  if (indexInList !== -1) {
    animalsList.value.splice(indexInList, 1)
  }

  filterAnimals()
}
async function deleteCard(cardId: number){
  await deleteCardEndpoint(cardId)
  // Zaktualizuj w animalsList
  const animalInList = animalsList.value.find(a => a.card?.id === cardId)
  if (animalInList && animalInList.card) {
    animalInList.card = null
  }

  filterAnimals()
}

function searchAnimalByName(searchValue: string, sex: string, species: string){
  searchParams.value = { searchValue, sex, species }
  filterAnimals()
}

function addAnimalToList(newAnimal: Animal){
 if(newAnimal){
   const index = animalsList.value.findIndex(a => a.animalId === newAnimal.animalId)
  
  if(index !== -1){
    animalsList.value[index] = {
      ...animalsList.value[index],
      species: newAnimal.species,
      name: newAnimal.name,
      age: newAnimal.age,
      sex: newAnimal.sex,
      description: newAnimal.description,
      card: newAnimal.card
    }
  } else {
    animalsList.value.push(newAnimal)
  }
  filterAnimals()
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
            @fetch-animal-name-emit="searchAnimalByName" 
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