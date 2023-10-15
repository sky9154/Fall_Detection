import { ReactNode, createContext, useState, useContext } from 'react';


interface Props {
  children: ReactNode;
}

interface User {
  name: string | null;
  role: string | null;
  username: string | null;
  token: string | null;
}

interface AuthContextProps {
  userState: {
    value: User;
    setValue: (user: User) => void;
  };
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  userState: {
    value: {
      name: null,
      role: null,
      username: null,
      token: null
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
    token: null
  });

  const handleLogout = () => {
    setUser({
      name: null,
      role: null,
      username: null,
      token: null
    });
  };

  return (
    <AuthContext.Provider value={{
      userState: {
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