import { JSXAlone } from 'jsx-alone-dom';
import { Component } from './util/component';
import { dispatch } from '../main';
import { Theme } from '../store/types';
import { darkTheme, lightTheme } from '../style/theme';
import { ForkRibbon } from './content/forkRibbon';
import { showInModal } from './util/showInModal';
import { WhatsThis } from './content/whatsThis';
import { examples } from '../examples';

interface P {
  theme: Theme
}

export class Header extends Component<P> {

  render() {

    return <nav className="navbar" role="navigation" aria-label="main navigation">
      <ForkRibbon />
      <div className="navbar-brand">
        <a className="navbar-item" href="TODO">
          {'<JSX explorer/>'}
        </a>

        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={e => this.query('#navbarBasicExample').classList.toggle('is-active')}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
 
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item" onClick={e => showInModal(<WhatsThis />)}>What's this</a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Examples</a>

            <div className="navbar-dropdown">
              {examples.map(e => <a className="navbar-item">{e.name}</a>)}
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button" onClick={e => {
                const newTheme = this.props.theme.name === 'dark' ? lightTheme : darkTheme
                dispatch({ type: 'CHANGE_THEME', theme: newTheme })
              }}>
                Switch to {this.props.theme.name === 'dark' ? 'light' : 'dark'} theme
              </button>

            </div>
          </div>
        </div>
      </div>
    </nav>
  }
}

