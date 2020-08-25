import React from 'react';
import ReactDOM from 'react-dom';

class Body extends React.Component<{}> {
  remove = () => {};
  update = (_: React.ReactNode) => {};

  componentDidMount() {
    const { remove, update } = Insert(() => this.props.children);
    this.remove = remove;
    this.update = update;
  }
  componentDidUpdate() {
    this.update(this.props.children);
  }

  componentWillUnmount() {
    this.remove();
  }

  render() {
    return null;
  }
}

function Insert(
  renderChildren: (params: {
    remove: () => void;
    update: (_children: React.ReactNode) => void;
  }) => React.ReactNode,
) {
  /* 
        TODO:
        在 Chrome 调试时，宽屏切换窄屏可能会导致这些用于插入元素的 div 占据空间，导致 body 宽度溢出
        通常避免占位的解决办法应该是设置绝对定位，并定位至一个很大的负值，但是这会影响 Popover 的位置计算
        该问题目前只有在调试工具切换屏幕大小时重现成功，暂时降低解决优先级
    */
  const bodyWrapper = document.createElement('div');
  document.getElementById('blotter_root').appendChild(bodyWrapper);
  const params = {
    remove: () => document.getElementById('blotter_root').removeChild(bodyWrapper),
    update: (children: React.ReactNode) => ReactDOM.render(children, bodyWrapper),
  };

  ReactDOM.render(renderChildren(params), bodyWrapper);

  return params;
}

export default Object.assign(Body, { Insert });
