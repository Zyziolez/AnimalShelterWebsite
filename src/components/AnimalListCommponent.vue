
<script setup lang="ts">
import { onMounted } from 'vue'
import { Icon } from '@iconify/vue';
import {Animal} from '@/types/index.ts'
import { useAnimals } from '@/composables/useAnimals'


const props = defineProps<{
  animal: Animal
}>();
const _emit = defineEmits<{
  addAnimalModal: [modalOpen: boolean, addCard: boolean, animal?: Animal],
  deleteAnimal: [animalId: number],
  deleteCard: [cardId: number]
}>()

function edit(){
  // console.log('gowno')
  _emit('addAnimalModal', true, false, props.animal)
}
function deleteAnimal(){
  // console.log('kliknieto mnie')
  _emit('deleteAnimal', props.animal.animalId!)
}

function addCard(){
  _emit('addAnimalModal', true, true, props.animal)
}
function deleteCard(){
  if(props.animal.card){
    _emit('deleteCard', props.animal.card.id)
  }
}

</script>
<template>
    <li class="list-row gray-back">
    <div>
<img
  v-if="props.animal.photos?.[0]?.imageData"
  class="size-10 rounded-box"
  :src="`data:image/${props.animal.photos[0].imageExtension};base64,${props.animal.photos[0].imageData}`"/>
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
    <div v-if="props.animal.card" >
        <button class="btn btn-square btn-ghost" @click="deleteCard" >
          <Icon icon="mdi-light:delete" />
        </button>
        </div>
        <div v-else >
          <button class="btn btn-square btn-ghost" @click="addCard">
            <Icon icon="mdi-light:note-plus" />
          </button>
        </div>
    <button class="btn btn-square btn-ghost" @click="edit">
      <Icon icon="mdi-light:pencil" />
    </button>
    <button class="btn btn-square btn-ghost" @click="deleteAnimal" >
      <Icon icon="mdi-light:delete" />
    </button>
  </li>
</template>
