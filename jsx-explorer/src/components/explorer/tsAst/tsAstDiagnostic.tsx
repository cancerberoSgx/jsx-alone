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
      <button onClick={e => { this.props.onSelectCode && this.props.onSelectCode(this.props.d) }}>
      Show</button>
    </div>
  }
}
