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
  const auth = useAuthContext();
  
  if (localStorage.getItem('access_token')) {
    if (!auth.user.value.username) {
      user.get(auth.user.setValue);
    }

    return (
      <Fragment>
        <DashboardNavbar />
        {children}
      </Fragment>
    );
  } else {
    toast.error('請先登入帳號!');
    return <Navigate to="/login" />;
  }
};

export default GuestGuard;