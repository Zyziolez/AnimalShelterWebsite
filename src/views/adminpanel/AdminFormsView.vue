<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AdoptionFormCard from '@/components/adminpanel/AdoptionFormCard.vue'
import { useAdoptionForms } from '@/composables/useAdoptionForms'

const { t } = useI18n()

const {
  adoptionForms,
  loading,
  errorMessage,
  fetchAdoptionForms
} = useAdoptionForms()

onMounted(async () => {
  await fetchAdoptionForms()
})
</script>

<template>
  <main class="page-user white-back min-h-screen">
    <section class="w-4/5 mx-auto py-8">
      <div class="blue-back rounded-box p-6 mb-6">
        <h1 class="text-3xl font-bold">
          {{ t('adminForms.title') }}
        </h1>

        <p class="mt-2 opacity-70">
          {{ t('adminForms.description') }}
        </p>
      </div>

      <div v-if="loading" class="white-back rounded-box p-5 border border-base-300">
        {{ t('adminForms.loading') }}
      </div>

      <div v-else-if="errorMessage" class="alert alert-error">
        {{ errorMessage }}
      </div>

      <div
        v-else-if="adoptionForms.length === 0"
        class="white-back rounded-box p-5 border border-base-300"
      >
        {{ t('adminForms.empty') }}
      </div>

      <TransitionGroup
        v-else
        name="forms-list"
        tag="div"
        class="grid gap-4"
      >
        <AdoptionFormCard
          v-for="form in adoptionForms"
          :key="form.id"
          :form="form"
        />
      </TransitionGroup>
    </section>
  </main>
</template>

<style scoped>
.forms-list-enter-active,
.forms-list-leave-active {
  transition: all 0.25s ease;
}

.forms-list-enter-from,
.forms-list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>