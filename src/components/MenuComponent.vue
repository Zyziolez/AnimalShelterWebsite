<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
const { locale } = useI18n()

</script>
<template>
    <div class="w-full menu px-10 py-5 flex flex-row align-items-center h-20" >
         <RouterLink to="/" class="btn btn-ghost"><img src="@/assets/images/logo-schronisko-xs.png" class="h-10" /></RouterLink>
        <RouterLink to="/" class="btn btn-ghost">STRONA GŁÓWNA</RouterLink>
        <RouterLink to="/kontakt" class="btn btn-ghost">KONTAKT</RouterLink>
        <button class="btn btn-ghost" @click="locale = 'en'">EN</button>
        <button class="btn btn-ghost" @click="locale = 'pl'">PL</button>
    </div>
</template>