import { FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { FaLine, FaDiscord } from 'react-icons/fa';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { H2 } from 'components/Typography';
import SubmitButton from 'components/Settings/SubmitButton';
import notification from 'api/notification';


interface NotificationToken {
  line: string;
  discord: string;
}

const UpdateNotificationToken: FC = () => {
  const [notificationToken, setNotificationToken] = useState<NotificationToken>({
    line: '',
    discord: ''
  });

  const handleChangeLineToken = (event: ChangeEvent<HTMLInputElement>) => {
    setNotificationToken({
      ...notificationToken,
      line: event.target.value
    });
  }

  const handleChangeDiscordToken = (event: ChangeEvent<HTMLInputElement>) => {
    setNotificationToken({
      ...notificationToken,
      discord: event.target.value
    });
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const line = data.get('lineToken') || '';
    const discord = data.get('discordToken') || '';

    await notification.update(line as string, discord as string);
  }

  useEffect(() => {
    notification.get(setNotificationToken);
  }, []);
  
  return (
    <Box
      component="form"
      display="flex"
      alignItems="center"
      width="100%"
      borderRadius={4}
      boxShadow="0 4px 8px 0 #BDC9D7"
      onSubmit={handleSubmit}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        width="100%"
        spacing={2}
        p={4}
      >
        <H2>通知設定</H2>
        <TextField
          id="lineToken"
          name="lineToken"
          label="Line Token"
          variant="outlined"
          value={notificationToken.line}
          fullWidth
          onChange={handleChangeLineToken}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaLine style={{ fontSize: '24px' }} />
              </InputAdornment>
            )
          }}
        />
        <TextField
          id="discordToken"
          name="discordToken"
          label="Discord Token"
          variant="outlined"
          value={notificationToken.discord}
          fullWidth
          onChange={handleChangeDiscordToken}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaDiscord style={{ fontSize: '24px' }} />
              </InputAdornment>
            )
          }}
        />
        <SubmitButton />
      </Stack>
    </Box>
  );
}

export default UpdateNotificationToken;