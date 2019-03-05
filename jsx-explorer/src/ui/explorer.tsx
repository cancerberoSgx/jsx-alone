import { isJsonImplOutputEl, isJsonImplOutputText, JsonImplOutput, JsonImplOutputEl, RefObject, indent, JsonImplOutputElAsHtml } from 'jsx-alone-core';
import { JSXAlone } from 'jsx-alone-dom';
import { Component } from '../component';
import { Editor } from '../store/types';
import { evaluate } from '../util';
import { registerStyle } from '../style/styles';

interface P {
  editor: Editor
}
export class Explorer extends Component<P> {
  
  constructor(p:P){
    super(p)
    this.showHtmlModal=this.showHtmlModal.bind(this)
    this.closeModal=this.closeModal.bind(this)

  }
  render() {
    let error: Error & { evaluated: string } | undefined
    let r: JsonImplOutputEl | undefined
    try {
      r = evaluate(this.props.editor.code)
    } catch (ex) {
      error = ex
    }
    return <div className={"explorer content "}>
      
      {!error && r && <Node node={r} onShowHtml={this.showHtmlModal}></Node>}

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

      <div className="modal">
          <div className="modal-background" onClick={this.closeModal}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <div className="modal-card-title">HTML Code</div>
              <button className="delete" aria-label="close" onClick={this.closeModal}></button>
            </header>
            <section className="modal-card-body">
              <pre className="code">
              </pre>
            </section>
          </div>
        </div>
    </div>
  }

  private closeModal(){
      this.query('.modal').classList.remove('is-active')
  }
  private showHtmlModal (html: string){
    this.query('.modal-card-body .code').innerHTML = html.replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;').trim()
    this.query('.modal').classList.add('is-active')
  }
}


class Node extends Component<{ node: JsonImplOutput,
  onShowHtml: (s:string)=>void }> {

  render() {
    const { node, } = this.props
    if (isJsonImplOutputText(node)) {
      return <article className="media text-output">
        <div className="nodeTag media-left">text</div><div className="media-content">{node.content}</div><div className="media-right">({typeof node.content})</div></article>
    }
    else if (isJsonImplOutputEl(node)) {
      return <article className="media element-output" >
        <div className="nodeTag media-left">{node.tag}</div>
        <div className="media-content" >
          {Object.keys(node.attrs || {}).length &&
            <Attrs attrs={node.attrs}></Attrs>
          }
          {node.children.length &&
            <div>
              <div className="children-caption">
                Children:
              </div>
              {
                node.children.map(c =>
                  <Node node={c} onShowHtml={this.props.onShowHtml}></Node>)}
            </div>
          }
        </div>
        <div className="media-right">
          <button className="button overlay is-small expand-collapse" onClick={e => {
            e.currentTarget.parentElement!.parentElement!.classList.toggle('collapsed')
          }}></button>

          <button className="button overlay is-small" title="HTML code" onClick={e =>this.props.onShowHtml(JsonImplOutputElAsHtml(node))
          }>{`<>`}</button>
        </div>
      </article>
    }
    else return <article className="media">UNKNOWN: {JSON.stringify(node)}</article>
  }
}
class Attrs extends Component<{ attrs: { [name: string]: string } }> {
  render() {
    return <table><caption>Attributes:</caption>
      {Object.keys(this.props.attrs).map(a => <tr><td>{a}</td><td>{this.props.attrs[a]}</td></tr>)}
    </table>
  }

}

registerStyle(`
.explorer {
  overflow-y: scroll;
}
.explorer.content table td {
  border: 0;
  border-width: 0;
  padding: 0 0.75em;
}
.explorer.content table {
  width: 0;
  margin: 0;
}
.explorer.content table caption {
  text-align: left;
  vertical-align: bottom;
}
.explorer .nodeTag {
  font-weight: bold;
}
.explorer .text-output.media {
  border: 0;
  padding: 0;
}
.explorer .media.element-output.collapsed>.media-right .expand-collapse:before {
  content: '+';
}
.explorer .media.element-output>.media-right .expand-collapse:before {
  content: '-';
}
.explorer .media.element-output.collapsed>.media-content>* {
  display: none;
}
.explorer .media.element-output, .media.element-output .media, .media.element-output .media .media {
  padding: 0 0 0 0.4rem;
  margin: 0;
  border: 0;
}
`)
