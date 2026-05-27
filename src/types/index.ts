export interface Photo {
  id: number
  main: boolean
  apiLink: string
  animalId: number
  animal?: Animal
}

export interface Animal {
  animalId?: number
  species: string
  name: string
  age: number
  sex: string
  description: string
  photos?: Photo[]
  card?: {
    id: number
    status: string
    date: number
  } | null
}

export interface AnimalCard {
  id: number
  date: number
  status: string
  animalId: number
  animal: Animal
}