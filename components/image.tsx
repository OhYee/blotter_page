import './image.less';
import { CSSProperties } from 'react';

function CreateBox(props: { src: string; alt?: string; title?: string }) {
  const { src, alt = '', title = '' } = props;
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.title = title;

  const p = document.createElement('p');
  p.innerText = !!alt ? alt : title;

  const box = document.createElement('div');
  box.className = 'image-lightbox';
  box.appendChild(img);
  if (!!p.innerHTML) box.appendChild(p);

  const judgeKey = (e: KeyboardEvent) => {
    if (e.keyCode === 27) remove();
  };
  const remove = () => {
    document.removeEventListener('keydown', judgeKey);
    box.remove();
  };

  box.onclick = remove;
  document.addEventListener('keydown', judgeKey);

  document.body.appendChild(box);
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
