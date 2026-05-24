<script setup lang="ts">
import type { AdoptionForm } from '@/assets/AdoptionForm'

defineProps<{
  form: AdoptionForm
}>()
</script>

<template>
  <div class="mt-4 rounded-box bg-base-200 p-4">
    <div class="grid gap-4 md:grid-cols-2">
      <div>
        <p class="font-bold">Email</p>
        <p>{{ form.mail }}</p>
      </div>

      <div>
        <p class="font-bold">Numer telefonu</p>
        <p>{{ form.phoneNumber }}</p>
      </div>

      <div>
        <p class="font-bold">Data wysłania</p>
        <p>{{ form.date }}</p>
      </div>

      <div>
        <p class="font-bold">ID zwierzęcia</p>
        <p>{{ form.animalId }}</p>
      </div>

      <div>
        <p class="font-bold">Zwierzę</p>
        <p>{{ form.animalName }}</p>
      </div>

      <div>
        <p class="font-bold">Gatunek</p>
        <p>{{ form.animalSpecies }}</p>
      </div>
    </div>

    <div class="mt-4">
      <p class="font-bold">Treść formularza</p>
      <p class="whitespace-pre-line">{{ form.content }}</p>
    </div>
  </div>
</template>