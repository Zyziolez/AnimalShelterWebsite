<script setup lang="ts">
import {ref} from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const _emit = defineEmits<{
  addAnimalModal: [modalOpen: boolean, addCard: boolean],
  fetchAnimalNameEmit: [searchValue: string, sex: string, species: string]
}>()

function openAddAnimalModal(){
  _emit('addAnimalModal', true, false)
}

const searchBarValue = ref('')
const selectedSex = ref('')
const selectedSpecies = ref('')

function searchAnimal (){
  _emit('fetchAnimalNameEmit', searchBarValue.value, selectedSex.value, selectedSpecies.value)
}
</script>

<template>
  <div class="white-back shadow-lg p-4 sm:p-6 md:p-8">
    <div class="flex flex-col gap-4 md:gap-6">
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
        <h1 class="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent flex-shrink-0">
          {{ t('mainPanel.animalsInDb') }}
        </h1>
        
        <div class="flex-1 min-w-0">
          <input 
            v-model="searchBarValue" 
            @input="searchAnimal" 
            type="text"  
            :placeholder="$t('mainPanel.search')" 
            class="input input-bordered w-full bg-white/50 focus:bg-white transition-all duration-200" 
          />
        </div>
        
        <button @click="openAddAnimalModal" class="btn btn-primary shadow-md hover:shadow-lg transition-all duration-200 flex-shrink-0">
          {{ t('mainPanel.add') }}
        </button>
      </div>

      <div class="flex flex-wrap gap-3 sm:gap-4">
        <div class="flex-1 min-w-[120px]">
          <select v-model="selectedSex" class="select select-bordered w-full bg-white/50" @change="searchAnimal">
            <option value="">{{ t('mainPanel.allGenders') }}</option>
            <option value="F">{{ t('animal.female') }}</option>
            <option value="M">{{ t('animal.male') }}</option>
          </select>
        </div>
        
        <div class="flex-1 min-w-[120px]">
          <select v-model="selectedSpecies" class="select select-bordered w-full bg-white/50" @change="searchAnimal">
            <option value="">{{ t('mainPanel.allSpecies') }}</option>
            <option value="Kot">{{ t('mainPanel.cats') }}</option>
            <option value="Pies">{{ t('mainPanel.dogs') }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

@media (max-width: 640px) {
  .select, .input, .btn {
    font-size: 0.875rem;
  }
}
</style>