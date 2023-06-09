import toast from 'react-hot-toast';
import system from 'functions/system';


interface AccessToken {
  access_token: string,
  token_type: string
}

interface User {
  name: string | null;
  role: string | null;
  username: string | null;
}

const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_PORT;
const token = localStorage.getItem('access_token');

/**
 * 使用者登入
 * @param navigate navigate
 * @param username 帳號
 * @param password 密碼
 */
const login = async (
  navigate: (link: string) => void,
  username: string,
  password: string
) => {
  const url = `http://${IP}:${PORT}/api/user/login`;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'username': username,
      'password': password
    })
  };

  fetch(url, requestOptions).then(async (response: Response) => {
    const json: AccessToken = await response.json();

    if (response.ok) {
      toast.success('登入成功');

      localStorage.setItem('access_token', json.access_token);

      navigate('/home');

      system.reload();
    } else if (response.status === 401) {
      toast.error('帳號或密碼錯誤!')
    }
  });
}


/**
 * 修改暱稱
 * @param name 暱稱
 * @param user user
 */
const updateName = async (name: string) => {
  const url = `http://${IP}:${PORT}/api/user/update/name`;

  const requestOptions = {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'new_name': name
    })
  };

  fetch(url, requestOptions).then(async (response: Response) => {
    if (response.ok) {
      toast.success('更改成功，請重新登入!');
    }
  });
}


/**
 * 修改密碼
 * @param oldPassword 舊密碼
 * @param newPassword 新密碼
 */
const updatePasswoed = async (oldPassword: string, newPassword: string) => {
  const url = `http://${IP}:${PORT}/api/user/update/password`;

  const requestOptions = {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'old_password': oldPassword,
      'new_password': newPassword
    })
  };

  fetch(url, requestOptions).then(async (response: Response) => {
    if (response.ok) {
      toast.success('更改成功!，請重新登入!');
    }
  });
}


/**
 * 取得使用者資料
 * @param setValue setValue
 */
const get = async (
  user: (user: {
    name: string,
    role: string,
    username: string
  }) => void) => {
  if (token) {
    const url = `http://${IP}:${PORT}/api/user/get/token`;

    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    fetch(url, requestOptions).then(async (response: Response) => {
      if (response.ok) {
        const json: User = await response.json();

        user({
          name: json.name as string,
          role: json.role as string,
          username: json.username as string
        });
      }
    });
  }
}


/**
 * 取得使用者
 * @param username 帳號
 * @param set 設定
 */
const getUser = async (
  username: string,
  set: {
    password: (password: string) => void,
    name: (name: string) => void,
    role: (role: string) => void
  }
) => {
  const url = `http://${IP}:${PORT}/api/user/get/username/${username}`;

  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  fetch(url, requestOptions).then(async (response: Response) => {
    if (response.ok) {
      const user: {
        name: string,
        role: string,
        username: string,
        password: string
      } = await response.json();

      set.password(user.password);
      set.name(user.name);
      set.role(user.role);
    }
  });
}


/**
 * 取得使用者清單
 * @param setUsers setUsers
 */
const getUserList = async (setUserList: (userList: string[]) => void) => {
  const url = `http://${IP}:${PORT}/api/user/get/all`;

  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  fetch(url, requestOptions).then(async (response: Response) => {
    if (response.ok) {
      const userList: string[] = await response.json();

      setUserList(userList);
    }
  });
}


/**
 * 新增使用者
 * @param user User
 */
const create = async (user: {
  username: string,
  password: string,
  name: string,
  role: string
}) => {
  const url = `http://${IP}:${PORT}/api/user/create`;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`
    },
    body: new URLSearchParams({
      username: user.username,
      password: user.password,
      name: user.name,
      role: user.role
    })
  }

  fetch(url, requestOptions).then(async (response: Response) => {
    if (response.ok) {
      toast.success('新增成功!');
    }
  });
}


/**
 * 修改使用者
 * @param user User
 */
const edit = async (user: {
  username: string,
  password: string,
  name: string,
  role: string
}) => {
  const url = `http://${IP}:${PORT}/api/user/edit`;

  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`
    },
    body: new URLSearchParams({
      username: user.username,
      password: user.password,
      name: user.name,
      role: user.role
    })
  }

  fetch(url, requestOptions).then(async (response: Response) => {
    if (response.ok) {
      toast.success('修改成功!');
    }
  });
}


/**
 * 刪除使用者
 * @param username 帳號
 */
const remove = async (username: string, user: string) => {
  const url = `http://${IP}:${PORT}/api/user/delete`;

  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`
    },
    body: new URLSearchParams({
      'username': username
    })
  }

  if (username === user) {
    toast.error('刪除失敗，你無法將自己刪除!');
  } else {
    fetch(url, requestOptions).then(async (response: Response) => {
      if (response.ok) {
        toast.success('刪除成功!');
      }
    });
  }
}


const user = {
  login,
  get,
  getUser,
  getUserList,
  updateName,
  updatePasswoed,
  create,
  edit,
  remove
}

export default user;