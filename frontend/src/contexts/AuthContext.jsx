import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, login } from "../services/authenticationRequests";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const isAuthenticated = useMemo(() => Boolean(user), [user]);

  const signOut = async () => {
    setUser(null);

    localStorage.removeItem("token");
    navigate("/");
  };

  const signIn = async ({ email, senha }) => {
    const { token, user } = await login(email, senha);

    localStorage.setItem("token", token);
    setUser(user);

    navigate("/app");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !isAuthenticated) {
      getUser()
        .then((response) => {
          const user = response;
          setUser(user);
        })
        .catch(() => {
          signOut();
        });
    } else if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
