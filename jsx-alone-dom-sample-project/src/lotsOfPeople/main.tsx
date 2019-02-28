import { lotsOfPeople, Renderer } from 'jsx-alone-sample-project-code'
import { lotsOfPeopleRenderer } from './lotsOfPeopleRenderer';
import { JSXAlone } from 'jsx-alone-dom';

lotsOfPeople(lotsOfPeopleRenderer as Renderer, undefined, JSXAlone)