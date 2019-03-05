import { ClassRule, Styles } from 'jsx-alone-core';
import { ElementClass, JSXAlone } from 'jsx-alone-dom';
import { State } from '../store/types';
import { Editor } from './editor';
import { Header } from './header';
import { registerStyle } from '../style/styles';
import { Component } from '../component';
import { Explorer } from './explorer';
import { Logger } from './logger';

interface P {
  state: State
}
registerStyle(`
`)

export class App extends Component<P> {
  render() {
    const s = {
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
    }
    registerStyle(s)
    const { classes } = Styles(s)
    return <section className={`section `}>
      <Header theme={this.props.state.layout.theme} />
      <div className={`container ${classes.firstContainer}`}>
        <h1 className="title">
          JSX Explorer
        </h1>
        <p className="subtitle">
          See what's inside <strong>JSX</strong> when is rendered!
        </p>
      </div>
      <div className={`container ${classes.mainContainer}`}>

        <div className="tile is-ancestor">
          <div className="tile is-vertical is-4">
            <article className="tile is-child">
              <Explorer  editor={this.props.state.editor}></Explorer>
            </article>
          </div>

          <div className="tile is-vertical is-8">
            <article className="tile is-child ">
              <Editor {...this.props} />
            </article>
          </div>
        </div>

        {/* <div className="columns">
          <div className={`column is-one-third`}>
            <Explorer editor={this.props.state.editor}></Explorer>
          </div>
          <div className={`column is-two-thirds`}>
            <Editor {...this.props} />
          </div>
        </div>
     */}


        {/* <Logger status={this.state.state.status}></Logger> */}

      </div>
    </section>
  }
}
