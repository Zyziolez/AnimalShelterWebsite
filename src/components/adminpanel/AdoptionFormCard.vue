<script setup lang="ts">
import { ref } from 'vue'
import type { AdoptionForm } from '@/assets/AdoptionForm'
import AdoptionFormDetails from './AdoptionFormDetails.vue'

defineProps<{
  form: AdoptionForm
}>()

const isExpanded = ref(false)

const toggleDetails = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="card bg-base-100 shadow-md border border-base-300">
    <div class="card-body">
      <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 class="card-title">
            {{ form.firstName }} {{ form.lastName }}
          </h2>

          <p class="text-sm opacity-70">
            Zwierzę: {{ form.animalName }} — {{ form.animalSpecies }}
          </p>
        </div>

        <div class="badge badge-primary">
          {{ form.date }}
        </div>
      </div>

      <div class="mt-4 grid gap-2 text-sm">
        <p><strong>Email:</strong> {{ form.mail }}</p>
        <p><strong>Telefon:</strong> {{ form.phoneNumber }}</p>
      </div>

      <div class="card-actions justify-end mt-4">
        <button class="btn btn-outline btn-sm" @click="toggleDetails">
          {{ isExpanded ? 'Zwiń' : 'Rozwiń' }}
        </button>
      </div>

      <AdoptionFormDetails
        v-if="isExpanded"
        :form="form"
      />
    </div>
  </div>
</template>