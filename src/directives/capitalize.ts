//zeby ts sie uspokoil
declare global {
  interface HTMLInputElement {
    _capitalizeHandler?: ((e: Event) => void) | null
  }
}

export default {
  mounted(el: HTMLInputElement) {
    const capitalizeFirstLetter = (value: string) => {
      if (!value) return value
      return value.charAt(0).toUpperCase() + value.slice(1)
    }

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement
      const cursorPosition = target.selectionStart
      const oldValue = target.value
      const newValue = capitalizeFirstLetter(oldValue)
      
      if (oldValue !== newValue) {
        target.value = newValue
        
        //zeby kursor nei uciekal przy edycji tekstu w srodku
        if (cursorPosition && cursorPosition > 0) {
          target.setSelectionRange(cursorPosition, cursorPosition)
        }

        target.dispatchEvent(new Event('input', { bubbles: true }))
      }
    }

    el.addEventListener('input', handleInput)
    

    el._capitalizeHandler = handleInput
  },
  
  unmounted(el: HTMLInputElement) {
    if (el._capitalizeHandler) {
      el.removeEventListener('input', el._capitalizeHandler)
    }
  }
}