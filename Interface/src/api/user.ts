import toast from 'react-hot-toast';


type UserType = {
  name: string | null;
  role: string | null;
  username: string | null;
  token: string | null;
}

const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_PORT;


/**
 * 使用者登入
 * @param navigate navigate
 * @param setUser 設定使用者
 * @param username 帳號
 * @param password 密碼
 */
const login = (
  navigate: (link: string) => void,
  setUser: (user: UserType) => void,
  username: string,
  password: string
) => {
  const url = `http://${IP}:${PORT}/api/user/login`;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'username': username,
      'password': password
    })
  };

  fetch(url, requestOptions)
    .then((response: Response) => {
      switch (response.status) {
        case 200:
          toast.success('登入成功');

          return response.json();
        case 400:
          toast.error('使用者不存在!');

          break;
        case 401:
          toast.error('密碼錯誤!');

          break;
      }
    })
    .then((data) => {
      if (data) {
        setUser(data.detail);

        navigate('/');
      }
    })
}


/**
 * 修改暱稱
 * @param userState userState
 * @param name 暱稱
 */
const updateName = (
  userState: {
    value: UserType;
    setValue: (user: UserType) => void;
  },
  name: string
) => {
  const url = `http://${IP}:${PORT}/api/user/update/name`;

  const requestOptions = {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${userState.value.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'new_name': name
    })
  };

  fetch(url, requestOptions).then((response: Response) => {
    if (response.ok) {
      toast.success('更改成功!');
      userState.setValue({
        ...userState.value,
        name: name
      })
    }
  });
}


/**
 * 修改密碼
 * @param userState userState
 * @param password 密碼
 */
const updatePasswoed = (
  userState: {
    value: UserType;
    setValue: (user: UserType) => void;
  },
  password: {
    old: string,
    new: string
  }
) => {
  const url = `http://${IP}:${PORT}/api/user/update/password`;

  const requestOptions = {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${userState.value.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'old': password.old,
      'new': password.new
    })
  };

  fetch(url, requestOptions).then((response: Response) => {
    if (response.ok) {
      toast.success('更改成功!');
    } else if (response.status === 400) {
      toast.success('目前密碼不正確!');
    }
  });
}


/**
 * 取得使用者
 * @param token Token
 * @param username 帳號
 * @param set 設定使用者資料
 */
const getUser = (
  token: string,
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
 * @param token Token
 * @param setUserList 設定使用者清單
 */
const getUserList = (token: string, setUserList: (userList: string[]) => void) => {
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
 * @param token Token
 * @param user 使用者資料
 */
const create = (
  token: string,
  user: {
    username: string,
    password: string,
    name: string,
    role: string
  }
) => {
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

  fetch(url, requestOptions).then((response: Response) => {
    if (response.ok) {
      toast.success('新增成功!');
    }
  });
}


/**
 * 修改使用者
 * @param token Token
 * @param user 使用者資料
 */
const edit = (
  token: string,
  user: {
    username: string,
    password: string,
    name: string,
    role: string
  }
) => {
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

  fetch(url, requestOptions).then((response: Response) => {
    if (response.ok) {
      toast.success('修改成功!');
    }
  });
}


/**
 * 刪除使用者
 * @param token Token
 * @param username 帳號
 */
const remove = (token: string, username: string) => {
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

  fetch(url, requestOptions).then((response: Response) => {
    if (response.ok) {
      toast.success('刪除成功!');
    }
  });
}


const User = {
  login,
  getUser,
  getUserList,
  updateName,
  updatePasswoed,
  create,
  edit,
  remove
}

export default User;