import { notification } from 'antd';

export default function ShowNotification(res: Blotter.APIResponse) {
  if (res.success) {
    notification.success({ message: res.title, description: res.content });
  } else {
    notification.error({ message: res.title, description: res.content });
  }
  return res.success;
}

export function H5Notification(msg: string) {
  if (typeof document !== 'undefined') {
    Notification.requestPermission();
    new Notification('通知', {
      body: msg,
      icon: '/static/img/logo_196x196.png',
    });
  }
}
