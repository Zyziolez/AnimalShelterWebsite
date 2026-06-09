export interface AdoptionForm {
  id: number
  date: string
  firstName: string
  lastName: string
  mail: string
  phoneNumber: string
  content: string
  animalId: number
}

export interface AdoptionFormsResponse {
  code: number
  message: string
  data: AdoptionForm[]
}