<script setup lang="ts">
// import { Icon } from '@iconify/vue'
import {ref} from 'vue'

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
    <div >
  <div class="flex gap-5" >
    <h1 class="flex-4 text-2xl" >Zwierzaki w bazie</h1>
    <input v-model="searchBarValue" @input="searchAnimal" type="text"  placeholder="Wyszukaj..." class="input input-bordered flex-4" />
    <button @click="openAddAnimalModal" class="btn btn-primary flex-1" >Dodaj</button>
  </div>
  <div >
    
    <div class="flex gap-4" >
            <fieldset class="fieldset">
                <select v-model="selectedSex" class="select select-ghost" @change="searchAnimal" >
                  <option value="" >Wszystkie płcie</option>
                  <option value="F" >Samice</option>
                  <option value="M">Samce</option>
                </select>
         </fieldset>
         <fieldset class="fieldset">
             <select v-model="selectedSpecies" class="select select-ghost" @change="searchAnimal" >
              <option value="" >Wszystkie gatunki</option>
              <option value="Kot" >Koty</option>
              <option value="Pies">Psy</option>
            </select>
         </fieldset>

    </div>

    <div class="dropdown dropdown-end">
      <!-- <div tabIndex="0" role="button" class="btn btn-ghost">
        <Icon icon="flowbite:adjustments-horizontal-outline" width="24" height="24" />
      </div>
      <ul
        tabIndex="-1"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul> -->
    </div>
 
</div>
    </div>
</template>
