
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnimals } from '@/composables/useAnimals'
import AnimalCard from '@/components/AnimalCard.vue';
import AdminMenu from '@/components/adminMenu/AdminMenu.vue';

const { simpleAnimals, fetchSimpleAnimals } = useAnimals()


</script>
<template>

   <div>
    <AdminMenu/> 
    <div className=" mt-4 justify-center  w-4/5 mx-auto">
      
<button className="btn w-full">Wide</button>
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
