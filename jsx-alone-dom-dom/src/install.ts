import { getGlobal } from './__tests__/util';
import { Document } from './document';
import { Node } from './node';

export function install() {
  const g = getGlobal()
  const document = new Document()
  g.document = document
  g.Node = Node
}

export function uninstall() {
  const g = getGlobal()
  delete g.document
  delete g.Node
}