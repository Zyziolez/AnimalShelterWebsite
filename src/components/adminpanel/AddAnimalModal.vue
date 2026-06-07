<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import AnimalPostForm from './AnimalPostForm.vue';
// import UploadPhoto from './UploadPhoto.vue';
import {Animal} from '@/types/index.ts'
import { useAnimals } from '@/composables/useAnimals'
import { Icon } from '@iconify/vue';

const {postAnimal, updateAnimalWithCard} = useAnimals()
const photos = ref<{ base64Data: string; imageExtension: string; main: boolean }[]>([])

const props = withDefaults(defineProps<{
  animal?: Animal
}>(), {
  animal: () => ({
    animalId: 0,
    species: '',
    name: '',
    age: 0,
    sex: 'M',
    description: '',
    photos: [],
    card: null
  })
})
const _emit = defineEmits<{
  addAnimalModal: [modalOpen: boolean, addCard: boolean, animal?: Animal],
  addAnimalToList: [animal: Animal]
}>()



// const showPostForm = ref(false)
const formData = ref<Animal>({...props.animal})

function validateForm(){
  if(formData.value.name == '' || formData.value.species == ''){
    return false
  }
  if(photos.value.length > 0){
    if(!photos.value.find(photo => photo.main)){
    return false
  }
  }
  if(formData.value.card){
    if(formData.value.card.status == ''){
      return false
    }
  }
  return true
}

async function addAnimalFunction(){
  // console.log(photos.value)
  if(props.animal.animalId && props.animal.animalId > 0){
    const putAnimalData = {
          animalId: props.animal.animalId,
          species: formData.value.species,
          name: formData.value.name,
          age: formData.value.age,
          sex: formData.value.sex,
          description: formData.value.description,
          photos: photos.value,
          card: formData.value.card
          } as Animal
        const updatedAnimal = await updateAnimalWithCard(putAnimalData, props.animal.card ? false : true)
         _emit('addAnimalToList', updatedAnimal)
        
  }else{
    const postAnimalData = {
          animalId: 0,
          species: formData.value.species,
          name: formData.value.name,
          age: formData.value.age,
          sex: formData.value.sex,
          description: formData.value.description,
          photos: photos.value,
          card: formData.value.card
          } as Animal
          const newAnimal = await postAnimal(postAnimalData)
          _emit('addAnimalToList', newAnimal)

  }
  closeModal()
  // console.log(postAnimalData)
}
const handleFiles = (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (!files) return

  Array.from(files).forEach((file) => {
    const reader = new FileReader()

    reader.onload = () => {
      photos.value.push({
        main: photos.value.length === 0,
        imageData: null,
        base64Data: reader.result as string,
        animalId: formData.value.animalId ? formData.value.animalId : 0,
        imageExtension: file.type.split('/')[1], 
        animal: null


      })
    }

    reader.readAsDataURL(file)
  })
}

function toggleCardStatus(){
  if(formData.value.card){
    formData.value.card = null
  }else{
    // console.log('wykonuje sie')
    formData.value.card = { id: 0, status: '', date: 0, animalId: formData.value.animalId ? formData.value.animalId : 0}
  }
}
function addCardInfo(status: string){

  if(formData.value.card){
    formData.value.card.status = status
  }
}
function deletePhoto(index: number){
  photos.value.splice(index, 1)
}
function toggleMainPhoto(index: number){
  photos.value = photos.value.map((photo, i) => ({
    ...photo,
    main: i === index ? !photo.main : false
  }))
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
  _emit('addAnimalModal', false, false)
}

watch(() => props.animal,(newVal: Animal) =>{
    formData.value = {...newVal}
}, {deep: true})

</script>
<template>
    <dialog id="add-animal" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box white-back ">
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
            <input type="radio" name="sex" id="m" v-model="formData.sex" value="M" class="radio" defaultChecked />
            Samiec
        </label>
        <label class="label mt-5">
            <input type="radio" name="sex" id="f" v-model="formData.sex" value="F" class="radio" />
            Samica
        </label>
    </fieldset>
    <fieldset class="fieldset">
        <legend class="fieldset-legend">Opis</legend>
        <textarea class="textarea" placeholder="Opis zwierzaka..." v-model="formData.description"></textarea>
        </fieldset>
    <fieldset class="fieldset" v-if="props.animal.animalId == 0" >
       <legend class="fieldset-legend">Zdjęcia</legend>
      <input type="file" class="file-input" multiple @change="handleFiles" />
      <div class="flex gap-2" >
        <div v-for="(photo, index) in photos" :key="index" >
          <img :src="photo.base64Data" class="w-20 h-20 rounded-sm" :class="photo.main ? 'border-2' : null" />

         <div class="flex gap-1 justify-center" >
            <button
              v-if="!photo.main"
              @click="toggleMainPhoto(index)">
              <Icon icon="mdi-light:heart" width="20" height="20" class="hover:opacity-50" />
            </button>
            <button
              v-else
              @click="toggleMainPhoto(index)">
              <Icon icon="mdi-light:heart-off" width="20" height="20" class="hover:opacity-50" />
            </button>
            <button @click="deletePhoto(index)">
              <Icon icon="mdi-light:delete" width="20" height="20" class="hover:opacity-50" />
            </button>
         </div>
        </div>
      </div>
    </fieldset>


<!-- otwiera form ogłoszenia -->
    <label class="label mt-5" >
    <input type="checkbox" :checked="formData.card != null" class="checkbox" @click="toggleCardStatus" />
    Dodaj ogłoszenie
  </label>
  <AnimalPostForm v-if="formData.card != null" @add-animal-post="addCardInfo" :initialStatus="formData.card?.status" />
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