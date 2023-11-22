import { FC } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useCameraContext } from 'context/CameraContext';


const StateNotification: FC = () => {
  const { state } = useCameraContext();

  return (
    <Alert
      severity={(state) ? "warning" : "success"}
      sx={{
        borderRadius: 2,
        boxShadow: '0 4px 8px 0 #BDC9D7'
      }}
    >
      <AlertTitle>目前狀態</AlertTitle>
      {(state) ? "警告" : "安全"}
    </Alert>
  );
}

export default StateNotification;