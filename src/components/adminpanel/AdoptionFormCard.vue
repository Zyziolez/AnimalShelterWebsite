<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { AdoptionForm } from '@/types/AdoptionForm'
import AdoptionFormDetails from './AdoptionFormDetails.vue'

defineProps<{
  form: AdoptionForm
}>()

const { t } = useI18n()
const isExpanded = ref(false)

const toggleDetails = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <article class="card white-back shadow-md border border-base-300">
    <div class="card-body">
      <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 class="card-title">
            {{ form.firstName }} {{ form.lastName }}
          </h2>

          <p class="text-sm opacity-70">
            {{ t('adminForms.formId') }}: {{ form.id }}
          </p>
        </div>

        <div class="badge blue-back border border-base-300">
          {{ form.date }}
        </div>
      </div>

      <div class="mt-4 grid gap-2 text-sm">
        <p>
          <strong>{{ t('adminForms.email') }}:</strong>
          {{ form.mail }}
        </p>

        <p>
          <strong>{{ t('adminForms.phone') }}:</strong>
          {{ form.phoneNumber }}
        </p>

        <p>
          <strong>{{ t('adminForms.animalId') }}:</strong>
          {{ form.animalId }}
        </p>
      </div>

      <div class="card-actions justify-end mt-4">
        <button class="btn btn-outline btn-sm" @click="toggleDetails">
          {{ isExpanded ? t('adminForms.collapse') : t('adminForms.expand') }}
        </button>
      </div>

      <Transition name="details">
        <AdoptionFormDetails
          v-if="isExpanded"
          :form="form"
        />
      </Transition>
    </div>
  </article>
</template>

<style scoped>
.details-enter-active,
.details-leave-active {
  transition: all 0.2s ease;
}

.details-enter-from,
.details-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>