<script lang="ts" setup>
import {ref, defineEmits, watch, onMounted} from 'vue'

const props = defineProps<{
    emitData?: boolean,
    initialStatus?: string
}>()
const statusRef = ref(props.initialStatus || '')
// const 

onMounted(() => {
  console.log('initial status:', props.initialStatus)
})

const _emit = defineEmits<{
    'add-animal-post': [animalStatus: string]
}>()

watch(
  () => props.emitData,
  (val) => {
    if (val) {
      _emit('add-animal-post', statusRef.value)
    }
  }
)
</script>
<template>
    <fieldset class="fieldset">
        <legend class="fieldset-legend">Status</legend>
        <select v-model="statusRef" class="select" @change="_emit('add-animal-post', statusRef)" >
        <option disabled='true' value="">Status</option>
        <option value="Do adopcji">Do adopcji</option>
        <option value="Adoptowany internetowo">Adoptowany internetowo</option>
        <option value="W trakcie leczenia">W trakcie leczenia</option>
    </select>
    </fieldset>
</template>