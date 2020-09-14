import { concat, ComponentProps } from '@/utils/component';

import styles from './loading.less';

export default function Loading(props: ComponentProps<{ count?: number; loading?: boolean }>) {
  const { count = 5, loading = true, className, children, ...restProps } = props;
  return (
    <div
      className={concat(styles.wrapper, loading ? styles.onloading : '', className)}
      {...restProps}
    >
      <div className={styles.loading}>
        {Array(count)
          .fill(0)
          .map((_, idx) => (
            <span key={idx} style={{ animationDelay: `${idx * 0.2}s` }}></span>
          ))}
      </div>
      {children && <div className={styles.inner}>{children}</div>}
    </div>
  );
}
