import { JSXAlone } from 'jsx-alone-dom'

export function Error(props: {
  error: Error & {
    evaluated: string;
  };
  title?: string;
}) {
  const { error, title = 'ERROR' } = props;
  return <div>
    <h3>{title}</h3>
    Name: {error.name}<br />
    Message: {error.message}<br />
    Stack: <pre>
      {(error.stack || '')}
    </pre>
    Evaluated: <pre>
      {(error.evaluated || '')}
    </pre>
  </div>;
}
