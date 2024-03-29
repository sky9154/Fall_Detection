import { FC, MouseEvent } from 'react';
import {
  IoAccessibilityOutline,
  IoAccessibility
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

const CameraToggleButton: FC = () => {
  const { isLoading, camera, disconnectSocket } = useCameraContext();

  const handleDrawState = (event: MouseEvent<HTMLElement>, draw: boolean) => {
    disconnectSocket();

    camera.setValue({
      ...camera.value,
      draw: !camera.value.draw
    });
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
        selected={camera.value.draw}
        aria-label="state"
      >
        {(camera.value.draw) ? <IoAccessibility /> : <IoAccessibilityOutline />}
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
}

export default CameraToggleButton;