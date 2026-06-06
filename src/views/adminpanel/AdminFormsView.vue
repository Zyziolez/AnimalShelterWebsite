<script setup lang="ts">
import { ref } from 'vue'
import AdoptionFormCard from '@/components/adminpanel/AdoptionFormCard.vue'
import type { AdoptionForm } from '@/assets/AdoptionForm'

//Dane testowe
const adoptionForms = ref<AdoptionForm[]>([
  {
    id: 1,
    date: '2026-01-12',
    firstName: 'Anna',
    lastName: 'Kowalska',
    mail: 'anna.kowalska@example.com',
    phoneNumber: '123 456 789',
    content:
      'Chciałabym adoptować Burka, ponieważ mam doświadczenie w opiece nad psami. Mieszkam w spokojnej okolicy i mam dużo czasu na spacery.',
    animalId: 1,
    animalName: 'Burek',
    animalSpecies: 'Pies'
  },
  {
    id: 2,
    date: '2026-01-15',
    firstName: 'Michał',
    lastName: 'Nowak',
    mail: 'michal.nowak@example.com',
    phoneNumber: '987 654 321',
    content:
      'Interesuje mnie adopcja Luny. Mam dom z ogrodem, a wcześniej miałem już kota. Chciałbym zapewnić jej bezpieczny dom.',
    animalId: 2,
    animalName: 'Luna',
    animalSpecies: 'Kot'
  }
])
</script>

<template>
  <div class="mt-4 w-4/5 mx-auto pb-10">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Formularze adopcyjne</h1>

      <p class="mt-2 opacity-70">
        Lista formularzy przesłanych przez osoby zainteresowane adopcją zwierząt.
      </p>
    </div>

    <div class="grid gap-4">
      <AdoptionFormCard
        v-for="form in adoptionForms"
        :key="form.id"
        :form="form"
      />
    </div>
  </div>
</template>