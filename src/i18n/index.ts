import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'pl',
  fallbackLocale: 'en',
  messages: {
    pl: {
      animal: {
        add: 'Dodaj zwierzę do bazy',
        name: 'Imię',
        species: 'Gatunek',
        age: 'Wiek',
        sex: 'Płeć',
        male: 'Samiec',
        female: 'Samica',
      }
    },
    en: {
      animal: {
        add: 'Add animal to database',
        name: 'Name',
        species: 'Species',
        age: 'Age',
        sex: 'Sex',
        male: 'Male',
        female: 'Female',
      }
    }
  }
})

export default i18n