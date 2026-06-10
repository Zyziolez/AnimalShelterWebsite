export interface Photo {
  id: number
  main: boolean
  imageData?: string | null
  base64Data?: string | null
  animalId: number
  imageExtension: string
  animal?: Animal
}

export interface Animal {
  animalId?: number
  species: 'Kot' | 'Pies'
  name: string
  age: number
  sex: 'M' | 'F'
  description: string
  photo?: Photo[]
  card?: {
    id: number
    status: string
    date: number,
    animalId: number
  } | null
}

export interface AnimalCard {
  id: number
  date: number
  status: string
  animalId: number
  animal: Animal
}
