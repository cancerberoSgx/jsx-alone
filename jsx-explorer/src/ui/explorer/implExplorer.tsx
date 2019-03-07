import { JSXAlone } from 'jsx-alone-dom';
import { ExplorerProps } from './explorers';
import { Component } from '../util/component';
import { escapeHtml, query } from '../../util/util';
import { evaluate, EvaluateTimes } from "../../util/evaluate";
import { Error } from '../util/error';
import { registerStyle } from '../../style/styles';
import { printMs } from 'jsx-alone-core';

interface P extends ExplorerProps {
  indent?: boolean
}


registerStyle(`
.impl-explorer-container{
  display: none;
}
.impl-explorer-container.is-active{
  display: block;
}
`)

export class ImplExplorer extends Component<P> {

  private stringError: Error & { evaluated: string; } | undefined
  private stringOutput: string | undefined
  private domError: Error & { evaluated: string; } | undefined
  private domOutput: HTMLElement | undefined
  private domTimes: EvaluateTimes = {}
  private stringTimes: EvaluateTimes = {}

  afterRender(e: HTMLElement) {
    super.afterRender(e)
    this.domOutput && !this.domError && this.query('.impl-explorer-container.dom').appendChild(this.domOutput)
  }

  render() {
    try {
      this.stringOutput = evaluate(this.props.editor.code, 'string', this.stringTimes)
      this.stringError = undefined
    } catch (ex) {
      this.stringError = ex
      this.stringOutput = undefined
    }
    try {
      this.domOutput = evaluate(this.props.editor.code, 'dom', this.domTimes)
      this.domError = undefined
    } catch (ex) {
      this.domError = ex
      this.domOutput = undefined
    }

    return <div className="implExplorerContent">

      <div className="content">

        <p>Here, you can see the output of JSX-Alone using JSX-Alone implementations independently. </p>

        <ul>

          <li><p>The <strong>string implementation</strong> renders JSX elements as string so it can be used in the server.</p>
            <p> Notice that in this implementation event handlers referencing external names won't work.</p>
          </li>

          <li><p>
            The <strong>DOM implementation</strong> renders JSX elements directly in the DOM, creating HTMLElements on the fly. This is the implementation used by this program.
          </p>
            <p> Notice that in this implementation event handlers should mostly work (consider that the code is eval()uated so some variables could not be available when the handler is called.</p>
          </li>
        </ul>
      </div>

      <h3 className="h3">Output</h3>

      <div className="tabs is-small is-boxed is-toggle">
        <ul>
          <li className="impl-explorer-tab string is-active">
            <a onClick={e => this.selectTab('string')}>String</a>
          </li>
          <li className="impl-explorer-tab string-code">
            <a onClick={e => this.selectTab('string-code')}>String Code</a>
          </li>
          <li className="impl-explorer-tab dom">
            <a onClick={e => this.selectTab('dom')}>DOM</a>
          </li>
          <li className="impl-explorer-tab dom-code">
            <a onClick={e => this.selectTab('dom-code')}>DOM Code</a>
          </li>
        </ul>
      </div>

      <div className="impl-explorer-container string is-active">
        <div>
          Evaluate time: {printMs(this.stringTimes.eval || 0) || '0 ms'}.
          Render time: {printMs(this.stringTimes.render || 0) || '0 ms'}
        </div>
        {this.stringError && <Error error={this.stringError} title="Error in string implementation" />}
        {!this.stringError && this.stringOutput && <div dangerouslySetInnerHTML={{ __html: this.stringOutput }}></div>}
      </div>
      <div className="impl-explorer-container string-code">
        <div>
          Evaluate time: {printMs(this.stringTimes.eval || 0) || '0 ms'}.
          Render time: {printMs(this.stringTimes.render || 0) || '0 ms'}.
          </div>
        {this.stringError && <Error error={this.stringError} title="Error in string implementation" />}
        {!this.stringError && this.stringOutput && <pre dangerouslySetInnerHTML={{ __html: escapeHtml(this.stringOutput) }}></pre>}
      </div>

      <div className="impl-explorer-container dom" dangerouslySetInnerHTML={{ __html: '' }}>
        <div>
          Evaluate time: {printMs(this.domTimes.eval || 0) || '0 ms'}.
          Render time: {printMs(this.domTimes.render || 0) || '0 ms'}
        </div>
        {this.domError && <Error error={this.domError} title="Error in DOM implementation" />}
      </div>
      <div className="impl-explorer-container dom-code">
        <div>
          Evaluate time: {printMs(this.domTimes.eval || 0) || '0 ms'}.
          Render time: {printMs(this.domTimes.render || 0) || '0 ms'}
        </div>
        {this.domError && <Error error={this.domError} title="Error in DOM implementation" />}
        {!this.domError && this.domOutput && <pre dangerouslySetInnerHTML={{ __html: escapeHtml(this.domOutput.outerHTML) }}></pre>}
      </div>

    </div>
  }

  private selectTab(t: string): void {
    this.queryAll('.impl-explorer-tab, .impl-explorer-container').forEach(e => e.classList.remove('is-active'))
    this.queryAll(`.impl-explorer-tab.${t}, .impl-explorer-container.${t}`).forEach(e => e.classList.add('is-active'))
  }
}

