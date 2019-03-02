
export interface State {
  readonly layout: Layout
  readonly editor: Editor

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
    readonly bg: Color,
    readonly fg: Color
  }
}

type Color = string