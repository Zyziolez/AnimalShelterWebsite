<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div class="w-full min-h-[70vh] flex flex-col items-center justify-center px-4 py-12 md:py-20 text-neutral">

    <div class="text-center mb-10 md:mb-14 max-w-2xl w-full">
      <h1 class="text-4xl md:text-5xl font-black tracking-tight mb-4 text-gray-900">
        {{ t('contact.title') }}
      </h1>
    </div>

    <div class="w-full max-w-3xl bg-white rounded-[32px] border border-gray-100 shadow-2xl p-8 md:p-14">

      <div class="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">

        <div class="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            src="@/assets/images/cat-gif.gif"
            alt="Kotek"
            class="w-full max-w-[240px] md:max-w-[270px] h-auto object-contain"
          />
        </div>

        <div class="w-full md:w-1/2 flex flex-col items-start text-left space-y-5">

          <div>
            <h2 class="text-2xl font-black tracking-tight text-gray-900 mb-1.5">
              {{ t('contact.foundationName') }}
            </h2>
            <div class="text-base md:text-lg text-gray-600 space-y-0.5 font-medium">
              <p>ul. Szczęsna 26</p>
              <p>02-454 Warszawa</p>
            </div>
          </div>

          <div class="text-base md:text-lg pt-1">
            <span class="font-bold text-gray-500">Email: </span>
            <a href="mailto:info@puszatek.pl" class="text-emerald-600 hover:text-emerald-700 underline font-extrabold transition-colors">
              info@puszatek.pl
            </a>
          </div>

          <div class="w-full pt-4 border-t border-gray-100 flex flex-col items-start space-y-2">
            <span class="text-xs font-black uppercase tracking-wider text-gray-400">
              {{ t('contact.accountLabel') }}
            </span>
            <div class="w-full bg-gray-50 rounded-xl border border-gray-200/60 p-3.5 flex items-center">
              <p class="text-sm sm:text-base font-mono font-bold tracking-tight text-gray-800 select-all">
                PL 79 1140 2004 0000 3102 8079 8178
              </p>
            </div>
          </div>

        </div> </div>
    </div>

  </div>
</template>

<style scoped>
/* Całkowite wyczyszczenie scoped CSS - Tailwind robi tutaj całą robotę */
.font-mono {
  font-family: monospace;
}
</style>
