import { FC, useState } from 'react';
import { FaUserPlus, FaUserEdit, FaUserMinus } from 'react-icons/fa';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { H2 } from 'components/Typography';
import { Create, Edit, Remove } from 'components/Settings/System/UserFrom';
import { useAuthContext } from 'context/AuthContext';
import user from 'api/user';


const User: FC = () => {
  const { userState } = useAuthContext();

  const [fromState, setFromState] = useState<{
    create: boolean;
    edit: boolean;
    remove: boolean;
  }>({
    create: false,
    edit: false,
    remove: false
  });

  const [userList, setUserList] = useState<string[]>([]);

  const handleOpen = (from: 'create' | 'edit' | 'remove') => {
    switch (from) {
      case 'create':
        setFromState({
          ...fromState,
          create: true
        });

        break;
      case 'edit':
        user.getUserList(userState.value.token as string, setUserList);

        setFromState({
          ...fromState,
          edit: true
        });

        break;
      case 'remove':
        user.getUserList(userState.value.token as string, setUserList);

        setFromState({
          ...fromState,
          remove: true
        });

        break;
    }
  };

  const handleClose = (from: 'create' | 'edit' | 'remove') => {
    switch (from) {
      case 'create':
        setFromState({
          ...fromState,
          create: false
        });

        break;
      case 'edit':
        setFromState({
          ...fromState,
          edit: false
        });

        break;
      case 'remove':
        setFromState({
          ...fromState,
          remove: false
        });

        break;
    }
  };

  return (
    <Box
      component="form"
      display="flex"
      alignItems="center"
      width="100%"
      borderRadius={4}
      boxShadow="0 4px 8px 0 #BDC9D7"
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        width="100%"
        spacing={2}
        p={4}
      >
        <H2>成員管理</H2>
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={4}>
            <Button
              variant="outlined"
              size="large"
              color="inherit"
              fullWidth
              startIcon={<FaUserPlus />}
              onClick={() => handleOpen('create')}
            >
              新增成員
            </Button>
            <Create
              open={fromState.create}
              handleClose={() => handleClose('create')}
              userList={userList}
            />
          </Grid>
          <Grid xs={12} sm={12} md={4}>
            <Button
              variant="outlined"
              size="large"
              color="inherit"
              fullWidth
              startIcon={<FaUserEdit />}
              onClick={() => handleOpen('edit')}
            >
              修改成員
            </Button>
            <Edit
              open={fromState.edit}
              handleClose={() => handleClose('edit')}
              userList={userList}
            />
          </Grid>
          <Grid xs={12} sm={12} md={4}>
            <Button
              variant="outlined"
              size="large"
              color="inherit"
              fullWidth
              startIcon={<FaUserMinus />}
              onClick={() => handleOpen('remove')}
            >
              刪除成員
            </Button>
            <Remove
              open={fromState.remove}
              handleClose={() => handleClose('remove')}
              userList={userList}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box >
  );
}

export default User;