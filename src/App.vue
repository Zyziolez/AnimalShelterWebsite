<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <ul class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
      <li>
        <a><RouterLink to="/">Strona Główna</RouterLink></a>
      </li>
      <li>
        <a><RouterLink to="/animal/1">Test Zwierzaka</RouterLink></a>
      </li>
    </ul>
  </nav>

  <RouterView />
</template>
