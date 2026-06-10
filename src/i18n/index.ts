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
        adminPanel: 'Panel Administratora',
        logOut: 'Wyloguj'
      },
      mainPanel: {
        animalsInDb: 'Zwierzaki w bazie',
        add: 'Dodaj',
        allGenders: 'Wszystkie płcie',
        allSpecies: 'Wszystkie gatunki',
        cats: 'Koty',
        dogs: 'Psy',
        search: 'Wyszukaj'
      },
      adminForms: {
        title: 'Formularze adopcyjne',
        description: 'Lista formularzy przesłanych przez osoby zainteresowane adopcją.',
        loading: 'Ładowanie formularzy...',
        empty: 'Brak przesłanych formularzy.',
        fetchError: 'Nie udało się pobrać formularzy adopcyjnych.',
        expand: 'Rozwiń',
        collapse: 'Zwiń',
        formId: 'Formularz ID',
        firstName: 'Imię',
        lastName: 'Nazwisko',
        email: 'Email',
        phone: 'Telefon',
        phoneNumber: 'Numer telefonu',
        animalId: 'ID zwierzęcia',
        sentDate: 'Data wysłania',
        content: 'Treść formularza'
      },
      login: {
        login: 'Zaloguj',
        email: 'Adres e-mail',
        pass: 'Hasło'
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
        dog: 'Dog',
        cat: 'Cat',
        description: 'Description',
        image: 'Image',
        addPost: 'Add post',
        chooseFile: 'Choose files'
      },
      inputsAndErrors: {
        cancel: 'Cancel',
        save: 'Save',
        errNameRequired: 'Name is required',
        errChooseSpecies: 'Choose species',
        errAge: 'Age must be between 0 and 25',
        errChooseSex: 'Choose sex',
        errChooseStatus: 'Choose post status'
      },
      menu: {
        dashboard: 'Dashboard',
        forms: 'Forms',
        adminPanel: 'Admin Panel',
        logOut: 'Log out'
      },
      mainPanel: {
        animalsInDb: 'Animals in database',
        add: 'Add',
        allGenders: 'All genders',
        allSpecies: 'All species',
        cats: 'Cats',
        dogs: 'Dogs',
        search: 'Search'
      },
      adminForms: {
        title: 'Adoption forms',
        description: 'List of forms submitted by people interested in adoption.',
        loading: 'Loading forms...',
        empty: 'No submitted forms.',
        fetchError: 'Failed to load adoption forms.',
        expand: 'Expand',
        collapse: 'Collapse',
        formId: 'Form ID',
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email',
        phone: 'Phone',
        phoneNumber: 'Phone number',
        animalId: 'Animal ID',
        sentDate: 'Submitted date',
        content: 'Form content'
      }
    }
  }
})

export default i18n