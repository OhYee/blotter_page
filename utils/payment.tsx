import { Modal } from 'antd';

export function showQR(type: 'alipay' | 'wechat') {
  Modal.info({
    title: '打赏',
    content: (
      <img
        style={{ width: 'calc(100% - 38px)' }}
        src={type === 'alipay' ? '/static/img/alipayimg.jpg' : '/static/img/wechatimg.jpg'}
      />
    ),
  });
}
