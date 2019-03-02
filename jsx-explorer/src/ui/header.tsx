import { ElementClass } from 'jsx-alone-dom';
import { ClassRule, Styles, Style } from 'jsx-alone-core';
import { ForkRibbon } from './forkRibbon';
import { JSXAlone } from 'jsx-alone-dom'
import { State } from '../store/types';
import { getThemeOverrideStyles, darkTheme, lightTheme } from '../theme';
import { store } from '../main';

interface P {
  state: State;
}

export class Header extends ElementClass<P> {
  render() {
    const classStyles = {
      border: {
        borderRight: '1px solid grey'
      } as ClassRule,
    };
    const { styles, classes } = Styles(classStyles);

    return <nav className="navbar" role="navigation" aria-label="main navigation">
    <Style classes={styles}></Style>

      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"></img>
        </a>

        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">
            Home
      </a>

          <a className="navbar-item">
            Documentation
      </a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              More
        </a>

            <div className="navbar-dropdown">
              <a className="navbar-item">
                About
          </a>
              <a className="navbar-item">
                Jobs
          </a>
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
              <button className="button" onClick={e=>{
                const theme = this.props.state.layout.theme.name==='dark' ? lightTheme: darkTheme
                store.dispatch({type: 'CHANGE_THEME', theme})
              }}>
              Switch to {this.props.state.layout.theme.name==='dark' ? 'light' : 'dark'} theme
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  }
}
