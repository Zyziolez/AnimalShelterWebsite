<script setup lang="ts">
fetch('https://localhost:5001/api/Cards', {
     headers: {
    'Access-Control-Allow-Origin':'*'
  }
})
.then(res => res.json())
.then(data => console.log(data))
</script>
<template>
    <div>
        <h1>home</h1>
    </div>
</template>