import { unique } from 'jsx-alone-core';
import { Identifier, TypeGuards, JsxOpeningElement } from 'ts-simple-ast';
import { createProject } from '../codeWorker/ts-simple-ast';
import { dumpAst } from '../codeWorker/typescript';

describe('tsSimpleAst', () => {

  describe('type inference', () => {

    const fileName = unique() + 'shs' + '.tsx'

    const p = createProject([{
      fileName, content: `
import {JSXAlone} from './index'
export const C = (p: { names: string[] }) =>
<ul>{p.names.map(name =>
  <li className={name}>{name}
    <button onClick={e => alert('aught')}>>click me
    </button>
  </li>)}
</ul>
` }])

    const f = p.getSourceFile(fileName)!

    it('no errors', () => {

      expect(p.getPreEmitDiagnostics().map(d => d.getMessageText() + ' - ' + (d.getSourceFile() && d.getSourceFile()!.getBaseName()))).toHaveLength(0)
    })

    const button = f.getFirstDescendant(d => TypeGuards.isJsxOpeningElement(d) && d.getTagNameNode().getText().includes('button')) as JsxOpeningElement

    it('able to infer the exact tag node type', () => {

      expect(button.getTagNameNode().getContextualType()!.getText()).toContain(`JSX.IntrinsicAttributes & import("/index").ClassAttributes<HTMLButtonElement> & import("/index").ButtonHTMLAttributes<HTMLButtonElement>
    `.trim())
    })

    it('able to infer all applicable attributes names for that tag', () => {
      expect(button.getAttributes().map(a => a.getType().getText())).toEqual(["(e: import(\"/index\").MouseEvent<HTMLButtonElement, import(\"/index\").AbstractCoreMouseEvent>) => void"])

      const attrs = button.getTagNameNode().getContextualType()!
        .getApparentProperties().map(p => p.getName())

        ;
      ['onSelectCapture', 'aria-modal', 'autoFocus'].forEach(a => expect(attrs).toContain(a))
    })

  })



  describe('diagnostics and types', () => {

    it('should guess types', () => {

      const fn = unique('ff') + '.tsx'
      const project1 = createProject([{
        fileName: fn, content: `
import {JSXAlone} from './index'
function hello(a:number[][]) {return <div id={a[1][1]+''}>{a[0][1]}}</div>}
export const aaa = hello([[1,2]])
` }])
      const sourceFile = project1.getSourceFile(fn)!

      expect(project1.getPreEmitDiagnostics().map(d => d.getMessageText() + ' - ' + (d.getSourceFile() && d.getSourceFile()!.getBaseName()))).toHaveLength(0)

      const name1 = sourceFile.getDescendants().find(TypeGuards.isCallExpression)!.getArguments().map(p => p.getType().getText()).join(', ')

      expect(name1).toBe('number[][]')

    })


    it('jsx code should not have diagnostic errors', () => {
      const fn = unique('ffsss') + '.tsx'
      const p2 = createProject([
        {
          fileName: fn,
          content: `
import {JSXAlone} from './index'
export default <article>
<div>{123}</div>
</article>
    `.trim()
        }
      ])
      const f = p2.getSourceFile(fn)!
      expect(p2.getPreEmitDiagnostics().map(d => d.getMessageText() + ' - ' + (d.getSourceFile() && d.getSourceFile()!.getBaseName()))).toHaveLength(0)

    })





  })



  describe('old test - TODO: remove', () => {
    const fileName = unique() + 'shs' + '.tsx'
    const project = createProject([
      {
        fileName,
        content: `
import {JSXAlone} from './index'
export default <article>
<div>{123}</div>
</article>
  `.trim()
      }
    ])
    const f = project.getSourceFiles().find(s => s.getFilePath().endsWith(fileName))!
    it('file should exist', () => {
      expect(f.getFilePath()).toContain(fileName)
    })
    it('article jsx should be part of ast', () => {
      expect(dumpAst(f.compilerNode)).toContain(`JsxElement : "<article> <div>{123}</div> </article>"`)
    })
    it('jsx elements should be correctly bind to HTMLElement DOM types ', () => {
      const i = f.getFirstDescendant(c => TypeGuards.isIdentifier(c) && c.getText() === 'article')! as Identifier
      expect(i.findReferences().map(r => r.getDefinition().getDeclarationNode()!.getText()).join(' ')).toContain('article: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>')
    })
    xit('file should not have error diagnostics', () => {// makes node.js explodes
      expect(f.getPreEmitDiagnostics()).toHaveLength(0)
      expect(project.getProgram().getDeclarationDiagnostics()).toHaveLength(0)
      expect(project.getProgram().getGlobalDiagnostics()).toHaveLength(0)

      // The following fails, probably because files packed is too large

      // expect(project.getProgram().getSemanticDiagnostics()).toHaveLength(0)
      // expect(project.getPreEmitDiagnostics()).toHaveLength(0)
      // expect(project.getProgram().compilerObject.getDeclarationDiagnostics()).toHaveLength(0)
      // expect(project.getProgram().compilerObject.getSyntacticDiagnostics()).toHaveLength(0)
    })

  })


})
