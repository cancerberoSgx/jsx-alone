import { installJSXAloneAsGlobal } from 'jsx-alone-core'
import { JSXAlone } from 'jsx-alone-dom'
import { Main } from './components/main'
import { initMonacoWorkers } from './monaco/monaco'
import { installCodeWWorker as installCodeWorker } from './codeWorker/codeWorkerManager';
import { registerSingleStoreSubscriber } from './store/store';

installCodeWorker()
installJSXAloneAsGlobal(JSXAlone)
initMonacoWorkers()



const initialState = registerSingleStoreSubscriber(state => {
  main && main.onStateUpdate( state )
})

const main = new Main({ state: initialState})
JSXAlone.render(main.asJSXElement(), { parent: document.body }) as HTMLElement
JSXAlone.lastEventManager!.onAppendToDom()
