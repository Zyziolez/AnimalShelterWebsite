
<script setup lang="ts">
import {  computed } from 'vue'
import { Icon } from '@iconify/vue';
import {Animal} from '@/types/index.ts'
import dogImage from './../assets/images/dog.png'
import catImage from './../assets/images/cat.png'

const props = defineProps<{
  animal: Animal
}>();

const imageSrc = computed(() => {
  if (props.animal.photos?.[0]?.imageData) {
    return `data:image/${props.animal.photos[0].imageExtension};base64,${props.animal.photos[0].imageData}`
  }
  return props.animal.species === 'Pies' ? dogImage : catImage
})

const _emit = defineEmits<{
  addAnimalModal: [modalOpen: boolean, addCard: boolean, animal?: Animal],
  deleteAnimal: [animalId: number, hasPhotos: boolean],
  deleteCard: [cardId: number]
}>()

function edit(){
  _emit('addAnimalModal', true, false, props.animal)
}
function deleteAnimal(){
  // console.log('kliknieto mnie')
  _emit('deleteAnimal', props.animal.animalId!, props.animal.photos ? props.animal.photos.length > 0? true :false : false)
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
    <li class="list-row" :class="props.animal.sex == 'M' ? 'blue-male-back' : 'pink-female-back'">
    <div>
      <img class="size-10 rounded-box" :src="imageSrc"/>

    </div>
    <div>
      <div class="flex align-items-center" >
        {{ animal.name }} 
        <Icon v-if='props.animal.sex == "M"' icon='mdi:gender-male' />
        <Icon v-else icon='mdi:gender-female' /></div>
      <div class="text-xs font-semibold opacity-60">{{ animal.description }}</div>
      
        
    </div>

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
