import { ElementLike as BaseElementLike, NodeLike as BaseNodeLike, TextNodeLike as BaseTextNodeLike } from 'jsx-alone-core';

export interface NodeLike extends  BaseNodeLike<HTMLElement|Text>{}

export interface ElementLike extends  BaseElementLike<HTMLElement|Text>{}

export interface TextNodeLike extends  BaseTextNodeLike<HTMLElement|Text>{}