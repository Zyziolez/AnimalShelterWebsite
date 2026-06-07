
<script setup lang="ts">

import AdminMenu from '@/components/adminpanel/AdminMenu.vue';
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';

onMounted(() => {
    const token = localStorage.getItem('token')
    if(!token){
        window.location.href = '/login'
    }
})

</script>
<template>

   <div class="white-back" >
    <AdminMenu/> 
   <RouterView/>
   </div>
</template>
