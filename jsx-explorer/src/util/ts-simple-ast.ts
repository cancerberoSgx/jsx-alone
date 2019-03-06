import { Project, SourceFile, Node } from 'ts-simple-ast'
import { lib_es5_d_ts } from './lib_es5_d_ts';

export function createProject(files: { fileName: string, content: string }[]): Project {
  const project = new Project({
    useVirtualFileSystem: true,
    compilerOptions: {
      strict: true,
      "jsx": "react",
      "jsxFactory": "JSXAlone.createElement",
    } as any
  })

  files.forEach(f => project.createSourceFile('lib.es5.d.ts', lib_es5_d_ts))
  
  files.forEach(f => project.createSourceFile('declarations.ts', `
declare global {
  namespace JSX {
    export interface IntrinsicElements {
      [s:string]: HTMLElement
    }
    export interface HTMLElement {}
  }
}
export var a = 1 
  `))
  files.forEach(f => project.createSourceFile(f.fileName, f.content))

  return project;
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