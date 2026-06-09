<script setup lang="ts">
import { computed } from 'vue'
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
    <div class="flex-shrink-0">
      <img class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover shadow-md" :src="imageSrc"/>
    </div>
    
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-1 text-base sm:text-lg font-semibold">
        {{ animal.name }} 
        <Icon v-if='props.animal.sex == "M"' icon='mdi:gender-male' class="text-blue-600" />
        <Icon v-else icon='mdi:gender-female' class="text-pink-600" />
      </div>
      <div class="text-xs sm:text-sm opacity-70 line-clamp-2">{{ animal.description }}</div>
    </div>

    <div class="flex items-center gap-1 sm:gap-2">
      <div v-if="props.animal.card">
        <button class="btn btn-sm btn-circle btn-ghost hover:bg-error/20" @click="deleteCard">
          <Icon icon="mdi-light:delete" class="text-lg sm:text-xl" />
        </button>
      </div>
      <div v-else>
        <button class="btn btn-sm btn-circle btn-ghost hover:bg-success/20" @click="addCard">
          <Icon icon="mdi-light:note-plus" class="text-lg sm:text-xl" />
        </button>
      </div>
      
      <button class="btn btn-sm btn-circle btn-ghost hover:bg-info/20" @click="edit">
        <Icon icon="mdi-light:pencil" class="text-lg sm:text-xl" />
      </button>
      
      <button class="btn btn-sm btn-circle btn-ghost hover:bg-error/20" @click="deleteAnimal">
        <Icon icon="mdi-light:delete" class="text-lg sm:text-xl" />
      </button>
    </div>
  </li>
</template>

<style scoped>
.list-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.list-row:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

@media (max-width: 640px) {
  .list-row {
    gap: 0.75rem;
    padding: 0.75rem;
  }
}

.blue-male-back {
  background: #e3f2fd;
  border-left: 4px solid #5a9de0;
}

.pink-female-back {
  background: #fce4ec;
  border-left: 4px solid #d7578b;
}
</style>