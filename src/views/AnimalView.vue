
<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

// console.log(route.params)
fetch(`https://localhost:5001/api/Animals/${route.params.animalId}`, {
     headers: {
    'Access-Control-Allow-Origin':'*'
  }
})
.then(res => res.json())
.then(data => console.log(data))
</script>
<template>
    <div>
        <h1>zwierzak</h1>
    </div>
</template>