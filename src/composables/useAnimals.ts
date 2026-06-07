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
    console.log(JSON.stringify(card))
  return fetch('https://localhost:5001/api/Cards', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
     },
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
  photo: animalData.photos
}))
    // loading.value = true
    try {
      const response = await fetch('https://localhost:5001/api/Animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
        animalId: 0,
        species: animalData.species,
        name: animalData.name,
        age: animalData.age,
        sex: animalData.sex,
        description: animalData.description,
        photo: animalData.photos
      })
      })
     
     if (!response.ok) {
    const error = await response.text()
    // console.error('Błąd serwera:', error)
    throw new Error('Wystąpił błąd')
}

const createdAnimal = await response.json()



 if (animalData.card) {
      createdAnimal.card = await createCard({
        id: 0,
        date: animalData.card.date,
        status: animalData.card.status,
        animalId: createdAnimal.animalId
      })
    }

    const mappedAnimal = {
    ...createdAnimal,
    photos: createdAnimal.photo 
} as Animal
  return mappedAnimal
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
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
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
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
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
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (!response.ok) {
      throw new Error('Wystąpił błąd')
    }
    return true
  }
  catch (err) {
    if (err instanceof Error) {
        errorMessage.value = err.message
      } else {
        errorMessage.value = 'Nieznany błąd'
      }
      return false
  }
  finally {
    loading.value = false
  }
}

const updateAnimal = async (animal: Animal) => {
    const response = await fetch(`https://localhost:5001/api/Animals/${animal.animalId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            animalId: animal.animalId,
            species: animal.species,
            name: animal.name,
            age: animal.age,
            sex: animal.sex,
            description: animal.description,
            photo: []
        })
    })
    

    if (!response.ok) {
        const error = await response.text()
        throw new Error(error)
    }
}

const updateCard = async (card: AnimalCard) => {
  // console.log(JSON.stringify({
  //           id: card.id,
  //           date: card.date,
  //           status: card.status,
  //           animalId: card.animalId
  //       }))
    const response = await fetch(`https://localhost:5001/api/Cards/${card.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'id': card.id.toString()
        },
        body: JSON.stringify({
            id: card.id,
            date: card.date,
            status: card.status,
            animalId: card.animalId
        })
    })

    if (!response.ok) {
        const error = await response.text()
        throw new Error(error)
    }
}

const updateAnimalWithCard = async (animalData: Animal, newCard: boolean) => {
  // console.log('Updating animal with card:', JSON.stringify(animalData))
  const animalDataCopy = { ...animalData }
  if (animalDataCopy.card) {
  animalDataCopy.card.animalId = animalDataCopy.animalId!
  }
  // console.log('Prepared animal data for update:', JSON.stringify(animalDataCopy))
    try {
        await updateAnimal(animalData)
        if (animalData.card && !newCard) {
            await updateCard(animalData.card)
        }else if (animalData.card && newCard) {
          const postCardData = {
            id: 0,
            date: Date.now(),
            status: animalData.card.status,
            animalId: animalData.animalId!
          }
            await postCard(postCardData)
        }else if(!animalData.card && !newCard){
          await deleteCardEndpoint(animalDataCopy.card!.id)
        }
        return animalData
    } catch (err) {
        if (err instanceof Error)
            errorMessage.value = err.message
        else
            errorMessage.value = 'Nieznany błąd'

        return animalData
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
  deleteCardEndpoint,
  updateAnimalWithCard,
}
}
