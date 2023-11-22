import { ReactNode, createContext, useState, useContext } from 'react';


interface Props {
  children: ReactNode;
}

type UserType = {
  name: string | null;
  role: string | null;
  username: string | null;
  token: string | null;
}

interface AuthContextProps {
  userState: {
    value: UserType;
    setValue: (user: UserType) => void;
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
  const [user, setUser] = useState<UserType>({
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