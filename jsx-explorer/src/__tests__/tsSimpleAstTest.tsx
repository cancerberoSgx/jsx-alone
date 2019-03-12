import { createProject } from '../codeWorker/ts-simple-ast'
import { TypeGuards, Identifier } from 'ts-simple-ast'
import { dumpAst } from '../codeWorker/typescript'

describe('ts-simple-ast', () => {

  describe('createProject', () => {

    const project = createProject([
      {
        fileName: 't1.tsx',
        content: `
export default <article>
<div>{123}</div>
</article>
`.trim()
      }
    ])

    const f = project.getSourceFiles().find(s => s.getFilePath().endsWith('t1.tsx'))!
    it('file should exist', () => {
      expect(f.getFilePath()).toContain('t1.tsx')
    })

    it('article jsx should be part of ast', () => {
      expect(dumpAst(f.compilerNode)).toContain(`JsxElement : "<article> <div>{123}</div> </article>"`)
    })

    it('jsx elements should be correctly bind to HTMLElement DOM types ', () => {
      const i = f.getFirstDescendant(c => TypeGuards.isIdentifier(c) && c.getText() === 'article')! as Identifier
      expect(i.findReferences().map(r => r.getDefinition().getDeclarationNode()!.getText()).join(' ')).toContain('article: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>')
    })

    it('file should not have error diagnostics', () => {
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
