import { JSXAlone } from 'jsx-alone-dom'
import { CodeWorkerResponseJsxAstDiagnostic } from '../../../store/types'
import { Component } from '../../util/component'
import { SelectCode } from '../explorers'

interface P {
  d: CodeWorkerResponseJsxAstDiagnostic
  onSelectCode?(sel: SelectCode): void
}

export class DiagnosticComponent extends Component<P> {
  protected removeChildrenOnUpdate = true
  render() {
    const { d } = this.props
    return <div>
      {d.message}
      <button onClick={e => {
        // const sel = {
          // startColumn: ts.getLineAndCharacterOfPosition(d.getSourceFile()!.compilerNode, d.getStart() || 0).character + 1,
          // startLineNumber: ts.getLineAndCharacterOfPosition(d.getSourceFile()!.compilerNode, d.getStart() || 0).line + 1,
          // endColumn: ts.getLineAndCharacterOfPosition(d.getSourceFile()!.compilerNode, (d.getStart() || 0) + (d.getLength() || 0)).character + 1,
          // endLineNumber: ts.getLineAndCharacterOfPosition(d.getSourceFile()!.compilerNode, (d.getStart() || 0) + (d.getLength() || 0)).line + 1
        // }
        // this.props.onSelectCode && this.props.onSelectCode(sel)
      }}>show</button>
    </div>
  }
}
