import { message } from '@/components/notification';

export default function ShowNotification(res: Blotter.APIResponse) {
  if (res.success) {
    message({ title: res.title, content: res.content, alertType: 'success' });
  } else {
    message({ title: res.title, content: res.content, alertType: 'error' });
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
