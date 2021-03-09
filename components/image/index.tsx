import { CSSProperties } from 'react';
import { concat, ComponentProps } from '@/utils/component';

function CreateBox(props: {
  src: string;
  alt?: string;
  title?: string;
  initialWidth?: string;
  initialHeight?: string;
}) {
  const { src, alt = '', title = '', initialWidth = 'unset', initialHeight = 'unset' } = props;
  const body = document.body;
  const top = window.scrollY;
  body.style.position = 'fixed';
  body.style.top = `${-top}px`;

  const box = document.createElement('div');
  box.className = 'image-lightbox';
  document.body.appendChild(box);

  const close = document.createElement('span');
  close.innerText = '×';
  close.className = 'close';
  box.appendChild(close);

  const hint = document.createElement('span');
  hint.innerText = '滚轮缩放图片，拖拽修改位置';
  hint.className = 'hint';
  box.appendChild(hint);

  const p = document.createElement('p');
  p.innerText = !!title ? title : alt;
  if (!!p.innerHTML) box.appendChild(p);

  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.title = title;
  img.style.height = initialHeight;
  img.style.width = initialWidth;
  box.appendChild(img);

  const ratio = img.naturalWidth / img.naturalHeight;
  var grabbing = false;
  var offsetX = 0;
  var offsetY = 0;
  var mouseX = 0;
  var mouseY = 0;

  img.onmousedown = (e) => {
    img.ondragstart = () => false;
    img.style.cursor = 'grabbing';
    grabbing = true;
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  };
  img.onmousemove = (e) => {
    if (grabbing) {
      offsetX += e.offsetX - mouseX;
      offsetY += e.offsetY - mouseY;
      img.style.marginLeft = `${offsetX}px`;
      img.style.marginTop = `${offsetY}px`;
    }
  };
  img.onmouseup = (e) => {
    img.style.cursor = 'grab';
    grabbing = false;
  };
  img.onclick = (e) => {
    e.stopPropagation();
  };

  const judgeWheel = (e: WheelEvent) => {
    const height = img.height - e.deltaY;
    img.style.maxHeight = `unset`;
    img.style.maxWidth = `unset`;
    img.style.height = `${height}px`;
    img.style.width = `${height * ratio}px`;
  };
  const judgeKey = (e: KeyboardEvent) => {
    if (e.keyCode === 27) remove();
  };
  const remove = () => {
    document.removeEventListener('keydown', judgeKey);
    document.removeEventListener('mousewheel', judgeWheel);
    box.remove();

    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, top);
  };

  document.addEventListener('keydown', judgeKey);
  document.addEventListener('mousewheel', judgeWheel);

  box.onclick = remove;
  close.onclose = remove;
}

export declare type ImageProps = ComponentProps<{
  src: string;
  thumbnail?: string;
  alt?: string;
  title?: string;
  clickable?: boolean;
  height?: string;
  maxHeight?: number | string;
  width?: string;
  style?: CSSProperties;
}>;

export default function Image(props: ImageProps) {
  const {
    src,
    thumbnail = src,
    alt,
    title,
    height = '100%',
    width = '100%',
    maxHeight,
    clickable = false,
    style,
    className,
  } = props;
  return (
    <div
      className="image-container"
      style={{
        height,
        width,
        maxHeight,
        cursor: clickable ? 'pointer' : 'unset',
        ...style,
      }}
      onClick={() => {
        if (clickable) CreateBox({ src, alt, title });
      }}
    >
      <div
        className={concat('image', className)}
        style={{
          backgroundImage: `url('${thumbnail}')`,
        }}
      />
    </div>
  );
}

export const setImageLightbox = (img: HTMLImageElement) => {
  try {
    const parent = img.parentElement;
    const { src, alt, title } = img;
    parent.removeAttribute('href');
    parent.onclick = () => CreateBox({ src, alt, title });
  } catch (err) {
    console.error(err);
  }
};

export const setSVGLightbox = (svg: SVGSVGElement) => {
  try {
    svg.style.cursor = 'pointer';
    const content = base64(svg.outerHTML).replace(/\n/g, '');
    const title = !!svg.getAttribute('title') ? svg.getAttribute('title') : svg.parentElement.title;
    svg.onclick = () =>
      CreateBox({
        src: `data:image/svg+xml;base64,${content} `,
        title: title,
        alt: title,
        initialHeight: '50%',
      });
  } catch (err) {
    console.error(err);
  }
};

function base64(s: string): string {
  return window.btoa(s.replace(/[\u007f-\uffff]/g, (c) => `&#${c.charCodeAt(0)};`));
}
