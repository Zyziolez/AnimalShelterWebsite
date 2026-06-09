<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { AdoptionForm } from '@/types/AdoptionForm'

defineProps<{
  form: AdoptionForm
}>()

const { t } = useI18n()
</script>

<template>
  <div class="mt-4 rounded-box blue-back p-4 border border-base-300">
    <div class="grid gap-4 md:grid-cols-2">
      <div>
        <p class="font-bold">{{ t('adminForms.firstName') }}</p>
        <p>{{ form.firstName }}</p>
      </div>

      <div>
        <p class="font-bold">{{ t('adminForms.lastName') }}</p>
        <p>{{ form.lastName }}</p>
      </div>

      <div>
        <p class="font-bold">{{ t('adminForms.email') }}</p>
        <p>{{ form.mail }}</p>
      </div>

      <div>
        <p class="font-bold">{{ t('adminForms.phoneNumber') }}</p>
        <p>{{ form.phoneNumber }}</p>
      </div>

      <div>
        <p class="font-bold">{{ t('adminForms.sentDate') }}</p>
        <p>{{ form.date }}</p>
      </div>

      <div>
        <p class="font-bold">{{ t('adminForms.animalId') }}</p>
        <p>{{ form.animalId }}</p>
      </div>
    </div>

    <div class="mt-4">
      <p class="font-bold">{{ t('adminForms.content') }}</p>
      <p class="whitespace-pre-line">
        {{ form.content }}
      </p>
    </div>
  </div>
</template>