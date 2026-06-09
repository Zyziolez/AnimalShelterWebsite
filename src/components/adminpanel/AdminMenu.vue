
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

function logout(){
    localStorage.removeItem('token')
    window.location.href = '/login'
}

</script>
<template>
        <div class="h-20" >
        <div class="drawer blue-back">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col blue-back">
    <div class="navbar bg-base-300 w-full blue-back">
      <div class="flex-none lg:hidden">
        <label htmlFor="my-drawer-2" aria-label="open sidebar" class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div class="mx-2 flex-1 px-2"></div>
      <div class="hidden flex-none lg:block">
        <ul class="menu menu-horizontal">
          <li><RouterLink to="/admin" ><button class="btn btn-ghost" >{{t('menu.dashboard')}}</button></RouterLink></li>
          <li><RouterLink to="/admin/forms"><button class="btn btn-ghost">{{t('menu.forms')}}</button></RouterLink></li>
        <li><button class="btn btn-ghost" @click="logout">{{t('menu.logOut')}}</button></li>
           <li><button class="btn btn-ghost" @click="locale = 'en'">EN</button></li>
            <li><button class="btn btn-ghost" @click="locale = 'pl'">PL</button></li>
        </ul>
      </div>
    </div>

  </div>

  <!--  widok mobilny  -->
  <div class="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu menu-horizontal">
          <li><button class="btn btn-ghost">{{t('menu.dashboard')}}</button></li>
          <li><button class="btn btn-ghost">{{t('menu.forms')}}</button></li>
          <li><button class="btn btn-ghost" @click="logout">{{t('menu.logOut')}}</button></li>
          
            <li><button class="btn btn-ghost" @click="locale = 'en'">EN</button></li>
            <li><button class="btn btn-ghost" @click="locale = 'pl'">PL</button></li>
        </ul>
  </div>
</div>
    </div>
</template>
