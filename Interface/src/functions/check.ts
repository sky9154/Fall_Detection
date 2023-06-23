import toast from 'react-hot-toast';


/**
 * 檢查暱稱
 * @param name 暱稱
 * @returns 暱稱格式是否正確
 */
const name = (name: string) => {
  if (name.trim().length >= 3) {
    return true;
  } else {
    toast.error('暱稱長度須大於 3 位數!');

    return false;
  }
}


/**
 * 檢查帳號
 * @param username 帳號
 * @returns 帳號格式是否正確
 */
const username = (username: string) => {
  if (username.trim().length >= 6) {
    return true;
  } else {
    toast.error('帳號長度須大於 6 位數!');

    return false;
  }
}


/**
 * 檢查密碼
 * @param password 密碼
 * @returns 密碼格式是否正確
 */
const password = (password: string) => {
  if (password.trim().length >= 8) {
    return true;
  } else {
    toast.error('密碼長度須大於 8 位數!');

    return false;
  }
}


/**
 * 檢查 Discord 通知設定
 * @param channel 頻道編號
 * @param token 通知權杖
 * @returns Discord 通知是否符合
 */
const discord = (channel: string, token: string) => {
  if (channel === '' && token === '') {
    return '';
  } else if (channel !== '' && token !== '') {
    return `${channel} ${token}`;
  } else {
    toast.error('Discord 通知，須包含頻道編號及通知權杖!');

    return false;
  }
}

const check = {
  name,
  username,
  password,
  discord
}

export default check;