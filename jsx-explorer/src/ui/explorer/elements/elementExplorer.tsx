import { JsonImplOutputEl } from 'jsx-alone-core';
import { JSXAlone } from 'jsx-alone-dom';
import { registerStyle } from '../../../style/styles';
import { escapeHtml, evaluate, query, queryAll } from '../../../util/util';
import { Component } from '../../util/component';
import { showInModal } from '../../util/showInModal';
import { Node } from './elementExplorerNode';
import { ExplorerProps } from '../explorers';
import { Error } from '../../util/error';

interface P extends ExplorerProps {
}

registerStyle(`
.explorer {
  overflow: scroll;
  height: 700px;
}
.html-code-container{
  display: none;
}
.html-code-container.is-active {
  display: block
}
`)

export class ElementExplorer extends Component<P> {

  protected updateExistingRemoveChildrenIfCountDiffer = true

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
      {!error && r && <Node node={r} onShowHtml={html => showInModal(getHtmlCodeModalContent(html), 'HTML')}></Node>}
      {error && <Error error={error} />}
    </div>
  }
}

function getHtmlCodeModalContent(html: string) {
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
      <pre dangerouslySetInnerHTML={{ __html: escapeHtml(html) }}></pre>
    </div>
    <div className="html-code-container html">
      <div className="content" dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  </div>
}