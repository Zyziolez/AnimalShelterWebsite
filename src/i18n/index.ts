import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'pl',
  fallbackLocale: 'en',
  messages: {
    pl: {
      home: {
      title: 'Znajdź swojego nowego przyjaciela',
      subtitle: 'JAKIEGO ZWIERZAKA SZUKASZ?',
      searchBtn: 'Szukaj',
      anyGender: 'Dowolna',
      anySpecies: 'Wszystkie',
      keywordLabel: 'IMIĘ LUB CECHA CHARAKTERU:',
      placeholder: 'Wpisz np. Sonia, wesoły...'
    },
      animal: {
        add: 'Dodaj zwierzę do bazy',
        name: 'Imię',
        species: 'Gatunek',
        age: 'Wiek',
        sex: 'Płeć',
        male: 'Samiec',
        female: 'Samica',
        cat: 'Kot',
        dog: 'Pies',
        description: 'Opis',
        image: 'Zdjęcie',
        addPost: 'Dodaj ogłoszenie',
        chooseFile: 'Wybierz pliki'
      },
      inputsAndErrors: {
        cancel: 'Anuluj',
        save: 'Zapisz',
        errNameRequired: 'Imię jest wymagane',
        errChooseSpecies: 'Wybierz gatunek',
        errAge: 'Wiek musi być między 0 a 25',
        errChooseSex: 'Wybierz płeć',
        errChooseStatus: 'Wybierz status ogłoszenia'
      },
      menu: {
        dashboard: 'Dashboard',
        forms: 'Formularze',
        adminPanel: 'Panel Adnimistratora',
        logOut: 'Wyloguj'
      },
      mainPanel:{
        animalsInDb: 'Zwierzaki w bazie',
        add: 'Dodaj',
        allGenders: 'Wszystkie płcie',
        allSpecies: 'Wszystkie gatunki',
        cats: 'Koty',
        dogs: 'Psy',
        search: 'Wyszukaj'
      }
    },
    en: {
      home: {
      title: 'Find Your New Best Friend',
      subtitle: 'WHAT KIND OF PET ARE YOU LOOKING FOR?',
      searchBtn: 'Search',
      anyGender: 'Any',
      anySpecies: 'All',
      keywordLabel: 'NAME OR CHARACTERISTIC:',
      placeholder: 'Enter e.g. Sonia...'
    },
      animal: {
        add: 'Add animal to database',
        name: 'Name',
        species: 'Species',
        age: 'Age',
        sex: 'Sex',
        male: 'Male',
        female: 'Female',
        dog: 'Dog',
        cat: 'Cat',
        description: 'Description',
        image: 'Image',
        addPost: 'Add post',
        chooseFile: 'Wybierz pliki'
      },
      inputsAndErrors: {
        cancel: 'Cancel',
        save: 'Save',
        errNameRequired: 'Name is required',
        errChooseSpecies: 'Choose species',
        errAge: 'Age bust be between 0 and 25',
        errChooseSex: 'Choose sex',
        errChooseStatus: 'Choose post status'
      },
      menu: {
        dashboard: 'Dashboard',
        forms: 'Forms',
        adminPanel: 'Admin Panel',
        logOut: 'Log out'
      },
       mainPanel:{
        animalsInDb: 'Animals in database',
        add: 'Add',
        allGenders: 'All genders',
        allSpecies: 'All species',
        cats: 'Cats',
        dogs: 'Dogs',
        search: 'Search'
      }
    }
  }
})

export default i18n
