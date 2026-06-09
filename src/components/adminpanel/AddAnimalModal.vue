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

const {postAnimal, updateAnimalWithCard} = useAnimals()
const photos = ref<{ base64Data: string; imageExtension: string; main: boolean }[]>([])
const { t} = useI18n()

const animalSchema = z.object({
  name: z.string().min(1, t('inputsAndErrors.errNameRequired')),
  species: z.enum(['Pies', 'Kot'], { message: t('inputsAndErrors.errChooseSpecies') }),
  age: z.number().min(0).max(25, t('inputsAndErrors.errAge')),
  sex: z.enum(['M', 'F'], {message: t('inputsAndErrors.errChooseSex')}),
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
}

function toggleMainPhoto(index: number) {
  photos.value = photos.value.map((photo, i) => ({
    ...photo,
    main: i === index ? !photo.main : false
  }))
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
  <dialog id="add-animal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box white-back">
      <div class="flex justify-between">
        <h3 class="font-bold text-lg">{{ t('animal.add') }}</h3>
        <button class="btn btn-sm btn-circle btn-ghost" @click="closeModal">✕</button>
      </div>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">{{ t('animal.name') }}</legend>
        <input type="text" class="input" placeholder="Reksio" v-model="name" />
        <span class="text-error text-xs" v-if="errors.name">{{ errors.name }}</span>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">{{ t('animal.species') }}</legend>
        <select class="select" v-model="species">
          <option disabled value="">{{ t('animal.species') }}</option>
          <option value="Pies">{{ t('animal.dog') }}</option>
          <option value="Kot">{{ t('animal.cat') }}</option>
        </select>
        <span class="text-error text-xs" v-if="errors.species">{{ errors.species }}</span>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">{{ t('animal.age') }}</legend>
        <input type="number" class="input validator" placeholder="Wiek (w latach)" min="0" max="25" v-model="age" />
        <span class="text-error text-xs" v-if="errors.age">{{ errors.age }}</span>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">{{ t('animal.sex') }}</legend>
        <label class="label">
          <input type="radio" name="sex" id="m" v-model="sex" value="M" class="radio" />
          {{ t('animal.male') }}
        </label>
        <label class="label mt-5">
          <input type="radio" name="sex" id="f" v-model="sex" value="F" class="radio" />
          {{ t('animal.female') }}
        </label>
        <span class="text-error text-xs" v-if="errors.sex">{{ errors.sex }}</span>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">{{ t('animal.description') }}</legend>
        <textarea class="textarea" placeholder="Opis zwierzaka..." v-model="description"></textarea>
      </fieldset>

      <fieldset class="fieldset" v-if="props.animal.animalId == 0">
        <legend class="fieldset-legend">{{ t('animal.image') }}</legend>
        <input type="file" class="file-input" multiple @change="handleFiles" />
        <div class="flex gap-2">
          <div v-for="(photo, index) in photos" :key="index">
            <img :src="photo.base64Data" class="w-20 h-20 rounded-sm" :class="photo.main ? 'border-2' : null" />
            <div class="flex gap-1 justify-center">
              <button v-if="!photo.main" @click="toggleMainPhoto(index)">
                <Icon icon="mdi-light:heart" width="20" height="20" class="hover:opacity-50" />
              </button>
              <button v-else @click="toggleMainPhoto(index)">
                <Icon icon="mdi-light:heart-off" width="20" height="20" class="hover:opacity-50" />
              </button>
              <button @click="deletePhoto(index)">
                <Icon icon="mdi-light:delete" width="20" height="20" class="hover:opacity-50" />
              </button>
            </div>
          </div>
        </div>
      </fieldset>

      <label class="label mt-5">
        <input type="checkbox" :checked="card != null" class="checkbox" @click="toggleCardStatus" />
        {{ t('animal.addPost') }}
      </label>
      <AnimalPostForm v-if="card != null" @add-animal-post="addCardInfo" :initialStatus="card.status" />
      <span class="text-error text-xs" v-if="cardError">{{ cardError }}</span>

      <div class="modal-action">
        <form method="dialog">
          <button class="btn">{{ t('inputsAndErrors.cancel') }}</button>
        </form>
        <button class="btn" @click="onSubmit">{{ t('inputsAndErrors.save') }}</button>
      </div>
    </div>
  </dialog>
</template>