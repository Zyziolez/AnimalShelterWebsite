import { ref } from 'vue'
import type { AnimalCard, Animal } from '@/assets/AnimalCard'

export function useAnimals() {
  const animals = ref<AnimalCard[]>([]) // Dla listy
  const singleAnimal = ref<Animal | null>(null) // Dla detali jednego zwierzaka
  const loading = ref(false)

  // 1. Pobieranie całej listy kart
  const fetchCards = async () => {
    loading.value = true
    try {
      const response = await fetch('https://localhost:5001/api/Cards')
      animals.value = await response.json()
    } finally {
      loading.value = false
    }
  }

  // 2. Pobieranie szczegółów jednego zwierzaka po ID
  const fetchAnimalById = async (id: string | string[]) => {
    loading.value = true
    try {
      const response = await fetch(`https://localhost:5001/api/Animals/${id}`)
      singleAnimal.value = await response.json()
    } catch (err) {
      console.error("Błąd pobierania zwierzaka:", err)
    } finally {
      loading.value = false
    }
  }

  return {
    animals,
    singleAnimal,
    loading,
    fetchCards,
    fetchAnimalById
  }
}
