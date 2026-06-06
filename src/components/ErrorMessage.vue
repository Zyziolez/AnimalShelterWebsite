<script lang="ts" setup>
import { Icon } from '@iconify/vue';

defineProps<{
  errorMessage: string
}>()
</script>
<template>
  <div role="alert" class="alert alert-error absolute top-4 left-1/2 transform -translate-x-1/2 z-50 ">
    <Icon icon="mdi-light:alert-octagon" />
  <span>{{ errorMessage }}</span>
</div>
</template>