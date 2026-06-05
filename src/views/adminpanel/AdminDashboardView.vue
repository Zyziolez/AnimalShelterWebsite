<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnimals } from '@/composables/useAnimals'
// import AnimalCard from '@/components/AnimalCard.vue';
import SearchBar from '@/components/adminpanel/SearchBar.vue';
import AnimalListCommponent from '@/components/AnimalListCommponent.vue';
// import UploadPhoto from '@/components/adminpanel/UploadPhoto.vue';
import AddAnimalModal from '@/components/adminpanel/AddAnimalModal.vue';
import {Animal} from '@/types/index.ts'

const { animalsList, fetchAnimals, deleteAnimalEndpoint } = useAnimals()
const animals = ref<Animal[]>([])

onMounted(async () => {
  await fetchAnimals()
  console.log(animalsList.value)
  animals.value = [...animalsList.value]
})
const selectedAnimal = ref<Animal | undefined>(undefined)

// const pageNumber = ref(1)
// function changePage(val: number){
//   if(pageNumber.value == 0 && val == -1) return
//   pageNumber.value += val
// }

function openAddAnimalModal(show: boolean, animal?: Animal){
  const modal = document.getElementById('add-animal') as HTMLDialogElement
  if (animal) {
    selectedAnimal.value = animal
  }
  if(show){
    console.log('otwieram modal')
  }
  show ? modal.showModal() : modal.close()
}

function deleteAnimal(animalId: number){
  deleteAnimalEndpoint(animalId)
}

function serachAnimalByName(searchValue: string, sex: string, species: string){
  animals.value = [...animalsList.value].filter(animal => {
    const matchesName = animal.name.toLowerCase().includes(searchValue.toLowerCase())
    const matchesSex = sex ? animal.sex === sex : true
    const matchesSpecies = species ? animal.species === species : true
    return matchesName && matchesSex && matchesSpecies
  })
}
// const animalTest = ref<Animal>({ name: 'Dominik', description: 'Przyjacielski pies', sex: 'M', age: 5, species: 'Pies' })
</script>
<template>
    <div >
        <div class=" mt-4 justify-center  w-4/5 mx-auto">
      
           <div  >
             <SearchBar @add-animal-modal="openAddAnimalModal" @fetch-animal-name-emit="serachAnimalByName" />
           </div>
    <!-- <div class="flex gap-4 mt-4 justify-center flex-wrap">
        
    </div> -->
<ul class="list bg-base-100 rounded-box shadow-md">

  <!-- <AnimalListCommponent :animal="animalTest" /> -->
  <ul class="list bg-base-100 rounded-box shadow-md">
  <AnimalListCommponent 
    v-for="animal in animals" 
    :key="animal.animalId"
    :animal="animal" 
    @add-animal-modal="openAddAnimalModal" 
    @delete-animal="deleteAnimal"
  />
</ul>
</ul>
  
<!-- <div class="w-full flex justify-center mt-5" >
    <div class="join">
    <button @click="changePage(-1)" class="join-item btn">«</button>
    <button class="join-item btn">{{ pageNumber }}</button>
    <button @click="changePage(1)" class="join-item btn">»</button>
  </div>
</div> -->
    <!-- <UploadPhoto/> -->
    </div>
    </div>
    <AddAnimalModal @add-animal-modal="openAddAnimalModal" :animal="selectedAnimal"  />
</template>
