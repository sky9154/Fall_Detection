import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from 'routes';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { zhTW as gridZhTW } from '@mui/x-data-grid';
import { AuthProvider } from 'context/AuthContext';


const theme = createTheme({
  typography: {
    fontFamily: [
      'Noto Sans TC',
      'Roboto',
      'sans-serif'
    ].join(',')
  }
},
  gridZhTW
);

const App: FC = () => {
  const allPages = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Toaster />
        {allPages}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;