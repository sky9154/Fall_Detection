import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import NProgress from 'nprogress';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import 'css/loadingScreen.css';


const LoadingScreen = () => {
  NProgress.configure({
    showSpinner: false,
    easing: 'ease',
    speed: 700,
    minimum: 0.1
  });

  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <>
      <Toaster />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    </>
  );
};

export default LoadingScreen;