import {
  FC,
  useState,
  FormEvent
} from 'react';
import {
  FaDizzy,
  FaLaugh,
  FaLock,
  FaSignInAlt,
  FaUserAlt,
  FaUserLock
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { H1 } from 'components/Typography';
import user from 'api/user';
import { useAuthContext } from 'context/AuthContext';


const theme = createTheme();

const Login: FC = () => {
  const navigate = useNavigate();
  const { userState } = useAuthContext();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    if (username && password) {
      user.login(
        navigate,
        userState.setValue,
        username as string,
        password as string
      );
    }
  };

  return (
    <Container sx={{
      height: '100%',
      minHeight: '100%'
    }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Box
          borderRadius={4}
          boxShadow="0 4px 8px 0 #BDC9D7"
          sx={{
            sm: {
              height: '100%',
              width: '100%'
            }
          }}
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            height="100%"
            m={4}
          >
            <Avatar sx={{ m: 1, width: 64, height: 64, bgcolor: theme.palette.primary.light }}>
              <FaUserLock style={{ fontSize: 32 }} />
            </Avatar>
            <H1>
              Login in
            </H1>
            <Box component="form" mt={1} onSubmit={handleSubmit} noValidate>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={4}
                height="100%"
              >
                <TextField
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaUserAlt />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="password"
                  label="Password"
                  name="password"
                  type={(showPassword) ? "text" : "password"}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaLock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end" style={{ cursor: 'pointer' }}>
                        {(showPassword) ? (
                          <FaDizzy
                            onClick={handleClickShowPassword}
                          />
                        ) : (
                          <FaLaugh
                            onClick={handleClickShowPassword}
                          />
                        )}
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<FaSignInAlt />}
                  sx={{
                    mb: 2,
                    bgcolor: theme.palette.primary.light
                  }}
                >
                  Login
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;