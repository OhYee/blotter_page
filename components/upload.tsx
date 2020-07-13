import React from 'react';

import {
  Select,
  Button,
  Upload as U,
  Tabs,
  Card,
  Typography,
  Popconfirm,
  notification,
} from 'antd';
import { SyncOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';

import * as qiniu from 'qiniu-js';

import { Space } from '@/components/container';
import Image from '@/components/image';

import { qiniu_get_buckets, qiniu_get_images, qiniu_get_token } from '@/utils/api';

const prefixs = ['post', 'tags', 'travels'];
const img_file_type = ['psd', 'jpg', 'jpeg', 'png', 'gif', 'webp', 'tiff', 'bmp'];
function generateThumbnail(img: string) {
  if (img_file_type.indexOf(img.split('.').slice(-1)[0]) != -1)
    return `${img}?imageView2/0/w/128/h/128/interlace/1/q/50`;
  else img;
}

function BucketSelector(props: {
  bucket: string;
  prefix: string;
  onChange?: (bucket: string, prefix: string) => void;
  refresh?: () => void;
}) {
  const { bucket, prefix, onChange = () => {}, refresh = () => {} } = props;
  const [loading, setLoading] = React.useState(false);
  const [buckets, setBuckets] = React.useState([]);
  const initial = () => {
    setLoading(true);
    qiniu_get_buckets()
      .then((r) => {
        setBuckets(r.buckets);
        if (bucket == '' && r.buckets.length != 0) onChange(r.buckets[0], '');
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };
  React.useEffect(initial, []);

  return (
    <Space direction="horizontal">
      <strong>存储空间：</strong>
      <Select value={bucket} onChange={(b) => onChange(b, prefix)} loading={loading}>
        {buckets.map((b) => (
          <Select.Option key={b} value={b}>
            {b}
          </Select.Option>
        ))}
      </Select>
      <Button onClick={initial} icon={<SyncOutlined spin={loading} />} />
      <Select value={prefix} onChange={(p) => onChange(bucket, p)} loading={loading}>
        {prefixs.map((p) => (
          <Select.Option key={p} value={p}>
            {p}
          </Select.Option>
        ))}
      </Select>
      <Button onClick={refresh}>刷新图片</Button>
    </Space>
  );
}

function Upload(props: { bucket: string; prefix: string }) {
  const { bucket, prefix } = props;

  const upload = async (file: File) => {
    const token = (await qiniu_get_token()).token;
    const filename = !!prefix ? `${prefix}/${file.name}` : file.name;
    const observable = qiniu.upload(file, filename, token, {}, {});
    const subscription = observable.subscribe({
      next(res) {
        console.log(res);
      },
      error(err) {
        notification.error({ message: `${filename} 上传发生错误`, description: `${err}` });
        console.error(err);
      },
      complete(res) {
        notification.success({ message: `${filename} 上传成功` });
      },
    });
  };

  return (
    <U.Dragger
      name={'file'}
      multiple={true}
      customRequest={async (opts) => {
        console.log(opts);
        upload(opts.file);
      }}
      showUploadList={false}
    >
      <div style={{ height: 100, width: '100%' }}>
        <p>将文件拖拽到此处上传</p>
      </div>
    </U.Dragger>
  );
}

function ImageList(props: {
  bucket: string;
  prefix: string;
  refresh?: (ref?: React.MutableRefObject<() => void>) => {};
}) {
  const { bucket, prefix, refresh = () => {} } = props;
  const [images, setImages] = React.useState([] as Blotter.File[]);
  const [marker, setMarker] = React.useState('');
  const [hasNext, setHasNext] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [id, setID] = React.useState(0);
  const refreshRef = React.useRef(() => getData(bucket, prefix, ''));
  React.useEffect(() => {
    refresh(refreshRef);
  }, [bucket, prefix]);

  const getData = (b, p, m) => {
    console.log(b, p, m);
    setLoading(true);
    var thisID = 0;
    setID((i) => {
      thisID = i + 1;
      return thisID;
    });
    qiniu_get_images(b, p, m, 5)
      .then((r) => {
        setID((newID) => {
          console.log(b, p, m, thisID, newID);
          if (thisID == newID) {
            setImages((images) => images.concat(r.files));
            setMarker(r.marker);
            setHasNext(r.has_next);
          }
          return newID;
        });
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => getData(bucket, '', ''), [bucket]);
  React.useEffect(() => {
    setImages([]);
    setMarker('');
    setHasNext(false);
    console.log('clear');
    getData(bucket, prefix, '');
  }, [prefix]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          alignContent: 'center',
          flexDirection: 'row',
        }}
      >
        {images.map((image, idx) => (
          <Card
            style={{ width: 128, margin: 10 }}
            size="small"
            cover={
              <Image
                src={image.name}
                thumbnail={generateThumbnail(image.name)}
                height="128px"
                width="128px"
                clickable
              />
            }
            actions={[
              <SaveOutlined />,
              <Popconfirm title="确定删除？" onConfirm={() => {}}>
                <DeleteOutlined style={{ color: 'red' }} />
              </Popconfirm>,
            ]}
          >
            <Typography.Text ellipsis copyable editable={{ onChange: () => {} }}>
              {image.name}
            </Typography.Text>
          </Card>
        ))}
      </div>
      <Button onClick={() => getData(bucket, prefix, marker)} disabled={!hasNext} loading={loading}>
        获取更多
      </Button>
    </div>
  );
}

function Qiniu(props: { defaultTab?: 'upload' | 'list' }) {
  const { defaultTab = 'upload' } = props;
  const [bucket, setBucket] = React.useState('');
  const [prefix, setPrefix] = React.useState('');
  const [ref, setRef] = React.useState<React.MutableRefObject<() => void>>(undefined);
  const setState = React.useCallback(
    (b, p) => {
      console.log(b, p, bucket, prefix);
      if (b !== bucket) setBucket(b);
      if (p !== prefix) setPrefix(p);
    },
    [bucket, prefix],
  );
  return (
    <Space direction="vertical">
      <BucketSelector
        bucket={bucket}
        prefix={prefix}
        onChange={setState}
        refresh={!!ref ? ref.current : () => {}}
      />
      <Tabs defaultValue={defaultTab} tabPosition="left">
        <Tabs.TabPane tab="上传图片" key="upload">
          <Upload bucket={bucket} prefix={prefix} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="图片列表" key="list">
          <ImageList bucket={bucket} prefix={prefix} />
        </Tabs.TabPane>
      </Tabs>
    </Space>
  );
}

export default Qiniu;
export { BucketSelector, Upload, ImageList };
