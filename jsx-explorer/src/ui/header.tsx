import { ForkRibbon } from './forkRibbon'
import { JSXAlone } from 'jsx-alone-dom'
import { State, Layout, Theme } from '../store/types'
import { darkTheme, lightTheme } from '../style/theme'
import { Component } from '../component';
import { dispatch } from '../main';

interface P {
  theme: Theme
}

export class Header extends Component<P> {
  render() {

    return <nav className="navbar" role="navigation" aria-label="main navigation">
      <ForkRibbon />
      <div className="navbar-brand">
        <a className="navbar-item" href="TODO">
          {'<JSX>Alone</JSX>'}
        </a>

        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">Home</a>

          <a className="navbar-item">Documentation</a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>

            <div className="navbar-dropdown">
              <a className="navbar-item">About</a>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">
                Contact
          </a>
              <hr className="navbar-divider"></hr>
              <a className="navbar-item">
                Report an issue
          </a>
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
