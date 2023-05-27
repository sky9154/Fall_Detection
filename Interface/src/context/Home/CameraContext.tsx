import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useRef,
  useContext
} from 'react';
import { NetworkAddress } from 'assets/data';
import notification from 'api/notification';


interface Props {
  children: ReactNode;
}

interface Camera {
  id: string,
  draw: boolean
}

interface Predict {
  safety: number;
  warning: number;
  fall: number;
}

interface CameraContextProps {
  isLoading: {
    value: boolean;
    setValue: (value: boolean) => void;
  };
  camera: {
    value: Camera;
    setValue: (value: Camera) => void;
  };
  cameraFrame: {
    value: string;
    setValue: (value: string) => void;
  };
  predict: {
    value: Predict;
    setValue: (value: Predict) => void;
  };
  state: boolean;
  disconnectSocket: () => void;
}

const CameraContext = createContext<CameraContextProps>({
  isLoading: {
    value: true,
    setValue: () => { }
  },
  camera: {
    value: {
      id: '0',
      draw: false
    },
    setValue: () => { }
  },
  cameraFrame: {
    value: 'https://dummyimage.com/1280x720/FFF.png&text=+',
    setValue: () => { }
  },
  predict: {
    value: {
      safety: 0,
      warning: 0,
      fall: 0
    },
    setValue: () => { }
  },
  state: false,
  disconnectSocket: () => { }
});

export const CameraProvider = ({ children }: Props) => {
  const cameraRef = useRef<WebSocket | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cameraFrame, setCameraFrame] = useState<string>('https://dummyimage.com/1280x720/FFF.png&text=+');
  const [state, setState] = useState<boolean>(false);

  const [camera, setCamera] = useState<Camera>({
    id: 'test',
    draw: false
  });

  const [predict, setPredict] = useState<Predict>({
    safety: 0,
    warning: 0,
    fall: 0
  });

  const closeSocket = () => {
    if (cameraRef.current) {
      cameraRef.current.close();
    }
  };

  const disconnectSocket = () => {
    setIsLoading(true);
    setCameraFrame('https://dummyimage.com/1280x720/FFF.png&text=+');

    setPredict({
      safety: 0,
      warning: 0,
      fall: 0
    });

    setState(false);

    closeSocket();
  }

  useEffect(() => {
    const ip = NetworkAddress.ip;
    const port = NetworkAddress.port;

    cameraRef.current = new WebSocket(`ws://${ip}:${port}/api/camera/${camera.id}?draw=${camera.draw}`);
    cameraRef.current.binaryType = 'arraybuffer';

    cameraRef.current.onmessage = (event) => {
      setIsLoading(false);

      if (typeof (event.data) === 'string') {
        const data: {
          predict: {
            safety: number,
            warning: number,
            fall: number
          },
          state: boolean
        } = JSON.parse(event.data);

        setPredict(data.predict);
        setState(data.state);
      } else {
        const blob = new Blob([event.data], { type: 'image/jpeg' });
        const frame = URL.createObjectURL(blob);

        setCameraFrame(frame);
      }
    };

    return () => closeSocket();
  }, [camera]);

  useEffect(() => {
    if (state) {
      // notification.lineNotify();
    }
  }, [state]);


  return (
    <CameraContext.Provider value={{
      isLoading: {
        value: isLoading,
        setValue: setIsLoading
      },
      camera: {
        value: camera,
        setValue: setCamera
      },
      cameraFrame: {
        value: cameraFrame,
        setValue: setCameraFrame
      },
      predict: {
        value: predict,
        setValue: setPredict
      },
      state: state,
      disconnectSocket
    }}>
      {children}
    </CameraContext.Provider>
  );
}

export const useCameraContext = () => useContext(CameraContext);