<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Strona Główna</RouterLink>
    <RouterLink to="/animal/1">Test Zwierzaka</RouterLink>
  </nav>

  <RouterView />
</template>
