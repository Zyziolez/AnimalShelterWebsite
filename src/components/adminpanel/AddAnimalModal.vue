<script setup lang="ts">
import { ref, watch } from 'vue'
import AnimalPostForm from './AnimalPostForm.vue';
import {Animal} from '@/types/index.ts'
import { useAnimals } from '@/composables/useAnimals'
import { Icon } from '@iconify/vue';
import { z } from 'zod'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useI18n } from 'vue-i18n'
import vCapitalize from '@/directives/capitalize' 

const {postAnimal, updateAnimalWithCard} = useAnimals()
const photos = ref<{ base64Data: string; imageExtension: string; main: boolean }[]>([])
const { t } = useI18n()
const fileInput = ref<HTMLInputElement | null>(null)
const loading = ref<boolean>(false) 

const animalSchema = z.object({
  name: z.string().min(1, t('inputsAndErrors.errNameRequired')),
  species: z.enum(['Pies', 'Kot'], { message: t('inputsAndErrors.errChooseSpecies') }),
  age: z.number().min(0).max(25, t('inputsAndErrors.errAge')),
  sex: z.enum(['M', 'F'], { message: t('inputsAndErrors.errChooseSex') }),
  description: z.string().optional(),
})

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

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: toTypedSchema(animalSchema),
  initialValues: {
    name: props.animal.name,
    species: props.animal.species,
    age: props.animal.age,
    sex: props.animal.sex,
    description: props.animal.description,
  }
})

const { value: name } = useField('name')
const { value: species } = useField('species')
const { value: age } = useField('age')
const { value: sex } = useField('sex')
const { value: description } = useField('description')

const card = ref<{ id: number; status: string; date: number; animalId: number } | null>(props.animal.card ?? null)
const cardError = ref<string | null>(null)

const onSubmit = handleSubmit(async (values) => {
  if (card.value && card.value.status === '') {
    cardError.value = t('inputsAndErrors.errChooseStatus')
    return
  }
  cardError.value = null
  loading.value=true
  // console.log(photos.value)
  const animalData = {
    ...values,
    photos: photos.value,
    card: card.value
  } as Animal

  if (props.animal.animalId && props.animal.animalId > 0) {
    const updated = await updateAnimalWithCard({ animalId: props.animal.animalId, ...animalData }, props.animal.card ? false : true)
    _emit('addAnimalToList', updated)
  } else {
    const newAnimal = await postAnimal(animalData)
    _emit('addAnimalToList', newAnimal)
  }
  loading.value=false
  closeModal()
})

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
        animalId: props.animal.animalId ?? 0,
        imageExtension: file.type.split('/')[1],
        animal: null
      })
    }
    reader.readAsDataURL(file)
  })
}

function toggleCardStatus() {
  if (card.value) {
    card.value = null
  } else {
    card.value = { id: 0, status: '', date: 0, animalId: props.animal.animalId ?? 0 }
  }
}

function addCardInfo(status: string) {
  if (card.value) {
    card.value.status = status
  }
}

function deletePhoto(index: number) {
  photos.value.splice(index, 1)

  photos.value = [...photos.value]
  
  if (photos.value.length > 0 && !photos.value.some(p => p.main)) {
    photos.value.length[0].main = true
    photos.value = [...photos.value]
  }
}

function toggleMainPhoto(index: number) {
  console.log(photos.value)
  const newPhotos = JSON.parse(JSON.stringify(photos.value))
  newPhotos.forEach((photo: any, i: number) => {
    photo.main = i === index
  })
  
  photos.value = newPhotos
  // console.log(photos.value)
}

function closeModal() {
  resetForm({
    values: {
      name: '',
      species: undefined,
      age: 0,
      sex: 'M',
      description: '',
    }
  })
  card.value = null
  cardError.value = null
  photos.value = []
  loading.value = false
  _emit('addAnimalModal', false, false)
}

watch(() => props.animal, (newVal: Animal) => {
  resetForm({
    values: {
      name: newVal.name,
      species: newVal.species,
      age: newVal.age,
      sex: newVal.sex,
      description: newVal.description,
    }
  })
  card.value = newVal.card ?? null
}, { deep: true })
</script>

<template>
  <template v-if="loading" >
    <div  class="modal modal-bottom sm:modal-middle" >
      <div class="modal-box max-w-lg white-back">
          <div  class="flex justify-center items-center py-16">
              <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>
            </div>
    </div>
  </template>
  <template v-else >
