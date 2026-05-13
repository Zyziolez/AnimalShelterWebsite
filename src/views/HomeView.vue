<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()
const animals = ref<any[]>([]) //tutaj zamienie to na interfejs ref<AnimalCard[]>([]) ale na razie jest any

const fetchAnimals = async () => {
    try {
        const response = await fetch('https://localhost:5001/api/Cards')
        animals.value = await response.json()
    } catch (error) {
        console.error("Błąd galerii:", error)
    }
}

// Wywołujemy ją po prostu "luzem" w skrypcie
fetchAnimals()

const goToDetails = (id: number) => {
    router.push(`/animal/${id}`)
}
</script>
<template>
    <div v-for="card in animals" :key="card.id" class="animal-card">
  <!-- Schodzimy głębiej: najpierw do obiektu animal, potem do name -->
  <h3>{{ card.animal.name }}</h3>
  <p>Gatunek: {{ card.animal.species }}</p>
  <p>Status: {{ card.status }}</p>

    </div>
</template>
