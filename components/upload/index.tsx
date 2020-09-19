import React from 'react';

import * as qiniu from 'qiniu-js';

import Card from '@/components/card';
import { Flex } from '@/components/container';
import Tabs from '@/components/tabs';
import Popover, { Modal, ModalProps } from '@/components/popover';
import { message } from '@/components/notification';
import Image from '@/components/image';
import { Loading, Save, Delete, Sync } from '@/components/svg';
import Button from '@/components/button';
import Input, { Option, Upload as U } from '@/components/input';

import {
  qiniu_get_buckets,
  qiniu_get_images,
  qiniu_get_token,
  qiniu_delete_image,
  qiniu_rename_image,
} from '@/utils/api';
import { waitUntil } from '@/utils/debounce';
import ShowNotification from '@/utils/notification';

import styles from './upload.less';

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
  inModal?: boolean;
}) {
  const { bucket, prefix, onChange = () => {}, imgRef, inModal = false } = props;
  const [prefixList, setPrefixList] = React.useState<Option<string>[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [buckets, setBuckets] = React.useState([]);

  function initial() {
    setLoading(true);
    qiniu_get_buckets()
      .then((r) => {
        setBuckets(r.buckets);
        setPrefixList(
          Array.from(new Set([{ key: '无前缀', value: '' } as Option<string>].concat(r.prefix))),
        );
        if (bucket == '' && r.buckets.length != 0) onChange(r.buckets[0], '');
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }
  React.useEffect(initial, []);

  return (
    <Flex>
      <Input<string>
        label="存储空间"
        value={bucket}
        onSelect={(k, v) => onChange(v, prefix)}
        options={buckets}
        getOffset={() =>
          inModal
            ? { left: document.documentElement.scrollLeft, top: document.documentElement.scrollTop }
            : { left: 0, top: 0 }
        }
      />

      <Button onClick={initial} icon={loading ? <Loading /> : <Sync />} />
      <Input<string>
        value={prefix}
        onChange={(p) => {
          waitUntil(
            'image_prefix',
            () => {
              if (p !== '') onChange(bucket, p);
            },
            500,
          );
        }}
        onSelect={(k, v) => onChange(bucket, v)}
        suffix={loading ? <Loading /> : undefined}
        options={prefixList}
        getOffset={() =>
          inModal
            ? { left: document.documentElement.scrollLeft, top: document.documentElement.scrollTop }
            : { left: 0, top: 0 }
        }
      />

      <Button
        neumorphism
        onClick={() => {
          if (!!imgRef && !!imgRef.current) imgRef.current.refresh();
        }}
      >
        刷新图片
      </Button>
    </Flex>
  );
}

function Upload(props: { bucket: string; prefix: string }) {
  const { bucket, prefix } = props;

  const upload = async (file: File) => {
    const token = (await qiniu_get_token(bucket)).token;
    const filename = !!prefix ? `${prefix}/${file.name}` : file.name;
    const observable = qiniu.upload(file, filename, token, {}, {});
    const subscription = observable.subscribe({
      next(res) {
        console.log(res);
      },
      error(err) {
        message({ alertType: 'error', title: `上传发生错误`, content: `${filename}\n${err}` });
        console.error(err);
      },
      complete(res) {
        message({ alertType: 'success', title: `上传成功`, content: `${filename}` });
      },
    });
  };

  return (
    <U onUpload={(files) => Object.values(files).map(upload)}>
      <p>点击或将文件拖拽到此处上传</p>
    </U>
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
      if (!b) return;
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

  return (
    <Flex direction="TB" fullWidth>
      <Flex mainAxis="flex-start">
        {images.map((image, idx) => {
          return (
            <Card key={image.new_key} style={{ width: 150 }}>
              <Flex direction="TB" fullWidth>
                <Image
                  src={image.link}
                  thumbnail={generateThumbnail(image.link)}
                  title={image.link}
                  clickable
                  width="100%"
                  height="100px"
                />
                <Input
                  value={image.new_key}
                  transform
                  onChange={(v) => {
                    setImages({ method: 'update', index: idx, key: v });
                  }}
                  style={{ minWidth: '100%' }}
                />
                <Flex>
                  <Button
                    icon={<Save />}
                    onClick={async () => {
                      if (
                        ShowNotification(await qiniu_rename_image(bucket, image.key, image.new_key))
                      )
                        initial();
                    }}
                  />

                  <Popover
                    trigger={['click']}
                    card
                    shadow
                    component={
                      <Card>
                        <Flex>
                          确定删除？
                          <Button
                            danger
                            primary
                            neumorphism
                            size="small"
                            onClick={async () => {
                              if (ShowNotification(await qiniu_delete_image(bucket, image.key)))
                                initial();
                            }}
                          >
                            删除
                          </Button>
                        </Flex>
                      </Card>
                    }
                  >
                    <Button danger style={{ background: 'transparent' }} icon={<Delete />} />
                  </Popover>
                </Flex>
              </Flex>
            </Card>
          );
        })}
      </Flex>
      <Flex.Item style={{ width: 'auto' }}>
        <Button
          neumorphism
          onClick={() => getData(bucket, prefix, marker)}
          disabled={!hasNext}
          loading={loading}
        >
          获取更多
        </Button>
      </Flex.Item>
    </Flex>
  );
}

export declare type QiniuProps = {
  defaultTab?: 'upload' | 'list';
  group_number?: number;
  inModal?: boolean;
};

function Qiniu(props: QiniuProps) {
  const { defaultTab = 'upload', group_number = 10, inModal } = props;
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
    <Flex direction="TB" fullWidth>
      <BucketSelector
        bucket={bucket}
        prefix={prefix}
        onChange={setState}
        imgRef={ref}
        inModal={inModal}
      />
      <Tabs defaultSelected={defaultTab === 'list' ? '图片列表' : '上传图片'} keepInDOM>
        <Tabs.Item name="上传图片">
          <Upload bucket={bucket} prefix={prefix} />
        </Tabs.Item>
        <Tabs.Item name="图片列表">
          <ImageList ref={ref} bucket={bucket} prefix={prefix} group_number={group_number} />
        </Tabs.Item>
      </Tabs>
    </Flex>
  );
}

export function QiniuModal(props: QiniuProps & ModalProps) {
  const { show, onClose, ...restProps } = props;
  return (
    <Modal show={show} onClose={onClose}>
      <Card>
        <Qiniu {...restProps} inModal />
      </Card>
    </Modal>
  );
}

export default Qiniu;
export { BucketSelector, Upload, ImageList };
