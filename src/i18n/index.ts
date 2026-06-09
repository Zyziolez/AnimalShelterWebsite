import { createI18n } from 'vue-i18n'
// funkcja ucząca vue-i18n polskiej gramatyki
function plPluralizationRule(choice: number, choicesLength: number) {
  if (choice === 0) {
    return 0; // 0 lat
  }
  if (choice === 1) {
    return 1; // 1 rok
  }
  
  const remainder = choice % 10;
  const tens = Math.floor(choice % 100 / 10);
  
  if (tens === 1) {
    return 3; // 10-19 lat
  }
  
  if (remainder >= 2 && remainder <= 4) {
    return 2; // 2, 3, 4, 22, 23, 24... lata
  }
  
  return 3; // 5, 6, 7, 8, 9, 20, 25... lat
}


const i18n = createI18n({
  locale: 'pl',
  fallbackLocale: 'en',
  pluralizationRules: {
  'pl': plPluralizationRule },
  messages: {
    pl: {
      contact: {
      title: 'Skontaktuj się z nami',
      foundationName: 'Fundacja dla zwierząt Puszatek',
      accountLabel: 'Numer konto dla darowizn:'
    },
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
        age_format: '0 lat | 1 rok | {count} lata | {count} lat',
        sex: 'Płeć',
        male: 'Samiec',
        female: 'Samica',
        cat: 'Kot',
        dog: 'Pies',
        description: 'Opis',
        image: 'Zdjęcie',
        addPost: 'Dodaj ogłoszenie',
        chooseFile: 'Wybierz pliki',
        loading: 'Ładowanie danych zwierzaka...',
        allPhotos: 'Wszystkie zdjęcia',
        mainPhoto: '★ Zdjęcie główne',
        photoNumber: 'Zdjęcie',
        notFound: 'Nie znaleziono wybranego zwierzęcia.'
      },
      contactForm: {
        title: 'Formularz kontaktowy',
        contactFormTitle: 'Formularz w sprawie:',
        contactButton: 'Kontakt w sprawie zwierzaka',
        lastName: 'Nazwisko',
        email: 'Adres e-mail',
        phone: 'Numer telefonu',
        message: 'Treść',
        cancel: 'Anuluj',
        send: 'Wyślij',
        success: 'Formularz został pomyślnie wysłany!',
        serverError: 'Wystąpił błąd po stronie serwera.',
        alertError: 'Nie udało się wysłać zgłoszenia. Szczegóły: '
      },
      inputsAndErrors: {
        cancel: 'Anuluj',
        save: 'Zapisz',
        errNameRequired: 'Imię jest wymagane',
        errChooseSpecies: 'Wybierz gatunek',
        errAge: 'Wiek musi być między 0 a 25',
        errChooseSex: 'Wybierz płeć',
        errChooseStatus: 'Wybierz status ogłoszenia',
        required: 'Pole nie może być puste',
        email: 'Niepoprawny format adresu e-mail',
        phone: 'Niepoprawny numer telefonu (min. 9 cyfr)',
        messageRequired: 'Treść zgłoszenia nie może być pusta',
        sendError: 'Błąd podczas wysyłania:'
      },
      navbar: {
      home: 'STRONA GŁÓWNA',
      contact: 'KONTAKT'
    },
    footer: {
      copyright: 'Wszelkie prawa zastrzeżone'
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
      }
    },
    en: {
      contact: {
      title: 'Contact us',
      foundationName: 'Puszatek Animal Foundation',
      accountLabel: 'Account number for donations:'
    },
      navbar: {
      home: 'HOME',
      contact: 'CONTACT'
    },
    footer: {
      copyright: 'All rights reserved'
    },
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
        age_format: '0 years | 1 year | {count} years',
        sex: 'Sex',
        male: 'Male',
        female: 'Female',
        dog: 'Dog',
        cat: 'Cat',
        description: 'Description',
        image: 'Image',
        addPost: 'Add post',
        chooseFile: 'Choose files',
        loading: 'Loading animal data...',
        allPhotos: 'All photos', 
        mainPhoto: '★ Main photo', 
        photoNumber: 'Photo', 
        notFound: 'Selected animal not found.'
      },
      contactForm: {
        title: 'Contact form',
        contactFormTitle: 'Contact form for:',
        contactButton: 'Contact form',
        lastName: 'Last name',
        email: 'E-mail address',
        phone: 'Phone number',
        message: 'Message',
        cancel: 'Cancel',
        send: 'Send',
        success: 'The form has been sent successfully!',
        serverError: 'A server-side error occurred.',
        alertError: 'Failed to send the request. Details: '
      },
      inputsAndErrors: {
        cancel: 'Cancel',
        save: 'Save',
        errNameRequired: 'Name is required',
        errChooseSpecies: 'Choose species',
        errAge: 'Age must be between 0 and 25',
        errChooseSex: 'Choose sex',
        errChooseStatus: 'Choose post status',
        required: 'This field cannot be empty',
        email: 'Invalid e-mail address format',
        phone: 'Invalid phone number (min. 9 digits)',
        messageRequired: 'Message content cannot be empty',
        sendError: 'Error during sending:'
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
