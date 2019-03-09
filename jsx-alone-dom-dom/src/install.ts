import { getGlobal } from './util/util';
import { MDocument } from './document';
import { MNode } from './node';

export function install() {
  const g = getGlobal()
  const document = new MDocument()
  g.document = document
  g.Node = MNode
}

export function uninstall() {
  const g = getGlobal()
  delete g.document
  delete g.Node
}