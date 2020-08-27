import { Modal } from '@/components/popover';

export function showQR(type: 'alipay' | 'wechat') {
  Modal.info({
    children: (
      <img
        style={{ width: 'calc(100% - 38px)' }}
        src={type === 'alipay' ? '/static/img/alipayimg.jpg' : '/static/img/wechatimg.jpg'}
      />
    ),
  });
}
