<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import AnimalPostForm from './AnimalPostForm.vue';
// import UploadPhoto from './UploadPhoto.vue';
import {Animal} from '@/types/index.ts'
import { useAnimals } from '@/composables/useAnimals'

const {postAnimal} = useAnimals()

const props = withDefaults(defineProps<{
  animal?: Animal
}>(), {
  animal: () => ({
    animalId: -1,
    species: '',
    name: '',
    age: 0,
    sex: '',
    description: '',
    photos: [],
    card: null
  })
})
const _emit = defineEmits<{
  addAnimalModal: [modalOpen: boolean]
}>()


// const showPostForm = ref(false)
const formData = ref<Animal>(props.animal)

function addAnimalFunction(){
  const postAnimalData = {
  animalId: 0,
  species: formData.value.species,
  name: formData.value.name,
  age: formData.value.age,
  sex: formData.value.sex,
  description: formData.value.description,
  photos: []

  } as Animal
  postAnimal(postAnimalData)
}


function closeModal(){
 formData.value =  {
      animalId: 0,
      species: '',
      name: '',
      age: 0,
      sex: '',
      description: '',
      photos: [],
      card: null
    }
  _emit('addAnimalModal', false)
}

watch(() => props.animal,(newVal: Animal) =>{
    formData.value = newVal
}, {deep: true})

</script>
<template>
    <dialog id="add-animal" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <div class="flex justify-between" >
        <h3 class="font-bold text-lg">Dodaj zwierzę do bazy</h3>
        <button class="btn btn-sm btn-circle btn-ghost" @click="closeModal">✕</button>
</div>
    <!-- inputy -->
    <fieldset class="fieldset">
        <legend class="fieldset-legend">Imię</legend>
        <input type="text" class="input" placeholder="Reksio" v-model="formData.name" />
    </fieldset>
    
    <fieldset class="fieldset">
        <legend class="fieldset-legend">Gatunek</legend>
        <select  class="select" v-model="formData.species">
        <option disabled='true' value="">Gatunek</option>
        <option value="Pies" >Pies</option>
        <option value="Kot">Kot</option>
    </select>
    </fieldset>

    <fieldset class="fieldset">
        <legend class="fieldset-legend">Wiek</legend>
        <input
            type="number"
            class="input validator"
            required
            placeholder="Wiek (w latach)"
            min="0"
            max="25"
            v-model="formData.age"
            />
    </fieldset>
    <fieldset class="fieldset">
        <legend class="fieldset-legend">Płeć</legend>
        <label class="label mt-5">
            <input type="radio" name="sex" v-model="formData.sex" value="M" class="radio" defaultChecked />
            Samiec
        </label>
        <label class="label mt-5">
            <input type="radio" name="sex" v-model="formData.sex" value="F" class="radio" />
            Samica
        </label>
    </fieldset>
    <fieldset class="fieldset">
        <legend class="fieldset-legend">Opis</legend>
        <textarea class="textarea" placeholder="Opis zwierzaka..." v-model="formData.description"></textarea>
        </fieldset>

<!-- <UploadPhoto/> -->

<!-- otwiera form ogłoszenia -->
    <label class="label mt-5" >
    <input type="checkbox"  class="checkbox" @click="() => {formData.card = { id: -1, status: '', date: 0}}" />
    Dodaj ogłoszenie
  </label>
  <AnimalPostForm v-if="props.animal.card != undefined"/>
  <!-- zamkniecie -->
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Anuluj</button>
      </form>
      <button class="btn" @click="addAnimalFunction" >Zapisz</button>
    </div>
  </div>

  
</dialog>
</template>