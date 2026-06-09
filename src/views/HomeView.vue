<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAnimals } from '@/composables/useAnimals'
import { useI18n } from 'vue-i18n'
import type { AnimalCard } from '@/types/index'

const router = useRouter()
const { animals, fetchCards } = useAnimals()
const { t } = useI18n()

const filteredAnimals = ref<AnimalCard[]>([])

const selectedSpecies = ref('')
const selectedSex = ref('')
const searchText = ref('')

const formatBase64 = (base64String?: string | null) => {
  if (!base64String) return ''
  if (!base64String.startsWith('data:image')) {
    return `data:image/png;base64,${base64String}`
  }
  return base64String
}

const searchAnimal = () => {
  let rawList: AnimalCard[] = []

  if (animals.value) {
    if (Array.isArray(animals.value)) {
      rawList = animals.value
    } else if (typeof animals.value === 'object' && 'data' in animals.value && Array.isArray((animals.value as any).data)) {
      rawList = (animals.value as any).data
    }
  }

  if (!Array.isArray(rawList) || rawList.length === 0) {
    filteredAnimals.value = []
    return
  }

  filteredAnimals.value = rawList.filter((card) => {
    if (!card || !card.animal) return false

    // Bezpieczne sprawdzanie gatunku i płci z uodpornieniem na wielkość liter z bazy
    const matchesSpecies = !selectedSpecies.value ||
      (card.animal.species && card.animal.species.toLowerCase() === selectedSpecies.value.toLowerCase())

    const matchesSex = !selectedSex.value ||
      (card.animal.sex && card.animal.sex.toLowerCase() === selectedSex.value.toLowerCase())

    const words = searchText.value.toLowerCase().split(' ').filter(Boolean)
    const searchContent = `${card.animal.name || ''} ${card.animal.species || ''} ${card.animal.description || ''}`.toLowerCase()
    const matchesText = words.every((word) => searchContent.includes(word))

    return matchesSpecies && matchesSex && matchesText
  })
}

const resetFilters = () => {
  selectedSpecies.value = ''
  selectedSex.value = ''
  searchText.value = ''
  searchAnimal()
}

onMounted(async () => {
  await fetchCards()
  searchAnimal()
})

