import { FC } from 'react';
import { FaDizzy, FaLaugh } from 'react-icons/fa';
import InputAdornment from '@mui/material/InputAdornment';


type ShowPasswordButtonProps = {
  type: string;
  showPassword: {
    old: boolean,
    new: boolean,
    rptNew: boolean
  };
  handleClickShowPassword: (type: string) => void;
}

const ShowPasswordButton: FC<ShowPasswordButtonProps> = ({ type, showPassword, handleClickShowPassword }) => {
  let showType = false;

  switch (type) {
    case 'old':
      showType = showPassword.old;

      break;
    case 'new':
      showType = showPassword.new;

      break;
    case 'rptNew':
      showType = showPassword.rptNew;

      break;
  }

  return (
    <InputAdornment position="end" style={{ cursor: 'pointer' }}>
      {(showType) ? (
        <FaDizzy
          onClick={() => handleClickShowPassword(type)}
        />
      ) : (
        <FaLaugh
          onClick={() => handleClickShowPassword(type)}
        />
      )}
    </InputAdornment>
  );
}

export default ShowPasswordButton;