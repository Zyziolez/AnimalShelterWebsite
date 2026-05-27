<script lang="ts" setup>
import {ref, defineEmits, watch} from 'vue'

const props = defineProps<{
    emitData: boolean
}>()
const statusRef = ref('')
// const 

const _emit = defineEmits<{
    'add-animal-post': [animalStatus: string]
}>()

watch(props.emitData, (val) => {
    if(val){
        _emit('add-animal-post', statusRef.value)
    }
})

</script>
<template>
    <fieldset className="fieldset">
        <legend className="fieldset-legend">Status</legend>
        <select v-model="statusRef" defaultValue="Status" className="select">
        <option disabled='true'>Status</option>
        <option>Do adopcji</option>
        <option>Adoptowany internetowo</option>
        <option>W trakcie leczenia</option>
    </select>
    </fieldset>
</template>