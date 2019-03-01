import { JSXAloneJsonImpl as JSXAlone } from '../JsonImpl'

describe('attributes', () => {

  // it('du', ()=>{

  //   expect(1).toBe(1)
  //   const p = <p className="foo" dangerouslySetInnerHTML={{__html: '<span as="inner">html</span>'}}>gsdf</p>
  //   const s = JSXAlone.render(p)

  //   console.log(JSON.stringify(s));

  //   // print(<p style={{ border: '1 px solid pink' }}>hs you</p>)
  // })
  it('style', () => {
    expect(
      JSXAlone.render(<p style={{ border: '1 px solid pink' }}>hs you</p>))
      .toEqual({tag: 'p', attrs: {style: {border: '1 px solid pink'}}, children: [{content: 'hs you'}]})
  })

  it('className', () => {
    expect(
      JSXAlone.render(<p className="foo">g<span className={['s', 'd'].join(' ')}>s</span>g</p>))
      .toEqual({tag: 'p', attrs: {className: 'foo'}, children: [{content: 'g'}, {tag: 'span', attrs: {className: 's d'}, children: [{content: 's'}]}, {content: 'g'}]}
      )
  })
  it('innerHtml', () => {
    expect(
      JSXAlone.render(<p className="foo" dangerouslySetInnerHTML={{__html: '<span as="inner">html</span>'}}>gsdf</p>))
      .toEqual({tag: 'p', innerHtml: '<span as="inner">html</span>', attrs: {className: 'foo'}, children: [{content: 'gsdf'}]}
      )
  })
})