<dialog id="add-animal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box max-w-lg white-back">

      <div class="flex justify-between items-center mb-6 pb-4 border-b border-base-200 white-back">
        <div>
          <h3 class="text-lg font-semibold">{{ t('animal.add') }}</h3>
        </div>
        <button class="btn btn-sm btn-circle btn-ghost" @click="closeModal">
          <Icon icon="mdi-light:close" width="18" height="18" />
        </button>
      </div>

      <div class="grid grid-cols-2 gap-3 mb-3">
        <fieldset class="fieldset">
          <legend class="fieldset-legend text-xs" >{{ t('animal.name') }}</legend>
          <input type="text" class="input input-sm w-full" :class="{ 'input-error': errors.name }" v-capitalize  placeholder="Reksio" v-model="name" />
          <span class="text-error text-xs mt-1" v-if="errors.name">{{ errors.name }}</span>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend text-xs">{{ t('animal.species') }}</legend>
          <select class="select select-sm w-full" :class="{ 'select-error': errors.species }" v-model="species">
            <option disabled value="">{{ t('animal.species') }}</option>
            <option value="Pies">{{ t('animal.dog') }}</option>
            <option value="Kot">{{ t('animal.cat') }}</option>
          </select>
          <span class="text-error text-xs mt-1" v-if="errors.species">{{ errors.species }}</span>
        </fieldset>
      </div>

      <div class="grid grid-cols-2 gap-3 mb-3">
        <fieldset class="fieldset">
          <legend class="fieldset-legend text-xs">{{ t('animal.age') }}</legend>
          <input type="number" class="input input-sm w-full" :class="{ 'input-error': errors.age }" placeholder="0" min="0" max="25" v-model="age" />
          <span class="text-error text-xs mt-1" v-if="errors.age">{{ errors.age }}</span>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend text-xs">{{ t('animal.sex') }}</legend>
          <div class="flex gap-4 h-8 items-center">
            <label class="flex items-center gap-1.5 text-sm cursor-pointer">
              <input type="radio" name="sex" v-model="sex" value="M" class="radio radio-xs" />
              {{ t('animal.male') }}
            </label>
            <label class="flex items-center gap-1.5 text-sm cursor-pointer">
              <input type="radio" name="sex" v-model="sex" value="F" class="radio radio-xs" />
              {{ t('animal.female') }}
            </label>
          </div>
          <span class="text-error text-xs mt-1" v-if="errors.sex">{{ errors.sex }}</span>
        </fieldset>
      </div>

      <fieldset class="fieldset mb-3">
        <legend class="fieldset-legend text-xs">{{ t('animal.description') }}</legend>
        <textarea class="textarea textarea-sm w-full resize-none h-20" :placeholder="t('animal.description')" v-model="description"></textarea>
      </fieldset>

      <fieldset class="fieldset mb-4" v-if="props.animal.animalId == 0">
        <legend class="fieldset-legend text-xs">{{ t('animal.image') }}</legend>
        <input type="file" class="hidden" multiple @change="handleFiles" ref="fileInput" />
        <div
          class="border border-dashed border-base-300 rounded-lg p-4 flex items-center gap-3 cursor-pointer hover:border-base-content/30 transition-colors"
          @click="fileInput?.click()"
        >
          <Icon icon="mdi-light:upload" width="20" height="20" class="text-base-content/40" />
          <span class="text-sm text-base-content/50">{{ t('animal.chooseFile') }}</span>
        </div>
        <div class="flex gap-2 mt-2 flex-wrap" v-if="photos.length > 0">
          <div v-for="(photo, index) in photos" :key="index + '-' + photo.main" class="relative">
            <img :src="photo.base64Data" class="w-16 h-16 rounded-md object-cover" :class="photo.main ? 'ring-2 ring-base-content' : ''" />
            <div class="flex gap-0.5 justify-center mt-1">
              <button v-if="!photo.main" @click="toggleMainPhoto(index)" class="btn btn-xs btn-ghost p-0.5">
                <Icon icon="mdi-light:heart" width="14" height="14" />
              </button>
              <button v-else @click="toggleMainPhoto(index)" class="btn btn-xs btn-ghost p-0.5">
                <Icon icon="mdi-light:heart-off" width="14" height="14" />
              </button>
              <button @click="deletePhoto(index)" class="btn btn-xs btn-ghost p-0.5">
                <Icon icon="mdi-light:delete" width="14" height="14" />
              </button>
            </div>
          </div>
        </div>
      </fieldset>

      <div class="bg-base-200/50 rounded-lg px-4 py-3 flex items-center justify-between mb-4 gray-back">
        <div>
          <p class="text-sm font-medium">{{ t('animal.addPost') }}</p>
        </div>
        <input type="checkbox" :checked="card != null" class="checkbox checkbox-sm" @click="toggleCardStatus" />
      </div>

      <div v-if="card != null" class="mb-3" >
        <AnimalPostForm @add-animal-post="addCardInfo" :initialStatus="card.status" />
        <span class="text-error text-xs mt-1" v-if="cardError">{{ cardError }}</span>
      </div>

      <div class="flex gap-2 justify-end pt-4 border-t border-base-200">
        <button class="btn btn-sm btn-ghost" @click="closeModal">{{ t('inputsAndErrors.cancel') }}</button>
        <button class="btn btn-sm btn-neutral" @click="onSubmit">{{ t('inputsAndErrors.save') }}</button>
      </div>

    </div>
  </dialog>
  </template>
  
</template>