<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { Icon } from '@iconify/vue'
import { useAnimals } from '@/composables/useAnimals.ts' 
import { useForms } from '@/composables/useForms.ts'
import { useI18n } from 'vue-i18n'

// domyślne obrazki
import dogImage from './../assets/images/dog.png'
import catImage from './../assets/images/cat.png'
import vCapitalize from '@/directives/capitalize'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const { singleAnimal, loading, fetchAnimalById } = useAnimals()
const { sendContactForm } = useForms()

// pobranie ID zwierzaka z adresu URL 
const animalId = route.params.animalId as string

const isModalOpen = ref(false)
const formSuccessStatus = ref('')

// pobranie szczegółów zwierzaka
onMounted(async () => {
  if (animalId) {
    await fetchAnimalById(animalId)
  }
})

// sprawdza czy ma zdjecie (base64) a jak nie to podstawia
const imageSrc = computed(() => {
  if (singleAnimal.value?.photos?.[0]?.imageData) {
    return `data:image/${singleAnimal.value.photos[0].imageExtension};base64,${singleAnimal.value.photos[0].imageData}`
  }
  return singleAnimal.value?.species === 'Pies' ? dogImage : catImage
})

// formatowanie płci i wieku na czytelny tekst
const formattedSex = computed(() => {
  if (!singleAnimal.value) return ''
  return singleAnimal.value.sex === 'M' ? t('animal.male') : t('animal.female')
})

const formattedAge = computed(() => {
  if (!singleAnimal.value) return ''
  const age = singleAnimal.value.age
  return t('animal.age_format', age, { count: age })
})

// walidacja VEE-VALIDATE + ZOD
const validationSchema = toTypedSchema(
  z.object({
    firstName: z.string().min(1, t('inputsAndErrors.required')),
    lastName: z.string().min(1, t('inputsAndErrors.required')),
    mail: z.string().email(t('inputsAndErrors.email')),
    phoneNumber: z.string().regex(/^\+?[0-9]{9,15}$/, t('inputsAndErrors.phone')),
    content: z.string().min(1, t('inputsAndErrors.messageRequired'))
  })
)

const { handleSubmit, resetForm } = useForm({ validationSchema })

const { value: firstName, errorMessage: firstNameError } = useField<string>('firstName')
const { value: lastName, errorMessage: lastNameError } = useField<string>('lastName')
const { value: mail, errorMessage: mailError } = useField<string>('mail')
const { value: phoneNumber, errorMessage: phoneNumberError } = useField<string>('phoneNumber')
const { value: content, errorMessage: contentError } = useField<string>('content')

// wysyłanie formularza (POST)
const submitForm = handleSubmit(async (values) => {
  try {
    const payload = {
      id: 0, 
      date: "", 
      firstName: values.firstName,     
      lastName: values.lastName,       
      mail: values.mail,               
      phoneNumber: values.phoneNumber, 
      content: values.content,         
      animalId: Number(animalId) 
    }

    const result = await sendContactForm(payload)

    if (result && result.code === 200) {
      formSuccessStatus.value = t('contactForm.success')
      resetForm() 
      isModalOpen.value = false 
    } else {
      throw new Error(result?.message || t('contactForm.serverError'))
    }

  } catch (err: any) {
    console.error(t('contactForm.sendError'), err)
    alert(`${t('contactForm.alertError')}${err.message}`)
  }
})
</script>

