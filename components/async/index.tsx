import React from 'react';
import { ComponentProps } from '@/utils/component';

export default function Async(
  props: ComponentProps<{
    generate?: () => Promise<React.ReactNode>;
  }>,
) {
  const { generate, children } = props;
  const [realChildren, setRealChildren] = React.useState<React.ReactNode>(undefined);
  React.useEffect(() => {
    generate().then((c) => setRealChildren(c));
  }, [generate]);
  return (
    <React.Fragment>{typeof realChildren === 'undefined' ? children : realChildren}</React.Fragment>
  );
}
