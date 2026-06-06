import { ref } from 'vue'
import type { AnimalCard, Animal } from '@/types/index'

const animals = ref<AnimalCard[]>([]) // Dla listy
  const singleAnimal = ref<Animal | null>(null) // Dla detali jednego zwierzaka
  const loading = ref(false)
  const filteredAnimals = ref<Animal[]>([]) 
  const animalsList = ref<Animal[]>([])

export function useAnimals() {

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

  const fetchAnimals = async () => {
    loading.value = true
    try {
      const response = await fetch('https://localhost:5001/api/Animals')
      animalsList.value = await response.json() as Animal[]
    } catch (err) {
      console.error("Błąd pobierania zwierzaków:", err)
    } finally {
      loading.value = false
    }
  }

  const fetchAnimalsFiltered = async(searchValue: string, sex: string, species: string) => {
    loading.value = true
    try {
      const response = await fetch('https://localhost:5001/api/Animals/search?query=' + searchValue)
      filteredAnimals.value = await response.json() as Animal[]
    }
    catch{
      console.error("Błąd w przefiltrowanych zwierzetach")
    } finally {
      loading.value = false
    }
  }
  const postAnimal = async (animalData: Animal) => {
    loading.value = true
    try {
      const response = await fetch('https://localhost:5001/api/Animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(animalData)
      })
      if (!response.ok) {
        throw new Error('Błąd podczas dodawania zwierzaka')
      }
  }
  catch(err){
    console.log(err)
  }
}

const deleteAnimalEndpoint = async (animalId: number) => {
  loading.value = true
  try {
    const response = await fetch(`https://localhost:5001/api/Animals/${animalId}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Błąd podczas usuwania zwierzaka')
    }
  } catch (err) {
    console.error("Błąd podczas usuwania zwierzaka:", err)
  } finally {
    loading.value = false
  }
}

const postCard = async (cardData: Card) => {
  loading.value = true
  try {
    const response = await fetch('https://localhost:5001/api/Cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardData)
    })

    if (!response.ok) {
      throw new Error('Błąd podczas dodawania karty')
    }

    return await response.json() as Card
  }
  catch (err) {
    console.error("Błąd podczas dodawania karty:", err)
  }
  finally {
    loading.value = false
  }
}

const deleteCardEndpoint = async (cardId: number) => {
  loading.value = true
  try {
    const response = await fetch(`https://localhost:5001/api/Cards/${cardId}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Błąd podczas usuwania karty')
    }
  }
  catch (err) {
    console.error("Błąd podczas usuwania karty:", err)
  }
  finally {
    loading.value = false
  }
}

return {
  animals,
  singleAnimal,
  loading,
  filteredAnimals,
  animalsList,
  fetchCards,
  fetchAnimalById,
  fetchAnimalsFiltered,
  fetchAnimals,
  postAnimal,
  deleteAnimalEndpoint,
  postCard,
  deleteCardEndpoint
}
}
