<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnimals } from '@/composables/useAnimals'
// import AnimalCard from '@/components/AnimalCard.vue';
import SearchBar from '@/components/adminpanel/SearchBar.vue';
import AnimalListCommponent from '@/components/AnimalListCommponent.vue';
// import UploadPhoto from '@/components/adminpanel/UploadPhoto.vue';
import AddAnimalModal from '@/components/adminpanel/AddAnimalModal.vue';
import {Animal} from '@/types/index.ts'

const { simpleAnimals, fetchSimpleAnimals } = useAnimals()
onMounted(async () => {
  await fetchSimpleAnimals()
  // console.log(simpleAnimals.value)
})
const selectedAnimal = ref<Animal | undefined>(undefined)

const pageNumber = ref(1)
function changePage(val: number){
  if(pageNumber.value == 0 && val == -1) return
  pageNumber.value += val
}
function openAddAnimalModal(show: boolean, animal?: Animal){
  // console.log('emit u rodzica aktywowany')
  const modal = document.getElementById('add-animal') as HTMLDialogElement
  if (animal) {
    selectedAnimal.value = animal
    // console.log(animal)
  }
  if(show){
    console.log('otwieram modal')
  }
  show ? modal.showModal() : modal.close()
  // modal.showModal()
}

// const animalTest = ref<Animal>({ name: 'Dominik', description: 'Przyjacielski pies', sex: 'M', age: 5, species: 'Pies' })
</script>
<template>
    <div >
        <div className=" mt-4 justify-center  w-4/5 mx-auto">
      
           <div  >
             <SearchBar @add-animal-modal="openAddAnimalModal" />
           </div>
    <!-- <div className="flex gap-4 mt-4 justify-center flex-wrap">
        
    </div> -->
<ul className="list bg-base-100 rounded-box shadow-md">

  <!-- <AnimalListCommponent :animal="animalTest" /> -->
  <template v-for="animal in simpleAnimals" :key="animal.id">
    <AnimalListCommponent :animal="animal" @add-animal-modal="openAddAnimalModal" />
    </template>
</ul>
  
<div class="w-full flex justify-center mt-5" >
    <div className="join">
    <button @click="changePage(-1)" className="join-item btn">«</button>
    <button className="join-item btn">{{ pageNumber }}</button>
    <button @click="changePage(1)" className="join-item btn">»</button>
  </div>
</div>
    <!-- <UploadPhoto/> -->
    </div>
    </div>
    <AddAnimalModal @add-animal-modal="openAddAnimalModal" :animal="selectedAnimal"  />
</template>
