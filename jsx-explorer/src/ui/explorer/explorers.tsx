import { getMonacoInstance } from '../editor';
import { Editor } from '../../store/types';
import * as monaco from 'monaco-editor';

export interface ExplorerProps {
  editor: Editor
  onSelectCode?(sel: SelectCode): void
}

export interface SelectCode {
  startColumn: number;
  startLineNumber: number;
  endColumn: number;
  endLineNumber: number;
}

export function onSelectCode(sel: SelectCode): void {
  getMonacoInstance()!.setSelection(sel)
  getMonacoInstance()!.revealLine(sel.startLineNumber, monaco.editor.ScrollType.Smooth)
  // const s = getMonacoInstance()!.getScrolledVisiblePosition({ 
  //   lineNumber: sel.startLineNumber, 
  //   column: sel.startColumn ,
  //   height: getMonacoInstance()!.getScrollHeight()
  // })
  // if (s) { 
  //   getMonacoInstance()!.setScrollPosition({
  //     // scrollTop: Math.min(0, s.top-20)//s.top === 0 ? s.top : s.top - 1,
  //     scrollLeft: s.left ,
  //     scrollTop: s.top
      
  //   })
  // }
  getMonacoInstance()!.focus()
}

