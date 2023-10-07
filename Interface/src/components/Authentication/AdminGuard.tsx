import { Fragment, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthContext } from 'context/AuthContext';
import DashboardNavbar from 'components/Layouts/DashboardNavbar';


interface Props {
  children: ReactNode;
}

const GuestGuard = ({ children }: Props) => {
  const { userState } = useAuthContext();

  if (userState.value.role) {
    if (userState.value.role === 'admin') {
      return (
        <Fragment>
          <DashboardNavbar />
          {children}
        </Fragment>
      );
    } else {
      toast.error('權限不足!');

      return (
        <Navigate to="/home" />
      );
    }
  } else {
    toast.error('請先登入帳號!');

    return (
      <Navigate to="/login" />
    );
  }
};

export default GuestGuard;