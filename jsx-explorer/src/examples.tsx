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
    name: 'conditionals',
    code: `
function conditionals() {

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
        <strong>Text</strong>: <code>"{node.getText()}..."</code><br />
        <strong>Type</strong>: <code>{node.getType().getText()}</code>
      </div>}

      {!collapsed && <ul>
        {children.map((c, i) => <li>
          <RenderNode node={c} path={path + i} onShowDetailsOf={onShowDetailsOf} mode={mode} showDetailsOf={showDetailsOf} />
        </li>)}
      </ul>}

    </div>
  }

  const props = {
    node: makeNode(),
    mode: 'getChildren',
    onShowDetailsOf(p: string, node: Node) { },
    collapsed: false,
    showDetailsOf: '/00',
    path: '/00'
  }

  return <RenderNode {...props} />
}

interface Node {
  getKindName(): string
  getType(): Node
  getText(): string
  getChildren(): Node[]
}

function makeNode(): Node {
  return {
    getKindName() { return unique('Kind') },
    getType() { return makeNode() },
    getText() { return unique('text') },
    getChildren() { return [makeNode(), makeNode()] },
  }
}

let _unique: number = 0
function unique(prefix: string = '_'): string {
  return prefix + '_' + _unique++
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