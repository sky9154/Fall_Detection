from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from functions import token, user

router = APIRouter()

@router.post('/authenticate')
async def authenticate (credentials: OAuth2PasswordRequestForm = Depends()):
  result = await user.get(credentials.username)

  if not result or result['password'] != credentials.password:
    raise HTTPException(401, 'Incorrect username or password')

  return JSONResponse(content = { 
    'access_token': token.generate(result),
    'token_type': 'bearer' 
  })


@router.get('/protected')
async def read_protected (token_payload: dict = Depends(token.get)):
  return token_payload
