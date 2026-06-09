
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

function logout(){
    localStorage.removeItem('token')
    window.location.href = '/login'
}

const closeDrawer = () => {
  const drawerCheckbox = document.getElementById('my-drawer-2') as HTMLInputElement;
  if (drawerCheckbox) {
    drawerCheckbox.checked = false;
  }
}

</script>
<template>
  <div class="navbar-container">
    <div class="drawer">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      
      <div class="drawer-content flex flex-col">
        <div class="navbar w-full shadow-md blue-back">
          <div class="flex-none lg:hidden">
            <label for="my-drawer-2" aria-label="open sidebar" class="btn btn-square btn-ghost">
             <Icon icon="mdi-light:menu" />
            </label>
          </div>
          
          <div class="mx-2 flex-1 px-2"></div>
          
          <div class="hidden lg:flex lg:items-center lg:gap-1">
            <RouterLink to="/admin">
              <button class="btn btn-ghost btn-sm md:btn-md">{{t('menu.dashboard')}}</button>
            </RouterLink>
            <RouterLink to="/admin/forms">
              <button class="btn btn-ghost btn-sm md:btn-md">{{t('menu.forms')}}</button>
            </RouterLink>
            <button class="btn btn-ghost btn-sm md:btn-md" @click="logout">{{t('menu.logOut')}}</button>
            <button class="btn btn-ghost btn-sm md:btn-md" @click="locale = 'en'">EN</button>
            <button class="btn btn-ghost btn-sm md:btn-md" @click="locale = 'pl'">PL</button>
          </div>
        </div>
      </div>

      <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu p-4 w-64 sm:w-72 min-h-full bg-base-200 gap-2">
          <li class="w-full">
            <RouterLink to="/admin" class="justify-center" @click="closeDrawer">
              <button class="btn btn-ghost w-full">{{t('menu.dashboard')}}</button>
            </RouterLink>
          </li>
          <li class="w-full">
            <RouterLink to="/admin/forms" class="justify-center" @click="closeDrawer">
              <button class="btn btn-ghost w-full">{{t('menu.forms')}}</button>
            </RouterLink>
          </li>
          <li class="w-full">
            <button class="btn btn-ghost w-full" @click="logout">{{t('menu.logOut')}}</button>
          </li>
          <li class="divider my-2"></li>
          <li class="w-full">
            <button class="btn btn-ghost w-full" @click="locale = 'en'">EN</button>
          </li>
          <li class="w-full">
            <button class="btn btn-ghost w-full" @click="locale = 'pl'">PL</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar-container {
  position: sticky;
  top: 0;
  z-index: 50;
}

.drawer {
  position: relative;
}

.drawer-side ul {
  padding-top: 2rem;
}

.drawer-side li {
  transition: transform 0.2s ease;
}

.drawer-side li:hover {
  transform: translateX(4px);
}

@media (max-width: 640px) {
  .drawer-side ul {
    width: 80vw;
    max-width: 280px;
  }
}

</style>
