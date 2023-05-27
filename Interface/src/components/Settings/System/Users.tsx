import { FC, useState, useEffect } from 'react';
import { FaUserPlus, FaUserEdit, FaUserMinus } from 'react-icons/fa';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { H2 } from 'components/Typography';
import { Added, Edit, Delete } from 'components/Settings/System/UserFrom';
import user from 'api/user';


const Users: FC = () => {
  const [openAddedFrom, setOpenAddedFrom] = useState<boolean>(false);
  const [openEditFrom, setOpenEditFrom] = useState<boolean>(false);
  const [openDeleteFrom, setOpenDeleteFrom] = useState<boolean>(false);
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    user.getUserList(setUsers);
  }, []);

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
              onClick={() => setOpenAddedFrom(true)}
            >
              新增成員
            </Button>
            <Added
              open={openAddedFrom}
              handleClose={() => setOpenAddedFrom(false)}
              users={users}
            />
          </Grid>
          <Grid xs={12} sm={12} md={4}>
            <Button
              variant="outlined"
              size="large"
              color="inherit"
              fullWidth
              startIcon={<FaUserEdit />}
              onClick={() => setOpenEditFrom(true)}
            >
              修改成員
            </Button>
            <Edit
              open={openEditFrom}
              handleClose={() => setOpenEditFrom(false)}
              users={users}
            />
          </Grid>
          <Grid xs={12} sm={12} md={4}>
            <Button
              variant="outlined"
              size="large"
              color="inherit"
              fullWidth
              startIcon={<FaUserMinus />}
              onClick={() => setOpenDeleteFrom(true)}
            >
              刪除成員
            </Button>
            <Delete
              open={openDeleteFrom}
              handleClose={() => setOpenDeleteFrom(false)}
              users={users}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box >
  );
}

export default Users;