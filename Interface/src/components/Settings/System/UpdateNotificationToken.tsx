import { FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { FaLine, FaDiscord } from 'react-icons/fa';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { H2 } from 'components/Typography';
import SubmitButton from 'components/Settings/SubmitButton';
import notification from 'api/notification';
import check from 'functions/check';
import { useAuthContext } from 'context/AuthContext';


interface Discord {
  channel: string;
  token: string;
}

const UpdateNotificationToken: FC = () => {
  const { userState } = useAuthContext();

  const [lineToken, setLineToken] = useState<string>('');

  const [discord, setDiscord] = useState<Discord>({
    channel: '',
    token: ''
  })

  const handleChangeLineToken = (event: ChangeEvent<HTMLInputElement>) => {
    setLineToken(event.target.value);
  }

  const handleChangeDiscordChannel = (event: ChangeEvent<HTMLInputElement>) => {
    setDiscord({
      ...discord,
      channel: event.target.value
    });
  }

  const handleChangeDiscordToken = (event: ChangeEvent<HTMLInputElement>) => {
    setDiscord({
      ...discord,
      token: event.target.value
    });
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const line = data.get('lineToken') as string || '';
    const discordChannel = data.get('discordChannel') as string || '';
    const discordToken = data.get('discordToken') as string || '';

    const discord: string | boolean = check.discord(discordChannel, discordToken);
    
    if (discord) {
      notification.update(userState.value.token as string, line, discord as string);
    }
  }

  useEffect(() => {
    notification.get(userState.value.token as string, setLineToken, setDiscord);
  }, [userState.value.token]);

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
          value={lineToken}
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
          id="discordChannel"
          name="discordChannel"
          label="Discord Channel"
          variant="outlined"
          value={discord.channel}
          fullWidth
          onChange={handleChangeDiscordChannel}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaDiscord style={{ fontSize: '24px' }} />
              </InputAdornment>
            )
          }}
        />
        <TextField
          id="discordToken"
          name="discordToken"
          label="Discord Token"
          variant="outlined"
          value={discord.token}
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