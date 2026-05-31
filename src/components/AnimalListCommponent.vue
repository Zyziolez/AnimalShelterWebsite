
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {Animal} from '@/types/index.ts'

const props = defineProps<{
  animal: Animal
}>();
const _emit = defineEmits<{
  addAnimalModal: [modalOpen: boolean, animal?: Animal]
}>()

function edit(){
  // console.log('gowno')
  _emit('addAnimalModal', true, props.animal)
}


</script>
<template>
    <li className="list-row">
    <div>
      <img v-if="props.animal.photos" className="size-10 rounded-box" :src="props.animal.photos[0].apiLink"/>
      <img v-else-if="props.animal.species == 'Pies'" className="size-10 rounded-box" src="@/assets/images/dog.png"/>
      <img v-else className="size-10 rounded-box" src="@/assets/images/cat.png"/>

    </div>
    <div>
      <div class="flex align-items-center" >
        {{ props.animal.name }} 
        <Icon v-if='props.animal.sex == "M"' icon='mdi:gender-male' />
        <Icon v-else icon='mdi:gender-female' /></div>
      <div className="text-xs font-semibold opacity-60">{{ props.animal.description }}</div>
      

    </div>
    <!-- <p className="list-col-wrap text-xs">
      "Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.
    </p> -->
    <button className="btn btn-square btn-ghost" @click="edit()">
      <Icon icon="mdi-light:pencil" />
    </button>
    <button className="btn btn-square btn-ghost">
      <Icon icon="mdi-light:delete" />
    </button>
  </li>
</template>
