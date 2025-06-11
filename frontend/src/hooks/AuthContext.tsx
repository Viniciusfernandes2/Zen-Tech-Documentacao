import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextData {
  isAuthenticated: boolean;
  isVisitante: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  entrarComoVisitante: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("@Auth:token"));
  const [isVisitante, setIsVisitante] = useState<boolean>(() => localStorage.getItem("@Auth:visitante") === "true");

  useEffect(() => {
    if (token) {
      localStorage.setItem("@Auth:token", token);
      localStorage.removeItem("@Auth:visitante");
      setIsVisitante(false);
    } else {
      localStorage.removeItem("@Auth:token");
    }
  }, [token]);

  useEffect(() => {
    if (isVisitante) {
      localStorage.setItem("@Auth:visitante", "true");
      localStorage.removeItem("@Auth:token");
      setToken(null);
    } else {
      localStorage.removeItem("@Auth:visitante");
    }
  }, [isVisitante]);

  function login(newToken: string) {
    setToken(newToken);
  }

  function logout() {
    setToken(null);
    setIsVisitante(false);
  }

  function entrarComoVisitante() {
    setIsVisitante(true);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token && !isVisitante,
        isVisitante,
        token,
        login,
        logout,
        entrarComoVisitante,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
