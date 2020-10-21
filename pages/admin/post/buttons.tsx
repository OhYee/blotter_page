import React from 'react';

import Button, { ButtonProps } from '@/components/button';
import { Flex } from '@/components/container';
import {
  Minus,
  Plus,
  Save,
  Image,
  Edit,
  Fold,
  Unfold,
  FullScreen,
  FullScreenExit,
} from '@/components/svg';

import { QiniuModal } from '@/components/upload';

import styles from './post.module.scss';

function Press(
  props: ButtonProps & {
    onPressing?: (arg: any) => any;
    ms?: number;
    initArg?: any;
  },
) {
  const { initArg, onPressing = () => {}, ms = 500, ...restProps } = props;
  const [value, setValue] = React.useState(0);
  return (
    <Button
      {...restProps}
      onMouseDown={(e) => {
        var arg = initArg;
        clearInterval(value);
        const interval = (setInterval(() => {
          arg = onPressing(arg);
        }, ms) as unknown) as number;
        setValue(interval);
      }}
      onMouseUp={(e) => clearInterval(value)}
    />
  );
}

function RenderOffset(props: { onScrollOffset: (diff: number) => void }) {
  const { onScrollOffset } = props;
  const diff = 10;

  return (
    <Flex>
      <Press
        neumorphism
        size="small"
        initArg={-diff}
        onClick={() => onScrollOffset(-diff)}
        onPressing={(arg) => {
          onScrollOffset(arg - diff);
          return arg - diff;
        }}
        ms={100}
        icon={<Minus />}
      />
      <Press
        neumorphism
        size="small"
        initArg={diff}
        onClick={() => onScrollOffset(diff)}
        onPressing={(arg) => {
          onScrollOffset(arg + diff);
          return arg + diff;
        }}
        ms={100}
        icon={<Plus />}
      />
    </Flex>
  );
}

function RenderImages() {
  const [show, setShow] = React.useState(false);
  return (
    <React.Fragment>
      <QiniuModal show={show} onClose={() => setShow(false)} defaultTab="upload" />
      <Button circle danger={show} neumorphism onClick={() => setShow(!show)} icon={<Image />} />
    </React.Fragment>
  );
}

function RenderPreviewButton(props: { preview: 0 | 1 | 2; onPreviewClick: (s: number) => void }) {
  const previews = ['编辑', '预览', '双栏'];
  const { preview, onPreviewClick } = props;

  return (
    <Flex direction="TB" mainSize="small">
      {previews.map((item, idx) => (
        <Button
          key={idx}
          neumorphism
          clicked={preview === idx}
          size="small"
          onClick={() => onPreviewClick(idx)}
        >
          {item}
        </Button>
      ))}
    </Flex>
  );
}

function JumpButton() {
  return (
    <Button
      circle
      neumorphism
      onClick={() => {
        const editor = document.getElementById('editor');
        if (!!editor) {
          const top = editor.getBoundingClientRect().top + window.pageYOffset;
          if (top > 0) {
            scrollTo(0, top - 10);
          }
        }
      }}
      icon={<Edit />}
    />
  );
}

function FoldButtons(props: { onFold: () => void; onUnfold: () => void }) {
  const { onFold, onUnfold } = props;
  return (
    <Flex>
      <Button neumorphism size="small" icon={<Fold />} onClick={onFold} />
      <Button neumorphism size="small" icon={<Unfold />} onClick={onUnfold} />
    </Flex>
  );
}

export default function RenderFixedButton(props: {
  preview: 0 | 1 | 2;
  onPreviewClick: (s: 0 | 1 | 2) => void;
  submitDisabled: boolean;
  onSubmit: () => void;
  onScrollOffset: (diff: number) => void;
  onFold: () => void;
  onUnfold: () => void;
  fullscreen: boolean;
  onFullScreen: (fullscreen: boolean) => void;
  style?: React.CSSProperties;
}) {
  const {
    preview,
    onPreviewClick,
    submitDisabled,
    onSubmit,
    onScrollOffset,
    onFold,
    onUnfold,
    fullscreen,
    onFullScreen,
    ...restProps
  } = props;

  return (
    <Flex {...restProps} direction="TB" className={styles.fixed_button}>
      <RenderPreviewButton preview={preview} onPreviewClick={onPreviewClick} />
      <RenderOffset onScrollOffset={onScrollOffset} />
      <FoldButtons onFold={onFold} onUnfold={onUnfold} />
      <JumpButton />
      <Button
        neumorphism
        loading={submitDisabled}
        onClick={() => onFullScreen(!fullscreen)}
        circle
        icon={fullscreen ? <FullScreenExit /> : <FullScreen />}
      />
      <RenderImages />
      <Button
        neumorphism
        loading={submitDisabled}
        onClick={onSubmit}
        circle
        icon={<Save />}
        primary
      />
    </Flex>
  );
}
