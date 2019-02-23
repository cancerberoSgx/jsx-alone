import { ReactLike } from '../createElement';
import { renderInDOM } from '../renderInHtml';
import { Bind } from '../util/Bind';
import { Select } from '../util/Select';
export function renderWithAmdFilesTest1(): JSX.Element {
  return <div>
    <Bind name="needed" data={{ n: 1 }}></Bind>
    <button onClick={e => {
      renderInDOM(<div>hello</div>, '#id1')
      renderInDOM(<Select options={['s', 'd']} onChange={e => {
        renderInDOM(<Select options={['1s', 'd2', e!]}></Select>, '#id1')
      }}></Select>, '#id2')
    }}>click</button>
    <div id="id1"></div>
    <div id="id2"></div>
  </div>
}
