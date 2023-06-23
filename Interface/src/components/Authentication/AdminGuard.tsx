import { Fragment, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthContext } from 'context/AuthContext';
import DashboardNavbar from 'components/Layouts/DashboardNavbar';
import user from 'api/user';


interface Props {
  children: ReactNode;
}

const GuestGuard = ({ children }: Props) => {
  const { userState } = useAuthContext();

  if (localStorage.getItem('access_token')) {
    if (!userState.value.username) {
      user.get(userState.setValue);
    }

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