import { isJsonImplOutputEl, isJsonImplOutputText, JsonImplOutput, JsonImplOutputEl, RefObject } from 'jsx-alone-core';
import { JSXAlone } from 'jsx-alone-dom';
import { Component } from '../component';
import { Editor } from '../store/types';
import { evaluate } from '../util';
import { registerStyle } from '../style/styles';

interface P {
  editor: Editor
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
.text-output.media {
  border: 0;
  padding: 0;
}
.media.element-output.collapsed>.media-right .expand-collapse:before {
  content: '+';
}
.media.element-output>.media-right .expand-collapse:before {
  content: '-';
}
.media.element-output.collapsed>.media-content>* {
  display: none;
}
.media.element-output, .media.element-output .media, .media.element-output .media .media {
  padding: 0 0 0 0.4rem;
}
`)
export class Explorer extends Component<P> {
  render() {
    let error: string
    let r: JsonImplOutputEl
    try {
      r = evaluate(this.props.editor.code)
    } catch (error) {
      error = error.toString()
    }
    return <div className="explorer content">
      <Node node={r!}></Node>
    </div>
  }
}
export class Node extends Component<{ node: JsonImplOutput }> {
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
                <Node node={c}></Node>)}
            </div>
          }
        </div>
        <div className="media-right">
          <button className="button overlay is-small expand-collapse" onClick={e => {
            e.currentTarget.parentElement!.parentElement!.classList.toggle('collapsed')
          }}></button>
        </div>
      </article>
    }
    else return <article className="media">UNKNOWN: {JSON.stringify(node)}</article>
  }
}

export class Attrs extends Component<{ attrs: { [name: string]: string } }> {
  render() {
    return <table><caption>Attributes:</caption>
      {Object.keys(this.props.attrs).map(a => <tr><td>{a}</td><td>{this.props.attrs[a]}</td></tr>)}
    </table>
  }

}
