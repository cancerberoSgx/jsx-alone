import { Node, Project } from 'ts-simple-ast'
import { lib_es5_d_ts } from './lib_es5_d_ts'
import { lib_dom_d_ts } from './lib_dom_d_ts'
import { domDeclarations_d_ts } from './domDeclarations_d_ts'
import { cssDeclarations_d_ts } from './cssDeclarations_d_ts'

let project: Project | undefined

export function createProject(files: { fileName: string, content: string }[]): Project {
  if (!project) {
    project = new Project({
      useVirtualFileSystem: true,
      compilerOptions: {
        strict: true,
        jsx: 'react',
        jsxFactory: 'JSXAlone.createElement'
      } as any
    })
    project.createSourceFile('lib.es5.d.ts', lib_es5_d_ts)
    project.createSourceFile('lib.dom.d.ts', lib_dom_d_ts)
    project.createSourceFile('domDeclarations.d.ts', domDeclarations_d_ts)
    project.createSourceFile('cssDeclarations.d.ts', cssDeclarations_d_ts)

    files.forEach(f => project!.createSourceFile(f.fileName, f.content))

  }
  else {
    files.forEach(f => {
      if (project!.getSourceFile(f.fileName)!.getText() !== f.content) {
        project!.getSourceFile(f.fileName)!.replaceWithText(f.content)
      }
    })

  }
  project.saveSync()
  return project
}

/**
 * like Node.getChildren but using forEachChild(). TODO: perhaps is a good idea to add a useForEachChild to
 * ts-simple-ast getChildren that is optional but if provided do this ?
 */
export function getChildrenForEachChild(n: Node): Node[] {
  const result: Node[] = []
  n.forEachChild(n => result.push(n))
  return result
}
