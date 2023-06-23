import { FC, FormEvent, ChangeEvent, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useAuthContext } from 'context/AuthContext';
import { H2 } from 'components/Typography';
import user from 'api/user';
import check from 'functions/check';


type UserFromProps = {
  open: boolean;
  handleClose: () => void;
  userList: string[];
}

export const Create: FC<UserFromProps> = ({ open, handleClose }) => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    const name = data.get('name');
    const role = data.get('role');

    if (username && password && name && role) {
      const createUser = {
        username: username as string,
        password: password as string,
        name: name as string,
        role: role as string
      }

      if (
        check.username(createUser.username) &&
        check.password(createUser.password) &&
        check.name(createUser.name)
      ) {
        await user.create(createUser);

        handleClose();
      }
    };
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box
        component="form"
        display="flex"
        alignItems="center"
        borderRadius={4}
        sx={{ width: 300 }}
        onSubmit={handleSubmit}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          spacing={2}
          p={4}
        >
          <H2>新增成員</H2>
          <TextField
            id="username"
            name="username"
            label="帳號"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="password"
            name="password"
            label="密碼"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="name"
            name="name"
            label="暱稱"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="role"
            name="role"
            select
            label="權限"
            fullWidth
            defaultValue="user"
          >
            <MenuItem value="admin">管理員</MenuItem>
            <MenuItem value="user">使用者</MenuItem>
          </TextField>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              width: '50%',
              border: '2px solid #42A5F5',
              bgcolor: '#42A5F5',
              boxShadow: '0 4px 8px 0 #BDC9D7',
              transition: 'all ease-in-out 0.2s',
              color: '#fff',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#42A5F5'
              }
            }}
          >
            送出
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}

export const Edit: FC<UserFromProps> = ({ open, handleClose, userList }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<string>('user');

  const handleUsername = async (event: any, inputUsername: string) => {
    if (inputUsername) {
      await user.getUser(inputUsername, {
        password: setPassword,
        name: setName,
        role: setRole
      });

      setUsername(inputUsername);
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username && password && name && role) {
      const editUser = {
        username: username,
        password: password,
        name: name,
        role: role
      }

      if (
        check.username(editUser.username) &&
        check.password(editUser.password) &&
        check.name(editUser.name)
      ) {
        await user.edit(editUser);
        
        handleClose();
      }
    };
  }

  return (
    <Dialog open={open} onClose={() => {
      setUsername('');
      setPassword('');
      setName('');
      setRole('user');

      handleClose();
    }}>
      <Box
        component="form"
        display="flex"
        alignItems="center"
        borderRadius={4}
        sx={{ width: 300 }}
        onSubmit={handleSubmit}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          spacing={2}
          p={4}
        >
          <H2>修改成員</H2>
          <Autocomplete
            id="username"
            options={userList}
            noOptionsText="沒有此成員"
            disableClearable
            fullWidth
            inputValue={username}
            onInputChange={handleUsername}
            renderInput={(params) => (
              <TextField
                {...params}
                name="name"
                label="帳號"
              />
            )}
          />
          <TextField
            id="password"
            name="password"
            label="密碼"
            fullWidth
            value={password}
            variant="outlined"
            onChange={
              (event: ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }
            }
          />
          <TextField
            id="name"
            name="name"
            label="暱稱"
            fullWidth
            value={name}
            variant="outlined"
            onChange={
              (event: ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
              }
            }
          />
          <TextField
            id="role"
            name="role"
            select
            label="權限"
            fullWidth
            value={role}
            defaultValue="user"
            onChange={
              (event: ChangeEvent<HTMLInputElement>) => {
                setRole(event.target.value);
              }
            }
          >
            <MenuItem value="admin">管理員</MenuItem>
            <MenuItem value="user">使用者</MenuItem>
          </TextField>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              width: '50%',
              border: '2px solid #42A5F5',
              bgcolor: '#42A5F5',
              boxShadow: '0 4px 8px 0 #BDC9D7',
              transition: 'all ease-in-out 0.2s',
              color: '#fff',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#42A5F5'
              }
            }}
          >
            送出
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}

export const Remove: FC<UserFromProps> = ({ open, handleClose, userList }) => {
  const { userState } = useAuthContext();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const username = data.get('username');

    if (username) {
      await user.remove(username as string, userState.value.username as string);

      handleClose();
    };
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box
        component="form"
        display="flex"
        alignItems="center"
        borderRadius={4}
        sx={{ width: 300 }}
        onSubmit={handleSubmit}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          spacing={2}
          p={4}
        >
          <H2>刪除成員</H2>
          <Autocomplete
            id="username"
            fullWidth
            options={userList}
            noOptionsText="沒有此成員"
            disableClearable
            renderInput={(params) => (
              <TextField
                {...params}
                name="username"
                label="帳號"
                fullWidth
                variant="outlined"
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              width: '50%',
              border: '2px solid #42A5F5',
              bgcolor: '#42A5F5',
              boxShadow: '0 4px 8px 0 #BDC9D7',
              transition: 'all ease-in-out 0.2s',
              color: '#fff',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#42A5F5'
              }
            }}
          >
            送出
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}