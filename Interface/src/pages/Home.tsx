import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useAuthContext } from 'context/AuthContext';
import { H2, Paragraph } from '../components/Typography';
import Device from '../api/device';


type DevieType = {
  name: string;
  camera: string;
  display: string;
}

const Home: FC = () => {
  const { userState } = useAuthContext();

  const [devices, setDevices] = useState<DevieType[]>([]);

  useEffect(() => {
    Device.get(userState.value, setDevices);
  }, [userState.value]);

  return (
    <Box m={4}>
      {(devices) ? (
        <Grid container spacing={2}>
          {devices.map((device) => (
            <Grid key={device.camera} item sm={12} md={5} xl={3}>
              <Link
                to={`/detection/${device.camera}`}
                style={{
                  textDecoration: 'none',
                  whiteSpace: 'pre'
                }}
              >
                <Paper elevation={3}>
                  <Box p={2}>
                    <H2>{device.name}</H2>
                    <Paragraph>{device.camera}</Paragraph>
                  </Box>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid >
      ) : (
        <></>
      )}
    </Box >
  );
}

export default Home;