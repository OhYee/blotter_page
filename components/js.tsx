import React from 'react';

import { ComponentProps } from '@/utils/component';
import { exception } from 'console';

export default function JS(props: ComponentProps<{ js: string; children: React.ReactElement }>) {
  const { js, children } = props;
  React.useEffect(() => {
    try {
      eval(js);
    } catch (e) {
      console.warn(e);
    }
  }, []);
  return children;
}

export function AD(props: ComponentProps<{ setting: string }>) {
  const { setting, ...restProps } = props;
  const { js, html } = React.useMemo(() => splitJS(setting), [setting]);
  return (
    <JS js={js}>
      <div {...restProps} dangerouslySetInnerHTML={{ __html: html }}></div>
    </JS>
  );
}

export function splitJS(text: string) {
  var re = new RegExp(`<script.*?>(.*?)<\/script>`, 'g');
  var js: string[] = [];
  var html: string[] = [];
  var pos = 0;
  do {
    var result = re.exec(text);
    if (result !== null) {
      js.push(result[1]);
      html.push(text.slice(pos, result.index));
      pos = result.index + result[0].length;
    } else {
      html.push(text.slice(pos));
    }
  } while (result);

  return {
    js: js.join('\n'),
    html: html.join('\n'),
  };
}
