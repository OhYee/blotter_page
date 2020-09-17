import React from 'react';

import { Flex } from '@/components/container';

import { concat, ComponentProps } from '@/utils/component';

import styles from './tabs.less';

export declare type TabsProps = ComponentProps<{
  defaultSelected?: string;
  selected?: string;
  onChange?: (key: string) => void;
  keepInDOM?: boolean;
}>;
function Tabs(props: TabsProps) {
  const {
    selected,
    defaultSelected,
    children,
    onChange = () => [],
    className,
    keepInDOM = false,
    ...restProps
  } = props;
  const childList = React.Children.toArray(children).filter(
    (child: any) => !!child && !!child.type && child.type.displayName === TabsItem.displayName,
  );
  const itemProps: TabsItemProps[] = childList.map((item: any) => item.props);
  const [state, setState] = React.useState(
    typeof defaultSelected === 'undefined'
      ? itemProps.length > 0
        ? itemProps[0].name
        : ''
      : defaultSelected,
  );
  const nowSelected = typeof selected === 'undefined' ? state : selected;
  const nowChildren = childList.filter((item: any) => item.props.name === nowSelected);

  return (
    <Flex {...restProps} direction="TB" fullWidth className={concat(styles.tabs, className)}>
      <Flex className={styles.nav} wrap={false} mainAxis="flex-start">
        {itemProps.map((item) => (
          <Flex.Item
            key={item.name}
            className={concat(
              styles.nav_item,
              nowSelected === item.name ? styles.selected : '',
              !!item.disabled ? styles.disabled : '',
            )}
            onClick={() => {
              setState(item.name);
              onChange(item.name);
            }}
          >
            {item.name}
          </Flex.Item>
        ))}
      </Flex>

      {keepInDOM
        ? childList.map((item: any) => (
            <div key={item.key} style={item.props.name === nowSelected ? {} : { display: 'none' }}>
              {item}
            </div>
          ))
        : nowChildren.length > 0
        ? nowChildren[0]
        : null}
    </Flex>
  );
}

export declare type TabsItemProps = ComponentProps<{
  name: string;
  disabled?: boolean;
}>;
export function TabsItem(props: TabsItemProps) {
  const { name, disabled, id, children, className, style } = props;
  return (
    <div className={concat(className)} style={style}>
      {children}
    </div>
  );
}
TabsItem.displayName = 'TabsItem';

export default Object.assign(Tabs, { Item: TabsItem });
