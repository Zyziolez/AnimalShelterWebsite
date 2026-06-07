
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useEmployee } from '@/composables/useEmployee'
const { login } = useEmployee()
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
        <legend class="fieldset-legend">Login</legend>

        <label class="label">Email</label>
        <input type="email" class="input" placeholder="Email" v-model="loginForm.email" />

        <label class="label">Password</label>
        <input type="password" class="input" placeholder="Password" v-model="loginForm.password" />

        
            <button class="btn btn-neutral mt-4" @click="loginClick">Login</button>
        

        </fieldset>
    </div>
</template>
