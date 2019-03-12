import { isJsonImplOutputEl, isJsonImplOutputText, JsonImplOutput, jsonImplOutputElAsHtml, JsonImplOutputEl } from 'jsx-alone-core'
import { JSXAlone } from 'jsx-alone-dom'
import { registerStyle } from '../../../style/styles'
import { Component } from '../../util/component'
import { shorter } from '../../../util/util'

interface P {
  node: JsonImplOutput
  onShowHtml: (s: string) => void
  collapsed?: boolean
}

export class Node extends Component<P> {

  protected removeChildrenOnUpdate = true

  render() {
    const { node } = this.props

    if (isJsonImplOutputText(node)) {
      return <article className="media text-output">
        <div className="media-content">
          <span className="nodeTag">Text: </span>
          <span className="textNodeContent">
            {shorter(node.content + '', 30)}
            <span>({typeof node.content})</span>

          </span>
        </div>
      </article>
    }

    else if (isJsonImplOutputEl(node)) {
      return <article className={`media element-output ${this.props.collapsed ? 'collapsed' : ''}`}>

        <div className="media-content">

          <span className="nodeTag">{`<${node.tag}>`}</span>

          <button className="button overlay is-small expand-collapse" onClick={e => {
            this.updateProps({ collapsed: !this.props.collapsed })
          }}></button>

          <button className="button overlay is-small" title="HTML code" onClick={e => this.props.onShowHtml(jsonImplOutputElAsHtml(node))}>{`<>`}</button>

          <button className="button overlay is-small" title="Outline in Editor" onClick={e => {
            const els = Array.from(document.querySelectorAll('.view-line'))
              .filter(lineEl => lineEl.textContent && (lineEl.textContent.includes(`<${node.tag}`) || lineEl.textContent.includes(`</${node.tag}`)))
            els.forEach((lineEl: HTMLElement) => {
              lineEl.style.backgroundColor = 'pink'
            })
            setTimeout(() => {
              els.forEach((lineEl: HTMLElement) => {
                lineEl.style.backgroundColor = ''
              })
            }, 3000)
          }}>{`!`}</button>

          <div className="nodeContent">
            {Object.keys(node.attrs).length &&
              <Attrs node={node}></Attrs>}

            {node.children.length && <div>
              {node.children.map(c => <Node node={c} onShowHtml={this.props.onShowHtml}></Node>)}
            </div>}
          </div>

        </div>
      </article>
    }
    else {
      return <article className="media">UNKNOWN: {JSON.stringify(node)}</article>
    }
  }
}

interface AP {
  node: JsonImplOutputEl
}
class Attrs extends Component<AP> {
  protected removeChildrenOnUpdate = true
  render() {
    return <table className="table content">
      {Object.keys(this.props.node.attrs).map(a => <tr className="tr">
        <td><em>{a}</em><code>=</code></td>
        <td>{shorter(this.props.node.attrs[a])}</td>
      </tr>)}
      {typeof this.props.node.innerHtml === 'string' && <tr className="tr">
        <td><em>innerHtml</em></td>
        <td>{shorter(this.props.node.innerHtml + '')}</td>
      </tr>}
    </table>
  }
}

registerStyle(`
.media.element-output.collapsed>.media-content .expand-collapse:before {
  content: '+';
}
.media.element-output>.media-content .expand-collapse:before {
  content: '-';
}
.media.element-output.collapsed .nodeContent, .media.element-output.collapsed .textNodeContent {
  display: none;
}
.media.element-output .nodeTag {
  font-weight: bold;
}
.media.element-output {
  border: 1px dotted transparent;
}
.media.element-output:hover {
  border: 1px dotted grey;
}
.media.element-output>.media-content button {
  display:none;
}
.media.element-output:hover>.media-content button {
  display:inline;
}
.media .media-content .nodeContent{
  padding-left: 1.3em;
}
`)
