import { Editor, Compiled } from '../../store/types'
import * as monaco from 'monaco-editor'
import { getMonacoInstance } from '../../monaco/monaco';

export interface ExplorerProps {
  editor: Editor
  onSelectCode?(sel: SelectCode): void
  compiled: Compiled
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
