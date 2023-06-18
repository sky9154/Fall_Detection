from fastapi import APIRouter
from fastapi.responses import JSONResponse
from functions import contact


router = APIRouter()

@router.get('/get')
async def get ():
  results = await contact.get()

  return JSONResponse(content = results)
