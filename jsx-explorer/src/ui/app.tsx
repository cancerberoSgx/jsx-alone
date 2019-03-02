import { ElementClass } from 'jsx-alone-dom';
import { ClassRule, Styles, Style } from 'jsx-alone-core';
import { ForkRibbon } from './forkRibbon';
import { JSXAlone } from 'jsx-alone-dom'
import { State } from '../store/types';
import { getThemeOverrideStyles } from '../theme';
import { Header } from './header';

interface P {
  state: State;
}

export class App extends ElementClass<P> {
  render() {
    const classStyles = {
      ...getThemeOverrideStyles(this.props.state.theme),
      editorContainer: {
        width: '100%',
        height: '600px',
        border: '1px solid grey'
      } as ClassRule,
      mainContainer: {
        padding: '0 !important',
        margin: '0 !important',
        width: '100%',
        maxWidth: '100%'
      } as ClassRule,
      border: {
        borderRight: '1px solid grey'
      } as ClassRule,
      firstContainer: {
        marginBottom: '3em'
      } as ClassRule
    };
    const { styles, classes } = Styles(classStyles);

    return <section className={`section`}>
      <Style classes={styles}></Style>
      <ForkRibbon></ForkRibbon>
      <Header {...this.props}></Header>
      <div className={`container ${classes.firstContainer}`}>
        <h1 className="title">
          JSX Explorer
        </h1>
        <p className="subtitle">
          See what's inside <strong>JSX</strong> when is rendered!
        </p>
      </div>
      <div className={`container ${classes.mainContainer}`}>
        <div className="columns">
          <div className={`${classes.border} column is-one-third`}>Explorer</div>
          <div className={` column is-two-thirds`}> <div id="editorContainer" className={classes.editorContainer}></div>
          </div>
        </div>
      </div>
    </section>;
  }
}
