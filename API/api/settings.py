from fastapi import APIRouter, Depends, HTTPException, Form
from fastapi.responses import JSONResponse
from bson import ObjectId
from functions import token, notification, user


router = APIRouter()

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


@router.put('/update/notification/token')
async def update_notification_token (
  token_payload: dict = Depends(token.get),
  line: str = Form(default=''),
  discord: str = Form(default='')
):
  user_role = token_payload['role']

  if user.check_role(user_role):
    line = line.strip()
    discord = discord.strip()
  
    await notification.update_token(line, discord)

    raise HTTPException(201, 'Notification token updated successfully')
  else:
    raise HTTPException(403, 'User does not have permission')



@router.post('/user')
async def users (
  token_payload: dict = Depends(token.get),
  username: str = Form(...)
):
  user_role = token_payload['role']

  if user.check_role(user_role):
    results = await user.get(username)

    return JSONResponse(content = {
      'user': results
    })
  else:
    raise HTTPException(403, 'User does not have permission')
  

@router.get('/user/all')
async def users (token_payload: dict = Depends(token.get)):
  user_role = token_payload['role']

  if user.check_role(user_role):
    results = await user.get_all()

    users = [result.get('username') for result in results]

    return JSONResponse(content = {
      'users': users
    })
  else:
    raise HTTPException(403, 'User does not have permission')


@router.post('/user/create')
async def user_create (
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


@router.put('/user/edit')
async def user_edit (
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
  

@router.delete('/user/delete')
async def user_delete (
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
