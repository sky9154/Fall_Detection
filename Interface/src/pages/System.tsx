import { FC } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import UserProfile from 'components/Settings/UserProfile';
import UpdateNotificationToken from 'components/Settings/System/UpdateNotificationToken';
import Users from 'components/Settings/System/Users'

const System: FC = () => (
  <Container sx={{ my: 4 }}>
    <Stack
      direction={{ sm: 'column', md: 'row' }}
      divider={<Divider orientation="vertical" flexItem />}
      justifyContent="space-evenly"
      alignItems="center"
      spacing={8}
      minHeight="85vh"
    >
      <UserProfile />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        minWidth="50%"
      >
        <Stack
          direction="column"
          justifyContent="space-evenly"
          alignItems="stretch"
          spacing={4}
          width="100%"
          my={4}
        >
          <UpdateNotificationToken />
          <Users />
        </Stack>
      </Box>
    </Stack>
  </Container>
);

export default System;