<template>
  <div class="white-back page-user p-8">
    <div class="page-content">
      
      <div v-if="loading" class="flex justify-center items-center py-12">
        <span class="loading loading-spinner loading-lg"></span>
        <span class="ml-3 font-semibold">{{ t('animal.loading') }}</span>
      </div>

      <div v-else-if="singleAnimal">
        
        <div 
          class="p-6 rounded-box flex flex-col md:flex-row gap-8 mb-8 border border-base-300"
          :class="singleAnimal.sex == 'M' ? 'blue-male-back' : 'pink-female-back'"
        >
          <img :src="imageSrc" alt="Profil zwierzaka" class="w-64 h-64 object-cover rounded-box shadow-md" />

          <div class="flex-1 flex flex-col justify-between">
            <div>
              <h2 class="text-3xl font-bold flex items-center gap-2 mb-4">
                {{ singleAnimal.name }}
                <Icon v-if="singleAnimal.sex == 'M'" icon="mdi:gender-male" class="text-blue-500" />
                <Icon v-else icon="mdi:gender-female" class="text-pink-500" />
              </h2>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
                <div><strong>ID:</strong> {{ singleAnimal.animalId }}</div>
                <div><strong>{{ t('animal.species') }}:</strong> {{ singleAnimal.species }}</div>
                <div><strong>{{ t('animal.age') }}:</strong> {{ formattedAge }}</div>
                <div><strong>{{ t('animal.sex') }}:</strong> {{ formattedSex }}</div>
                <div v-if="singleAnimal.card" class="sm:col-span-2">
                  <span class="badge badge-neutral p-3">Status karty: {{ singleAnimal.card.status }}</span>
                </div>
              </div>

              <div class="divider my-2"></div>
              <p class="text-base font-medium leading-relaxed mt-2">
                <span class="font-bold block mb-1">{{ t('animal.description') }}:</span>
                {{ singleAnimal.description }}
              </p>
            </div>

            <div class="mt-6">
              <button @click="isModalOpen = true" class="btn btn-accent bg-[#22c55e] text-white font-bold px-6 border-none">
                <Icon icon="mdi-light:note-plus" class="text-white text-lg mr-1" /> 
                {{ t('contactForm.contactButton') }}
              </button>
            </div>
          </div>
        </div>

        <div v-if="singleAnimal.photos && singleAnimal.photos.length > 0" class="mt-8">
          <h3 class="text-xl font-bold mb-4">{{ t('animal.allPhotos') }} ({{ singleAnimal.photos.length }})</h3>
          <div class="flex flex-wrap gap-4">
            <div v-for="(photo, index) in singleAnimal.photos" :key="photo.id || index" class="border border-base-300 p-2 rounded-box bg-[#FBFBFB]">
              <img 
                :src="`data:image/${photo.imageExtension};base64,${photo.imageData}`" 
                alt="Zdjęcie z galerii" 
                class="w-40 h-40 object-cover rounded-box" 
              />
              <div class="text-xs text-center mt-2 font-semibold opacity-60">
                {{ index === 0 ? '★ Zdjęcie główne' : `Zdjęcie #${index + 1}` }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="formSuccessStatus" class="alert alert-success mt-6 bg-[#22c55e] border-none text-white font-semibold shadow">
          <Icon icon="mdi:check-circle" class="text-white text-xl" />
          <span>{{ formSuccessStatus }}</span>
        </div>

        <Teleport to="body">
          <div v-if="isModalOpen" class="modal-backdrop">
            <div class="modal-content border border-black bg-[#FBFBFB]">
              
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-bold">{{ t('contactForm.contactFormTitle') }} {{ singleAnimal.name }}</h3>
                <button @click="isModalOpen = false" class="btn btn-sm btn-circle btn-ghost text-xl">&times;</button>
              </div>

              <form @submit="submitForm" class="flex flex-col gap-4">
                
                <div class="form-control">
                  <label class="label font-bold text-sm">{{ t('animal.name') }}:</label>
                  <input v-model="firstName" v-capitalize type="text" class="input input-bordered w-full" />
                  <span class="text-error text-xs mt-1 font-semibold">
                    {{ firstNameError?.includes('undefined') ? t('inputsAndErrors.required') : firstNameError }}
                  </span>
                </div>

                <div class="form-control">
                  <label class="label font-bold text-sm">{{ t('contactForm.lastName') }}:</label>
                  <input v-model="lastName" v-capitalize type="text" class="input input-bordered w-full" />
                  <span class="text-error text-xs mt-1 font-semibold">
                    {{ lastNameError?.includes('undefined') ? t('inputsAndErrors.required') : lastNameError }}
                  </span>
                </div>

                <div class="form-control">
                  <label class="label font-bold text-sm">{{ t('contactForm.email') }}:</label>
                  <input v-model="mail" type="text" class="input input-bordered w-full" />
                  <span class="text-error text-xs mt-1 font-semibold">
                    {{ mailError?.includes('undefined') ? t('inputsAndErrors.required') : (mailError ? t('inputsAndErrors.email') : '') }}
                  </span>
                </div>

                <div class="form-control">
                  <label class="label font-bold text-sm">{{ t('contactForm.phone') }}:</label>
                  <input v-model="phoneNumber" type="text" class="input input-bordered w-full" />
                  <span class="text-error text-xs mt-1 font-semibold">
                    {{ phoneNumberError?.includes('undefined') ? t('inputsAndErrors.required') : (mailError ? t('inputsAndErrors.phone') : '') }}
                  </span>
                </div>

                <div class="form-control">
                  <label class="label font-bold text-sm">{{ t('contactForm.message') }}:</label>
                  <textarea v-model="content" rows="4" class="textarea textarea-bordered w-full"></textarea>
                  <span class="text-error text-xs mt-1 font-semibold">
                    {{ contentError?.includes('undefined') ? t('inputsAndErrors.messageRequired') : contentError }}
                  </span>
                </div>

                <div class="flex gap-3 justify-end mt-4">
                  <button type="button" @click="isModalOpen = false" class="btn btn-ghost font-bold">
                    {{ t('contactForm.cancel') }}
                  </button>
                  <button type="submit" class="btn bg-[#22c55e] text-white font-bold border-none px-6">
                    {{ t('contactForm.send') }}
                  </button>
                </div>

              </form>

            </div>
          </div>
        </Teleport>

      </div>

      <div v-else class="text-center py-12 font-semibold opacity-60">
        {{ t('animal.notFound') }}
      </div>

    </div>
  </div>
</template>
