import { FC, MouseEvent } from 'react';
import {
  IoNotificationsOutline,
  IoNotificationsOffSharp
} from 'react-icons/io5';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import { useCameraContext } from 'context/CameraContext';


const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    }
  }
}));

const NotificationToggleButton: FC = () => {
  const { isLoading, notification } = useCameraContext();

  const handleDrawState = (event: MouseEvent<HTMLElement>, draw: boolean) => {
    notification.setValue(!notification.value);
  };

  return (
    <StyledToggleButtonGroup
      size="large"
      exclusive
      onChange={handleDrawState}
      aria-label="DrawState"
      disabled={isLoading.value}
    >
      <ToggleButton
        value="check"
        selected={!notification.value}
        aria-label="state"
      >
        {(!notification.value) ? <IoNotificationsOffSharp /> : <IoNotificationsOutline />}
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
}

export default NotificationToggleButton;