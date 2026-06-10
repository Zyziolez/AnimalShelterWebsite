
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useEmployee } from '@/composables/useEmployee'
const { login } = useEmployee()
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
onMounted(() => {
    const token = localStorage.getItem('token')
    if(token){
        window.location.href = '/admin'
    }
})

const loginForm = ref({
    email: '',
    password: ''
})

async function loginClick(){
    console.log(loginForm.value)
   await login({
        email: loginForm.value.email,
        password: loginForm.value.password
    })
    
    if(localStorage.getItem('token')){
        window.location.href = '/admin'
    }
}
</script>
<template>
    <div class="flex justify-center h-screen items-center white-back" >
        <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 white-back"  >
        <legend class="fieldset-legend">{{ t('login.login') }}</legend>

        <label class="label">{{ t('login.email') }}</label>
        <input type="email" class="input" :placeholder="t('login.email')" v-model="loginForm.email" />

        <label class="label">{{ t('login.pass') }}</label>
        <input type="password" class="input" :placeholder="t('login.pass')" v-model="loginForm.password" />

        
            <button class="btn btn-neutral mt-4" @click="loginClick">{{ t('login.login') }}</button>
        

        </fieldset>
    </div>
</template>
