import React from 'react';

import { Triangle, Filter } from '@/components/svg';
import Button from '@/components/button';
import Input, { Option, CheckBox } from '@/components/input';
import { Modal } from '@/components/popover';
import { Flex } from '@/components/container';
import { Left, Loading } from '@/components/svg';
import Pagination, { PaginationProps } from '@/components/pagination';

import { concat, ComponentProps } from '@/utils/component';

import styles from './table.less';
import textStyles from '@/styles/text.less';

export declare type Column<T extends { [key: string]: any }> = {
  key: string;
  width?: React.Key;
  minWidth?: React.Key;
  maxWidth?: React.Key;
  title?: React.ReactNode | ((key: string) => React.ReactNode);
  footer?: React.ReactNode | ((key: string) => React.ReactNode);
  headStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  footStyle?: React.CSSProperties;
  render?: (value: any, item: T, idx: number, data: T[]) => React.ReactNode;
  sorter?: boolean | ((a: T, b: T) => number);
  filter?: {
    filters: (string | number)[];
    onFilter: (filters: any[], item: T, idx: number) => boolean;
  };
  ellipsis?: boolean;
};

export declare type TableProps<T> = ComponentProps<{
  columns: (Column<T> | string)[];
  data: T[];
  showHeader?: boolean;
  defaultOrder?: {
    sortKey: string;
    ascending: boolean;
  };
  pagination?: boolean | PaginationProps;
  loading?: boolean | JSX.Element;
  expand?: (item: T, idx: number) => React.ReactNode;
  onChange?: (
    page: number,
    size: number,
    name: string,
    ascending: boolean,
    filter: { [key: string]: any[] },
  ) => void;
}>;

type TableState = {
  page: number;
  size: number;
  sortKey: string;
  sortAscending: boolean;
  expanded: {
    [key: number]: boolean;
  };
  filterKey: string[];
  filterValue: {
    [key: string]: any[];
  };
};

