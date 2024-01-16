import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CameraScreen from 'components/Detection/CameraScreen';
import CameraToggleButton from 'components/Detection/CameraToggleButton';
import NotificationToggleButton from 'components/Detection/NotificationToggleButton';
import PredictChart from 'components/Detection/PredictChart';
import StateNotification from 'components/Detection/StateNotification';
import OperationToggleButton from 'components/Detection/OperationToggleButton';
import IntroductionCard from 'components/Detection/IntroductionCard';


const Detection: FC = () => {
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
                  </>
                ) : (
                  <IntroductionCard />
                )}
                <Stack direction="row">
                  <CameraToggleButton />
		  <NotificationToggleButton />

                  <OperationToggleButton page={page} setPage={setPage} />
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Detection;