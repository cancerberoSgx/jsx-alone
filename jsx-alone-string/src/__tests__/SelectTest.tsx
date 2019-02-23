import { writeFileSync } from 'fs';
import { ReactLike } from "../../jsx/createElement";
import { StatelessComponent } from '../../jsx/StatelessComponent';
import { Select } from '../../jsx/util/Select';
import { renderInHTMLDocument } from '../renderInHtml';
import { installArrayPrototypeFind } from '../../misc/arrayPrototypeFind';

installArrayPrototypeFind()

interface Props {
  type?: string
}
class SelectTest extends StatelessComponent<Props> {
  render() {

    return <div>
      <Select options={['s', '2', 'd']} onChange={value => {
        console.log('Select', value);
        
      }}></Select>

    </div>

  }
}


writeFileSync('src/jsx/__tests__/test.html', renderInHTMLDocument(<SelectTest></SelectTest>))
