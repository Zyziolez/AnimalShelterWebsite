import { ref } from 'vue'
import type { AdoptionForm, AdoptionFormsResponse } from '@/types/AdoptionForm'

const adoptionForms = ref<AdoptionForm[]>([])
const loading = ref(false)
const errorMessage = ref<string | null>(null)
import { API_URL }  from '@/config/api'
// const apiUrl = import.meta.env.API_URL

export function useAdoptionForms() {
  const fetchAdoptionForms = async () => {
    loading.value = true
    errorMessage.value = null

    try {
      const response = await fetch(`${API_URL}/api/Forms`)

      if (!response.ok) {
        throw new Error('Nie udało się pobrać formularzy adopcyjnych.')
      }

      const result = (await response.json()) as AdoptionFormsResponse

      adoptionForms.value = result.data
    } catch (error) {
      if (error instanceof Error) {
        errorMessage.value = error.message
      } else {
        errorMessage.value = 'Wystąpił nieznany błąd.'
      }
    } finally {
      loading.value = false
    }
  }

  return {
    adoptionForms,
    loading,
    errorMessage,
    fetchAdoptionForms
  }
}