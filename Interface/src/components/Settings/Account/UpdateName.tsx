import { FC, FormEvent } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { H2 } from 'components/Typography';
import SubmitButton from 'components/Settings/SubmitButton';
import { useAuthContext } from 'context/AuthContext';
import check from 'functions/check';
import user from 'api/user';


const UpdateName: FC = () => {
  const { userState } = useAuthContext();

  const updateName = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = data.get('name');

    if (name) {
      if (check.name(name as string)) {
        user.updateName(userState, name as string);
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
      onSubmit={updateName}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        width="100%"
        spacing={2}
        p={4}
      >
        <H2>使用者暱稱</H2>
        <OutlinedInput
          id="name"
          name="name"
          defaultValue={userState.value.name}
          fullWidth
        />
        <SubmitButton />
      </Stack>
    </Box>
  );
}

export default UpdateName;