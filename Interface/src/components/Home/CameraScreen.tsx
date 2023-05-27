import { FC } from 'react';
import Box from '@mui/material/Box';
import { styled, createTheme } from '@mui/material/styles';
import { useCameraContext } from 'context/Home/CameraContext';


const theme = createTheme();

const Loader = styled(Box)(() => ({
  boxShadow: '0 0 0 7px #42A5F5, inset 0 0 0 1px #42A5F5',
  position: 'relative',
  borderRadius: '8px',
  overflow: 'hidden',
  animation: 'rotate 6s linear infinite',
  [theme.breakpoints.down('sm')]: {
    height: '22px',
    width: '100px',
  },
  [theme.breakpoints.up('sm')]: {
    height: '50px',
    width: '230px',
  },
  '&:before': {
    display: 'block',
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    backgroundColor: '#42A5F5',
    animation: 'load 6s linear infinite'
  },
  '@keyframes rotate': {
    '0%, 42%': {
      transform: 'rotate(0deg)'
    },
    '48%, 92%': {
      transform: 'rotate(180deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  },
  '@keyframes load': {
    '0%': {
      width: 0
    },
    '40%, 50%': {
      width: '100%'
    },
    '90%, 100%': {
      width: 0
    }
  }
}));

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
        <Loader />
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