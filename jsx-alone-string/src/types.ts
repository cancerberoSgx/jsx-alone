import { ElementLike as BaseElementLike, NodeLike as BaseNodeLike, TextNodeLike as BaseTextNodeLike } from 'jsx-alone-core';
import { ElementLikeImplRenderConfig } from './config';

export interface NodeLike extends  BaseNodeLike<string>{
  render(config?: ElementLikeImplRenderConfig): string
  children: NodeLike[]
}

export interface ElementLike extends  BaseElementLike<string>{

}

export interface TextNodeLike extends  BaseTextNodeLike<string>{

}