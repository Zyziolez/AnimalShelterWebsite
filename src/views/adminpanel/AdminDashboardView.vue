<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnimals } from '@/composables/useAnimals'
import AnimalCard from '@/components/AnimalCard.vue';
import SearchBar from '@/components/adminpanel/SearchBar.vue';

const { simpleAnimals, fetchSimpleAnimals } = useAnimals()
onMounted(async () => {
  await fetchSimpleAnimals()
})



</script>
<template>
    <div >
        <div className=" mt-4 justify-center  w-4/5 mx-auto">
      
           <div  >
             <SearchBar/>
           </div>
    <div className="flex gap-4 mt-4 justify-center flex-wrap">
        <AnimalCard/>
      <AnimalCard/>
      <AnimalCard/>
      <AnimalCard/>
      <AnimalCard/>
      <AnimalCard/>
    </div>


    </div>
    </div>
</template>
