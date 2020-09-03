import { concat, ComponentProps } from '@/utils/component';

import styles from './hint.less';

export default function Hint(
  props: ComponentProps<{ info?: boolean; success?: boolean; warning?: boolean; error?: boolean }>,
) {
  const {
    info = true,
    success = false,
    warning = false,
    error = false,
    className,
    style,
    children,
  } = props;
  var classList = [className];
  if (error) classList.push(styles.error);
  else if (warning) classList.push(styles.waring);
  else if (success) classList.push(styles.success);
  else if (info) classList.push(styles.info);
  return (
    <span className={concat(...classList)} style={style}>
      {children}
    </span>
  );
}
