import { JSXAlone } from 'jsx-alone-dom';
import { State } from '../store/types';
import { registerStyle } from '../style/styles';
import { css, isMobile } from "../util/media";
import { Editor } from './editor';
import { Explorers } from './explorer/explorers';
import { Header } from './header';
import { Component } from './util/component';

interface P {
  state: State
}

export class App extends Component<P> {
  protected updateExistingRemoveChildrenIfCountDiffer=false
  render() {

    registerStyle(`
body *::-webkit-scrollbar {
  width: 0.8em;
}
body *::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px ${this.props.state.layout.theme.colors.bg}66;
}
body *::-webkit-scrollbar-thumb {
  background-color: ${this.props.state.layout.theme.colors.fg}66;
  outline: 1px solid ${this.props.state.layout.theme.colors.bg}66;
}

${css('.mainContainer', `
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 100%;
`, `
margin: 1.2em;
`)}


.noPaddingTop {
  padding: 0;
  margin: 0;
}
.mobile-view-container {
  display: none;
}
.mobile-view-container.is-active{
  display: block;
}
`)

    return <section className={`section noPaddingTop`}>

      <Header theme={this.props.state.layout.theme} />

      {isMobile()
        ?
        <div className={`container mainContainer`}>
          <div className="tabs is-small is-boxed is-toggle mobile-view-select">
            <ul>
              <li className="editor is-active">
                <a onClick={e => this.selectTab('editor')}>Editor</a>
              </li>
              <li className="explorers">
                <a onClick={e => this.selectTab('explorers')}>Explorers</a>
              </li>
            </ul>
          </div>
          <div className="mobile-view-container editor is-active">
            <Editor {...this.props} />
          </div>
          <div className="mobile-view-container explorers">
            <Explorers {...this.props} />
          </div>
        </div>
        :
        <div className={`container mainContainer`}>
          <div className="tile is-ancestor">
            <div className="tile is-vertical is-4">
              <article className="tile is-child">
                <Explorers {...this.props} />
              </article>
            </div>
            <div className="tile is-vertical is-8">
              <article className="tile is-child ">
                <Editor {...this.props} />
              </article>
            </div>
          </div>
        </div>
      }

    </section>
  }
  private selectTab(e: 'editor' | 'explorers') {
    this.query('.tabs.mobile-view-select li.is-active').classList.remove('is-active')
    this.query('.tabs.mobile-view-select li.' + e).classList.add('is-active')
    this.query('.mainContainer .mobile-view-container.is-active').classList.remove('is-active')
    this.query('.mainContainer .mobile-view-container.' + e).classList.add('is-active')
  }
}
