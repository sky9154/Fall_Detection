import toast from 'react-hot-toast';


interface NotificationToken {
  line: string;
  discord: string;
}

const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_PORT;

/**
 * 取得通知 Token
 * @param token Token
 * @param line 設定 Line Notify Token
 * @param discord 設定 Discord Token
 */
const get = (
  token: string,
  line: (token: string) => void,
  discord: (discord: {
    channel: string,
    token: string
  }) => void
) => {
  const url = `http://${IP}:${PORT}/api/notification/get/token`;

  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  fetch(url, requestOptions).then(async (response: Response) => {

    if (response.ok) {
      const notification: NotificationToken = await response.json();
      const discordData = notification.discord.split(' ');

      line(notification.line);

      discord((discordData.length < 2) ? {
        channel: '',
        token: ''
      } : {
        channel: discordData[0],
        token: discordData[1]
      });
    }
  });
}


/**
 * 更新通知 Token
 * @param token Token
 * @param line Line Notify Token
 * @param discord Discord Token
 */
const update = (
  token: string,
  line: string,
  discord: string
) => {
  const url = `http://${IP}:${PORT}/api/notification/update/token`;

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

  fetch(url, requestOptions).then(async (response: Response) => {
    if (response.ok) {
      toast.success('更改成功!');
    }
  });
}


/**
 * 發送狀態通知
 * @param token Token
 */
const sendNotify = (token: string) => {
  const url = `http://${IP}:${PORT}/api/notification/send`;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  fetch(url, requestOptions);
}

const Notification = {
  get,
  update,
  sendNotify
}

export default Notification;