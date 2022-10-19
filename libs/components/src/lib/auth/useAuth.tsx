import { getAuth, User } from 'firebase/auth';
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useApolloClient } from '@apollo/react-hooks';

type AuthData = {
  loggedIn: boolean;
  loading: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
};
export const AuthContext = React.createContext<AuthData>({
  loggedIn: false,
  loading: true,
  setLoggedIn: () => null,
  user: null,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const client = useApolloClient();

  useEffect(() => {
    const clearListener = getAuth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUser(user);
      } else {
        setLoggedIn(false);
        setUser(null);
        client.cache.reset();
      }
      setLoading(false);
    });
    return () => {
      clearListener();
    };
  }, [client.cache]);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
