import React, { ComponentProps } from 'react';

import { useDrag, useDrop } from 'react-dnd';

import Button from '@/components/button';
import Card from '@/components/card';
import { Save, Plus, Close } from '@/components/svg';
import Input, { InputNumber, CheckBox, TextArea } from '@/components/input';
import { Flex } from '@/components/container';
import Popover from '@/components/popover';

import randomString from '@/utils/random';
import { waitUntil } from '@/utils/debounce';
import hash from '@/utils/hash';

import styles from './dynamic.module.scss';

const stringLength = 20;

const DragItem = (
  props: ComponentProps<'base'> & {
    id: string;
    index: number;
    swap: (i: number, j: number) => void;
  },
) => {
  const ref = React.useRef();
  const [{}, drop] = useDrop({
    accept: props.id,
    drop: (item) => {
      props.swap(item['index'], props.index);
      return item;
    },
  });
  const [{}, drag] = useDrag({
    item: { type: props.id, index: props.index },
  });
  drop(drag(ref));
  return <div ref={ref}>{props.children}</div>;
};

const Menu = (callback: (newValue: any) => void) => (
  <ul className={styles.menus}>
    <li onClick={() => callback(randomString())}>文本框</li>
    <li onClick={() => callback(randomString(stringLength))}>多行文本框</li>
    <li onClick={() => callback(false)}>多选框</li>
    <li onClick={() => callback(0)}>数字框</li>
    <li onClick={() => callback([])}>列表</li>
    <li onClick={() => callback({})}>对象</li>
  </ul>
);

const InputField = (
  props: ComponentProps<'base'> & { value: string; callback: (value: any) => void },
) => {
  const id = React.useMemo(() => randomString(), []);
  return (
    <Input
      defaultValue={props.value}
      onChange={(value) => {
        waitUntil(id, () => props.callback(value), 1000);
      }}
      style={{ width: '100%' }}
    />
  );
};

const CheckField = (
  props: ComponentProps<'base'> & { value: boolean; callback: (value: any) => void },
) => {
  const id = React.useMemo(() => randomString(), []);
  return (
    <CheckBox
      value={props.value}
      onChange={(value) => {
        waitUntil(id, () => props.callback(value), 1000);
      }}
    />
  );
};

const AreaField = (
  props: ComponentProps<'base'> & { value: string; callback: (value: any) => void },
) => {
  const id = React.useMemo(() => randomString(), []);
  return (
    <TextArea
      defaultValue={props.value}
      onChange={(value) => {
        waitUntil(id, () => props.callback(value), 1000);
      }}
    />
  );
};

const NumberField = (
  props: ComponentProps<'base'> & { value: number; callback: (value: any) => void },
) => {
  const id = React.useMemo(() => randomString(), []);
  return (
    <InputNumber
      defaultValue={props.value}
      onChange={(value) => {
        waitUntil(id, () => props.callback(value), 1000);
      }}
    />
  );
};

const ArrayField = (
  props: ComponentProps<'base'> & {
    value: any[];
    callback: (value: any) => void;
  },
) => {
  const id = React.useMemo(() => randomString(), []);
  return (
    <Flex fullWidth direction="TB" subAxis="flex-end">
      <Flex fullWidth direction="TB">
        {props.value.map((item, idx) => (
          <DragItem
            key={idx}
            id={id}
            index={idx}
            swap={(i, j) => {
              var v = props.value;
              const temp = v[i];
              v[i] = v[j];
              v[j] = temp;
              props.callback(v);
            }}
          >
            <Flex>
              <Flex.Item style={{ flex: '1 1 auto' }}>
                <DynamicForm
                  key={hash(item)}
                  value={item}
                  callback={(value) => {
                    var v = props.value;
                    v[idx] = value;
                    props.callback(v);
                  }}
                />
              </Flex.Item>
              <Flex.Item style={{ flex: '0 0 auto' }}>
                <Button
                  danger
                  neumorphism
                  circle
                  icon={<Close />}
                  onClick={() => {
                    var v = props.value.filter((_, i) => i !== idx);
                    props.callback(v);
                  }}
                />
              </Flex.Item>
            </Flex>
          </DragItem>
        ))}
      </Flex>
      <Flex.Item style={{ width: 'unset' }}>
        <Popover
          card
          shadow
          component={Menu((newValue) => {
            var v = props.value;
            v.push(newValue);
            props.callback(v);
          })}
        >
          <Button neumorphism prefix={<Plus />}>
            新建一项元素
          </Button>
        </Popover>
      </Flex.Item>
    </Flex>
  );
};

const ObjectField = (
  props: ComponentProps<'base'> & {
    value: { [key: string]: any };
    callback: (value: any) => void;
  },
) => {
  const id = React.useMemo(() => randomString(), []);
  const slice = Object.keys(props.value).map((key) => ({ key: key, value: props.value[key] }));
  return (
    <Flex fullWidth direction="TB" subAxis="flex-end">
      <Flex fullWidth direction="TB">
        {slice.map((item) => (
          <Flex subAxis="flex-start" key={hash(item.key)}>
            <Flex.Item style={{ flex: '0 0 30%' }}>
              <DynamicForm
                value={item.key}
                callback={(value) => {
                  var obj = {};
                  for (var key in props.value) {
                    if (key == item.key) {
                      obj[value] = props.value[key];
                    } else {
                      obj[key] = props.value[key];
                    }
                  }
                  props.callback(obj);
                }}
              />
            </Flex.Item>
            <Flex.Item style={{ flex: '1 1 auto' }}>
              <DynamicForm
                value={item.value}
                callback={(value) => {
                  var v = props.value;
                  v[item.key] = value;
                  props.callback(v);
                }}
              />
            </Flex.Item>
            <Flex.Item style={{ flex: '0 0 auto' }}>
              <Button
                neumorphism
                danger
                circle
                icon={<Close />}
                onClick={() => {
                  var v = props.value;
                  delete v[item.key];
                  props.callback(v);
                }}
              />
            </Flex.Item>
          </Flex>
        ))}
      </Flex>

      <Flex.Item style={{ width: 'unset' }}>
        <Popover
          card
          shadow
          component={Menu((newValue) => {
            var v = props.value;
            v[randomString()] = newValue;
            props.callback(v);
          })}
        >
          <Button neumorphism prefix={<Plus />}>
            新建一条属性
          </Button>
        </Popover>
      </Flex.Item>
    </Flex>
  );
};

const DynamicForm = (
  props: ComponentProps<'base'> & { value: any; callback: (value: any) => void },
) => {
  var child = <InputField value={props.value} callback={props.callback} />;
  switch (typeof props.value) {
    case 'string':
      if (props.value.length > stringLength) {
        child = <AreaField value={props.value} callback={props.callback} />;
      } else {
        child = <InputField value={props.value} callback={props.callback} />;
      }
      break;
    case 'number':
      child = <NumberField value={props.value} callback={props.callback} />;
      break;
    case 'object':
      if (Array.isArray(props.value)) {
        child = <ArrayField value={props.value} callback={props.callback} />;
      } else {
        child = <ObjectField value={props.value} callback={props.callback} />;
      }
      break;
    case 'boolean':
      child = <CheckField value={props.value} callback={props.callback} />;
      break;
  }
  return child;
};

export default DynamicForm;
