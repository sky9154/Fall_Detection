import {
  BiCamera,
  BiUser,
  BiCog,
  BiLogOut
} from 'react-icons/bi';


export const Name: {
  title: string
} = {
  title: 'Fall Detection'
};

export const MenuList: {
  name: string,
  key: string,
  icon: JSX.Element
}[] = [
    {
      name: '跌倒檢測',
      key: '',
      icon: <BiCamera />
    }, {
      name: '帳號管理',
      key: 'account',
      icon: <BiUser />
    }, {
      name: '系統設定',
      key: 'system',
      icon: <BiCog />
    }, {
      name: '登出  ',
      key: 'logout',
      icon: <BiLogOut />
    }
  ]

export const setting: {
  notification: boolean
} = {
  notification: true
}