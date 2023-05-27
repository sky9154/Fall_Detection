import { FC } from 'react';
import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';


const SubmitButton: FC<ButtonProps> = ({ children, ...props }) => (
  <Box textAlign="right">
    <Button
      type="submit"
      variant="contained"
      sx={{
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
      {...props}
    >
      儲存變更
    </Button>
  </Box>
);

export default SubmitButton;