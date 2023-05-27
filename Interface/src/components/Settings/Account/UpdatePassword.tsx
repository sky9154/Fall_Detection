import { FC, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { H2, H3 } from 'components/Typography';
import ShowPasswordButton from 'components/Settings/Account/ShowPasswordButton';
import SubmitButton from 'components/Settings/SubmitButton';
import { useAuthContext } from 'context/AuthContext';
import check from 'functions/check';
import user from 'api/user';


const UpdatePassword: FC = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<{
    old: boolean,
    new: boolean,
    rptNew: boolean
  }>({
    old: false,
    new: false,
    rptNew: false
  });

  const [passwordState, setPasswordState] = useState<boolean>(false);

  const handleClickShowPassword = (type: string) => {
    switch (type) {
      case 'old':
        setShowPassword({
          ...showPassword,
          old: !showPassword.old
        });

        break;
      case 'new':
        setShowPassword({
          ...showPassword,
          new: !showPassword.new
        });

        break;
      case 'rptNew':
        setShowPassword({
          ...showPassword,
          rptNew: !showPassword.rptNew
        });

        break;
    }
  };

  const checkPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const newPassword = data.get('newPassword');
    const rptNewPassword = data.get('rptNewPassword');

    if (newPassword && rptNewPassword) {
      setPasswordState(newPassword !== rptNewPassword);
    }
  }

  const updatePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const oldPassword = data.get('oldPassword');
    const newPassword = data.get('newPassword');

    if (oldPassword && newPassword && !passwordState) {
      if (check.password(newPassword as string)) {
        user.updatePasswoed(oldPassword as string, newPassword as string);

        setTimeout(() => {
          auth.handleLogout();

          navigate('/login');
        }, 500);
      }
    }
  }

  return (
    <Box
      component="form"
      display="flex"
      alignItems="center"
      width="100%"
      borderRadius={4}
      boxShadow="0 4px 8px 0 #BDC9D7"
      onChange={checkPassword}
      onSubmit={updatePassword}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        width="100%"
        spacing={2}
        p={4}
      >
        <H2>帳號登入</H2>
        <OutlinedInput
          id="username"
          defaultValue={auth.user.value.username}
          disabled
          fullWidth
        />
        <H3 sx={{ mb: 2 }}>更改密碼</H3>
        <TextField
          id="oldPassword"
          name="oldPassword"
          label="目前密碼"
          type={(showPassword.old) ? "text" : "password"}
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <ShowPasswordButton
                type='old'
                showPassword={showPassword}
                handleClickShowPassword={handleClickShowPassword}
              />
            )
          }}
        />
        <TextField
          id="newPassword"
          name="newPassword"
          label="新密碼"
          type={(showPassword.new) ? "text" : "password"}
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <ShowPasswordButton
                type='new'
                showPassword={showPassword}
                handleClickShowPassword={handleClickShowPassword}
              />
            )
          }}
        />
        <TextField
          id="rptNewPassword"
          name="rptNewPassword"
          label={(passwordState) ? "密碼不符" : "確認新密碼"}
          type={(showPassword.rptNew) ? "text" : "password"}
          variant="outlined"
          error={passwordState}
          fullWidth
          InputProps={{
            endAdornment: (
              <ShowPasswordButton
                type='rptNew'
                showPassword={showPassword}
                handleClickShowPassword={handleClickShowPassword}
              />
            )
          }}
        />
        <SubmitButton />
      </Stack>
    </Box>
  );
}

export default UpdatePassword;