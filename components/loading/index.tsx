import styles from './loading.less';
export default function Loading(props: { count?: number }) {
  const { count = 5 } = props;
  return (
    <div className={styles.loading}>
      {Array(count)
        .fill(0)
        .map((_, idx) => (
          <span key={idx} style={{ animationDelay: `${idx * 0.2}s` }}></span>
        ))}
    </div>
  );
}
