import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';


const Wave = styled(Box)(() => ({
  textIndent: '-9999em',
  margin: 'auto',
  position: 'absolute',
  right: 'calc(50% - 6.8px)',
  top: 'calc(50% - 16px)',
  background: '#42A5F5',
  animation: 'loading-keys-app-loading 0.8s infinite ease-in-out',
  width: '13.6px',
  height: '32px',
  animationDelay: '0.16s !important',
  '&::before, &::after': {
    position: 'absolute',
    top: 0,
    content: '""',
    background: '#42A5F5',
    width: '13.6px',
    height: '32px',
    animation: 'loading-keys-app-loading 0.8s infinite ease-in-out',
  },
  '&::before': {
    left: '-19.992px',
  },
  '&::after': {
    left: '19.992px',
    animationDelay: '0.32s !important',
  },
  '@keyframes loading-keys-app-loading': {
    '0%, 80%, 100%': {
      opacity: 0.75,
      boxShadow: '0 0 #42A5F5',
      height: '32px',
    },
    '40%': {
      opacity: 1,
      boxShadow: '0 -8px #42A5F5',
      height: '40px',
    }
  }
}));

export default Wave;
