import { getMonacoInstance } from '../editor'
import { Editor } from '../../store/types'
import * as monaco from 'monaco-editor'

export interface ExplorerProps {
  editor: Editor
  onSelectCode?(sel: SelectCode): void
}

export interface SelectCode {
  startColumn: number
  startLineNumber: number
  endColumn: number
  endLineNumber: number
}

export function onSelectCode(sel: SelectCode): void {
  getMonacoInstance()!.setSelection(sel)
  getMonacoInstance()!.revealLineInCenterIfOutsideViewport(sel.startLineNumber, monaco.editor.ScrollType.Smooth)
  getMonacoInstance()!.focus()
}
