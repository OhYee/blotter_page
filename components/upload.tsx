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

import {
  qiniu_get_buckets,
  qiniu_get_images,
  qiniu_get_token,
  qiniu_delete_image,
  qiniu_rename_image,
} from '@/utils/api';
import { waitUntil } from '@/utils/debounce';
import ShowNotification from '@/utils/notification';

import styles from './upload.less'

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
  imgRef?: React.MutableRefObject<ImageListRef>;
}) {
  const { bucket, prefix, onChange = () => {}, imgRef } = props;
  const [prefixList, setPrefixList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [buckets, setBuckets] = React.useState([]);

  function initial() {
    setLoading(true);
    qiniu_get_buckets()
      .then((r) => {
        setBuckets(r.buckets);
        setPrefixList(Array.from(new Set([''].concat(r.prefix))));
        if (bucket == '' && r.buckets.length != 0) onChange(r.buckets[0], '');
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }
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
      <Select
        style={{ minWidth: 100 }}
        value={prefix}
        onChange={(p) => onChange(bucket, p)}
        showSearch
        clearIcon
        onSearch={(p) => {
          waitUntil(
            'image_prefix',
            () => {
              if (p !== '') onChange(bucket, p);
            },
            500,
          );
        }}
        loading={loading}
        notFoundContent={null}
      >
        {prefixList.map((p) => (
          <Select.Option key={p} value={p}>
            {p}
          </Select.Option>
        ))}
      </Select>
      <Button
        onClick={() => {
          if (!!imgRef && !!imgRef.current) imgRef.current.refresh();
        }}
      >
        刷新图片
      </Button>
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
      customRequest={(opts) => upload(opts.file)}
      showUploadList={false}
    >
      <div style={{ height: 100, width: '100%' }}>
        <p>将文件拖拽到此处上传</p>
      </div>
    </U.Dragger>
  );
}

interface ImageListRef {
  refresh: () => void;
}

const ImageList = React.forwardRef(imageList);
function imageList(
  props: {
    bucket: string;
    prefix: string;
    group_number?: number;
  },
  ref?: React.Ref<ImageListRef>,
) {
  // props
  const { bucket, prefix, group_number = 10 } = props;
  // state
  const [marker, setMarker] = React.useState('');
  const [hasNext, setHasNext] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [images, setImages] = React.useReducer<
    (
      images: Blotter.File[],
      action: {
        method: 'initial' | 'concat' | 'update';
        value?: Blotter.File[];
        key?: string;
        index?: number;
      },
    ) => Blotter.File[]
  >((images, action) => {
    const { method } = action;
    switch (method) {
      case 'initial': {
        const { value = [] } = action;
        return value.map((img) => ({ ...img, new_key: img.key }));
      }
      case 'concat': {
        const { value = [] } = action;
        return images.concat(value.map((img) => ({ ...img, new_key: img.key })));
      }
      case 'update': {
        const { index = 0, key = images[index].new_key } = action;
        return [
          ...images.slice(0, index),
          { ...images[index], new_key: key },
          ...images.slice(index + 1),
        ];
      }
      default: {
        throw new Error();
      }
    }
  }, []);
  // ref
  const [id, setID] = React.useState(0);
  const idRef = React.useRef(id);
  idRef.current = id;

  const getData = React.useCallback(
    (b, p, m) => {
      setLoading(true);
      var thisID = id + 1;
      setID(thisID);
      // setID((i) => (idRef.current = thisID = i + 1));
      qiniu_get_images(b, p, m, group_number)
        .then((r) => {
          if (idRef.current === thisID) {
            setImages({
              method: !!m ? 'concat' : 'initial',
              value: r.files,
            });
            setMarker(r.marker), setHasNext(r.has_next);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    },
    [id, group_number],
  );
  const initial = React.useCallback(() => getData(bucket, prefix, ''), [bucket, prefix]);

  React.useImperativeHandle(
    ref,
    () => ({
      refresh: initial,
    }),
    [bucket, prefix],
  );

  // init data
  React.useEffect(() => {
    setImages({ method: 'initial' }), setMarker(''), setHasNext(false);
    initial();
  }, [bucket, prefix]);

  console.log(images);
  return (
    <div className={styles.wrapper}>
      <div
      className={styles.inner}
      >
        {images.map((image, idx) => {
          console.log(image);
          return (
            <Card
              key={image.new_key}
              className={styles.card}
              size="small"
              cover={
                <Image
                  src={image.link}
                  thumbnail={generateThumbnail(image.link)}
                  height="128px"
                  width="128px"
                  clickable
                />
              }
              actions={[
                <SaveOutlined
                  onClick={async () => {
                    if (
                      ShowNotification(await qiniu_rename_image(bucket, image.key, image.new_key))
                    )
                      initial();
                  }}
                />,
                <Popconfirm
                  title="确定删除？"
                  onConfirm={async () => {
                    if (ShowNotification(await qiniu_delete_image(bucket, image.key))) initial();
                  }}
                >
                  <DeleteOutlined style={{ color: 'red' }} />
                </Popconfirm>,
              ]}
            >
              <Typography.Text
                ellipsis
                copyable={{ text: image.link }}
                editable={{
                  onChange: (v) => {
                    console.log(image, v);
                    setImages({ method: 'update', index: idx, key: v });
                  },
                }}
              >
                {image.new_key}
              </Typography.Text>
            </Card>
          );
        })}
      </div>
      <Button onClick={() => getData(bucket, prefix, marker)} disabled={!hasNext} loading={loading}>
        获取更多
      </Button>
    </div>
  );
}

function Qiniu(props: { defaultTab?: 'upload' | 'list'; group_number?: number }) {
  const { defaultTab = 'upload', group_number = 10 } = props;
  const [bucket, setBucket] = React.useState('');
  const [prefix, setPrefix] = React.useState('');
  const ref = React.useRef<ImageListRef>();
  const setState = React.useCallback(
    (b, p) => {
      if (b !== bucket) setBucket(b);
      if (p !== prefix) setPrefix(p);
    },
    [bucket, prefix],
  );
  return (
    <Space direction="vertical">
      <BucketSelector bucket={bucket} prefix={prefix} onChange={setState} imgRef={ref} />
      <Tabs defaultValue={defaultTab} tabPosition="left">
        <Tabs.TabPane tab="上传图片" key="upload">
          <Upload bucket={bucket} prefix={prefix} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="图片列表" key="list">
          <ImageList ref={ref} bucket={bucket} prefix={prefix} group_number={group_number} />
        </Tabs.TabPane>
      </Tabs>
    </Space>
  );
}

export default Qiniu;
export { BucketSelector, Upload, ImageList };
