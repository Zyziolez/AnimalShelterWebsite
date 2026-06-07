import { ref } from 'vue'


export function useEmployee() {
    const loading = ref(false)
    const loginResponse = ref<string | null>(null)



const login = async (userData: { email: string; password: string }) => {
    loading.value = true
    try {
      const response = await fetch('https://localhost:5001/api/Users/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: userData.email,
          password: userData.password
        })
      })

      if (!response.ok) {
        throw new Error('Wystąpił błąd')
      }

      const data = await response.json()
      localStorage.setItem('token', data.token)
      loginResponse.value = data.token

    } catch (err) {
      if (err instanceof Error)
        throw new Error(err.message)
    } finally {
      loading.value = false
    }
  }
   return {
    loading,
    loginResponse,
    login
  }
}