import { FC, lazy, LazyExoticComponent, Suspense } from 'react';
import LoadingScreen from 'components/LoadingScreen';
import GuestGuard from 'components/Authentication/GuestGuard';
import AdminGuard from 'components/Authentication/AdminGuard';
import { CameraProvider } from 'context/CameraContext';


const loadable = (Component: LazyExoticComponent<FC>) => (props: any) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

const Detection = loadable(lazy(() => import('pages/Detection')));
const Home = loadable(lazy(() => import('pages/Home')));
const Login = loadable(lazy(() => import('pages/Login')));
const Account = loadable(lazy(() => import('pages/Settings/Account')));
const System = loadable(lazy(() => import('pages/Settings/System')));
const Error = loadable(lazy(() => import('pages/404')));

const routes = [
  {
    exact: true,
    path: '/',
    element: (
      <GuestGuard>
        <Home />
      </GuestGuard>
    )
  }, {
    path: '/login',
    element: <Login />
  }, {
    path: '/detection/:cameraId',
    element: (
      <GuestGuard>
        <CameraProvider>
          <Detection />
        </CameraProvider>
      </GuestGuard>
    )
  }, {
    path: '/account',
    element: (
      <GuestGuard>
        <Account />
      </GuestGuard>
    )
  }, {
    path: '/system',
    element: (
      <AdminGuard>
        <System />
      </AdminGuard>
    )
  }, {
    path: '*',
    element: <Error />
  }
];

export default routes;