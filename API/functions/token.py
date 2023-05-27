from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jwt import encode, decode


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='authenticate')

SECRET_KEY = 'kirito'

def generate (result: dict) -> str:
  '''
  生成 JSON Web Token
  '''

  payload = {
    'name': result['name'],
    'role': result['role'],
    'username': result['username']
  }
  
  token = encode(payload, SECRET_KEY, algorithm='HS256')

  return token


def get (auth_header: str = Depends(oauth2_scheme)) -> dict:
  '''
  OAuth2 認證
  '''

  token = auth_header

  try:
    payload = decode(token, SECRET_KEY, algorithms=['HS256'])

    return payload
  except:
    raise HTTPException(422, 'Token format error')
  