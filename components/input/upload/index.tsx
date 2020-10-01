import React from 'react';

import { Flex } from '@/components/container';
import { concat, ComponentProps } from '@/utils/component';

import styles from './upload.module.scss';

export declare type UploadProps = ComponentProps<{
  onUpload?: (files: FileList) => void;
}>;
export default function Upload(props: UploadProps) {
  const ref = React.useRef();
  const { className, children, onUpload, ...restProps } = props;
  return (
    <div {...restProps} className={concat(styles.upload, className)}>
      <input
        ref={ref}
        type="file"
        multiple
        onChange={(e) => {
          if (!!onUpload) onUpload(e.target.files);
        }}
      />
      <div className={styles.children}>{children}</div>
    </div>
  );
}
