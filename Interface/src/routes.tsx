import { FC, lazy, LazyExoticComponent, Suspense } from 'react';
import LoadingScreen from 'components/LoadingScreen';
import GuestGuard from 'components/Authentication/GuestGuard';
import AdminGuard from 'components/Authentication/AdminGuard';
import { HomeProvider } from 'context/HomeContext';


const loadable = (Component: LazyExoticComponent<FC>) => (props: any) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

const Home = loadable(lazy(() => import('pages/Home')));
const Login = loadable(lazy(() => import('pages/Authentication/Login')));
const Account = loadable(lazy(() => import('pages/Account')));
const System = loadable(lazy(() => import('pages/System')));
const Error = loadable(lazy(() => import('pages/404')));

const routes = [
  {
    exact: true,
    path: '/',
    element: (
      <GuestGuard>
        <HomeProvider>
          <Home />
        </HomeProvider>
      </GuestGuard>
    )
  }, {
    path: '/login',
    element: <Login />
  }, {
    path: '/home',
    element: (
      <GuestGuard>
        <HomeProvider>
          <Home />
        </HomeProvider>
      </GuestGuard >
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