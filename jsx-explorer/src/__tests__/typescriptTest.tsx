import { createProgram, dumpAst } from '../codeWorker/typescript'

describe('typescript', () => {
  it('createProgram', () => {
    const result = createProgram([
      {
        fileName: 't1.tsx',
        content: `
    function (){
      return <article>
        <div>{123}</div>
      </article>
    }` }
  ], {
      module: 'commonjs',
      moduleResolution: 'node',
      jsx: 'react',
      jsxFactory: 'JSXAlone.createElement'

    } as any)
    const f = result.getSourceFiles().find(s => s.fileName.endsWith('t1.tsx'))!
    expect(dumpAst(f)).toContain(`JsxElement : "<article> <div>{123}</div> </article>"`)

  })
})
