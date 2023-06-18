import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import api


load_dotenv()

def create_app ():
  app = FastAPI(debug=True)

  app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
  )

  return app


app = create_app()

app.include_router(api.Contact, prefix='/api/contact')
app.include_router(api.Detection, prefix='/ws/stream')
app.include_router(api.Notification, prefix='/api/notification')
app.include_router(api.User, prefix='/api/user')

IP = os.getenv('IP')
PORT = int(os.getenv('PORT'))

if __name__ == '__main__':
  uvicorn.run(app, host=IP, port=PORT)
