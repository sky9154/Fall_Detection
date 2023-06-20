from fastapi import APIRouter, Depends, HTTPException, Form
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse, FileResponse
from bson import ObjectId
from functions import token, user
import os


router = APIRouter()

@router.post('/login')
async def login (credentials: OAuth2PasswordRequestForm = Depends()):
  result = await user.get(credentials.username)

  if not result or result['password'] != credentials.password:
    raise HTTPException(401, 'Incorrect username or password')

  return JSONResponse(content = { 
    'access_token': token.generate(result),
    'token_type': 'bearer' 
  })


@router.get('/get/token')
async def get_token (token_payload: dict = Depends(token.get)):
  return JSONResponse(content= token_payload)


@router.get('/get/avatar/{username}')
async def get_avatar (username: str):
  if user.check_username(username):
    image = f'temp/avatar/{username}.png'
    
    if os.path.isfile(image):
      return FileResponse(image, media_type='image/jpeg')
  else:
    raise HTTPException(400, 'Invalid username')


@router.get('/get/username/{username}')
async def get_username (token_payload: dict = Depends(token.get), username: str = ''):
  user_role = token_payload['role']

  if user.check_role(user_role):
    if username != '':
      result = await user.get(username)

      return JSONResponse(content = result)
    else:
      raise HTTPException(400, 'Invalid username')
  else:
    raise HTTPException(403, 'User does not have permission')
  

@router.get('/get/all')
async def get_all (token_payload: dict = Depends(token.get)):
  user_role = token_payload['role']

  if user.check_role(user_role):
    results = await user.get_all()

    users = [result.get('username') for result in results]

    return JSONResponse(content = users)
  else:
    raise HTTPException(403, 'User does not have permission')


@router.put('/update/name')
async def update_name (
  token_payload: dict = Depends(token.get),
  new_name: str = Form(...)
):
  username = token_payload['username']
  existence = await user.existence(username)

  if existence:
    if user.check_name(username):
      await user.update_name(username, new_name.strip())

      raise HTTPException(201, 'Name updated successfully')
    else:
      raise HTTPException(400, 'Invalid name')
  else:
    raise HTTPException(404, 'User not found')
  

@router.put('/update/password')
async def update_password (
  token_payload: dict = Depends(token.get),
  old_password: str = Form(...),
  new_password: str = Form(...)
):
  username = token_payload['username']
  existence = await user.existence(username)

  if existence:
    result = await user.get(username)
    
    old_password = old_password.strip()
    new_password = new_password.strip()

    if old_password == result['password'] and user.check_password(new_password):
      await user.update_password(username, new_password)

      raise HTTPException(201, 'Password updated successfully')
    else:
      raise HTTPException(400, 'Invalid password')
  else:
    raise HTTPException(404, 'User not found')
  

@router.post('/create')
async def create (
  token_payload: dict = Depends(token.get),
  username: str = Form(...),
  password: str = Form(...),
  name: str = Form(...),
  role: str = Form(default='user')
):
  user_role = token_payload['role']

  if user.check_role(user_role):
    existence = await user.existence(username)

    username = username.strip()
    password = password.strip()
    name = name.strip()
    role = role.strip()

    if existence:
      raise HTTPException(400, 'User already exists')
    else:
      if not user.check_name(name):
        raise HTTPException(400, 'Invalid name')
      
      if not user.check_username(username):
        raise HTTPException(400, 'Invalid username')
      
      if not user.check_password(password):
        raise HTTPException(400, 'Invalid password')
      
      if role not in ['user', 'admin']:
        raise HTTPException(400, 'Invalid role')
      
      object_id = ObjectId()

      await user.create({
        '_id': object_id,
        'name': name,
        'role': role,
        'username': username,
        'password': password
      })

      raise HTTPException(201, 'User Created successfully')
  else:
    raise HTTPException(403, 'User does not have permission')


@router.put('/edit')
async def edit (
  token_payload: dict = Depends(token.get),
  username: str = Form(...),
  password: str = Form(...),
  name: str = Form(...),
  role: str = Form(default='user')
):
  user_role = token_payload['role']

  if user.check_role(user_role):
    existence = await user.existence(username)

    username = username.strip()
    password = password.strip()
    name = name.strip()
    role = role.strip()

    if existence:
      if not user.check_name(name):
        raise HTTPException(400, 'Invalid name')

      if not user.check_username(username):
        raise HTTPException(400, 'Invalid username')
      
      if not user.check_password(password):
        raise HTTPException(400, 'Invalid password')
      
      if role not in ['user', 'admin']:
        raise HTTPException(400, 'Invalid role')

      result = await user.get(username)
    
      await user.update_user(result['username'], {
        'name': name,
        'role': role,
        'username': username,
        'password': password
      })

      raise HTTPException(201, 'User updated successfully')
    else:
      raise HTTPException(400, 'User does not exist')
  else:
    raise HTTPException(403, 'User does not have permission')
  

@router.delete('/delete')
async def delete (
  token_payload: dict = Depends(token.get),
  username: str = Form(...)
):
  user_role = token_payload['role']

  if user.check_role(user_role):
    existence = await user.existence(username)
    
    username = username.strip()

    if existence:
      if not user.check_username(username):
        raise HTTPException(400, 'Invalid username')
      
      await user.delete(username)

      raise HTTPException(201, 'User deleted successfully')
    else:
      raise HTTPException(400, 'User does not exist')
  else:
    raise HTTPException(403, 'User does not have permission')
