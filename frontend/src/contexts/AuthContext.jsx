import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, login } from "../services/userRequests";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  let isAuthenticated = Boolean(user);

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

    if (token) {
      getUser()
        .then((response) => {
          const user = response.user;
          setUser(user);
        })
        .catch(() => {
          signOut();
        });
    } else {
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
