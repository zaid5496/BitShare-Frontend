import { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "../services/authService";
import {
  getAccessToken,
  clearTokens,
} from "../utils/token";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    clearTokens();
    setUser(null);
  };

  const loadUser = async () => {
    try {
      const token = getAccessToken();

      if (!token) {
        setLoading(false);
        return;
      }

      const data = await getCurrentUser();

      setUser(data);
    } catch (error) {
      clearTokens();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        loadUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);