import { FC } from 'react';
import Box from '@mui/material/Box';
import { useCameraContext } from 'context/CameraContext';
import Rectangle from 'components/Loader/Rectangle';


const CameraScreen: FC = () => {
  const { isLoading, cameraFrame } = useCameraContext();
  
  return (
    <Box
      position="relative"
      display="flex"
      alignItems="stretch"
    >
      <Box
        position="absolute"
        display={(isLoading.value) ? "flex" : "none"}
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <Rectangle />
      </Box>
      <img
        src={cameraFrame.value}
        alt={(cameraFrame.value) ? "video" : "Loading"}
        style={{
          width: '100%',
          borderRadius: 16,
          boxShadow: '0 4px 8px 0 #BDC9D7'
        }}
      />
    </Box>
  );
}

export default CameraScreen;