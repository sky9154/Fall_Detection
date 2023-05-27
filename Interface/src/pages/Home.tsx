import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CameraScreen from 'components/Home/CameraScreen';
import CameraToggleButton from 'components/Home/CameraToggleButton';
import PredictChart from 'components/Home/PredictChart';
import StateNotification from 'components/Home/StateNotification';
import IntroductionCard from 'components/Home/IntroductionCard';
import OperationToggleButton from 'components/Home/OperationToggleButton';


const Home: FC = () => {
  const [page, setPage] = useState<number>(1);

  return (
    <Box m={4}>
      <Grid
        container
        spacing={4}
        justifyContent="center"
      >
        <Grid md={12} xl={9}>
          <CameraScreen />
        </Grid>
        <Grid sm={12} md={5} xl={3} sx={{ width: '100%' }}>
          <Box
            display="flex"
            alignItems="space-between"
            height="100%"
            width="100%"
          >
            <Box
              p={4}
              width="100%"
              borderRadius={4}
              boxShadow="0 4px 8px 0 #BDC9D7"
            >
              <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                spacing={6}
                height="100%"
                width="100%"
              >
                {(page === 1) ? (
                  <>
                    <Box width="100%">
                      <StateNotification />
                    </Box>
                    <Box height="100%" width="100%" minHeight="200px">
                      <PredictChart />
                    </Box>
                    <Box width="auto">
                      <CameraToggleButton />
                    </Box>
                  </>
                ) : (
                  <IntroductionCard />
                )}
                <OperationToggleButton page={page} setPage={setPage} />
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;