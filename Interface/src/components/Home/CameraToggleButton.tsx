import { FC, MouseEvent } from 'react';
import {
  IoLaptopOutline,
  IoImageOutline,
  IoPhonePortraitOutline,
  IoAccessibilityOutline,
  IoCameraOutline,
  IoAccessibility
} from 'react-icons/io5';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import { useCameraContext } from 'context/Home/CameraContext';


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

const CameraToggleButton: FC = () => {
  const { isLoading, camera, disconnectSocket } = useCameraContext();

  const handleDrawState = (event: MouseEvent<HTMLElement>, draw: boolean) => {
    disconnectSocket();

    camera.setValue({
      ...camera.value,
      draw: !camera.value.draw
    });
  };

  const handleCamera = (event: MouseEvent<HTMLElement>, id: string) => {
    if (id !== camera.value.id) {
      disconnectSocket();

      camera.setValue({
        ...camera.value,
        id: id
      });
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        border: (theme) => `1px solid ${theme.palette.divider}`,
        flexWrap: 'wrap',
        borderRadius: 2,
        boxShadow: '0 4px 8px 0 #BDC9D7'
      }}
    >
      <StyledToggleButtonGroup
        size="large"
        exclusive
        onChange={handleDrawState}
        aria-label="DrawState"
        disabled={isLoading.value}
      >
        <ToggleButton
          value="check"
          selected={camera.value.draw}
          aria-label="state"
        >
          {(camera.value.draw) ? <IoAccessibility /> : <IoAccessibilityOutline />}
        </ToggleButton>
      </StyledToggleButtonGroup>
      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
      <StyledToggleButtonGroup
        size="large"
        value={camera.value.id}
        exclusive
        onChange={handleCamera}
        aria-label="CameraId"
        disabled={isLoading.value}
      >
        <ToggleButton value="0" aria-label="0">
          <IoLaptopOutline />
        </ToggleButton>
        <ToggleButton value="test" aria-label="test">
          <IoImageOutline />
        </ToggleButton>
        <ToggleButton value="1" aria-label="1">
          <IoPhonePortraitOutline />
        </ToggleButton>
        <ToggleButton value="esp32" aria-label="esp32">
          <IoCameraOutline />
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Paper>
  );
}

export default CameraToggleButton;