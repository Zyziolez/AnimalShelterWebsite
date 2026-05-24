
<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { useRoute } from 'vue-router'

  //ogólnie to ma pobierać zwierzeta z bazy 
//słowniki, potem można ewentualnie zmienić
const speciesMap: Record<string, string> = { 'P': 'Pies', 'K': 'Kot'}
const sexMap: Record<string, string> = { 'M': 'Samiec', 'F' : 'Samica' }
const route = useRoute()
const animalId = route.params.animalId as string

const animalData = ref<unknown>(null)
const errorMsg = ref('')
const formStatus = ref('')

const formData = ref({
    animalId: parseInt(animalId),
    firstName: '',
    lastName: '',
    mail: '',
    phoneNumber: '',
    content: ''
})

onMounted(() => {
  fetch(`https://localhost:5001/api/Animals/${animalId}`)
    .then((res) => {
      if (!res.ok) throw new Error('Błąd pobierania zwierzaka z API')
      return res.json()
    })
    .then((data) => {
      animalData.value = data
    })
    .catch((err) => {
      errorMsg.value = err.message
      console.error(err)
    })
})

const submitForm = async () => {
  try {
    const response = await fetch('https://localhost:5001/api/Forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData.value)
    })

    if (!response.ok) throw new Error('Serwer odrzucił formularz')

    formStatus.value = "Sukces: Formularz został zapisany v bazie danych!"
    
    // Czyszczenie po wysłaniu
    formData.value.firstName = ''
    formData.value.lastName = ''
    formData.value.mail = ''
    formData.value.phoneNumber = ''
    formData.value.content = ''
  } catch (err: unknown) {
    const error = err as Error;
    formStatus.value = `Błąd: ${error.message || 'Nie udało się połączyć z API'}`
  }
}
</script>

<template>
  <div style="padding: 20px; font-family: sans-serif;">
    
    <div v-if="errorMsg" style="color: red; font-weight: bold;">
      {{ errorMsg }}
    </div>

    <div v-if="animalData">
      
      <section>
        <h2>Informacje o zwierzaku: {{ animalData.name }}</h2>
        <ul>
          <li><strong>ID w bazie:</strong> {{ animalData.animalId }}</li>
          <li><strong>Imię:</strong> {{ animalData.name }}</li>
          <li><strong>Gatunek:</strong> {{ speciesMap[animalData.species] || animalData.species }}</li>
          <li><strong>Wiek:</strong> {{ animalData.age }} lat/a</li>       
          <li><strong>Płeć:</strong> {{ sexMap[animalData.sex] || animalData.sex }}</li>
          <li><strong>Opis:</strong> {{ animalData.description }}</li>
        </ul>
      </section>

      <hr />

      <section>
        <h3>Galeria zdjęć</h3>
        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
          <div v-for="photo in animalData.photo" :key="photo.id" style="border: 1px solid #ccc; padding: 5px;">
            <img :src="photo.apiLink" alt="Zdjecie" style="width: 150px; height: 150px; object-fit: cover;" />
            <div style="font-size: 11px; text-align: center;">
              {{ photo.main ? '★ Główne' : `ID: ${photo.id}` }}
            </div>
          </div>
        </div>
      </section>

      <hr />

      <section>
        <h3>Formularz kontaktowy w sprawie zwierzaka</h3>
        
        <form @submit.prevent="submitForm" style="display: flex; flex-direction: column; gap: 10px; max-w: 400px;">
          
          <div>
            <label style="display: block;">Imię:</label>
            <input v-model="formData.firstName" type="text" style="width: 100%; padding: 5px;" required />
          </div>

          <div>
            <label style="display: block;">Nazwisko:</label>
            <input v-model="formData.lastName" type="text" style="width: 100%; padding: 5px;" required />
          </div>

          <div>
            <label style="display: block;">Adres e-mail:</label>
            <input v-model="formData.mail" type="email" style="width: 100%; padding: 5px;" required />
          </div>

          <div>
            <label style="display: block;">Numer telefonu:</label>
            <input v-model="formData.phoneNumber" type="tel" style="width: 100%; padding: 5px;" required />
          </div>

          <div>
            <label style="display: block;">Treść zgłoszenia (Content):</label>
            <textarea v-model="formData.content" rows="4" style="width: 100%; padding: 5px;" required></textarea>
          </div>

          <button type="submit" style="padding: 10px; cursor: pointer; background: #22c55e; color: white; border: none;">
            Zapisz formularz w bazie (POST)
          </button>
        </form>

        <p v-if="formStatus" style="margin-top: 15px; padding: 10px; background: #f3f4f6; font-weight: bold;">
          {{ formStatus }}
        </p>
      </section>

    </div>

    <div v-else-if="!errorMsg">
      Trwa komunikacja z backendem...
    </div>

  </div>
</template>
