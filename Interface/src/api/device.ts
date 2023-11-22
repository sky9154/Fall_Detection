type UserType = {
  name: string | null;
  role: string | null;
  username: string | null;
  token: string | null;
}

type DevieType = {
  name: string;
  camera: string;
  display: string;
}

const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_PORT;

const get = (user: UserType, setDevice: (device: DevieType[]) => void) => {
  const url = `http://${IP}:${PORT}/api/device/get`;

  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  };

  fetch(url, requestOptions).then(async (response: Response) => {
    const results = await response.json();

    setDevice(results['devices']);
  });
}

const Device = {
  get
}

export default Device;