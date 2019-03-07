import { JSXAlone } from 'jsx-alone-dom'
import { registerStyle } from '../../style/styles'
import { onDesktop, css } from '../../util/media'

export function showInModal(e: JSX.Element | string, title = 'modal') {
  if (!document.querySelector('#showInModalContainer')) {
    const d = document.createElement('div')
    d.innerHTML = `
<div class="modal is-large" id="showInModalContainer">
  <div class="modal-background" onclick="document.querySelector('#showInModalContainer').classList.remove('is-active')"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <div class="modal-card-title"></div>
      <button class="delete" aria-label="close" onclick="document.querySelector('#showInModalContainer').classList.remove('is-active')"></button>
    </header>
    <section class="modal-card-body">
    </section>
  </div>
</div>`
    document.body.appendChild(d.children.item(0)!)
    document.body.addEventListener('keyup', e => {
      if (e.key === 'Escape') {
        document.querySelector('.modal')!.classList.remove('is-active')
      }
    })
  }
  document.querySelector('#showInModalContainer .modal-card-title')!.innerHTML = title
  if (typeof e === 'string') {
    document.querySelector('#showInModalContainer .modal-card-body')!.innerHTML = e
  }
  else {
    document.querySelector('#showInModalContainer .modal-card-body')!.innerHTML = ''
    document.querySelector('#showInModalContainer .modal-card-body')!.appendChild(JSXAlone.render(e))
  }
  document.querySelector('#showInModalContainer')!.classList.add('is-active')
}
