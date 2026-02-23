export const useLocalStorage = (key: string, initialValue: any) => {
  // Get stored value or use initial value
  const stored = window.localStorage.getItem(key)
  const item = stored ? JSON.parse(stored) : initialValue

  // State to store our value
  const [value, setValue] = React.useState(item)

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setStoredValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(item) : value
      setValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  return [value, setStoredValue]
}

import React from 'react'
