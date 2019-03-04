import { ForkRibbon } from './forkRibbon'
import { JSXAlone } from 'jsx-alone-dom'
import { State, Layout, Theme } from '../store/types'
import { darkTheme, lightTheme } from '../style/theme'
import { Component } from '../component';
import { dispatch } from '../main';

interface P {
  theme: Theme
}
// let p: P
export class Header extends Component<P> {
  render() {
    // heads up , because of an issue that the event handlers are bind to an old this, we need to read props from an external variable
    // const { theme } = this.props
    // console.log(theme.name);
// p=this.props

    return <nav className="navbar" role="navigation" aria-label="main navigation">
      <ForkRibbon />
      <div className="navbar-brand">
        <a className="navbar-item" href="TODO">
          {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"></img> */}
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
                // this wont work because of an issue: event handlers are bind to an old this, we need to read props from an external variable
                const newTheme = this.props.theme.name === 'dark' ? lightTheme : darkTheme
                console.log(newTheme.name);
                
                // const newTheme = p.theme.name === 'dark' ? lightTheme : darkTheme

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
