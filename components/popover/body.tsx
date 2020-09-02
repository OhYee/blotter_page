import React from 'react';
import ReactDOM from 'react-dom';

class Body extends React.Component<{}> {
  div: HTMLDivElement;
  root: HTMLElement;
  constructor(props) {
    super(props);
    if (typeof document !== 'undefined') {
      console.log(document, document.getElementById('portals'));
      this.div = document.createElement('div');
      this.root = document.getElementById('portals');
    }
  }

  componentDidMount() {
    if (!!this.root) {
      this.root.appendChild(this.div);
    } else {
      console.warn('Portal initial error');
    }
  }

  componentWillUnmount() {
    if (!!this.root) this.root.removeChild(this.div);
  }

  render() {
    return !!this.root && !!this.div ? ReactDOM.createPortal(this.props.children, this.div) : null;
  }
}

function Insert(
  renderChildren: (params: {
    remove: () => void;
    update: (_children: React.ReactElement) => void;
  }) => React.ReactElement,
) {
  /* 
        TODO:
        在 Chrome 调试时，宽屏切换窄屏可能会导致这些用于插入元素的 div 占据空间，导致 body 宽度溢出
        通常避免占位的解决办法应该是设置绝对定位，并定位至一个很大的负值，但是这会影响 Popover 的位置计算
        该问题目前只有在调试工具切换屏幕大小时重现成功，暂时降低解决优先级
    */
  const bodyWrapper = document.createElement('div');
  const root = document.getElementById('portals');
  root.appendChild(bodyWrapper);
  const params = {
    remove: () => {
      root.removeChild(bodyWrapper);
    },
    update: (children: React.ReactElement) => {
      ReactDOM.render(children, bodyWrapper);
    },
  };
  ReactDOM.render(renderChildren(params), bodyWrapper);
  return params;
}

export default Object.assign(Body, { Insert });