const defaultState: TableState = {
  page: 1,
  size: 10,
  sortKey: '',
  sortAscending: false,
  expanded: {},
  filterKey: [],
  filterValue: {},
};
function stateReducer(
  state: TableState,
  action:
    | { name: 'init' }
    | { name: 'page'; page: number; size: number }
    | { name: 'sort'; sortKey: string; sortAscending: boolean }
    | { name: 'expand'; index: number | 'init' }
    | { name: 'filter-key'; enable: boolean; key: string }
    | { name: 'filter-value'; key: string; value: any[] },
): TableState {
  switch (action.name) {
    case 'init': {
      return defaultState;
    }
    case 'page': {
      const { page, size } = action;
      return { ...state, page, size, expanded: {} };
    }
    case 'sort': {
      const { sortKey, sortAscending } = action;
      return { ...state, page: 1, sortKey, sortAscending, expanded: {} };
    }
    case 'expand': {
      const { index } = action;
      if (index === 'init') return { ...state, expanded: {} };
      return { ...state, expanded: { ...state.expanded, [index]: !state.expanded[index] } };
    }
    case 'filter-key': {
      const { key, enable } = action;
      return {
        ...state,
        filterKey: enable
          ? state.filterKey.concat(key)
          : state.filterKey.filter((item) => item !== key),
      };
    }
    case 'filter-value': {
      const { key, value } = action;
      return {
        ...state,
        filterValue: { ...state.filterValue, [key]: value },
      };
    }
  }
}

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
    onChange,
  } = props;
  // 将简写的列拓展为标准的 Column 类型
  const cols = React.useMemo(
    () => columns.map((col) => (typeof col === 'string' ? ({ key: col } as Column<T>) : col)),
    [columns],
  );
  const columnObject: {
    [key: string]: Column<T>;
  } = React.useMemo(() => Object.assign({}, ...cols.map((col) => ({ [col.key]: col }))), [cols]);

  const [state, setState] = React.useReducer(stateReducer, {
    ...defaultState,
    sortKey: defaultOrder.sortKey,
    sortAscending: defaultOrder.ascending,
    page: typeof pagination !== 'boolean' ? pagination.page : 1,
    size: typeof pagination !== 'boolean' ? pagination.size : 10,
  });
  const { page, size, sortKey, sortAscending, expanded, filterKey, filterValue } = state;

  // 过滤器弹出框
  const [filterModal, setFilterModal] = React.useState(false as Column<T> | false);

  const filteredData = React.useMemo(() => {
    var showData = data.concat([]);
    if (typeof onChange === 'undefined')
      Object.keys(filterKey).map(
        (key) =>
          (showData =
            columnObject[key] && columnObject[key].filter
              ? showData.filter((item, idx) =>
                  columnObject[key].filter.onFilter(filterValue[key], item, idx),
                )
              : showData),
      );
    return showData;
  }, [data, onChange, columnObject, filterKey]);

  const paginationProps = React.useMemo(
    () => ({
      ...{
        page: page,
        size: size,
        total: filteredData.length,
        onChange: (page, size) => {
          setState({ name: 'page', size, page });
        },
      },
      ...(typeof pagination !== 'boolean' ? pagination : {}),
    }),
    [pagination, page, size, filteredData, setState],
  );

  // 列表内容操作
  const showData = React.useMemo(() => {
    var showData = filteredData;
    if (typeof onChange === 'undefined') {
      if (!!columnObject && !!columnObject[sortKey]) {
        const sorter = columnObject[sortKey].sorter;
        if (typeof sorter === 'function') {
          showData.sort(sorter);
          if (!sortAscending) showData.reverse();
        }
      }

      if (pagination === true || (pagination !== false && !pagination.onChange)) {
        showData = showData.slice(
          (paginationProps.page - 1) * paginationProps.size,
          paginationProps.page * paginationProps.size,
        );
      }
    }
    return showData;
  }, [filteredData, onChange, columnObject, sortKey, sortAscending, pagination, paginationProps]);

  const onTableChange = React.useCallback(
    (
      _page: number,
      _size: number,
      _sortKey: string,
      _sortAscending: boolean,
      _filter: { [name: string]: any[] },
    ) => {
      if (sortKey !== _sortKey || sortAscending !== _sortAscending) {
        setState({ name: 'sort', sortKey: _sortKey, sortAscending: _sortAscending });
      } else {
        setState({ name: 'page', page: _page, size: _size });
      }
      if (!!onChange) onChange(_page, _size, _sortKey, _sortAscending, _filter);
    },
    [sortKey, sortAscending, setState, onChange],
  );

  return (
    <div className={concat(styles.table)} style={style}>
      {!!loading && (
        <div className={styles.loading}>{loading === true ? <Loading /> : loading}</div>
      )}
      <div className={concat(styles.wrapper, !!loading ? styles.onloading : '')}>
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
                              opacity: sortKey === col.key && sortAscending ? 1 : 0.25,
                            }}
                            onClick={() => {
                              onTableChange(
                                1,
                                size,
                                sortKey === col.key && sortAscending ? '' : col.key,
                                true,
                                Object.assign(
                                  {},
                                  ...filterKey.map((key) => ({ key: filterValue[key] })),
                                ),
                              );
                            }}
                          />
                          <Button
                            className={styles.sorter_icon}
                            icon={<Triangle style={{ transform: 'rotate(180deg)' }} />}
                            size="small"
                            style={{
                              opacity: sortKey === col.key && !sortAscending ? 1 : 0.25,
                            }}
                            onClick={() => {
                              onTableChange(
                                1,
                                size,
                                sortKey === col.key && sortAscending ? '' : col.key,
                                false,
                                Object.assign(
                                  {},
                                  ...filterKey.map((key) => ({ key: filterValue[key] })),
                                ),
                              );
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
                              opacity: !!filterKey[col.key] ? 1 : 0.25,
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
                  <td onClick={() => setState({ name: 'expand', index: idx })}>
                    <Left className={concat(styles.prefix, !expanded[idx] ? styles.close : '')} />
                  </td>
                ) : null}
                {cols.map((col) => (
                  <td
                    key={col.key}
                    className={col.ellipsis !== false ? textStyles.ellipsis : ''}
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
      </div>
      {pagination !== false ? (
        <Pagination
          {...paginationProps}
          style={{ margin: 5, ...paginationProps.style }}
          onChange={(page, size) =>
            onTableChange(
              page,
              size,
              sortKey,
              sortAscending,
              Object.assign({}, ...filterKey.map((key) => ({ key: filterValue[key] }))),
            )
          }
        />
      ) : null}
      <Modal show={filterModal !== false} onClose={() => setFilterModal(false)}>
        {filterModal === false ? null : (
          <div>
            <Flex direction="TB" fullWidth>
              <Flex mainAxis="flex-start" subAxis="center" subSize="middle">
                {filterModal.filter.filters.map((item) => (
                  <CheckBox
                    key={item}
                    value={
                      !!filterValue[filterModal.key] &&
                      filterValue[filterModal.key].indexOf(item) !== -1
                    }
                    onChange={(checked) => {
                      var array = filterValue[filterModal.key];
                      if (!array) array = [];

                      if (checked) {
                        array.push(item);
                      } else {
                        array = array.filter((i) => i !== item);
                      }
                      setState({ name: 'filter-value', key: filterModal.key, value: array });
                    }}
                  >
                    {item}
                  </CheckBox>
                ))}
              </Flex>
              <Flex mainAxis="flex-end" subAxis="center" subSize="middle">
                <Button
                  onClick={() => {
                    setFilterModal(false);
                    setState({ name: 'filter-key', enable: false, key: filterModal.key });
                    onTableChange(
                      1,
                      size,
                      sortKey,
                      sortAscending,
                      Object.assign({}, ...filterKey.map((key) => ({ key: filterValue[key] }))),
                    );
                  }}
                >
                  取消筛选
                </Button>
                <Button
                  onClick={() => {
                    setState({ name: 'filter-key', enable: true, key: filterModal.key });
                    setFilterModal(false);
                    onTableChange(
                      1,
                      size,
                      sortKey,
                      sortAscending,
                      Object.assign({}, ...filterKey.map((key) => ({ key: filterValue[key] }))),
                    );
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
