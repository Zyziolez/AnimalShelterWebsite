<script setup lang="ts">
// import { Icon } from '@iconify/vue'
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
    <div class="white-back" >
  <div class="flex gap-5 " >
    <h1 class="flex-4 text-2xl" >{{ t('mainPanel.animalsInDb') }}</h1>
    <input v-model="searchBarValue" @input="searchAnimal" type="text"  :placeholder="$t('mainPanel.search')" class="input input-bordered flex-4" />
    <button @click="openAddAnimalModal" class="btn btn-primary flex-1" >{{ t('mainPanel.add') }}</button>
  </div>
  <div >
    
    <div class="flex gap-4" >
            <fieldset class="fieldset">
                <select v-model="selectedSex" class="select select-ghost" @change="searchAnimal" >
                  <option value="" >{{ t('mainPanel.allGenders') }}</option>
                  <option value="F" >{{ t('animal.female') }}</option>
                  <option value="M">{{ t('animal.male') }}</option>
                </select>
         </fieldset>
         <fieldset class="fieldset">
             <select v-model="selectedSpecies" class="select select-ghost" @change="searchAnimal" >
              <option value="" >{{ t('mainPanel.allSpecies') }}</option>
              <option value="Kot" >{{ t('mainPanel.cats') }}</option>
              <option value="Pies">{{ t('mainPanel.dogs') }}</option>
            </select>
         </fieldset>

    </div>

    <div class="dropdown dropdown-end">
    </div>
 
</div>
    </div>
</template>
