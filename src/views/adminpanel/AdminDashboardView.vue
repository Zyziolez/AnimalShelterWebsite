<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnimals } from '@/composables/useAnimals'
// import AnimalCard from '@/components/AnimalCard.vue';
import SearchBar from '@/components/adminpanel/SearchBar.vue';
import AnimalListCommponent from '@/components/AnimalListCommponent.vue';
// import UploadPhoto from '@/components/adminpanel/UploadPhoto.vue';
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

// function editAnimal(animal: Animal){
//   selectedAnimal.value = animal
//   // openAddAnimalModal(true, animal.card != null, animal)
// }
function addAnimalToList(newAnimal: Animal){
  
 if(newAnimal){
   const index = animals.value.findIndex(a => a.animalId === newAnimal.animalId)
  
  if(index !== -1){
    animals.value[index] = {
      ...animals.value[index],  // zachowaj zdjęcia
      species: newAnimal.species,
      name: newAnimal.name,
      age: newAnimal.age,
      sex: newAnimal.sex,
      description: newAnimal.description,
      card: newAnimal.card
    }
  } else {
    console.log(newAnimal)
    animals.value.push(newAnimal)
  }
 }else{
  // window.location.reload()
 }
}
// const animalTest = ref<Animal>({ name: 'Dominik', description: 'Przyjacielski pies', sex: 'M', age: 5, species: 'Pies' })
</script>
<template>
    <div class="white-back page-user " >
        <div class=" mt-4 justify-center  w-4/5 mx-auto">
      
           <div  >
             <SearchBar @add-animal-modal="openAddAnimalModal" @fetch-animal-name-emit="serachAnimalByName" />
           </div>
    <!-- <div class="flex gap-4 mt-4 justify-center flex-wrap">
        
    </div> -->
<ul class="list bg-base-100 rounded-box white-back pb-10">
  <div v-if="loading" class="w-full flex justify-center mt-10 mb-10" >
    <span class="loading loading-spinner loading-lg"></span>
  </div>
  <!-- <AnimalListCommponent :animal="animalTest" /> -->
  <ul class="list bg-base-100 rounded-box shadow-md white-back flex-column gap-2" v-else >
  <AnimalListCommponent 
    v-for="animal in animals" 
    :key="animal.animalId"
    :animal="animal" 
    @add-animal-modal="openAddAnimalModal" 
    @delete-animal="deleteAnimal"
    @delete-card="deleteCard"
  />
</ul>
</ul>
    </div>
    </div>
    <AddAnimalModal @add-animal-modal="openAddAnimalModal" :animal="selectedAnimal" @add-animal-to-list="addAnimalToList"  />
</template>
