import toast from 'react-hot-toast';
import { NetworkAddress } from 'assets/data';
import system from 'functions/system';


interface NotificationToken {
  line: string;
  discord: string;
}

const ip = NetworkAddress.ip;
const port = NetworkAddress.port;
const token = localStorage.getItem('access_token');

/**
 * 取得通知 Token
 * @param setNotificationToken setNotificationToken
 */
const get = async (setNotificationToken: (data: NotificationToken) => void) => {
  const url = `http://${ip}:${port}/api/notification/token`;

  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  fetch(url, requestOptions).then(async (response: Response) => {
    const json: NotificationToken = await response.json();

    if (response.ok) {
      setNotificationToken({
        line: json.line,
        discord: json.discord
      });
    }
  });
}

/**
 * 更新通知 Token
 * @param line Line Notify Token
 * @param discord Discord Token
 */
const update = async (line: string, discord: string) => {
  const url = `http://${ip}:${port}/api/update/notification/token`;

  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`
    },
    body: new URLSearchParams({
      'line': line,
      'discord': discord
    })
  };

  await fetch(url, requestOptions).then(async (response: Response) => {
    if (response.ok) {
      toast.success('更改成功!');

      system.reload();
    }
  });
}

/**
 * 發送 Line Notify
 */
const lineNotify = async () => {
  const url = `http://${ip}:${port}/api/notification/send`;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  fetch(url, requestOptions);
}

const notification = {
  get,
  update,
  lineNotify
}

export default notification;