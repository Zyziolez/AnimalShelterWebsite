import { ref } from 'vue'
import { API_URL } from '@/config/api'

export function useForms() {
  const formLoading = ref(false)
  const formErrorMessage = ref<string | null>(null)

  // wysyłanie formularza kontaktowego
  const sendContactForm = async (formData: {
    id: number
    date: string
    firstName: string
    lastName: string
    mail: string
    phoneNumber: string
    content: string
    animalId: number
  }) => {
    formLoading.value = true
    formErrorMessage.value = null
    
    try {
      const response = await fetch(`${API_URL}/api/Forms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        let serverError = 'Serwer odrzucił formularz'
        try {
          const result = await response.json()
          serverError = result.message || serverError
        } catch {
          serverError = `Błąd serwera: ${response.status}`
        }
        throw new Error(serverError)
      }

      return await response.json()
    } catch (err) {
      if (err instanceof Error) {
        formErrorMessage.value = err.message
      } else {
        formErrorMessage.value = 'Wystąpił błąd podczas wysyłania formularza'
      }
      throw err 
    } finally {
      formLoading.value = false
    }
  }

  return {
    formLoading,
    formErrorMessage,
    sendContactForm
  }
}
