interface Example {
  name: string, code: string
}
export const examples: Example[] = [

  {
    name: 'simple 1',
    code: `
function simple1() {
  const people = [{ name: 'Sebastián', age: 12 }, { name: 'Laura', age: 22 }]
  const t0 = Date.now()
  return <div className="people">
    <h1>People</h1>
    <ul>{people.map(p =>
      <li>
        <strong className="name">{p.name}</strong> is <span className="age">{p.age}</span> years old
      </li>)}
    </ul>
    <p>Listed {people.length} persons in {Date.now()-t0} milliseconds. </p>
    <button className="button is-primary" onClick={e=>alert(\`submitted \${people.length} persons\`)}>Submit</button>
  </div>
}
      `.trim()
  },


  {
    name: 'simple 2',
    code: `
function simple2() {
  return <div className="simple2">
    hello world
  </div>
}
      `.trim()
  },


  {
    name: 'conditionals',
    code: `
interface Node {
  getKindName(): string
  getType(): Node|undefined
  getText(): string
  getChildren(): Node[]
}
    
function conditionals() {
    
  function makeNode(p=0.5): Node|undefined {
    return Math.random()<p? {
      getKindName() { 
        return unique('Kind') 
      },
      getType() { 
        return makeNode()
      },
      getText() { 
        return unique('text') 
      },
      getChildren() { 
        return [makeNode()||makeNode()||makeNode()].filter(e=>e) 
        // return new Array(2).fill(0).map(i=>makeNode(.3)).filter(e=>e) 
      },
    } as Node : undefined
  }

  let _unique: number = 0
  function unique(prefix: string = '_'): string {
    return prefix + '_' + _unique++
  }

  function RenderNode(props: { node: Node, mode: string, onShowDetailsOf(p: string, node: Node): void, showDetailsOf: string, path: string, collapsed?: boolean }) {

    const { node, mode, onShowDetailsOf, path, collapsed, showDetailsOf } = props
    const children = mode === 'forEachChild' ? node.getChildren().reverse() : node.getChildren()

    return <div className="content" data-key={path}>

      <strong>{node.getKindName()}</strong>

      <button className="button is-small" onClick={e => {
        onShowDetailsOf(path, node);
      }}>!</button>

      <button className="button is-small" onClick={e => {
        //this.updateProps({ collapsed: !collapsed })
      }}>{collapsed ? '+' : '-'}</button>

      {!collapsed && showDetailsOf === path && <div className="nodeInfo">
        <strong>Text</strong>: <code>"{node && node.getText()}..."</code><br />
        <strong>Type</strong>: <code>{node.getType() && node.getType()!.getText()}</code>
      </div>}

      {!collapsed && <ul>
        {children.filter(c=>c).map((c, i) => <li>
          <RenderNode node={c} path={path + i} onShowDetailsOf={onShowDetailsOf} mode={mode} showDetailsOf={showDetailsOf} />
        </li>)}
      </ul>}

    </div>
  }

  const props = {
    node: makeNode(11)!,
    mode: 'getChildren',
    onShowDetailsOf(p: string, node: Node) { },
    collapsed: false,
    showDetailsOf: '/00',
    path: '/00'
  }

  return <RenderNode {...props} />
}

        `.trim()
  }
]




// import { JSXAlone } from 'jsx-alone-dom';

// function conditionals() {

//   function RenderNode(props: { node: Node, mode: string, onShowDetailsOf(p: string, node: Node): void, showDetailsOf: string, path: string, collapsed?: boolean }) {

//     const { node, mode, onShowDetailsOf, path, collapsed, showDetailsOf } = props
//     const children = mode === 'forEachChild' ? node.getChildren().reverse() : node.getChildren()

//     return <div className="content" data-key={path}>

//       <strong>{node.getKindName()}</strong>

//       <button className="button is-small" onClick={e => {
//         onShowDetailsOf(path, node);
//       }}>!</button>

//       <button className="button is-small" onClick={e => {
//         //this.updateProps({ collapsed: !collapsed })
//       }}>{collapsed ? '+' : '-'}</button>

//       {!collapsed && showDetailsOf === path && <div className="nodeInfo">
//         <strong>Text</strong>: <code>"{node.getText()}..."</code><br />
//         <strong>Type</strong>: <code>{node.getType().getText()}</code>
//       </div>}

//       {!collapsed && <ul>
//         {children.map((c, i) => <li>
//           <RenderNode node={c} path={path + i} onShowDetailsOf={onShowDetailsOf} mode={mode} showDetailsOf={showDetailsOf} />
//         </li>)}
//       </ul>}

//     </div>
//   }

//   const props = {
//     node: makeNode(),
//     mode: 'getChildren',
//     onShowDetailsOf(p: string, node: Node) { },
//     collapsed: false,
//     showDetailsOf: '/00',
//     path: '/00'
//   }

//   return <RenderNode {...props} />
// }

// interface Node {
//   getKindName(): string
//   getType(): Node
//   getText(): string
//   getChildren(): Node[]
// }

// function makeNode(): Node {
//   return {
//     getKindName() { return unique('Kind') },
//     getType() { return makeNode() },
//     getText() { return unique('text') },
//     getChildren() { return [makeNode(), makeNode()] },
//   }
// }

// let _unique: number = 0
// function unique(prefix: string = '_'): string {
//   return prefix + '_' + _unique++
// }