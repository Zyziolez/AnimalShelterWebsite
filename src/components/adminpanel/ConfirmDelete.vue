<script setup lang="ts" generic="T extends { name: string }">
import {defineProps} from 'vue'

const props = defineProps<{
  item: T
  message: (item: T) => string
}>()

const emit = defineEmits<{
  confirm: [item: T]
  cancel: []
}>()

</script>

<template>
  <dialog class="modal">
    <div class="modal-box">
      <p>{{ message(item) }}</p>
      <div class="modal-action">
        <button @click="emit('cancel')">Anuluj</button>
        <button @click="emit('confirm', item)">Potwierdź</button>
      </div>
    </div>
  </dialog>
</template>