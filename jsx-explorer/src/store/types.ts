export interface State {
  readonly layout: Layout
  readonly editor: Editor
  status: Status
}

export interface Status {
  logs: string[]
}

export interface Layout {
  readonly theme: Theme
}

export interface Editor {
  readonly code: string
}

export interface Theme {
  readonly name: string,
  readonly colors: {
    readonly bg: Color
    readonly fg: Color
    readonly brand: Color
  }
}

type Color = string
