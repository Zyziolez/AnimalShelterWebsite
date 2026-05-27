<script setup lang="ts">
import { ref } from 'vue'
import AnimalPostForm from './AnimalPostForm.vue';
import UploadPhoto from './UploadPhoto.vue';
import {Animal} from '@/types/index.ts'

const _emit = defineEmits<{
  addAnimalModal: [modalOpen: boolean]
}>()

const showPostForm = ref(false)
const formData = ref<Animal>({
    species: '',
    name: '',
    age: 0,
    sex: '',
    description: ''

})

function addAnimalFunction(){
    console.log(formData.value)
}

</script>
<template>
    <dialog id="add-animal" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Dodaj zwierzę do bazy</h3>
<!-- inputy -->
    <fieldset className="fieldset">
        <legend className="fieldset-legend">Imię</legend>
        <input type="text" className="input" placeholder="Reksio" v-model="formData.name" />
    </fieldset>
    
    <fieldset className="fieldset">
        <legend className="fieldset-legend">Gatunek</legend>
        <select defaultValue="Gatunek" className="select" v-model="formData.species">

        <option disabled='true'>Gatunek</option>
        <option  >Pies</option>
        <option>Kot</option>
        <option>Inne</option>
    </select>
    </fieldset>

    <fieldset className="fieldset">
        <legend className="fieldset-legend">Wiek</legend>
        <input
            type="number"
            className="input validator"
            required
            placeholder="Wiek (w latach)"
            min="0"
            max="25"
            v-model="formData.age"
            />
    </fieldset>
    <fieldset className="fieldset">
        <legend className="fieldset-legend">Płeć</legend>
        <label className="label mt-5">
            <input type="radio" name="sex" v-model="formData.sex" value="M" className="radio" defaultChecked />
            Samiec
        </label>
        <label className="label mt-5">
            <input type="radio" name="sex" v-model="formData.sex" value="F" className="radio" />
            Samica
        </label>
    </fieldset>
    <fieldset className="fieldset">
        <legend className="fieldset-legend">Opis</legend>
        <textarea className="textarea" placeholder="Opis zwierzaka..." v-model="formData.description"></textarea>
        </fieldset>

<UploadPhoto/>

<!-- otwiera form ogłoszenia -->
    <label className="label mt-5" >
    <input type="checkbox"  className="checkbox" @click="showPostForm = !showPostForm" />
    Dodaj ogłoszenie
  </label>
  <AnimalPostForm v-if="showPostForm"/>
  <!-- zamkniecie -->
    <div className="modal-action">
      <form method="dialog">
        <button className="btn">Anuluj</button>
      </form>
      <button className="btn" @click="addAnimalFunction" >Zapisz</button>
    </div>
  </div>

  
</dialog>
</template>