import { BiUser, BiCog, BiLogOut } from 'react-icons/bi';


export const Name: {
  title: string
} = {
  title: 'Fall Detection'
};

export const NetworkAddress: {
  ip: string,
  port: string
} = {
  ip: '127.0.0.1',
  port: '8000'
}

export const MenuList: {
  name: string,
  key: string,
  icon: JSX.Element
}[] = [
  {
    name: '帳號管理',
    key: 'account',
    icon: <BiUser />
  }, {
    name: '系統設定',
    key: 'system',
    icon: <BiCog />
  }, {
    name: '登出',
    key: 'logout',
    icon: <BiLogOut />
  }
]