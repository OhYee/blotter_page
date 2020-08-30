import React from 'react';

import { Triangle } from '@/components/svg';
import Button from '@/components/button';

import { ComponentProps } from '@/utils/component';

import styles from './table.less';

export declare type Column<T extends { [key: string]: any }> = {
  key: keyof T extends string ? keyof T : never;
  width?: React.Key;
  minWidth?: React.Key;
  maxWidth?: React.Key;
  title?: React.ReactNode | ((key: keyof T) => React.ReactNode);
  footer?: React.ReactNode | ((key: keyof T) => React.ReactNode);
  headStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  footStyle?: React.CSSProperties;
  render?: (value: any, item: T, idx: number, data: T[]) => React.ReactNode;
  sorter?: (a: T, b: T) => number;
};

export declare type TableProps<T> = ComponentProps<{
  columns: (Column<T> | string)[];
  data: T[];
  showHeader?: boolean;
}>;

export default function Table<T>(props: TableProps<T>) {
  const { columns, data, style, showHeader = true } = props;
  const [sortKey, setSortKey] = React.useState('' as keyof T | '');
  const [ascending, setAscending] = React.useState(true);

  const cols = React.useMemo(
    () => columns.map((col) => (typeof col === 'string' ? ({ key: col } as Column<T>) : col)),
    [columns],
  );

  const sortCols = cols.filter((col) => col.key === sortKey);
  const sorter = sortCols.length > 0 ? sortCols[0].sorter : undefined;

  const showData = data.concat([]);
  if (sorter) {
    showData.sort((a, b) => sorter(a, b));
    if (ascending) showData.reverse();
  }

  return (
    <div className={styles.table} style={style}>
      <table>
        {showHeader ? (
          <thead style={{ visibility: showHeader ? 'visible' : 'hidden' }}>
            <tr>
              {cols.map((col) => (
                <th key={col.key} style={col.headStyle}>
                  <div className={styles.title}>
                    {!col.title
                      ? col.key
                      : typeof col.title === 'function'
                      ? col.title(col.key)
                      : col.title}
                    {!!col.sorter ? (
                      <span className={styles.sorter}>
                        <Button
                          className={styles.sorter_icon}
                          icon={<Triangle />}
                          size="small"
                          style={{
                            color: sortKey === col.key && ascending ? 'var(--primary)' : 'unset',
                          }}
                          onClick={() => {
                            setSortKey(sortKey === col.key && ascending ? '' : col.key);
                            setAscending(true);
                          }}
                        />
                        <Button
                          className={styles.sorter_icon}
                          icon={<Triangle style={{ transform: 'rotate(180deg)' }} />}
                          size="small"
                          style={{
                            color: sortKey === col.key && !ascending ? 'var(--primary)' : 'unset',
                          }}
                          onClick={() => {
                            setSortKey(sortKey === col.key && !ascending ? '' : col.key);
                            setAscending(false);
                          }}
                        />
                      </span>
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        ) : null}

        <tbody>
          {showData.map((item, idx) => (
            <tr key={idx}>
              {cols.map((col) => (
                <td
                  key={col.key}
                  style={{
                    ...(idx === 0
                      ? { width: col.width, minWidth: col.minWidth, maxWidth: col.maxWidth }
                      : {}),
                    ...col.style,
                  }}
                >
                  {!!col.render ? col.render(item[col.key], item, idx, data) : item[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        {cols.filter((col) => !!col.footer).length > 0 ? (
          <tfoot>
            <tr>
              {cols.map((col) => (
                <td key={col.key} style={col.footStyle}>
                  {!col.footer
                    ? null
                    : typeof col.footer === 'function'
                    ? col.footer(col.key)
                    : col.footer}
                </td>
              ))}
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  );
}
