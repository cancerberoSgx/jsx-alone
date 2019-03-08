import { JsonImplOutputEl } from 'jsx-alone-core'
import { JSXAlone } from 'jsx-alone-dom'
import { registerStyle } from '../../../style/styles'
import { escapeHtml, query, queryAll } from '../../../util/util'
import { evaluate } from '../../../util/evaluate'
import { Component } from '../../util/component'
import { showInModal } from '../../util/showInModal'
import { Node } from './elementExplorerNode'
import { ExplorerProps } from '../explorers'
import { Error } from '../../util/error'
import { height } from '../../../util/media';
import { isCompiledReady } from '../../../store/types';

interface P extends ExplorerProps {
}

registerStyle(`
.explorer {
  overflow: scroll;
  width: 100%;
  height: ${height()}px;
  margin-top: 3em;
}
.html-code-container {
  display: none;
}
.html-code-container.is-active {
  display: block
}
`)

export class ElementExplorer extends Component<P> {

  render() {
    const compiled = this.props.compiled
    if(isCompiledReady(compiled)){
      const {error, result, evaluated} =  compiled.evaluate
      return <div className="explorer">
      {!error && result && <Node node={result} onShowHtml={html => showInModal(<ElementNodeHtmlCodeModal html={html}/>, 'HTML')}></Node>}
      {error && <Error evaluated={evaluated} error={error} />}
    </div>
    }
    else {
    return <div className="content">
      <h3>
        NOT COMPILED YET
      </h3><h3>
        NOT COMPILED YET
      </h3><h3>
        NOT COMPILED YET
      </h3><h3>
        NOT COMPILED YET
      </h3><h3>
        NOT COMPILED YET
      </h3><h3>
        NOT COMPILED YET
      </h3>
    </div>
    }
  }
}

function ElementNodeHtmlCodeModal(props: {html: string}) {
  return <div id="getHtmlCodeModalContent">
    <div className="tabs is-small is-boxed is-toggle">
      <ul>
        <li className="html-code is-active">
          <a onClick={e => {
            queryAll('#getHtmlCodeModalContent .html, #getHtmlCodeModalContent .html-code').forEach(e => e.classList.remove('is-active'))
            queryAll('#getHtmlCodeModalContent .html-code').forEach(e => e.classList.add('is-active'))
          }}>Code</a>
        </li>
        <li className="html">
          <a onClick={e => {
            queryAll('#getHtmlCodeModalContent .html, #getHtmlCodeModalContent .html-code').forEach(e => e.classList.remove('is-active'))
            queryAll('#getHtmlCodeModalContent .html').forEach(e => e.classList.add('is-active'))
          }}>HTML</a>
        </li>
      </ul>
    </div>
    <div className="html-code-container html-code is-active">
      <pre dangerouslySetInnerHTML={{ __html: escapeHtml(props.html) }}></pre>
    </div>
    <div className="html-code-container html">
      <div className="content" dangerouslySetInnerHTML={{ __html: props.html }}></div>
    </div>
  </div>
}
