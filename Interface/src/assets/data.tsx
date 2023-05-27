import { BiInfoCircle, BiUser, BiCog, BiLogOut } from 'react-icons/bi';


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
    name: '功能說明',
    key: 'info',
    icon: <BiInfoCircle />
  }, {
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

export const info: {
  introduce: string[]
} = {
  introduce: [
    '你有沒有想過，',
    '如果你的家人或朋友\n不小心跌倒了，',
    '你能及時發現並救助他們嗎？',
    '跌倒是一種常見的意外。',
    '尤其是對於老年人\n或身體虛弱的人來說，',
    '可能會造成嚴重的傷害\n甚至死亡。',
    '因此，',
    '有一種能夠自動偵測跌倒\n並發出警報的工具，',
    '就顯得非常重要和有用了。'
  ]
}