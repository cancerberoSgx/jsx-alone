import { JsonImplOutputEl } from 'jsx-alone-core';
import { JSXAlone } from 'jsx-alone-dom';
import { Component } from '../util/component';
import { Editor } from '../../store/types';
import { registerStyle } from '../../style/styles';
import { escapeHtml, evaluate } from '../../util/util';
import { showInModal } from '../util/showInModal';
import { Node } from './elementExplorerNode';

interface P {
  editor: Editor
}

registerStyle(`
.explorer {
  overflow: scroll;
  height: 700px;
}`)

export class ElementExplorer extends Component<P> {

  render() {
    let error: Error & { evaluated: string } | undefined
    let r: JsonImplOutputEl | undefined
    try {
      r = evaluate(this.props.editor.code)
      error = undefined
    } catch (ex) {
      error = ex
    }
    return <div className={"explorer content "}>
      {!error && r && <Node node={r} onShowHtml={html => showInModal(`<pre>${escapeHtml(html)}</pre>`, 'HTML code')}></Node>}
      {error && <div>ERROR:
        Name: {error.name}<br />
        Message: {error.message}<br />
        Stack: <pre>
          {(error.stack || '')}
        </pre>
        Evaluated: <pre>
          {(error.evaluated || '')}
        </pre>
      </div>}
    </div>
  }
}

