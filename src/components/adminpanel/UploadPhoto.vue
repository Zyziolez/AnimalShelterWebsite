<script setup lang="ts">
  function uploadImage(event) {

    const data = new FormData();
    data.append('name', 'my-picture');
    data.append('file', event.target.files[0]); 

    fetch('http://localhost:8080/api/Photos', {
      method: 'POST',
      body: data,
    })

  }

</script>

<template>
  <div class="">
    <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input">
  </div>
</template>