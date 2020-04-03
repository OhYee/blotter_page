import React, { ComponentProps } from 'react';

import { Row, Col, List, Input, InputNumber, Button, Dropdown, Menu, Checkbox } from 'antd';
import { PlusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { useDrag, useDrop } from 'react-dnd';

import randomString from '@/utils/random';
import { waitUntil } from '@/utils/debounce';
import hash from '@/utils/hash';

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

const addMenus = (callback: (newValue: any) => void) => (
  <Menu>
    <Menu.Item onClick={() => callback(randomString())}>文本框</Menu.Item>
    <Menu.Item onClick={() => callback(randomString(stringLength))}>多行文本框</Menu.Item>
    <Menu.Item onClick={() => callback(false)}>多选框</Menu.Item>
    <Menu.Item onClick={() => callback(0)}>数字框</Menu.Item>
    <Menu.Item onClick={() => callback([])}>列表</Menu.Item>
    <Menu.Item onClick={() => callback({})}>对象</Menu.Item>
  </Menu>
);

const InputField = (
  props: ComponentProps<'base'> & { value: string; callback: (value: any) => void },
) => {
  const id = randomString();
  return (
    <Input
      defaultValue={props.value}
      onChange={(e) => {
        const value = e.target.value;
        waitUntil(id, () => props.callback(value), 1000);
      }}
    />
  );
};

const CheckField = (
  props: ComponentProps<'base'> & { value: boolean; callback: (value: any) => void },
) => {
  const id = randomString();
  return (
    <Checkbox
      checked={props.value}
      onChange={(e) => {
        const value = e.target.checked;
        waitUntil(id, () => props.callback(value), 1000);
      }}
    />
  );
};

const AreaField = (
  props: ComponentProps<'base'> & { value: string; callback: (value: any) => void },
) => {
  const id = randomString();
  return (
    <Input.TextArea
      defaultValue={props.value}
      onChange={(e) => {
        const value = e.target.value;
        waitUntil(id, () => props.callback(value), 1000);
      }}
    />
  );
};

const NumberField = (
  props: ComponentProps<'base'> & { value: number; callback: (value: any) => void },
) => {
  const id = randomString();
  return (
    <InputNumber
      defaultValue={props.value}
      onChange={(e) => {
        const value = e;
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
  const id = randomString();
  return (
    <List
      grid={{ column: 1, gutter: 5 }}
      bordered={true}
      size="small"
      dataSource={props.value}
      renderItem={(item, idx) => (
        <List.Item key={hash(item)}>
          <DragItem
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
            <Row>
              <Col span={22}>
                <DynamicForm
                  key={hash(item)}
                  value={item}
                  callback={(value) => {
                    var v = props.value;
                    v[idx] = value;
                    props.callback(v);
                  }}
                />
              </Col>
              <Col span={2} style={{ textAlign: 'center' }}>
                <Button
                  shape="circle"
                  icon={<CloseCircleOutlined />}
                  onClick={() => {
                    var v = props.value.filter((_, i) => i !== idx);
                    props.callback(v);
                  }}
                />
              </Col>
            </Row>
          </DragItem>
        </List.Item>
      )}
      header="列表"
      footer={
        <p style={{ textAlign: 'right' }}>
          <Dropdown
            overlay={addMenus((newValue) => {
              var v = props.value;
              v.push(newValue);
              props.callback(v);
            })}
          >
            <Button icon={<PlusCircleOutlined />}>新建一项元素</Button>
          </Dropdown>
        </p>
      }
    />
  );
};

const ObjectField = (
  props: ComponentProps<'base'> & {
    value: { [key: string]: any };
    callback: (value: any) => void;
  },
) => {
  const id = randomString();
  const slice = Object.keys(props.value).map((key) => ({ key: key, value: props.value[key] }));
  return (
    <List
      grid={{ column: 1, gutter: 5 }}
      size="small"
      dataSource={slice}
      bordered={true}
      renderItem={(item) => (
        <List.Item key={item.key}>
          <Row>
            <Col span={4} style={{ padding: '0 20px' }}>
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
            </Col>
            <Col span={18}>
              <DynamicForm
                value={item.value}
                callback={(value) => {
                  var v = props.value;
                  v[item.key] = value;
                  props.callback(v);
                }}
              />
            </Col>
            <Col span={2} style={{ textAlign: 'center' }}>
              <Button
                shape="circle"
                icon={<CloseCircleOutlined />}
                onClick={() => {
                  var v = props.value;
                  delete v[item.key];
                  props.callback(v);
                }}
              />
            </Col>
          </Row>
        </List.Item>
      )}
      header="对象"
      footer={
        <p style={{ textAlign: 'right' }}>
          <Dropdown
            overlay={addMenus((newValue) => {
              var v = props.value;
              v[randomString()] = newValue;
              props.callback(v);
            })}
          >
            <Button icon={<PlusCircleOutlined />}>新建一条属性</Button>
          </Dropdown>
        </p>
      }
    />
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
