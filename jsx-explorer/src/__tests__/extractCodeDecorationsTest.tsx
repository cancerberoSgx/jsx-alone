import { extractCodeDecorations } from '../codeWorker/extractCodeDecorations';
import { createProject } from '../codeWorker/ts-simple-ast';
import { unique } from 'jsx-alone-core';
import { TypeGuards } from 'ts-simple-ast';

describe('extractCodeDecorationsTest', () => {

  it('variedad de cosas', () => {


// // const code = `

// // import {JSXAlone} from './index'

// // interface P{
// //   a:number
// //   readonly b:string
// //   c(a: number[]):string[]
// //   d?: Date[]
// // }

// // const C = (p: P)=><div></div>
// // const D = (p: {children: JSX.Element, a: Array<number>})=><div>
// //    <br/>
// //    some text too 
// //   <C a={1} b="hello" c={(a:number[])=>[]} d={[]}></C>
// // </div>
// // export const x = 1
// // ` 

const code2 = `
import {JSXAlone} from './index'
let a = (a:number[], b?:Date[])=>[[4]]
const c = [[new Date()], a([1])]
export const C = () => <article id="string"><h1>title</h1><hr/></article>

`
// const fn = unique()+'.tsx'
// const p = createProject([{fileName: fn, content: code2}])
// console.log(p.getPreEmitDiagnostics().map(d=>d.getMessageText()+' - '+(d.getSourceFile() && d.getSourceFile()!.getBaseName())));

// const f = p.getSourceFile(fn)!
// // console.log('name1sssss: ' + f.getDescendants().filter(TypeGuards.isJsxElement).map(e=>e.getType().getText()))



const fn3 = unique()+'.tsx'
const project = createProject([{fileName: fn3, content: code2}])

// console.log(p3.getPreEmitDiagnostics().map(d=>d.getMessageText()+' - '+(d.getSourceFile() && d.getSourceFile()!.getBaseName())));

const sourceFile = project.getSourceFile(fn3)!
// console.log('3333333: ' + f3.getDescendants().filter(TypeGuards.isJsxElement).map(e=>e.getType().getText()))

// const fn2 = unique()+'.tsx'
    const decors = extractCodeDecorations({code : sourceFile.getText(), version: 2, title: fn3, jsxAst: {mode: 'forEachChild'}},sourceFile, project) 

    // console.log('DECORS: ', decors.filter(d=>d.nodeType).map(d=>`${d.kind} = ${d.nodeType}  ${d.type}`))
    
  })

})
