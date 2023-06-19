import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { H1, H3, Paragraph } from 'components/Typography';
import { useAuthContext } from 'context/AuthContext';
import { MenuList } from 'assets/data';


interface Menu {
  name: string,
  key: string,
  icon: JSX.Element
}

const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_PORT;

const UserProfile: FC = () => {
  const { user } = useAuthContext();

  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  const location = useLocation();
  const currentPath = location.pathname.substring(1);

  const item = MenuList.find((item) => item.key === currentPath) as unknown as Menu;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minWidth="50%"
    >
      <H1>{item.name}</H1>
      <Avatar
        alt={`${user.value.name}`}
        src={(user.value.username) ? `http://${IP}:${PORT}/api/user/get/avatar/${user.value.username}` : ''}
        sx={{
          width: 128,
          height: 128,
          m: 2,
          boxShadow: '0 4px 8px 0 #BDC9D7'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <H3>{user.value.name}</H3>
      <Paragraph color="text.secondary">{user.value.role}@{user.value.username}</Paragraph>
    </Box>
  );
}

export default UserProfile;