const goToDetails = (id?: number) => {
  if (id !== undefined) {
    router.push(`/animal/${id}`)
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-6">

    <div class="bg-base-100 rounded-2xl border border-base-300 shadow-xl p-6 md:p-8 mb-10">
      <h2 class="text-3xl font-extrabold text-center tracking-tight text-base-content mb-8">
        {{ t('home.title') }}
      </h2>

      <div class="space-y-6">
        <div>
          <span class="text-sm font-bold uppercase tracking-wider text-base-content/70 block text-center mb-3">
            {{ t('home.subtitle') }}
          </span>
          <div class="grid grid-cols-3 gap-3 max-w-xl mx-auto">
            <button
              @click="selectedSpecies = 'Pies'"
              :class="['btn btn-md rounded-xl font-bold transition-all border', selectedSpecies === 'Pies' ? 'bg-neutral-300 text-neutral-800 border-neutral-400' : 'btn-outline border-base-300 bg-base-100']"
            >
              {{ t('animal.dog') }}
            </button>
            <button
              @click="selectedSpecies = 'Kot'"
              :class="['btn btn-md rounded-xl font-bold transition-all border', selectedSpecies === 'Kot' ? 'bg-neutral-300 text-neutral-800 border-neutral-400' : 'btn-outline border-base-300 bg-base-100']"
            >
              {{ t('animal.cat') }}
            </button>
            <button
              @click="resetFilters"
              :class="['btn btn-md rounded-xl font-bold transition-all border', selectedSpecies === '' && selectedSex === '' && searchText === '' ? 'bg-neutral-300 text-neutral-800 border-neutral-400' : 'btn-outline border-base-300 bg-base-100']"
            >
              {{ t('home.anySpecies') }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-base-200 items-end">

          <div class="flex flex-col justify-center">
            <span class="text-sm font-bold uppercase tracking-wider text-base-content/70 mb-3">
              {{ t('animal.sex') }}:
            </span>
            <div class="grid grid-cols-3 gap-2 bg-base-200 p-1.5 rounded-xl border border-base-300">
              <button
                @click="selectedSex = 'M'"
                :class="['btn btn-sm rounded-lg border-none font-semibold transition-all', selectedSex === 'M' ? 'bg-neutral-300 text-neutral-800 shadow' : 'bg-transparent text-base-content/80 hover:bg-base-300']"
              >
                {{ t('animal.male') }}
              </button>
              <button
                @click="selectedSex = 'F'"
                :class="['btn btn-sm rounded-lg border-none font-semibold transition-all', selectedSex === 'F' ? 'bg-neutral-300 text-neutral-800 shadow' : 'bg-transparent text-base-content/80 hover:bg-base-300']"
              >
                {{ t('animal.female') }}
              </button>
              <button
                @click="selectedSex = ''"
                :class="['btn btn-sm rounded-lg border-none font-semibold transition-all', selectedSex === '' ? 'bg-neutral-300 text-neutral-800 shadow' : 'bg-transparent text-base-content/80 hover:bg-base-300']"
              >
                {{ t('home.anyGender') }}
              </button>
            </div>
          </div>

          <div class="form-control w-full">
            <span class="text-sm font-bold uppercase tracking-wider text-base-content/70 mb-3">
              {{ t('home.keywordLabel') }}
            </span>
            <div class="join w-full shadow-sm">
              <input
                type="text"
                v-model="searchText"
                class="input input-bordered join-item w-full border-base-300 focus:outline-none bg-base-100"
                :placeholder="t('home.placeholder')"
                @keyup.enter="searchAnimal"
              />
              <button class="btn join-item px-8 font-bold border border-base-300 bg-base-200 hover:bg-base-300" @click="searchAnimal">
                {{ t('mainPanel.search') }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <TransitionGroup
      v-if="filteredAnimals.length > 0"
      name="fade-cards"
      tag="div"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <div
        v-for="card in filteredAnimals"
        :key="card.id"
        class="card bg-base-100 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-base-200 rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full transform"
        @click="goToDetails(card.animal?.animalId)"
      >
        <figure class="relative h-60 w-full bg-base-200">
          <img
            :src="formatBase64(card.animal?.photos?.[0]?.base64Data || card.animal?.photo?.[0]?.base64Data || card.animal?.photos?.[0]?.imageData || card.animal?.photo?.[0]?.imageData)"
            alt="animal"
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div class="absolute top-3 right-3 badge font-bold px-3 py-2.5 shadow text-xs">
            {{ card.status }}
          </div>
        </figure>

        <div class="card-body p-5 flex flex-col flex-grow bg-base-100 text-base-content">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-2xl font-black tracking-tight text-base-content">
              {{ card.animal?.name || 'Zwierzak' }}
            </h3>
            <span class="badge badge-neutral badge-md gap-1 font-semibold">
              {{ card.animal?.species === 'Pies' ? t('animal.dog') : t('animal.cat') }} •
              {{ card.animal?.sex === 'M' ? t('animal.male') : t('animal.female') }}
            </span>
          </div>

          <p class="text-base-content/70 text-sm line-clamp-3 leading-relaxed flex-grow mt-1">
            {{ card.animal?.description || '...' }}
          </p>

          <div class="mt-4 pt-3 border-t border-base-200 flex justify-between items-center text-xs font-semibold text-base-content/50">
            <span>{{ t('animal.age') }}: {{ card.animal?.age }} lat/a</span>
            <span class="text-primary font-bold inline-flex items-center gap-0.5 text-sm">
              Zobacz profil ➔
            </span>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <div v-else class="text-center py-16 bg-base-100 rounded-2xl border border-dashed border-base-300 max-w-2xl mx-auto my-6 shadow-sm p-6">
      <p class="text-lg font-medium text-base-content/60 mb-4">{{ t('inputsAndErrors.errChooseSpecies') }}</p>
      <button class="btn btn-outline font-bold px-6" @click="resetFilters">
        {{ t('home.anySpecies') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.fade-cards-enter-active {
  transition: all 0.5s ease-out;
}
.fade-cards-leave-active {
  transition: all 0.3s ease-in;
  position: absolute;
}
.fade-cards-enter-from,
.fade-cards-leave-to {
  opacity: 0;
  transform: translateY(15px) scale(0.95);
}
.fade-cards-move {
  transition: transform 0.4s ease;
}
</style>
