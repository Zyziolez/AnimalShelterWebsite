<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="blue-back text-white mt-auto">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        <div class="flex items-center gap-3">
          <Icon icon="mdi:paw" class="text-white text-xl" />
        </div>

        <nav class="flex gap-4 sm:gap-6">
          <a href="#" class="hover:text-blue-400 transition-colors duration-200" aria-label="Twitter">
            <Icon icon="mdi:twitter" class="text-xl sm:text-2xl" />
          </a>
          <a href="#" class="hover:text-blue-400 transition-colors duration-200" aria-label="YouTube">
            <Icon icon="mdi:youtube" class="text-xl sm:text-2xl" />
          </a>
          <a href="#" class="hover:text-blue-400 transition-colors duration-200" aria-label="Facebook">
            <Icon icon="mdi:facebook" class="text-xl sm:text-2xl" />
          </a>
        </nav>
      </div>

      <div class="text-center mt-4 pt-4 border-t border-gray-700">
        <p class="text-xs sm:text-sm opacity-75">
          © {{ currentYear }} {{ t('footer.copyright') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.container {
  max-width: 100%;
}
@media (min-width: 640px) { .container { max-width: 640px; } }
@media (min-width: 768px) { .container { max-width: 768px; } }
@media (min-width: 1024px) { .container { max-width: 1024px; } }
@media (min-width: 1280px) { .container { max-width: 1280px; } }
</style>
