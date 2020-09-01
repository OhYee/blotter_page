import React from 'react';

import { Triangle, Filter } from '@/components/svg';
import Button from '@/components/button';
import Input, { Option, CheckBox } from '@/components/input';
import { Modal } from '@/components/popover';
import { Flex } from '@/components/container';
import { Left } from '@/components/svg';

import { concat, ComponentProps } from '@/utils/component';

import styles from './table.less';
import { update } from '@/extensions/queue/api';
import Pagination, { PaginationProps } from '../pagination';
import Loading from '../loading';

type KeyOfT<T> = Extract<keyof T, string>;

export declare type Column<T extends { [key: string]: any }> = {
  key: KeyOfT<T>;
  width?: React.Key;
  minWidth?: React.Key;
  maxWidth?: React.Key;
  title?: React.ReactNode | ((key: KeyOfT<T>) => React.ReactNode);
  footer?: React.ReactNode | ((key: KeyOfT<T>) => React.ReactNode);
  headStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  footStyle?: React.CSSProperties;
  render?: (value: any, item: T, idx: number, data: T[]) => React.ReactNode;
  sorter?: (a: T, b: T) => number;
  filter?: {
    filters: (string | number)[];
    onFilter: (filters: any[], item: T, idx: number) => boolean;
  };
};

export declare type TableProps<T> = ComponentProps<{
  columns: (Column<T> | string)[];
  data: T[];
  showHeader?: boolean;
  defaultOrder?: {
    sortKey: keyof T | '';
    ascending: boolean;
  };
  pagination?: boolean | PaginationProps;
  loading?: boolean | JSX.Element;
  expand?: (item: T, idx: number) => React.ReactNode;
}>;

export default function Table<T>(props: TableProps<T>) {
  const {
    columns,
    data,
    style,
    showHeader = true,
    defaultOrder = { sortKey: '', ascending: false },
    pagination = false,
    loading = false,
    expand,
  } = props;
  if (!!loading) return loading === true ? <Loading /> : loading;

  // 将简写的列拓展为标准的 Column 类型
  const cols = React.useMemo(
    () => columns.map((col) => (typeof col === 'string' ? ({ key: col } as Column<T>) : col)),
    [columns],
  );

  // 初始化过滤器部分
  // 每个列的过滤器
  const [filters, setFilters] = React.useState(
    {} as { [key: string]: (filters: any[], item: T, idx: number) => boolean },
  );
  // 过滤值
  const [filtersValues, setFiltersValues] = React.useState({} as { [key: string]: any[] });
  // 过滤器弹出框
  const [filterModal, setFilterModal] = React.useState(false as Column<T> | false);

  // 列表内容操作
  var showData = data.concat([]);
  // 过滤
  Object.keys(filters).map(
    (key) =>
      (showData = showData.filter((item, idx) => filters[key](filtersValues[key], item, idx))),
  );

  // 排序
  const [sortKey, setSortKey] = React.useState(defaultOrder.sortKey);
  const [ascending, setAscending] = React.useState(defaultOrder.ascending);
  const sortCols = cols.filter((col) => col.key === sortKey);
  const sorter = sortCols.length > 0 ? sortCols[0].sorter : undefined;

  if (sorter) {
    showData.sort(sorter);
    if (!ascending) showData.reverse();
  }

  // 分页
  const [pageCurrent, setPageCurrent] = React.useState(
    typeof pagination !== 'boolean' ? pagination.page : 1,
  );
  const [pageSize, setPageSize] = React.useState(
    typeof pagination !== 'boolean' ? pagination.size : 10,
  );

  const paginationProps = React.useMemo(
    () => ({
      ...{
        page: pageCurrent,
        size: pageSize,
        total: showData.length,
        onChange: (page, size) => {
          setPageCurrent(page);
          setPageSize(size);
        },
      },
      ...(typeof pagination !== 'boolean' ? pagination : {}),
    }),
    [pagination, pageCurrent, pageSize, showData],
  );
  if (pagination !== false) {
    showData = showData.slice(
      (paginationProps.page - 1) * paginationProps.size,
      paginationProps.page * paginationProps.size,
    );
  }

  // 表格扩展
  const reducer = (state: { [key: number]: boolean }, action: number | 'init') => {
    console.log(state, action);
    if (action === 'init') return {};
    return { ...state, [action]: !state[action] };
  };
  const [expanded, setExpanded] = React.useReducer(reducer, {});

  const resetTable = () => {
    paginationProps.onChange(1, paginationProps.size);
    setExpanded('init');
  };

  return (
    <div className={styles.table} style={style}>
      <table>
        {showHeader ? (
          <thead style={{ visibility: showHeader ? 'visible' : 'hidden' }}>
            <tr>
              {!!expand ? <td></td> : null}
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
                            resetTable();
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
                            resetTable();
                          }}
                        />
                      </span>
                    ) : null}
                    {!!col.filter ? (
                      <span className={styles.filter}>
                        <Button
                          className={styles.sorter_icon}
                          icon={<Filter />}
                          size="small"
                          style={{
                            color: !!filters[col.key] ? 'var(--primary)' : 'unset',
                          }}
                          onClick={() => {
                            setFilterModal(col);
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
          {showData.map((item, idx) => [
            <tr key={idx}>
              {!!expand ? (
                <td onClick={() => setExpanded(idx)}>
                  <Left className={concat(styles.prefix, !expanded[idx] ? styles.close : '')} />
                </td>
              ) : null}
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
            </tr>,
            !!expand && !!expanded[idx] ? (
              <tr key={`${idx}-expand`}>
                <td></td>
                <td {...{ colspan: cols.length }}>{expand(item, idx)}</td>
              </tr>
            ) : null,
          ])}
        </tbody>

        {cols.filter((col) => !!col.footer).length > 0 ? (
          <tfoot>
            <tr>
              {!!expand ? <td></td> : null}
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

      {pagination !== false ? (
        <Pagination
          {...paginationProps}
          style={{ margin: 5, ...paginationProps.style }}
          onChange={(page, size) => {
            setExpanded('init');
            paginationProps.onChange(page, size);
          }}
        />
      ) : null}

      <Modal show={filterModal !== false} close={() => setFilterModal(false)}>
        {filterModal === false ? null : (
          <div>
            <Flex direction="TB" fullWidth>
              <Flex mainAxis="flex-start" subAxis="center" subSize="middle">
                {filterModal.filter.filters.map((item) => (
                  <CheckBox
                    key={item}
                    value={
                      !!filtersValues[filterModal.key] &&
                      filtersValues[filterModal.key].indexOf(item) !== -1
                    }
                    onChange={(checked) => {
                      var array = filtersValues[filterModal.key];
                      if (!array) array = [];

                      if (checked) {
                        array.push(item);
                      } else {
                        array = array.filter((i) => i !== item);
                      }
                      setFiltersValues({
                        ...filtersValues,
                        [filterModal.key]: array,
                      });
                    }}
                  >
                    {item}
                  </CheckBox>
                ))}
              </Flex>
              <Flex mainAxis="flex-end" subAxis="center" subSize="middle">
                <Button
                  onClick={() => {
                    delete filters[filterModal.key];
                    setFilters(filters);
                    setFilterModal(false);
                    resetTable();
                  }}
                >
                  取消筛选
                </Button>
                <Button
                  onClick={() => {
                    filters[filterModal.key] = filterModal.filter.onFilter;
                    setFilters(filters);
                    setFilterModal(false);
                    resetTable();
                  }}
                >
                  使用筛选
                </Button>
              </Flex>
            </Flex>
          </div>
        )}
      </Modal>
    </div>
  );
}
