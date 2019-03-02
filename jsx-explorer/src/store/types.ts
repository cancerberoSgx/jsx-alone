
export interface State {
  readonly theme: Theme
  readonly code: string
}

export interface Theme {
  name: string,
  colors: {
    bg: Color,
    fg: Color
  }
}

type Color = string