import { start } from '../start';

describe('functional', () => {

  describe('should start the whole thing', () => {
    document.body.innerHTML=''
    start()

    console.log(document.body.innerHTML);
    
  })

})
