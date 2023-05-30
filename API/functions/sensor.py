from dotenv import load_dotenv
import socket
import os


load_dotenv()

SENSOR_IP = os.getenv('SENSOR_IP')
SENSOR_PORT = int(os.getenv('SENSOR_PORT'))

async def get ():
  '''
  取得感測器資料
  '''

  try:
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect((SENSOR_IP, SENSOR_PORT))

    message = 'sensor'
    client_socket.send(message.encode())

    response = client_socket.recv(1024)
    response = str(response.decode()).split(' ')
    response = [float(data) for data in response]

    client_socket.close()

    return {
      'mq5': 2.5 if response[0] < 0.1 else round(response[0] * 2.5, 5),
      'mq9': 2.5 if response[1] < 0.1 else round(response[1] * 2.5, 5),
      'temperature': round(response[2], 1)
    }
  except Exception:
    print(f'ERROR:    主機未連接')

    return {
      'mq5': 0,
      'mq9': 0,
      'temperature': 0
    }
