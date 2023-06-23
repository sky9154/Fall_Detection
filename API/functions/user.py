import functions.mongodb as mongodb


async def get_all () -> list:
  '''
  取得所有使用者資料
  '''

  results = await mongodb.find('Users', { })

  return results


async def get (username: str) -> dict:
  '''
  取得使用者資料
  '''
  
  result = await mongodb.find('Users', { 'username': username })
  
  return result[0]


async def existence (username: str) -> bool:
  '''
  檢查使用者是否存在
  '''

  result = await mongodb.find('Users', {'username': username})

  return len(result) != 0


async def create (user: dict):
  '''
  建立使用者
  '''

  await mongodb.insert('Users', user)


async def delete (username: str):
  '''
  刪除使用者
  '''

  await mongodb.delete('Users', {'username': username})


async def update_name (username: str, name: str):
  '''
  修改暱稱
  '''

  await mongodb.update('Users', { 
    'username': username 
  }, {
    '$set': {
      'name': name
    }
  })


async def update_password (username: str, password: str):
  '''
  修改密碼
  '''

  await mongodb.update('Users', { 
    'username': username 
  }, { 
    '$set': {
      'password': password
    }
  })


async def update_user (username: str, user: dict):
  '''
  修改使用者資料
  '''

  await mongodb.update('Users', { 
    'username': username 
  }, { 
    '$set': user
  })


def check_role (role: str) -> bool:
  '''
  檢查權限是否為 admin
  '''

  return role == 'admin'


def check_name (name: str) -> bool:
  '''
  檢查暱稱長度
  '''

  return len(name) >= 3


def check_username (username: str) -> bool:
  '''
  檢查帳號長度
  '''

  return len(username) >= 6


def check_password (password: str) -> bool:
  '''
  檢查密碼長度
  '''

  return len(password) >= 8
