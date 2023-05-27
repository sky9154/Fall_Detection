import { ReactNode, createContext, useState, useContext } from 'react';


interface Props {
  children: ReactNode;
}

interface User {
  name: string | null;
  role: string | null;
  username: string | null;
  avatar: string | null;
}

interface AuthContextProps {
  user: {
    value: User;
    setValue: (user: User) => void;
  };
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: {
    value: {
      name: null,
      role: null,
      username: null,
      avatar: null
    },
    setValue: () => { }
  },
  handleLogout: () => { }
});

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>({
    name: null,
    role: null,
    username: null,
    avatar: null
  });

  const handleLogout = () => {
    setUser({
      name: null,
      role: null,
      username: null,
      avatar: null
    });

    localStorage.removeItem('access_token');
  };

  return (
    <AuthContext.Provider value={{
      user: {
        value: user,
        setValue: setUser
      },
      handleLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);