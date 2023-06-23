import { FC, useState, ReactElement, cloneElement, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { RiPolaroid2Line } from 'react-icons/ri';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { H2 } from 'components/Typography';
import { useAuthContext } from 'context/AuthContext';
import { Name, MenuList } from 'assets/data';
import system from 'functions/system';


interface Props {
  children: ReactElement;
}

const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_PORT;

const ElevationScroll = (props: Props) => {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

const DashboardNavbar: FC = (props: any) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { userState, handleLogout } = useAuthContext();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = (key: string) => {
    setAnchorElUser(null);

    if (MenuList.some(item => item.key === key)) {
      switch (key) {
        case 'logout':
          handleLogout();

          toast.success('登出成功');

          navigate('/login');

          system.reload();

          break;
        case 'system':
          if (userState.value.role === 'admin') {
            navigate(`/${key}`);
          } else {
            toast.error('權限不足!');
          }

          break;
        default:
          navigate(`/${key}`);

          break;
      }
    }
  };

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar position="fixed" role="toolbar" sx={{ background: 'rgba(36, 153, 239, 0.85)' }}>
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              variant="dense"
              style={{
                textDecoration: 'none',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center', minHeight: '64px'
              }}
            >
              <Link
                to="/home"
                style={{
                  textDecoration: 'none',
                  color: '#FFF',
                  whiteSpace: 'pre'
                }}
              >
                <H2 mr={2} letterSpacing=".3rem" display="flex" alignItems="center">
                  <RiPolaroid2Line fontSize="30px" style={{ marginRight: 3 }} />
                  {Name.title}
                </H2>
              </Link>
              <Box sx={{ flexGrow: 1 }}></Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="設定選單">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={
                        userState.value.name || ''
                      }
                      src={
                        (userState.value.username) ?
                          `http://${IP}:${PORT}/api/user/get/avatar/${userState.value.username}` :
                          ''
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {
                    MenuList.map((item) => (
                      <MenuItem key={item.key} sx={{ fontSize: 18 }} onClick={() => handleCloseUserMenu(item.key)}>
                        <Box display="flex" textAlign="center" mr={1}>
                          {item.icon}
                        </Box>
                        <Typography textAlign="center">{item.name}</Typography>
                      </MenuItem>
                    ))
                  }
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      <Toolbar disableGutters variant="dense" sx={{ minHeight: '64px' }} />
    </>
  );
}

export default DashboardNavbar;