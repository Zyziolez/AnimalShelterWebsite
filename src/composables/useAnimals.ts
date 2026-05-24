import { ref } from 'vue'
import type { AnimalCard, Animal } from '@/assets/AnimalCard'

export function useAnimals() {
  const animals = ref<AnimalCard[]>([]) // Dla listy
  const singleAnimal = ref<Animal | null>(null) // Dla detali jednego zwierzaka
  const loading = ref(false)
  const simpleAnimals = ref<Animal[]>([]) // zwierzeta bez kart

  // 1. Pobieranie całej listy kart
  const fetchCards = async () => {
    loading.value = true
    try {
      const response = await fetch('https://localhost:5001/api/Cards')
      // console.log(response.json())
      animals.value = await response.json() as AnimalCard[]
    } finally {
      loading.value = false
    }
  }

  // 2. Pobieranie szczegółów jednego zwierzaka po ID
  const fetchAnimalById = async (id: string | string[]) => {
    loading.value = true
    try {
      const response = await fetch(`https://localhost:5001/api/Animals/${id}`)
      singleAnimal.value = await response.json() as Animal
    } catch (err) {
      console.error("Błąd pobierania zwierzaka:", err)
    } finally {
      loading.value = false
    }
  }

  //wszystkie zwierzeta - dla panelu admina
  const fetchSimpleAnimals = async () => {
    loading.value = true
    try {
      const response = await fetch('https://localhost:5001/api/Animals')
      simpleAnimals.value = await response.json() as Animal[]
      // console.log(simpleAnimals.value)
    }
    catch{
      console.error("Błąd pobierania fetchSimpleAnimals")
    } finally {
      loading.value = false
    }
  }

  return {
    animals,
    singleAnimal,
    loading,
    simpleAnimals,
    fetchCards,
    fetchAnimalById,
    fetchSimpleAnimals
  }
}
