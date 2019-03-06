import { JSXAlone } from 'jsx-alone-dom';
import { Component } from './util/component';
import { dispatch } from '../main';
import { Theme, State } from '../store/types';
import { darkTheme, lightTheme, allThemes } from '../style/theme';
import { ForkRibbon } from './content/forkRibbon';
import { showInModal } from './util/showInModal';
import { WhatsThis } from './content/whatsThis';
import { examples } from '../examples';
import { EditorExplorerMenu } from './editorExplorerMenu';

interface P {
  // theme: Theme
  state: State
}

export class Header extends Component<P> {

  render() {
    const theme = this.props.state.layout.theme
    const nextThemeName = theme.name === 'dark' ? 'minty' : theme.name === 'minty' ? 'light' : 'dark'
    const nextTheme = allThemes.find(t => t.name === nextThemeName)!

    return <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <ForkRibbon />
      <div className="navbar-brand">
        {/* <a className="navbar-item" href="https://cancerberosgx.github.io/jsx-alone/jsx-explorer">
          {'<JSX explorer/>'}
        </a> */}
        <EditorExplorerMenu {...this.props}/>

        <a role="button" className="navbar-burger burger is-large" aria-label="menu" aria-expanded="false" data-target="jsxExplorerNavbar" onClick={e => this.query('#jsxExplorerNavbar').classList.toggle('is-active')}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="jsxExplorerNavbar" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item" onClick={e => showInModal(<WhatsThis />, 'What\'s this?')}>What's this</a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Examples</a>

            <div className="navbar-dropdown">
              {examples.map(example => <a className="navbar-item" onClick={e => {
                dispatch({ type: 'CHANGE_CODE', code: example.code })
              }
              }>{example.name}</a>)}
            </div>

          </div>



          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Themes</a>

            <div className="navbar-dropdown">

              <a className="navbar-item" style={{
                border: `2px solid ${nextTheme.colors.brand}`,
                background: `${nextTheme.colors.bg}`,
                color: `${nextTheme.colors.fg}`
              }}
                onClick={e => {
                  dispatch({ type: 'CHANGE_THEME', theme: nextTheme })
                }}>
                Next theme: {nextThemeName}
              </a>

              {allThemes.map(t => <a className="navbar-item"
                style={{
                  border: `2px solid ${t.colors.brand}`,
                  background: `${t.colors.bg}`,
                  color: `${t.colors.fg}`
                }}
                onClick={e => {
                  dispatch({ type: 'CHANGE_THEME', theme: allThemes.find(t2 => t2.name === t.name)! })
                }}>
                Set {t.name} theme
              </a>)}
            </div>

          </div>

        </div>

      </div>
    </nav>
  }
}

