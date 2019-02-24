import { ElementLike as BaseElementLike, NodeLike as BaseNodeLike, TextNodeLike as BaseTextNodeLike } from 'jsx-alone-core';

export interface NodeLike extends  BaseNodeLike<string>{}

export interface ElementLike extends  BaseElementLike<string>{}

export interface TextNodeLike extends  BaseTextNodeLike<string>{}