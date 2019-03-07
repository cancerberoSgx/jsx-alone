import { Diagnostic, ts } from 'ts-simple-ast'
import { Component } from '../../util/component'
import { JSXAlone } from 'jsx-alone-dom'
import { SelectCode } from '../explorers'

interface P {
  d: Diagnostic
  onSelectCode?(sel: SelectCode): void
}

export class DiagnosticComponent extends Component<P> {
  protected removeChildrenOnUpdate = true
  render() {
    const { d } = this.props
    return <div>
      {d.getMessageText()}
      <button onClick={e => {
        const sel = {
          startColumn: ts.getLineAndCharacterOfPosition(d.getSourceFile()!.compilerNode, d.getStart() || 0).character + 1,
          startLineNumber: ts.getLineAndCharacterOfPosition(d.getSourceFile()!.compilerNode, d.getStart() || 0).line + 1,
          endColumn: ts.getLineAndCharacterOfPosition(d.getSourceFile()!.compilerNode, (d.getStart() || 0) + (d.getLength() || 0)).character + 1,
          endLineNumber: ts.getLineAndCharacterOfPosition(d.getSourceFile()!.compilerNode, (d.getStart() || 0) + (d.getLength() || 0)).line + 1
        }
        this.props.onSelectCode && this.props.onSelectCode(sel)
      }}>show</button>
    </div>
  }
}
