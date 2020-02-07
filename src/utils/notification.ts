import { notification } from 'antd';

export default function ShowNotification(res: Blotter.APIResponse) {
  if (res.success) {
    notification.success({ message: res.title, description: res.content });
  } else {
    notification.error({ message: res.title, description: res.content });
  }
  return res.success;
}
