import { ref } from 'vue'
import type { AnimalCard, Animal } from '@/types/index'

const animals = ref<AnimalCard[]>([]) // Dla listy
  const singleAnimal = ref<Animal | null>(null) // Dla detali jednego zwierzaka
  const loading = ref(false)
  const filteredAnimals = ref<Animal[]>([]) 
  const animalsList = ref<Animal[]>([])
  const errorMessage = ref<string | null>(null)

export function useAnimals() {

  // 1. Pobieranie całej listy kart
  const fetchCards = async () => {
    loading.value = true
    try {
      const response = await fetch('https://localhost:5001/api/Cards')
       if (!response.ok) {
      throw new Error('Wystąpił błąd')
    }
      // console.log(response.json())
      animals.value = await response.json() as AnimalCard[]
    }
    catch(err){
       if (err instanceof Error) {
        errorMessage.value = err.message
      } else {
        errorMessage.value = 'Nieznany błąd'
      }
    }
    finally {
      loading.value = false
    }
  }

  // 2. Pobieranie szczegółów jednego zwierzaka po ID
  const fetchAnimalById = async (id: string | string[]) => {
    loading.value = true
    try {
      const response = await fetch(`https://localhost:5001/api/Animals/${id}`)
       if (!response.ok) {
      throw new Error('Wystąpił błąd')
    }
      singleAnimal.value = await response.json() as Animal
    } catch (err) {
      if (err instanceof Error) {
        errorMessage.value = err.message
      } else {
        errorMessage.value = 'Nieznany błąd'
      }
    } finally {
      loading.value = false
    }
  }

  const fetchAnimals = async () => {
    loading.value = true
    try {
      const response = await fetch('https://localhost:5001/api/Animals')
       if (!response.ok) {
      throw new Error('Wystąpił błąd')
    }
      animalsList.value = await response.json() as Animal[]
    } catch (err) {
      if (err instanceof Error) {
        errorMessage.value = err.message
      } else {
        errorMessage.value = 'Nieznany błąd'
      }
    } finally {
      loading.value = false
    }
  }

  const fetchAnimalsFiltered = async(searchValue: string, sex: string, species: string) => {
    loading.value = true
    try {
      const response = await fetch('https://localhost:5001/api/Animals/search?query=' + searchValue)
       if (!response.ok) {
      throw new Error('Wystąpił błąd')
    }
      filteredAnimals.value = await response.json() as Animal[]
    }
    catch(err){
       if (err instanceof Error) {
        errorMessage.value = err.message
      } else {
        errorMessage.value = 'Nieznany błąd'
      }
    } finally {
      loading.value = false
    }
  }

  const createCard = async (card: AnimalCard) => {
  return fetch('https://localhost:5001/api/Cards', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card)
  })
}

  const postAnimal = async (animalData: Animal) => {
    console.log(JSON.stringify({
  animalId: 0,
  species: animalData.species,
  name: animalData.name,
  age: animalData.age,
  sex: animalData.sex,
  description: animalData.description,
  photo: []
}))
    // loading.value = true
    try {
      const response = await fetch('https://localhost:5001/api/Animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
  animalId: 0,
  species: animalData.species,
  name: animalData.name,
  age: animalData.age,
  sex: animalData.sex,
  description: animalData.description,
  photo: null
})
      })
      
       const createdAnimal = await response.json() as Animal

      if (animalData.card) {
      await createCard({
        id: 0,
        date: animalData.card.date,
        status: animalData.card.status,
        animalId: createdAnimal.animalId
      })
    }
      if (!response.ok) {
        throw new Error('Wystąpił błąd')
      }
  }
  catch(err){
     if (err instanceof Error) {
        errorMessage.value = err.message
      } else {
        errorMessage.value = 'Nieznany błąd'
      }
  }
}

const deleteAnimalEndpoint = async (animalId: number) => {
  // loading.value = true
  try {
    const response = await fetch(`https://localhost:5001/api/Animals/${animalId}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Wystąpił błąd')
    }
  } catch (err) {
    if (err instanceof Error) {
        errorMessage.value = err.message
      } else {
        errorMessage.value = 'Nieznany błąd'
      }
  } finally {
    loading.value = false
  }
}

const postCard = async (cardData: AnimalCard) => {
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
      throw new Error('Wystąpił błąd')
    }

    return await response.json() as AnimalCard
  }
  catch (err) {
    if (err instanceof Error) {
        errorMessage.value = err.message
      } else {
        errorMessage.value = 'Nieznany błąd'
      }
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
      throw new Error('Wystąpił błąd')
    }
  }
  catch (err) {
    if (err instanceof Error) {
        errorMessage.value = err.message
      } else {
        errorMessage.value = 'Nieznany błąd'
      }
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
  errorMessage,
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
