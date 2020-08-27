import React from 'react';
import Card from '@/components/card';
import Input, { CheckBox } from '@/components/input';
import Button from '@/components/button';
import { QQ, Tag } from '@/components/svg';
import Pagination from '@/components/pagination';

export default function () {
  const [text, setText] = React.useState('');
  const [text2, setText2] = React.useState('');
  const [page, setPage] = React.useState(50);
  const [size, setSize] = React.useState(10);
  const [check, setCheck] = React.useState(false);
  var getText = () => '';
  return (
    <Card neumorphism>
      <Input
        defaultValue="666"
        value={text}
        label="姓名"
        placeholder="请输入姓名"
        editable={false}
        disabled
        onChange={(v) => setText(v)}
        getValueCallback={(cb) => (getText = cb)}
        prefix={<QQ />}
        suffix={<Tag />}
        selectTrigger={['click']}
        onSelect={(k, v) => setText(`${k}-${v}`)}
        options={[
          { key: '1', value: 'a' },
          { key: '2', value: 'b' },
        ]}
      />
      <p>{text}</p>
      <Button
        onClick={() => {
          setText2(getText());
        }}
      >
        刷新
      </Button>
      <p>{text2}</p>
      <Input
        defaultValue="666"
        value={text}
        label="姓名"
        placeholder="请输入姓名"
        onChange={(v) => setText(v)}
        getValueCallback={(cb) => (getText = cb)}
        prefix={<QQ />}
        suffix={<Tag />}
        selectTrigger={['click']}
        onSelect={(k, v) => setText(`${k}-${v}`)}
        options={[
          { key: '1', value: 'a' },
          { key: '2', value: 'b' },
        ]}
      />
      <Input
        defaultValue="666"
        value={text}
        label="姓名"
        placeholder="请输入姓名"
        editable={false}
        onChange={(v) => setText(v)}
        getValueCallback={(cb) => (getText = cb)}
        prefix={<QQ />}
        suffix={<Tag />}
        selectTrigger={['click']}
        onSelect={(k, v) => setText(`${k}-${v}`)}
        options={[
          { key: '1', value: 'a' },
          { key: '2', value: 'b' },
        ]}
      />
      <Pagination
        page={page}
        size={size}
        total={500}
        sizeSelect={[10, 20]}
        onChange={(_page, _size) => {
          if (size != _size) {
            setPage(Math.floor(((page - 1) * size) / _size + 1));
            setSize(_size);
          } else {
            setPage(_page);
          }
        }}
      />
      <CheckBox value={check} onChange={(v) => setCheck(v)}>
        选中
      </CheckBox>

      <CheckBox
        switchStyle
        checkText="是"
        uncheckText="否"
        value={check}
        onChange={(v) => setCheck(v)}
      >
        选中
      </CheckBox>
    </Card>
  );
}
