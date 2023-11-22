import { FC } from 'react';
import {
  FaAngleLeft,
  FaAngleRight,
  FaRegChartBar,
  FaRegAddressCard
} from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useCameraContext } from 'context/CameraContext';


type OperationToggleButtonProps = {
  page: number;
  setPage: (value: number) => void;
}

const OperationToggleButton: FC<OperationToggleButtonProps> = ({ page, setPage }) => {
  const { isLoading } = useCameraContext();

  const handlePageChange = () => {
    setPage((page + 1 > 2) ? 1 : 2);
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={4}
      width="100%"
    >

      <IconButton
        aria-label="page change"
        component="label"
        size="large"
        onClick={handlePageChange}
        disabled={isLoading.value}
        sx={{ color: '#42A5F5' }}
      >
        <FaAngleLeft />
      </IconButton>
      {(page === 1) ? (
        <FaRegChartBar style={{ fontSize: '18px' }} />
      ) : (
        <FaRegAddressCard style={{ fontSize: '18px' }} />
      )}
      <IconButton
        aria-label="page change"
        component="label"
        size="large"
        onClick={handlePageChange}
        disabled={isLoading.value}
        sx={{ color: '#42A5F5' }}
      >
        <FaAngleRight />
      </IconButton>
    </Stack>
  );
};

export default OperationToggleButton;