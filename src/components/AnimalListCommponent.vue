
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {Animal} from '@/types/index.ts'

const props = defineProps<{
  animal: Animal
}>();
const _emit = defineEmits<{
  addAnimalModal: [modalOpen: boolean, animal?: Animal],
  deleteAnimal: [animalId: number]
}>()

function edit(){
  // console.log('gowno')
  _emit('addAnimalModal', true, props.animal)
}
function deleteAnimal(){
  console.log('kliknieto mnie')
  _emit('deleteAnimal', props.animal.animalId!)
}

</script>
<template>
    <li class="list-row">
    <div>
      <img v-if="props.animal.photos && props.animal.photos.length > 0" class="size-10 rounded-box" :src="props.animal.photos[0].apiLink"/>
      <img v-else-if="props.animal.species == 'Pies'" class="size-10 rounded-box" src="@/assets/images/dog.png"/>
      <img v-else class="size-10 rounded-box" src="@/assets/images/cat.png"/>

    </div>
    <div>
      <div class="flex align-items-center" >
        {{ props.animal.name }} 
        <Icon v-if='props.animal.sex == "M"' icon='mdi:gender-male' />
        <Icon v-else icon='mdi:gender-female' /></div>
      <div class="text-xs font-semibold opacity-60">{{ props.animal.description }}</div>
      

    </div>
    <!-- <p class="list-col-wrap text-xs">
      "Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.
    </p> -->
    <button class="btn btn-square btn-ghost" @click="edit">
      <Icon icon="mdi-light:pencil" />
    </button>
    <button class="btn btn-square btn-ghost" @click="deleteAnimal" >
      <Icon icon="mdi-light:delete" />
    </button>
  </li>
</template>
