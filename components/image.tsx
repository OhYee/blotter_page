import './image.less';
import { CSSProperties } from 'react';

function CreateBox(props: { src: string; alt?: string; title?: string }) {
  const { src, alt = '', title = '' } = props;
  const body = document.body;
  const top = window.scrollY;
  body.style.position = 'fixed';
  body.style.top = `${-top}px`;

  const box = document.createElement('div');
  box.className = 'image-lightbox';
  document.body.appendChild(box);

  const close = document.createElement('span');
  close.innerText = '×';
  box.appendChild(close);

  const p = document.createElement('p');
  p.innerText = !!alt ? alt : title;
  if (!!p.innerHTML) box.appendChild(p);

  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.title = title;
  box.appendChild(img);

  var scale = -1;
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
    if (scale < 0) scale = (img.height / img.naturalHeight) * 100;
    scale -= e.deltaY / 10;
    if (scale < 0) scale = 0;
    img.style.maxHeight = `unset`;
    img.style.maxWidth = `unset`;
    img.style.height = `${scale}%`;
    img.style.width = `${scale}%`;
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

export default (props: {
  src: string;
  alt?: string;
  title?: string;
  clickable?: boolean;
  height?: string;
  width?: string;
  styles?: CSSProperties;
}) => {
  const { src, alt, title, height = '100%', width = '100%', clickable = false, styles } = props;
  return (
    <div
      className="image-container"
      style={{ height, width, cursor: clickable ? 'pointer' : 'unset', ...styles }}
      onClick={() => {
        if (clickable) CreateBox({ src, alt, title });
      }}
    >
      <div
        className="image"
        style={{
          backgroundImage: `url('${src}')`,
        }}
      />
    </div>
  );
};

export const setImageLightbox = (img: HTMLImageElement) => {
  const parent = img.parentElement;
  const { src, alt, title } = img;
  parent.removeAttribute('href');
  parent.onclick = () => CreateBox({ src, alt, title });
};
