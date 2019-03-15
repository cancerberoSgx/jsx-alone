import { Theme } from '../store/types'

export const darkTheme: Theme = {
  name: 'dark',
  type: 'dark',
  colors: {
    bg: '#1e1e1e',
    fg: '#d4d4d4',
    brand: '#d4d4d4'
  }
}

export const lightTheme: Theme = {
  name: 'light',
  type: 'light',
  colors: {
    bg: '#d4d4d4',
    fg: '#1e1e1e',
    brand: '#d4d4d4'
  }
}

export const mintyTheme: Theme = {
  name: 'minty',
  type: 'light',
  colors: {
    bg: '#d4d4d4',
    fg: '#1e1e1e',
    brand: '#6abfb0'
  }
}

export const allThemes: Theme[] = [darkTheme, lightTheme, mintyTheme]
