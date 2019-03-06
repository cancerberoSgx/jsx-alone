import { JSXAlone } from 'jsx-alone-dom';
import { isJsonImplOutputEl, isJsonImplOutputText, JsonImplOutput, JsonImplOutputElAsHtml, unique } from 'jsx-alone-core';
import { Component } from '../../util/component';
import { registerStyle } from '../../../style/styles';

interface P{
  node: JsonImplOutput;
  onShowHtml: (s: string) => void;
  collapsed?: boolean
}
export class Node extends Component<P> {
  
  protected updateExistingRemoveChildrenIfCountDiffer = true

  render() {
    const { node } = this.props;
    if (isJsonImplOutputText(node)) {
      return <article className="media text-output">
        <div className="media-content">
          <span className="nodeTag">text</span>
          <div className="nodeContent">
            {node.content}
            <div>({typeof node.content})</div>
          </div>
        </div>
      </article>;
    }
    else if (isJsonImplOutputEl(node)) {
      return <article className={`media element-output ${this.props.collapsed ? 'collapsed' : ''}`}>
        <div className="media-content">

          <span className="nodeTag">{node.tag}</span>
          <button className="button overlay is-small expand-collapse" onClick={e => {
              this.updateProps({collapsed: !this.props.collapsed})
            }}></button>
  
            <button className="button overlay is-small" title="HTML code" onClick={e => this.props.onShowHtml(JsonImplOutputElAsHtml(node))}>{`<>`}</button>
  
            <button className="button overlay is-small" title="Outline in Editor" onClick={e => {
              const els = Array.from(document.querySelectorAll('.view-line'))
                .filter(lineEl => lineEl.textContent && (lineEl.textContent.includes(`<${node.tag}`) || lineEl.textContent.includes(`</${node.tag}`)));
              els.forEach((lineEl: HTMLElement) => {
                lineEl.style.backgroundColor = 'pink';
              });
              setTimeout(() => {
                els.forEach((lineEl: HTMLElement) => {
                  lineEl.style.backgroundColor = '';
                });
              }, 3000);
            }}>{`!`}</button>

          <div className="nodeContent">
            {Object.keys(node.attrs || {}).length &&
              <Attrs attrs={node.attrs}></Attrs>}
            {node.children.length &&
              <div>
                <div className="children-caption">
                  Children:
              </div>
                {node.children.map(c => <Node node={c} onShowHtml={this.props.onShowHtml}></Node>)}
              </div>}
          </div>
          
        </div>
      </article>;
    }
    else
      return <article className="media">UNKNOWN: {JSON.stringify(node)}</article>;
  }
}

interface AP {
  attrs: {
    [name: string]: string
  }
}
class Attrs extends Component<AP> {
  protected updateExistingRemoveChildrenIfCountDiffer = true
  render() {
    return <table><caption>Attributes:</caption>
      {Object.keys(this.props.attrs).map(a => <tr><td>{a}</td><td>{this.props.attrs[a]}</td></tr>)}
    </table>;
  }
}

registerStyle(`
.media.element-output table td {
  border: 0;
  border-width: 0;
  padding: 0 0.75em;
}
.media.element-output table {
  width: 0;
  margin: 0;
}
.media.element-output table caption {
  text-align: left;
  vertical-align: bottom;
}
.media.element-output .nodeTag {
  font-weight: bold;
}
.media.element-output {
  border: 0;
  padding: 0;
}
.media.element-output .media-content {
  padding-left: 1.3em;
}
.media.element-output.collapsed>.media-content .expand-collapse:before {
  content: '+';
}
.media.element-output>.media-content .expand-collapse:before {
  content: '-';
}
.media.element-output.collapsed .nodeContent {
  display: none;
}
.media.element-output, .media.element-output .media, .media.element-output .media .media {
  padding: 0;
  margin: 0;
  border: 0;
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
`);