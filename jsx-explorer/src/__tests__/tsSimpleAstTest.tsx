import { createProject } from '../util/ts-simple-ast';
import { dumpAst } from '../util/typescript';

describe('ts-simple-ast', () => {
  
  it('createProgram', () => {

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
    // console.log(project.formatDiagnosticsWithColorAndContext(project.getPreEmitDiagnostics()));
    expect(project.getPreEmitDiagnostics()).toHaveLength(0)

    // console.log(dumpAst(f.compilerNode));
    expect(dumpAst(f.compilerNode)).toContain(`JsxElement : "<article> <div>{123}</div> </article>"`)


  })
})
